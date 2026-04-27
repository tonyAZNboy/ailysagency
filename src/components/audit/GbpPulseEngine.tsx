import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Star,
  Camera,
  MessageSquare,
  Tag,
  Activity,
  MapPin,
  ShieldCheck,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LangContext";
import type { TranslationKeys } from "@/i18n";

type Translator = TranslationKeys;

// ─── Types ───────────────────────────────────────────────────

type Vertical =
  | "restaurant"
  | "dentist"
  | "lawyer"
  | "salon"
  | "contractor"
  | "clinic"
  | "real-estate"
  | "hotel"
  | "other";

interface Basics {
  businessName: string;
  city: string;
  vertical: Vertical;
}

interface Answers {
  claimed: "yes" | "no" | "unsure" | null;
  posts30d: "yes" | "no" | "unsure" | null;
  reviewCount: number; // 0-500
  recentReviews: number; // 0-50 last 90 days
  photos60d: "yes" | "some" | "no" | null;
  categorySpecific: "yes" | "no" | "unsure" | null;
  attributesFilled: "all" | "some" | "none" | null;
  reviewResponse: "always" | "sometimes" | "rarely" | "never" | null;
  qa: "yes" | "no" | null;
  napConsistent: "yes" | "no" | "unsure" | null;
}

interface Signal {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  score: number; // 0-100
  weight: number; // contribution to total
  status: "strong" | "medium" | "weak";
  insight: string;
  action: string;
}

// Stable Vertical IDs only; labels come from the i18n layer at render time.
const VERTICAL_IDS: Vertical[] = [
  "restaurant",
  "dentist",
  "lawyer",
  "salon",
  "contractor",
  "clinic",
  "real-estate",
  "hotel",
  "other",
];

const VERTICAL_I18N_KEY: Record<Vertical, keyof Translator["audit"]["pulse"]> = {
  restaurant: "verticalRestaurant",
  dentist: "verticalDentist",
  lawyer: "verticalLawyer",
  salon: "verticalSalon",
  contractor: "verticalContractor",
  clinic: "verticalClinic",
  "real-estate": "verticalRealEstate",
  hotel: "verticalHotel",
  other: "verticalOther",
};

// ─── Vertical-tuned signal weight multipliers ─────────────────────────────
// Default weights are tuned for a generic local business. Per-vertical
// multipliers reflect what AI engines actually weight more or less for
// each industry. Restaurant verticals weight review velocity heavily;
// lawyer verticals weight NAP + categories more than reviews; healthcare
// weights review-response and category-specificity.
//
// All multipliers anchor at 1.0. Sum of multipliers stays close to 10 so
// the weighted average doesn't drift.

type SignalId =
  | "claim"
  | "posts"
  | "review-count"
  | "review-velocity"
  | "photos"
  | "categories"
  | "attributes"
  | "responses"
  | "qa"
  | "nap";

