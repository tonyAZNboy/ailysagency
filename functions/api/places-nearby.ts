// Cloudflare Pages Function · /api/places-nearby
//
// Returns up to 3 nearby competitors for a given place_id + vertical.
// Used by the competitor-overlay feature in the audit results.
//
// Approach:
//   1. Fetch place details for the seed place_id (lat/lng + primaryType)
//   2. searchNearby with a 5km radius and matching primaryType
//   3. Filter out the seed place itself, return top 3 by rating × review_count
//
// Without GOOGLE_PLACES_API_KEY set, returns a sample.

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  GOOGLE_PLACES_API_KEY?: string;
  PLACES_CACHE?: KVNamespace;
}

export interface NearbyCompetitor {
  placeId: string;
  name: string;
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
  primaryType?: string;
  websiteUri?: string;
  /** Distance from seed in meters */
  distanceMeters?: number;
}

interface NearbyResult {
  seedPlaceId: string;
  competitors: NearbyCompetitor[];
  isLive: boolean;
  generatedAt: string;
}

function staticFallback(seedPlaceId: string): NearbyResult {
  return {
    seedPlaceId,
    competitors: [],
    isLive: false,
    generatedAt: new Date().toISOString(),
  };
}

async function fetchNearby(env: Env, placeId: string): Promise<NearbyResult> {
  if (!env.GOOGLE_PLACES_API_KEY) return staticFallback(placeId);

  try {
    // Step 1: get seed location + type
    const seedRes = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask": "location,primaryType",
        },
      },
    );
    if (!seedRes.ok) return staticFallback(placeId);

    const seed = (await seedRes.json()) as {
      location?: { latitude?: number; longitude?: number };
      primaryType?: string;
    };

    if (!seed.location?.latitude || !seed.location?.longitude || !seed.primaryType) {
      return staticFallback(placeId);
    }

    // Step 2: nearby search 5km radius
    const nearbyRes = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.primaryType,places.websiteUri,places.location",
        },
        body: JSON.stringify({
          includedPrimaryTypes: [seed.primaryType],
          maxResultCount: 8,
          locationRestriction: {
            circle: {
              center: {
                latitude: seed.location.latitude,
                longitude: seed.location.longitude,
              },
              radius: 5000,
            },
          },
        }),
      },
    );

    if (!nearbyRes.ok) return staticFallback(placeId);

    const nearby = (await nearbyRes.json()) as {
      places?: Array<{
        id?: string;
        displayName?: { text?: string };
        formattedAddress?: string;
        rating?: number;
        userRatingCount?: number;
        primaryType?: string;
        websiteUri?: string;
        location?: { latitude?: number; longitude?: number };
      }>;
    };

    const seedLat = seed.location.latitude;
    const seedLng = seed.location.longitude;

    const competitors: NearbyCompetitor[] = (nearby.places ?? [])
      .filter((p) => p.id && p.id !== placeId)
      .map((p) => ({
        placeId: p.id ?? "",
        name: p.displayName?.text ?? "Unknown",
        rating: p.rating,
        userRatingCount: p.userRatingCount,
        formattedAddress: p.formattedAddress,
        primaryType: p.primaryType,
        websiteUri: p.websiteUri,
        distanceMeters:
          p.location?.latitude !== undefined && p.location?.longitude !== undefined
            ? haversine(
                seedLat,
                seedLng,
                p.location.latitude,
                p.location.longitude,
              )
            : undefined,
      }))
      .sort((a, b) => {
        const aScore = (a.rating ?? 0) * Math.log10((a.userRatingCount ?? 0) + 1);
        const bScore = (b.rating ?? 0) * Math.log10((b.userRatingCount ?? 0) + 1);
        return bScore - aScore;
      })
      .slice(0, 3);

    return {
      seedPlaceId: placeId,
      competitors,
      isLive: true,
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return staticFallback(placeId);
  }
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  let body: { placeId?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const placeId = (body.placeId ?? "").trim().slice(0, 200);
  if (!placeId || !/^[A-Za-z0-9_-]+$/.test(placeId)) {
    return Response.json({ error: "Valid place_id required." }, { status: 400 });
  }

  const cacheKey = `nearby:${placeId}`;
  if (env.PLACES_CACHE) {
    const cached = await env.PLACES_CACHE.get(cacheKey);
    if (cached) {
      return new Response(cached, {
        headers: {
          "Content-Type": "application/json",
          "X-Cache-Status": "HIT",
        },
      });
    }
  }

  const result = await fetchNearby(env, placeId);
  const json = JSON.stringify(result);

  if (env.PLACES_CACHE && result.isLive) {
    await env.PLACES_CACHE.put(cacheKey, json, { expirationTtl: 60 * 60 * 24 });
  }

  return new Response(json, {
    headers: { "Content-Type": "application/json", "X-Cache-Status": "MISS" },
  });
}

export async function onRequest(): Promise<Response> {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
