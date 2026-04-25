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

const VERTICALS: { id: Vertical; label: string }[] = [
  { id: "restaurant", label: "Restaurant" },
  { id: "dentist", label: "Dental clinic" },
  { id: "lawyer", label: "Law firm" },
  { id: "salon", label: "Salon / spa" },
  { id: "contractor", label: "Contractor / trade" },
  { id: "clinic", label: "Medical clinic" },
  { id: "real-estate", label: "Real estate" },
  { id: "hotel", label: "Hotel / hospitality" },
  { id: "other", label: "Something else" },
];

// ─── Scoring engine ─────────────────────────────────────────

function score(answers: Answers): { total: number; signals: Signal[] } {
  const signals: Signal[] = [];

  // Claim & verify (weight: 12)
  const claimScore =
    answers.claimed === "yes" ? 100 : answers.claimed === "unsure" ? 30 : 0;
  signals.push({
    id: "claim",
    label: "Claim & verify",
    icon: ShieldCheck,
    score: claimScore,
    weight: 12,
    status: claimScore >= 80 ? "strong" : claimScore >= 40 ? "medium" : "weak",
    insight:
      claimScore >= 80
        ? "Listing claimed. Google trusts you to update your own data."
        : claimScore >= 40
          ? "Likely claimed but verify status in Google Business Profile dashboard."
          : "Unclaimed listings rank below claimed ones. This is move zero.",
    action:
      claimScore >= 80
        ? "Confirm verification badge is visible."
        : "Claim at business.google.com today. 5-minute task.",
  });

  // Posts in last 30 days (weight: 10)
  const postScore =
    answers.posts30d === "yes" ? 100 : answers.posts30d === "unsure" ? 30 : 0;
  signals.push({
    id: "posts",
    label: "Recent activity",
    icon: Activity,
    score: postScore,
    weight: 10,
    status: postScore >= 80 ? "strong" : postScore >= 40 ? "medium" : "weak",
    insight:
      postScore >= 80
        ? "Active posts signal a live business. Google ranks active listings higher."
        : "Listings without recent posts get downweighted in local pack.",
    action:
      postScore >= 80
        ? "Maintain weekly cadence. Even short updates count."
        : "Post one offer or update per week. Even a sentence works.",
  });

  // Review count (weight: 13)
  const rcScore = Math.min(100, (answers.reviewCount / 100) * 100);
  signals.push({
    id: "review-count",
    label: "Review count",
    icon: Star,
    score: rcScore,
    weight: 13,
    status: rcScore >= 70 ? "strong" : rcScore >= 30 ? "medium" : "weak",
    insight:
      rcScore >= 70
        ? `${answers.reviewCount}+ reviews builds Google's trust signal. You're past the threshold.`
        : rcScore >= 30
          ? "Decent base. Push to 100+ to enter strong-trust territory."
          : "Under 30 reviews looks new even if you've been operating for years.",
    action:
      rcScore >= 70
        ? "Maintain steady inflow. Don't let velocity drop."
        : "Aim for 4-6 new reviews per month. Use Reviuzy or AiLys's review engine.",
  });

  // Recent reviews velocity (weight: 15) — most important AEO signal
  const velScore = Math.min(100, (answers.recentReviews / 15) * 100);
  signals.push({
    id: "review-velocity",
    label: "Review velocity",
    icon: Activity,
    score: velScore,
    weight: 15,
    status: velScore >= 70 ? "strong" : velScore >= 30 ? "medium" : "weak",
    insight:
      velScore >= 70
        ? `${answers.recentReviews} reviews in 90 days is excellent. Google interprets as 'currently busy'.`
        : velScore >= 30
          ? "Velocity is OK. AI engines weight fresh reviews 1.9× more than older ones."
          : "Low velocity tells Google you might be inactive. Highest-leverage fix on this list.",
    action:
      velScore >= 70
        ? "Maintain monthly cadence above 4 reviews."
        : "Run a monthly review contest. Bumps velocity 3-5×.",
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
    label: "Photo freshness",
    icon: Camera,
    score: photoScore,
    weight: 10,
    status: photoScore >= 80 ? "strong" : photoScore >= 40 ? "medium" : "weak",
    insight:
      photoScore >= 80
        ? "Fresh photos with EXIF metadata feed E-E-A-T 'experience' signal."
        : "Stale or stock photos hurt visibility. AI engines deprioritize them.",
    action:
      photoScore >= 80
        ? "Add 1-2 new photos per month."
        : "Upload 5 new original photos this week. Phone-quality is fine, EXIF matters.",
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
    label: "Category accuracy",
    icon: Tag,
    score: catScore,
    weight: 10,
    status: catScore >= 80 ? "strong" : catScore >= 40 ? "medium" : "weak",
    insight:
      catScore >= 80
        ? "Specific primary category drives 'near me' query matching."
        : "Generic categories ('Restaurant' vs 'Sushi restaurant') lose 40% of voice queries.",
    action:
      catScore >= 80
        ? "Review secondary categories quarterly."
        : "Switch to most specific primary category that fits. Add 3-5 secondary categories.",
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
    label: "Attributes",
    icon: Sparkles,
    score: attrScore,
    weight: 8,
    status: attrScore >= 80 ? "strong" : attrScore >= 40 ? "medium" : "weak",
    insight:
      attrScore >= 80
        ? "Attributes power 'wheelchair access', 'kid-friendly', 'wifi' filtered queries."
        : "Empty attributes mean you don't show up for filtered searches.",
    action:
      attrScore >= 80
        ? "Audit attributes quarterly as Google adds new ones."
        : "Fill every applicable attribute. 20-minute task, recurring revenue impact.",
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
    label: "Review responses",
    icon: MessageSquare,
    score: respScore,
    weight: 12,
    status: respScore >= 80 ? "strong" : respScore >= 40 ? "medium" : "weak",
    insight:
      respScore >= 80
        ? "Active responses signal engagement. Google rewards it in local pack ranking."
        : "Unresponded reviews hurt trust. Especially negative ones with no reply.",
    action:
      respScore >= 80
        ? "Maintain. Always respond to negative reviews within 24 hours."
        : "Respond to all reviews from the last 90 days this week. Use Reviuzy's AI replies if volume is heavy.",
  });

  // Q&A activity (weight: 5)
  const qaScore = answers.qa === "yes" ? 100 : 0;
  signals.push({
    id: "qa",
    label: "Q&A active",
    icon: MessageSquare,
    score: qaScore,
    weight: 5,
    status: qaScore >= 80 ? "strong" : "weak",
    insight:
      qaScore >= 80
        ? "Q&A entries get crawled and feed AI answers."
        : "Empty Q&A is a wasted SEO surface. Competitors might post questions you should answer first.",
    action:
      qaScore >= 80
        ? "Audit Q&A monthly for new questions."
        : "Seed 5 common questions yourself and answer them this week.",
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
    label: "NAP consistency",
    icon: MapPin,
    score: napScore,
    weight: 5,
    status: napScore >= 80 ? "strong" : napScore >= 40 ? "medium" : "weak",
    insight:
      napScore >= 80
        ? "Consistent Name/Address/Phone across the web is the entity foundation."
        : "Inconsistent NAP cuts citation odds in half. AI engines treat you as multiple entities.",
    action:
      napScore >= 80
        ? "Audit annually. Use a citation tool like BrightLocal or Whitespark."
        : "Run a NAP audit on 20 high-DA citation sources. Fix mismatches this month.",
  });

  // Weighted total
  const totalWeight = signals.reduce((s, sig) => s + sig.weight, 0);
  const total = Math.round(
    signals.reduce((s, sig) => s + sig.score * sig.weight, 0) / totalWeight,
  );

  return { total, signals };
}