const VERTICAL_WEIGHT_MULTIPLIERS: Record<Vertical, Record<SignalId, number>> = {
  restaurant: {
    claim: 1.0,
    posts: 1.2,
    "review-count": 1.0,
    "review-velocity": 1.6, // dominant for restos
    photos: 1.4, // food photos matter more
    categories: 1.2, // cuisine specificity
    attributes: 1.1,
    responses: 1.0,
    qa: 0.8,
    nap: 0.7,
  },
  dentist: {
    claim: 1.2,
    posts: 0.8,
    "review-count": 1.1,
    "review-velocity": 1.2,
    photos: 0.9,
    categories: 1.4, // pediatric vs general matters
    attributes: 1.1, // RAMQ, insurance attributes
    responses: 1.4, // healthcare weight on responses
    qa: 1.0,
    nap: 0.9,
  },
  lawyer: {
    claim: 1.3,
    posts: 0.7,
    "review-count": 0.9,
    "review-velocity": 0.8,
    photos: 0.6,
    categories: 1.5, // family vs criminal vs immigration
    attributes: 1.2,
    responses: 1.3,
    qa: 1.1,
    nap: 1.6, // bar association consistency
  },
  salon: {
    claim: 1.0,
    posts: 1.3,
    "review-count": 1.0,
    "review-velocity": 1.4,
    photos: 1.5, // before/after photos
    categories: 1.0,
    attributes: 1.0,
    responses: 0.9,
    qa: 0.8,
    nap: 1.1,
  },
  contractor: {
    claim: 1.1,
    posts: 0.9,
    "review-count": 1.2,
    "review-velocity": 1.0,
    photos: 1.3, // project portfolio
    categories: 1.4, // licensed trade specificity
    attributes: 1.0,
    responses: 1.1,
    qa: 0.9,
    nap: 1.1,
  },
  clinic: {
    claim: 1.2,
    posts: 0.8,
    "review-count": 1.0,
    "review-velocity": 1.0,
    photos: 0.7,
    categories: 1.5, // specialty matters
    attributes: 1.3, // accessibility, insurance
    responses: 1.4,
    qa: 1.0,
    nap: 1.1,
  },
  "real-estate": {
    claim: 1.1,
    posts: 1.4, // recent listings as posts
    "review-count": 1.0,
    "review-velocity": 1.1,
    photos: 1.2,
    categories: 1.0,
    attributes: 0.9,
    responses: 1.1,
    qa: 1.0,
    nap: 1.2,
  },
  hotel: {
    claim: 1.1,
    posts: 1.0,
    "review-count": 1.5, // volume matters
    "review-velocity": 1.4,
    photos: 1.4,
    categories: 0.9,
    attributes: 1.3, // amenities critical
    responses: 1.2,
    qa: 0.7,
    nap: 0.5,
  },
  other: {
    claim: 1.0,
    posts: 1.0,
    "review-count": 1.0,
    "review-velocity": 1.0,
    photos: 1.0,
    categories: 1.0,
    attributes: 1.0,
    responses: 1.0,
    qa: 1.0,
    nap: 1.0,
  },
};

// ─── Scoring engine ─────────────────────────────────────────

