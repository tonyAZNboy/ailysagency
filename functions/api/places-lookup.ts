// Cloudflare Pages Function · /api/places-lookup
//
// Pulls real Google Places (New) data for a business by name + city. No OAuth
// required (public business data only). Returns rating, review count, photo
// count, categories, hours, attributes, and the canonical place_id.
//
// Used by the audit engines to replace Anthropic-generated GBP approximations
// with actual ground truth. Also feeds the competitor-overlay feature
// (nearbysearch with the same vertical type).
//
// Setup:
//   1. Create a Google Cloud project, enable "Places API (New)"
//   2. Create an API key restricted to this domain
//   3. Add GOOGLE_PLACES_API_KEY to Cloudflare Pages env vars
//   4. Optional: bind PLACES_CACHE KV namespace for cross-region cache
//
// Without GOOGLE_PLACES_API_KEY set, returns a labeled sample so dev/preview
// continues to work and the feature degrades gracefully.
//
// Cost: ~$0.017 per Place Details call. With 24h KV cache that's roughly
// $0.005/visitor in steady state.
//
// Security:
//   - Server-side input validation
//   - Rate-limit via Cloudflare WAF (3 req/min/IP recommended)
//   - API key server-side only
//   - Origin allowlist enforced by _headers

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  GOOGLE_PLACES_API_KEY?: string;
  PLACES_CACHE?: KVNamespace;
}

export interface PlacesResult {
  found: boolean;
  placeId?: string;
  name?: string;
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  primaryType?: string;
  types?: string[];
  photoCount?: number;
  websiteUri?: string;
  internationalPhoneNumber?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[]; openNow?: boolean };
  priceLevel?: string;
  hasAttributes?: {
    wheelchairAccessibleEntrance?: boolean;
    delivery?: boolean;
    takeout?: boolean;
    dineIn?: boolean;
    reservable?: boolean;
    servesVegetarianFood?: boolean;
    goodForChildren?: boolean;
    paymentOptions?: { acceptsCreditCards?: boolean };
  };
  /** "live" if Places API responded, "sample" if API key missing or call failed */
  isLive: boolean;
  generatedAt: string;
}

function sanitize(s: string, max: number): string {
  return s.replace(/[<>{}[\]\\]/g, "").trim().slice(0, max);
}

function staticFallback(name: string, city: string): PlacesResult {
  return {
    found: false,
    name,
    isLive: false,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Places API (New) text search → place details flow.
 * Two calls: searchText (find the place) → place details (get the data).
 */
async function fetchFromPlaces(
  env: Env,
  name: string,
  city: string,
): Promise<PlacesResult> {
  if (!env.GOOGLE_PLACES_API_KEY) return staticFallback(name, city);

  try {
    // Step 1: text search
    const searchRes = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.primaryType",
        },
        body: JSON.stringify({
          textQuery: `${name} ${city}`,
          languageCode: "en",
          maxResultCount: 1,
        }),
      },
    );

    if (!searchRes.ok) return staticFallback(name, city);

    const searchData = (await searchRes.json()) as {
      places?: Array<{
        id?: string;
        displayName?: { text?: string };
        formattedAddress?: string;
        primaryType?: string;
      }>;
    };

    const firstPlace = searchData.places?.[0];
    if (!firstPlace?.id) {
      return {
        found: false,
        name,
        isLive: true,
        generatedAt: new Date().toISOString(),
      };
    }

    // Step 2: place details (full data)
    const detailRes = await fetch(
      `https://places.googleapis.com/v1/places/${firstPlace.id}`,
      {
        headers: {
          "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask": [
            "id",
            "displayName",
            "formattedAddress",
            "rating",
            "userRatingCount",
            "primaryType",
            "types",
            "photos",
            "websiteUri",
            "internationalPhoneNumber",
            "regularOpeningHours",
            "priceLevel",
            "wheelchairAccessibleEntrance",
            "delivery",
            "takeout",
            "dineIn",
            "reservable",
            "servesVegetarianFood",
            "goodForChildren",
            "paymentOptions",
          ].join(","),
        },
      },
    );

    if (!detailRes.ok) return staticFallback(name, city);

    const detail = (await detailRes.json()) as {
      id?: string;
      displayName?: { text?: string };
      formattedAddress?: string;
      rating?: number;
      userRatingCount?: number;
      primaryType?: string;
      types?: string[];
      photos?: unknown[];
      websiteUri?: string;
      internationalPhoneNumber?: string;
      regularOpeningHours?: { weekdayDescriptions?: string[]; openNow?: boolean };
      priceLevel?: string;
      wheelchairAccessibleEntrance?: boolean;
      delivery?: boolean;
      takeout?: boolean;
      dineIn?: boolean;
      reservable?: boolean;
      servesVegetarianFood?: boolean;
      goodForChildren?: boolean;
      paymentOptions?: { acceptsCreditCards?: boolean };
    };

    return {
      found: true,
      placeId: detail.id,
      name: detail.displayName?.text ?? name,
      formattedAddress: detail.formattedAddress,
      rating: detail.rating,
      userRatingCount: detail.userRatingCount,
      primaryType: detail.primaryType,
      types: detail.types,
      photoCount: Array.isArray(detail.photos) ? detail.photos.length : 0,
      websiteUri: detail.websiteUri,
      internationalPhoneNumber: detail.internationalPhoneNumber,
      regularOpeningHours: detail.regularOpeningHours,
      priceLevel: detail.priceLevel,
      hasAttributes: {
        wheelchairAccessibleEntrance: detail.wheelchairAccessibleEntrance,
        delivery: detail.delivery,
        takeout: detail.takeout,
        dineIn: detail.dineIn,
        reservable: detail.reservable,
        servesVegetarianFood: detail.servesVegetarianFood,
        goodForChildren: detail.goodForChildren,
        paymentOptions: detail.paymentOptions,
      },
      isLive: true,
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return staticFallback(name, city);
  }
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  let body: { name?: string; city?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = sanitize(body.name ?? "", 120);
  const city = sanitize(body.city ?? "", 80);

  if (!name) return Response.json({ error: "Business name required." }, { status: 400 });
  if (!city) return Response.json({ error: "City required." }, { status: 400 });

  const cacheKey = `places:${name.toLowerCase()}|${city.toLowerCase()}`;
  if (env.PLACES_CACHE) {
    const cached = await env.PLACES_CACHE.get(cacheKey);
    if (cached) {
      return new Response(cached, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, must-revalidate",
          "X-Cache-Status": "HIT",
        },
      });
    }
  }

  const result = await fetchFromPlaces(env, name, city);
  const json = JSON.stringify(result);

  if (env.PLACES_CACHE && result.isLive) {
    await env.PLACES_CACHE.put(cacheKey, json, { expirationTtl: 60 * 60 * 24 });
  }

  return new Response(json, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, must-revalidate",
      "X-Cache-Status": "MISS",
    },
  });
}

export async function onRequest(): Promise<Response> {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