// ─── Main component ──────────────────────────────────────────

type Phase = "basics" | "questions" | "analyzing" | "results";

const STORAGE_KEY = "ailys_gbp_pulse_last_run";

export function GbpPulseEngine() {
  const navigate = useNavigate();
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

  const result = useMemo(() => score(answers), [answers]);

  // ── Phase 1: Basics ──
  if (phase === "basics") {
    return (
      <form
        onSubmit={handleBasicsSubmit}
        className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90 mb-3">
          Step 1 of 3 · 90 seconds total
        </div>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">
          About your business.
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          We will calculate your GBP Pulse score from a quick self-assessment.
          No login, no email, instant result.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <Field label="Business name">
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
          <Field label="City">
            <Input
              value={basics.city}
              onChange={(e) => setBasics({ ...basics, city: e.target.value })}
              placeholder="Montréal"
              required
              className="bg-background/50 border-border/50"
            />
          </Field>
        </div>

        <Field label="Industry vertical">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {VERTICALS.map((v) => (
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
          Start the assessment
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
            Step 2 of 3 · 8 questions
          </div>
          <button
            onClick={() => setPhase("basics")}
            className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
        </div>

        <div className="space-y-7">
          <Question
            n={1}
            text="Is your Google Business Profile claimed and verified?"
          >
            <Choice
              active={answers.claimed === "yes"}
              onClick={() => setAnswers({ ...answers, claimed: "yes" })}
            >
              Yes, verified
            </Choice>
            <Choice
              active={answers.claimed === "no"}
              onClick={() => setAnswers({ ...answers, claimed: "no" })}
            >
              No
            </Choice>
            <Choice
              active={answers.claimed === "unsure"}
              onClick={() => setAnswers({ ...answers, claimed: "unsure" })}
            >
              Not sure
            </Choice>
          </Question>

          <Question n={2} text="Have you posted to GBP in the last 30 days?">
            <Choice
              active={answers.posts30d === "yes"}
              onClick={() => setAnswers({ ...answers, posts30d: "yes" })}
            >
              Yes
            </Choice>
            <Choice
              active={answers.posts30d === "no"}
              onClick={() => setAnswers({ ...answers, posts30d: "no" })}
            >
              No
            </Choice>
            <Choice
              active={answers.posts30d === "unsure"}
              onClick={() => setAnswers({ ...answers, posts30d: "unsure" })}
            >
              Not sure
            </Choice>
          </Question>

          <Question
            n={3}
            text={`How many Google reviews do you have in total? (${answers.reviewCount})`}
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
            text={`How many of those landed in the last 90 days? (${answers.recentReviews})`}
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
            text="Have you uploaded photos in the last 60 days?"
          >
            <Choice
              active={answers.photos60d === "yes"}
              onClick={() => setAnswers({ ...answers, photos60d: "yes" })}
            >
              Yes, several
            </Choice>
            <Choice
              active={answers.photos60d === "some"}
              onClick={() => setAnswers({ ...answers, photos60d: "some" })}
            >
              One or two
            </Choice>
            <Choice
              active={answers.photos60d === "no"}
              onClick={() => setAnswers({ ...answers, photos60d: "no" })}
            >
              No
            </Choice>
          </Question>

          <Question
            n={6}
            text="Is your primary GBP category specific to your service?"
            hint='e.g. "Sushi restaurant" not just "Restaurant"'
          >
            <Choice
              active={answers.categorySpecific === "yes"}
              onClick={() =>
                setAnswers({ ...answers, categorySpecific: "yes" })
              }
            >
              Yes
            </Choice>
            <Choice
              active={answers.categorySpecific === "no"}
              onClick={() =>
                setAnswers({ ...answers, categorySpecific: "no" })
              }
            >
              No, generic
            </Choice>
            <Choice
              active={answers.categorySpecific === "unsure"}
              onClick={() =>
                setAnswers({ ...answers, categorySpecific: "unsure" })
              }
            >
              Not sure
            </Choice>
          </Question>

          <Question
            n={7}
            text="Are your business attributes filled in?"
            hint="Wheelchair access, payment methods, dietary, etc."
          >
            <Choice
              active={answers.attributesFilled === "all"}
              onClick={() =>
                setAnswers({ ...answers, attributesFilled: "all" })
              }
            >
              All filled
            </Choice>
            <Choice
              active={answers.attributesFilled === "some"}
              onClick={() =>
                setAnswers({ ...answers, attributesFilled: "some" })
              }
            >
              Some
            </Choice>
            <Choice
              active={answers.attributesFilled === "none"}
              onClick={() =>
                setAnswers({ ...answers, attributesFilled: "none" })
              }
            >
              None or few
            </Choice>
          </Question>

          <Question n={8} text="How often do you respond to reviews?">
            <Choice
              active={answers.reviewResponse === "always"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "always" })
              }
            >
              Always
            </Choice>
            <Choice
              active={answers.reviewResponse === "sometimes"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "sometimes" })
              }
            >
              Sometimes
            </Choice>
            <Choice
              active={answers.reviewResponse === "rarely"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "rarely" })
              }
            >
              Rarely
            </Choice>
            <Choice
              active={answers.reviewResponse === "never"}
              onClick={() =>
                setAnswers({ ...answers, reviewResponse: "never" })
              }
            >
              Never
            </Choice>
          </Question>

          <Question n={9} text="Do you use the GBP Q&A section?">
            <Choice
              active={answers.qa === "yes"}
              onClick={() => setAnswers({ ...answers, qa: "yes" })}
            >
              Yes
            </Choice>
            <Choice
              active={answers.qa === "no"}
              onClick={() => setAnswers({ ...answers, qa: "no" })}
            >
              No
            </Choice>
          </Question>

          <Question
            n={10}
            text="Is your Name/Address/Phone consistent across the web?"
            hint="Yelp, BBB, Yellowpages, Apple Maps, all match exactly"
          >
            <Choice
              active={answers.napConsistent === "yes"}
              onClick={() =>
                setAnswers({ ...answers, napConsistent: "yes" })
              }
            >
              Yes
            </Choice>
            <Choice
              active={answers.napConsistent === "no"}
              onClick={() =>
                setAnswers({ ...answers, napConsistent: "no" })
              }
            >
              No
            </Choice>
            <Choice
              active={answers.napConsistent === "unsure"}
              onClick={() =>
                setAnswers({ ...answers, napConsistent: "unsure" })
              }
            >
              Not sure
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
          Calculate my Pulse score
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
        {!allAnswered && (
          <p className="mt-3 text-xs text-center text-muted-foreground/70">
            Answer all questions to unlock your score.
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
        <h3 className="font-display text-2xl mb-2">Analyzing 10 signals...</h3>
        <p className="text-sm text-muted-foreground">
          Cross-referencing your answers against the GBP signals AI engines
          care about most.
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
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    const target = result.total;
    let raf = 0;
    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimatedScore(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [result.total]);

  const tier =
    result.total >= 80
      ? { label: "Strong", tone: "from-emerald-400 to-cyan-400", text: "text-emerald-300" }
      : result.total >= 60
        ? { label: "Solid foundation", tone: "from-cyan-400 to-violet-400", text: "text-cyan-300" }
        : result.total >= 40
          ? { label: "Needs work", tone: "from-amber-400 to-orange-400", text: "text-amber-300" }
          : { label: "Critical gaps", tone: "from-rose-500 to-pink-500", text: "text-rose-300" };

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
            GBP Pulse score
          </div>
          <button
            onClick={onRestart}
            className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Run again
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-6">
          For{" "}
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
                ? "Your GBP is doing real work."
                : result.total >= 60
                  ? "You have a solid foundation. Three moves will sharpen it."
                  : result.total >= 40
                    ? "Real gaps. Most are 1-week fixes."
                    : "Significant work to do. The good news: most fixes are free."}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Score weights review velocity (15%), review count (13%), claim
              status (12%), and review response rate (12%) most heavily. These
              are the signals AI engines weight when deciding to cite you.
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 priorities */}
      <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.07] to-rose-500/[0.04] backdrop-blur-md p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
            Top 3 priorities for {basics.businessName}
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
                      Action
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
          Full 10-signal breakdown
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
          Want to go deeper than GBP?
        </div>
        <h3 className="font-display text-2xl sm:text-3xl mb-3">
          Run the full AI Visibility Audit.
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-prose">
          The Pulse covers Google Business Profile. The full audit checks
          AEO, GEO, and E-E-A-T across ChatGPT, Perplexity, Claude, Gemini,
          Google AIO, and Bing Copilot. 24-hour turnaround. Free.
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
            Run AI Visibility Audit
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/book-call")}
            className="rounded-full"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Talk to a human
          </Button>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground/60 max-w-2xl mx-auto">
        Your Pulse score is saved locally so you can revisit it. We do not store
        your answers on our servers.
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