function score(
  answers: Answers,
  t: Translator,
  vertical: Vertical = "other",
): { total: number; signals: Signal[] } {
  const sig = t.audit.pulse.signals;
  const mult = VERTICAL_WEIGHT_MULTIPLIERS[vertical];
  const signals: Signal[] = [];

  // Claim & verify (weight: 12)
  const claimScore =
    answers.claimed === "yes" ? 100 : answers.claimed === "unsure" ? 30 : 0;
  signals.push({
    id: "claim",
    label: sig.claimLabel,
    icon: ShieldCheck,
    score: claimScore,
    weight: 12 * mult.claim,
    status: claimScore >= 80 ? "strong" : claimScore >= 40 ? "medium" : "weak",
    insight:
      claimScore >= 80
        ? sig.claimStrongInsight
        : claimScore >= 40
          ? sig.claimMediumInsight
          : sig.claimWeakInsight,
    action:
      claimScore >= 80 ? sig.claimStrongAction : sig.claimWeakAction,
  });

  // Posts in last 30 days (weight: 10)
  const postScore =
    answers.posts30d === "yes" ? 100 : answers.posts30d === "unsure" ? 30 : 0;
  signals.push({
    id: "posts",
    label: sig.postsLabel,
    icon: Activity,
    score: postScore,
    weight: 10 * mult.posts,
    status: postScore >= 80 ? "strong" : postScore >= 40 ? "medium" : "weak",
    insight:
      postScore >= 80 ? sig.postsStrongInsight : sig.postsWeakInsight,
    action:
      postScore >= 80 ? sig.postsStrongAction : sig.postsWeakAction,
  });

  // Review count (weight: 13)
  const rcScore = Math.min(100, (answers.reviewCount / 100) * 100);
  signals.push({
    id: "review-count",
    label: sig.reviewCountLabel,
    icon: Star,
    score: rcScore,
    weight: 13 * mult["review-count"],
    status: rcScore >= 70 ? "strong" : rcScore >= 30 ? "medium" : "weak",
    insight:
      rcScore >= 70
        ? sig.reviewCountStrongInsight.replace("{count}", String(answers.reviewCount))
        : rcScore >= 30
          ? sig.reviewCountMediumInsight
          : sig.reviewCountWeakInsight,
    action:
      rcScore >= 70 ? sig.reviewCountStrongAction : sig.reviewCountWeakAction,
  });

  // Recent reviews velocity (weight: 15) — most important AEO signal
  const velScore = Math.min(100, (answers.recentReviews / 15) * 100);
  signals.push({
    id: "review-velocity",
    label: sig.velocityLabel,
    icon: Activity,
    score: velScore,
    weight: 15 * mult["review-velocity"],
    status: velScore >= 70 ? "strong" : velScore >= 30 ? "medium" : "weak",
    insight:
      velScore >= 70
        ? sig.velocityStrongInsight.replace("{count}", String(answers.recentReviews))
        : velScore >= 30
          ? sig.velocityMediumInsight
          : sig.velocityWeakInsight,
    action:
      velScore >= 70 ? sig.velocityStrongAction : sig.velocityWeakAction,
  });

  // Photos in last 60 days (weight: 10)
  const photoScore =
    answers.photos60d === "yes"
      ? 100
      : answers.photos60d === "some"
        ? 60
        : 10;
  signals.push({
    id: "photos",
    label: sig.photosLabel,
    icon: Camera,
    score: photoScore,
    weight: 10 * mult.photos,
    status: photoScore >= 80 ? "strong" : photoScore >= 40 ? "medium" : "weak",
    insight:
      photoScore >= 80 ? sig.photosStrongInsight : sig.photosWeakInsight,
    action:
      photoScore >= 80 ? sig.photosStrongAction : sig.photosWeakAction,
  });

  // Category specificity (weight: 10)
  const catScore =
    answers.categorySpecific === "yes"
      ? 100
      : answers.categorySpecific === "unsure"
        ? 50
        : 20;
  signals.push({
    id: "categories",
    label: sig.catLabel,
    icon: Tag,
    score: catScore,
    weight: 10 * mult.categories,
    status: catScore >= 80 ? "strong" : catScore >= 40 ? "medium" : "weak",
    insight:
      catScore >= 80 ? sig.catStrongInsight : sig.catWeakInsight,
    action:
      catScore >= 80 ? sig.catStrongAction : sig.catWeakAction,
  });

  // Attributes (weight: 8)
  const attrScore =
    answers.attributesFilled === "all"
      ? 100
      : answers.attributesFilled === "some"
        ? 50
        : 10;
  signals.push({
    id: "attributes",
    label: sig.attrLabel,
    icon: Sparkles,
    score: attrScore,
    weight: 8 * mult.attributes,
    status: attrScore >= 80 ? "strong" : attrScore >= 40 ? "medium" : "weak",
    insight:
      attrScore >= 80 ? sig.attrStrongInsight : sig.attrWeakInsight,
    action:
      attrScore >= 80 ? sig.attrStrongAction : sig.attrWeakAction,
  });

  // Review response (weight: 12)
  const respScore =
    answers.reviewResponse === "always"
      ? 100
      : answers.reviewResponse === "sometimes"
        ? 60
        : answers.reviewResponse === "rarely"
          ? 25
          : 0;
  signals.push({
    id: "responses",
    label: sig.respLabel,
    icon: MessageSquare,
    score: respScore,
    weight: 12 * mult.responses,
    status: respScore >= 80 ? "strong" : respScore >= 40 ? "medium" : "weak",
    insight:
      respScore >= 80 ? sig.respStrongInsight : sig.respWeakInsight,
    action:
      respScore >= 80 ? sig.respStrongAction : sig.respWeakAction,
  });

  // Q&A activity (weight: 5)
  const qaScore = answers.qa === "yes" ? 100 : 0;
  signals.push({
    id: "qa",
    label: sig.qaLabel,
    icon: MessageSquare,
    score: qaScore,
    weight: 5 * mult.qa,
    status: qaScore >= 80 ? "strong" : "weak",
    insight: qaScore >= 80 ? sig.qaStrongInsight : sig.qaWeakInsight,
    action: qaScore >= 80 ? sig.qaStrongAction : sig.qaWeakAction,
  });

  // NAP consistency (weight: 5)
  const napScore =
    answers.napConsistent === "yes"
      ? 100
      : answers.napConsistent === "unsure"
        ? 40
        : 0;
  signals.push({
    id: "nap",
    label: sig.napLabel,
    icon: MapPin,
    score: napScore,
    weight: 5 * mult.nap,
    status: napScore >= 80 ? "strong" : napScore >= 40 ? "medium" : "weak",
    insight:
      napScore >= 80 ? sig.napStrongInsight : sig.napWeakInsight,
    action:
      napScore >= 80 ? sig.napStrongAction : sig.napWeakAction,
  });

  // Weighted total
  const totalWeight = signals.reduce((s, item) => s + item.weight, 0);
  const total = Math.round(
    signals.reduce((s, item) => s + item.score * item.weight, 0) / totalWeight,
  );

  return { total, signals };
}

// ─── Main component ──────────────────────────────────────────

type Phase = "basics" | "questions" | "analyzing" | "results";

const STORAGE_KEY = "ailys_gbp_pulse_last_run";

export function GbpPulseEngine() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [phase, setPhase] = useState<Phase>("basics");
  const [basics, setBasics] = useState<Basics>({
    businessName: "",
    city: "",
    vertical: "restaurant",
  });
  const [answers, setAnswers] = useState<Answers>({
    claimed: null,
    posts30d: null,
    reviewCount: 50,
    recentReviews: 5,
    photos60d: null,
    categorySpecific: null,
    attributesFilled: null,
    reviewResponse: null,
    qa: null,
    napConsistent: null,
  });

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.basics && parsed?.answers) {
          setBasics(parsed.basics);
          setAnswers(parsed.answers);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleBasicsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!basics.businessName || !basics.city) return;
    setPhase("questions");
  };

  const allAnswered = useMemo(() => {
    return (
      answers.claimed !== null &&
      answers.posts30d !== null &&
      answers.photos60d !== null &&
      answers.categorySpecific !== null &&
      answers.attributesFilled !== null &&
      answers.reviewResponse !== null &&
      answers.qa !== null &&
      answers.napConsistent !== null
    );
  }, [answers]);

  const runAnalysis = () => {
    setPhase("analyzing");
    setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ basics, answers, ranAt: new Date().toISOString() }),
        );
      } catch {
        // ignore
      }
      setPhase("results");
    }, 1800);
  };

  const result = useMemo(
    () => score(answers, t, basics.vertical),
    [answers, t, basics.vertical],
  );

  // Translated vertical options for the chip selector
  const verticals = VERTICAL_IDS.map((id) => ({
    id,
    label: t.audit.pulse[VERTICAL_I18N_KEY[id]],
  }));

  // ── Phase 1: Basics ──
  if (phase === "basics") {
    return (
      <form
        onSubmit={handleBasicsSubmit}
        className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90 mb-3">
          {t.audit.pulse.step1of3}
        </div>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">
          {t.audit.pulse.aboutBusiness}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t.audit.pulse.aboutBusinessDesc}
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <Field label={t.audit.fields.businessName}>
            <Input
              value={basics.businessName}
              onChange={(e) =>
                setBasics({ ...basics, businessName: e.target.value })
              }
              placeholder="Clinique Dentaire Plateau"
              required
              className="bg-background/50 border-border/50"
            />
          </Field>
          <Field label={t.audit.fields.city}>
            <Input
              value={basics.city}
              onChange={(e) => setBasics({ ...basics, city: e.target.value })}
              placeholder="Montréal"
              required
              className="bg-background/50 border-border/50"
            />
          </Field>
        </div>

        <Field label={t.audit.pulse.industryVertical}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {verticals.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setBasics({ ...basics, vertical: v.id })}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  basics.vertical === v.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 bg-background/30 text-muted-foreground hover:border-border"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </Field>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-6 rounded-full font-semibold"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            boxShadow: "0 0 24px -8px hsl(var(--primary) / 0.5)",
          }}
        >
          {t.audit.pulse.startAssessment}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    );
  }

  // ── Phase 2: Questions ──
  if (phase === "questions") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90">
            {t.audit.pulse.step2of3}
          </div>
          <button
            onClick={() => setPhase("basics")}
            className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> {t.audit.pulse.back}
          </button>
        </div>

        <div className="space-y-7">
          <Question
            n={1}
            text={t.audit.pulse.q1}
          >
            <Choice
              active={answers.claimed === "yes"}
              onClick={() => setAnswers({ ...answers, claimed: "yes" })}
            >
              {t.audit.pulse.yesVerified}
            </Choice>
            <Choice
              active={answers.claimed === "no"}
              onClick={() => setAnswers({ ...answers, claimed: "no" })}
            >
              {t.audit.pulse.no}
            </Choice>
            <Choice
              active={answers.claimed === "unsure"}
              onClick={() => setAnswers({ ...answers, claimed: "unsure" })}
            >
              {t.audit.pulse.notSure}
            </Choice>
          </Question>

          <Question n={2} text={t.audit.pulse.q2}>
            <Choice
              active={answers.posts30d === "yes"}
              onClick={() => setAnswers({ ...answers, posts30d: "yes" })}
            >
              {t.audit.pulse.yes}
            </Choice>
            <Choice
              active={answers.posts30d === "no"}
              onClick={() => setAnswers({ ...answers, posts30d: "no" })}
            >
              {t.audit.pulse.no}
            </Choice>
            <Choice
              active={answers.posts30d === "unsure"}
              onClick={() => setAnswers({ ...answers, posts30d: "unsure" })}
            >
              {t.audit.pulse.notSure}
            </Choice>
          </Question>

          <Question
            n={3}
            text={`${t.audit.pulse.q3WithCount} (${answers.reviewCount})`}
          >
            <input
              type="range"
              min={0}
              max={500}
              step={5}
              value={answers.reviewCount}
              onChange={(e) =>
                setAnswers({ ...answers, reviewCount: Number(e.target.value) })
              }
              className="col-span-3 w-full h-2 rounded-full appearance-none cursor-pointer bg-muted/40 accent-primary"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--secondary)) ${(answers.reviewCount / 500) * 100}%, hsl(var(--muted)) ${(answers.reviewCount / 500) * 100}%)`,
              }}
            />
            <div className="col-span-3 flex justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
              <span>0</span>
              <span>250</span>
              <span>500+</span>
            </div>
          </Question>

          <Question
            n={4}
            text={`${t.audit.pulse.q4WithCount} (${answers.recentReviews})`}
          >
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={answers.recentReviews}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  recentReviews: Number(e.target.value),
                })
              }
              className="col-span-3 w-full h-2 rounded-full appearance-none cursor-pointer bg-muted/40 accent-primary"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--secondary)) ${(answers.recentReviews / 50) * 100}%, hsl(var(--muted)) ${(answers.recentReviews / 50) * 100}%)`,
              }}
            />
            <div className="col-span-3 flex justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
              <span>0</span>
              <span>25</span>
              <span>50+</span>
            </div>
          </Question>

          <Question
            n={5}
            text={t.audit.pulse.q5}
          >
            <Choice
              active={answers.photos60d === "yes"}
              onClick={() => setAnswers({ ...answers, photos60d: "yes" })}
            >
              {t.audit.pulse.yesSeveral}
            </Choice>
            <Choice
              active={answers.photos60d === "some"}
              onClick={() => setAnswers({ ...answers, photos60d: "some" })}
            >
              {t.audit.pulse.oneOrTwo}
            </Choice>
            <Choice
              active={answers.photos60d === "no"}
              onClick={() => setAnswers({ ...answers, photos60d: "no" })}
            >
              {t.audit.pulse.no}
            </Choice>
          </Question>

          <Question
            n={6}
            text={t.audit.pulse.q6}
            hint={t.audit.pulse.categoryHint}
          >
            <Choice
              active={answers.categorySpecific === "yes"}
              onClick={() =>
                setAnswers({ ...answers, categorySpecific: "yes" })
              }
            >
              {t.audit.pulse.yes}
            </Choice>
            <Choice
              active={answers.categorySpecific === "no"}
              onClick={() =>
                setAnswers({ ...answers, categorySpecific: "no" })
              }
            >
              {t.audit.pulse.noGeneric}
            </Choice>
            <Choice
              active={answers.categorySpecific === "unsure"}
              onClick={() =>
                setAnswers({ ...answers, categorySpecific: "unsure" })
              }
            >
              {t.audit.pulse.notSure}
            </Choice>
          </Question>

          <Question
            n={7}
            text={t.audit.pulse.q7}
            hint={t.audit.pulse.attributesHint}
          >
            <Choice
              active={answers.attributesFilled === "all"}
              onClick={() =>
                setAnswers({ ...answers, attributesFilled: "all" })
              }
            >
              {t.audit.pulse.allFilled}
            </Choice>
            <Choice
              active={answers.attributesFilled === "some"}
              onClick={() =>
                setAnswers({ ...answers, attributesFilled: "some" })
              }
            >
              {t.audit.pulse.someFilled}
            </Choice>
            <Choice
              active={answers.attributesFilled === "none"}
              onClick={() =>
                setAnswers({ ...answers, attributesFilled: "none" })
              }
            >
              {t.audit.pulse.noneFew}
            </Choice>
          </Question>

          <Question n={8} text={t.audit.pulse.q8}>
            <Choice
              active={answers.reviewResponse === "always"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "always" })
              }
            >
              {t.audit.pulse.always}
            </Choice>
            <Choice
              active={answers.reviewResponse === "sometimes"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "sometimes" })
              }
            >
              {t.audit.pulse.sometimes}
            </Choice>
            <Choice
              active={answers.reviewResponse === "rarely"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "rarely" })
              }
            >
              {t.audit.pulse.rarely}
            </Choice>
            <Choice
              active={answers.reviewResponse === "never"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "never" })
              }
            >
              {t.audit.pulse.never}
            </Choice>
          </Question>

          <Question n={9} text={t.audit.pulse.q9}>
            <Choice
              active={answers.qa === "yes"}
              onClick={() => setAnswers({ ...answers, qa: "yes" })}
            >
              {t.audit.pulse.yes}
            </Choice>
            <Choice
              active={answers.qa === "no"}
              onClick={() => setAnswers({ ...answers, qa: "no" })}
            >
              {t.audit.pulse.no}
            </Choice>
          </Question>

          <Question
            n={10}
            text={t.audit.pulse.q10}
            hint={t.audit.pulse.napHint}
          >
            <Choice
              active={answers.napConsistent === "yes"}
              onClick={() =>
                setAnswers({ ...answers, napConsistent: "yes" })
              }
            >
              {t.audit.pulse.yes}
            </Choice>
            <Choice
              active={answers.napConsistent === "no"}
              onClick={() =>
                setAnswers({ ...answers, napConsistent: "no" })
              }
            >
              {t.audit.pulse.no}
            </Choice>
            <Choice
              active={answers.napConsistent === "unsure"}
              onClick={() =>
                setAnswers({ ...answers, napConsistent: "unsure" })
              }
            >
              {t.audit.pulse.notSure}
            </Choice>
          </Question>
        </div>

        <Button
          type="button"
          onClick={runAnalysis}
          disabled={!allAnswered}
          size="lg"
          className="w-full mt-8 rounded-full font-semibold disabled:opacity-50"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            boxShadow: "0 0 24px -8px hsl(var(--primary) / 0.5)",
          }}
        >
          {t.audit.pulse.calculateScore}
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
        {!allAnswered && (
          <p className="mt-3 text-xs text-center text-muted-foreground/70">
            {t.audit.pulse.answerAll}
          </p>
        )}
      </div>
    );
  }

  // ── Phase 3: Analyzing ──
  if (phase === "analyzing") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-12 text-center">
        <Loader2 className="w-10 h-10 mx-auto mb-5 text-primary animate-spin" />
        <h3 className="font-display text-2xl mb-2">{t.audit.pulse.analyzing}</h3>
        <p className="text-sm text-muted-foreground">
          {t.audit.pulse.analyzingDesc}
        </p>
      </div>
    );
  }

  // ── Phase 4: Results ──
  return (
    <ResultsPanel basics={basics} result={result} onRestart={() => setPhase("basics")} navigate={navigate} />
  );
}

// ─── Results panel ────────────────────────────────────────────

function ResultsPanel({
  basics,
  result,
  onRestart,
  navigate,
}: {
  basics: Basics;
  result: { total: number; signals: Signal[] };
  onRestart: () => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const { t } = useLang();
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    const target = result.total;
    let raf = 0;
    const loop = (ts: number) => {
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimatedScore(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [result.total]);

  const tier =
    result.total >= 80
      ? { label: t.audit.tiers.strong, tone: "from-emerald-400 to-cyan-400", text: "text-emerald-300" }
      : result.total >= 60
        ? { label: t.audit.tiers.solid, tone: "from-cyan-400 to-violet-400", text: "text-cyan-300" }
        : result.total >= 40
          ? { label: t.audit.tiers.gaps, tone: "from-amber-400 to-orange-400", text: "text-amber-300" }
          : { label: t.audit.tiers.critical, tone: "from-rose-500 to-pink-500", text: "text-rose-300" };

  // Top 3 priorities = 3 lowest-scoring signals weighted by importance
  const priorities = [...result.signals]
    .map((s) => ({ ...s, urgency: (100 - s.score) * (s.weight / 10) }))
    .sort((a, b) => b.urgency - a.urgency)
    .slice(0, 3);

  // Radial gauge math
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const dash = (animatedScore / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Hero score reveal */}
      <div className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_80px_-20px_hsl(var(--primary)/0.5)]">
        <div className="flex items-center justify-between mb-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90">
            {t.audit.pulse.yourPulse}
          </div>
          <button
            onClick={onRestart}
            className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> {t.audit.pulse.runAgain}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-6">
          {t.audit.pulse.forBusiness}{" "}
          <span className="text-foreground/95">
            {basics.businessName}, {basics.city}
          </span>
        </p>

        <div className="grid sm:grid-cols-[200px_1fr] gap-8 items-center">
          {/* Radial gauge */}
          <div className="relative w-[200px] h-[200px] mx-auto sm:mx-0">
            <svg width="200" height="200" className="transform -rotate-90">
              <defs>
                <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(185 100% 55%)" />
                  <stop offset="50%" stopColor="hsl(265 90% 65%)" />
                  <stop offset="100%" stopColor="hsl(310 90% 65%)" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                opacity="0.3"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#pulse-grad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                style={{ transition: "stroke-dasharray 0.05s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-display text-6xl tabular-nums leading-none bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                {animatedScore}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mt-1">
                / 100
              </div>
            </div>
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${tier.tone} mb-4`}
            >
              {tier.label}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-3 leading-tight">
              {result.total >= 80
                ? t.audit.pulse.headlineStrong
                : result.total >= 60
                  ? t.audit.pulse.headlineSolid
                  : result.total >= 40
                    ? t.audit.pulse.headlineGaps
                    : t.audit.pulse.headlineCritical}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.audit.pulse.tierByline}
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 priorities */}
      <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.07] to-rose-500/[0.04] backdrop-blur-md p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
            {t.audit.pulse.topPriorities} {basics.businessName}
          </h3>
        </div>
        <ol className="space-y-4">
          {priorities.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center font-mono text-sm text-amber-300 font-semibold tabular-nums">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-amber-300/80" />
                    <span className="font-display text-lg text-foreground/95">
                      {p.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 ml-auto">
                      {p.score}/100
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1.5 leading-relaxed">
                    {p.insight}
                  </p>
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300/80 mr-2">
                      {t.audit.pulse.actionLabel}
                    </span>
                    {p.action}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Per-signal breakdown */}
      <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6 sm:p-8">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80 mb-5">
          {t.audit.pulse.breakdownTitle}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {result.signals.map((s) => (
            <SignalCard key={s.id} signal={s} />
          ))}
        </div>
      </div>

      {/* Cross-sell to deeper audit */}
      <div className="rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/[0.08] via-cyan-500/[0.04] to-transparent backdrop-blur-md p-6 sm:p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-300 mb-2">
          {t.audit.pulse.crossSellEyebrow}
        </div>
        <h3 className="font-display text-2xl sm:text-3xl mb-3">
          {t.audit.pulse.crossSellTitle}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-prose">
          {t.audit.pulse.crossSellDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate("/audit")}
            className="rounded-full font-semibold"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
              boxShadow: "0 0 24px -8px hsl(var(--primary) / 0.5)",
            }}
          >
            {t.audit.pulse.crossSellCta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/book-call")}
            className="rounded-full"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t.audit.pulse.talkHuman}
          </Button>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground/60 max-w-2xl mx-auto">
        {t.audit.pulse.footerNote}
      </p>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────

function SignalCard({ signal }: { signal: Signal }) {
  const Icon = signal.icon;
  const toneMap = {
    strong: {
      border: "border-emerald-400/30",
      bg: "bg-emerald-500/[0.05]",
      bar: "from-emerald-400 to-cyan-400",
      icon: "text-emerald-300",
    },
    medium: {
      border: "border-amber-400/30",
      bg: "bg-amber-500/[0.05]",
      bar: "from-amber-400 to-orange-400",
      icon: "text-amber-300",
    },
    weak: {
      border: "border-rose-400/30",
      bg: "bg-rose-500/[0.05]",
      bar: "from-rose-500 to-pink-500",
      icon: "text-rose-300",
    },
  }[signal.status];

  return (
    <div className={`rounded-xl border ${toneMap.border} ${toneMap.bg} p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${toneMap.icon}`} />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/85">
            {signal.label}
          </span>
        </div>
        <span className="font-mono text-xs tabular-nums text-foreground/95">
          {signal.score}<span className="text-muted-foreground/50">/100</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden mb-3">
        <div
          className={`h-full bg-gradient-to-r ${toneMap.bar} rounded-full transition-all duration-1000`}
          style={{ width: `${signal.score}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        {signal.insight}
      </p>
      <p className="text-xs text-foreground/85 leading-relaxed">
        <Check className="w-3 h-3 inline-block mr-1 text-foreground/60" />
        {signal.action}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground/80 mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}

function Question({
  n,
  text,
  hint,
  children,
}: {
  n: number;
  text: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-2.5">
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60 mt-1">
          {String(n).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <p className="text-sm sm:text-base text-foreground/95 leading-snug">
            {text}
          </p>
          {hint && (
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              {hint}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ml-7">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border/40 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
