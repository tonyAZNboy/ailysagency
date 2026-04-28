/**
 * Shared interactive blog components for richer article content.
 * Used inside blog post Content() functions.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Lightbulb,
  Info,
  Shield,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Zap,
  TrendingUp,
} from 'lucide-react'

// Callout Box
// Types: warning, tip, info, danger

const calloutConfig = {
  warning: {
    icon: AlertTriangle,
    border: 'border-l-amber-400',
    bg: 'bg-amber-500/5',
    iconColor: 'text-amber-400',
    label: 'Warning',
  },
  tip: {
    icon: Lightbulb,
    border: 'border-l-cyan-400',
    bg: 'bg-cyan-500/5',
    iconColor: 'text-cyan-400',
    label: 'Pro Tip',
  },
  info: {
    icon: Info,
    border: 'border-l-blue-400',
    bg: 'bg-blue-500/5',
    iconColor: 'text-blue-400',
    label: 'Did You Know?',
  },
  danger: {
    icon: Shield,
    border: 'border-l-red-400',
    bg: 'bg-red-500/5',
    iconColor: 'text-red-400',
    label: 'Critical',
  },
} as const

interface CalloutBoxProps {
  type: keyof typeof calloutConfig
  title?: string
  /** Translated label override for the callout type */
  translatedLabel?: string
  children: React.ReactNode
}

export function CalloutBox({ type, title, translatedLabel, children }: CalloutBoxProps) {
  const cfg = calloutConfig[type]
  const Icon = cfg.icon
  return (
    <div
      className={`my-8 rounded-xl border-l-4 ${cfg.border} ${cfg.bg} p-5 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <Icon className={`h-5 w-5 ${cfg.iconColor} shrink-0`} />
        <span className={`text-sm font-bold uppercase tracking-wider ${cfg.iconColor}`}>
          {title || translatedLabel || cfg.label}
        </span>
      </div>
      <div className="text-white/75 text-[0.95rem] leading-relaxed [&>p]:mt-2 [&>p:first-child]:mt-0 [&>ul]:mt-2 [&>ul]:pl-5 [&>ul]:list-disc [&>li]:mt-1">
        {children}
      </div>
    </div>
  )
}

// Inline CTA (mid-article)

interface InlineCTAProps {
  text?: string
  buttonText?: string
  to?: string
  variant?: 'audit' | 'pricing' | 'book'
}

const ctaVariants = {
  audit: {
    icon: Zap,
    default: 'Curious where you stand inside AI search? Run the free 24-hour AI Visibility audit.',
    button: 'Run Free Audit',
    to: '/audit',
    gradient: 'from-cyan-500/15 to-blue-500/10',
  },
  pricing: {
    icon: Shield,
    default: 'See plans built for local businesses, from $300/mo CAD.',
    button: 'See Pricing',
    to: '/#pricing-builder',
    gradient: 'from-cyan-500/15 to-magenta-500/10',
  },
  book: {
    icon: Shield,
    default: 'Want a 60-minute strategy call, no pitch, strategy doc sent regardless?',
    button: 'Book a Call',
    to: '/book-call',
    gradient: 'from-magenta-500/15 to-purple-500/10',
  },
}

export function InlineCTA({
  text,
  buttonText,
  to,
  variant = 'audit',
}: InlineCTAProps) {
  const cfg = ctaVariants[variant]
  const Icon = cfg.icon
  return (
    <div
      className={`my-10 rounded-2xl bg-gradient-to-r ${cfg.gradient} border border-white/10 p-6 flex flex-col sm:flex-row items-center gap-4`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>
        <p className="text-white/80 text-[0.95rem] font-medium">
          {text || cfg.default}
        </p>
      </div>
      <Link
        to={to || cfg.to}
        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-cyan-400 transition-colors shrink-0 whitespace-nowrap"
      >
        {buttonText || cfg.button}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

// Stat Highlight

interface StatHighlightProps {
  stats: Array<{ value: string; label: string }>
}

export function StatHighlight({ stats }: StatHighlightProps) {
  return (
    <div className="my-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center"
        >
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-1">
            {s.value}
          </div>
          <div className="text-xs sm:text-sm text-white/50">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

// Key Takeaway Box

interface KeyTakeawayProps {
  points: string[]
  /** Translated heading */
  translatedLabel?: string
}

export function KeyTakeaway({ points, translatedLabel }: KeyTakeawayProps) {
  return (
    <div className="my-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="h-5 w-5 text-cyan-400" />
        <span className="text-sm font-bold uppercase tracking-wider text-cyan-400">
          {translatedLabel || 'Key Takeaways'}
        </span>
      </div>
      <ul className="space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-[0.95rem] text-white/75">
            <span className="text-cyan-400 font-bold shrink-0 mt-0.5">
              {i + 1}.
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Expandable Section

interface ExpandableSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function ExpandableSection({
  title,
  children,
  defaultOpen = false,
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="my-6 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="font-semibold text-white/90">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-4 text-[0.95rem] text-white/70 leading-relaxed [&>p]:mt-2 [&>p:first-child]:mt-0 [&>ul]:mt-2 [&>ul]:pl-5 [&>ul]:list-disc [&>li]:mt-1">
          {children}
        </div>
      </div>
    </div>
  )
}

// Quick Quiz

interface QuickQuizProps {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  /** Translated heading */
  translatedLabel?: string
  /** Translated "Correct!" */
  translatedCorrect?: string
  /** Translated "Not quite." */
  translatedNotQuite?: string
}

export function QuickQuiz({
  question,
  options,
  correctIndex,
  explanation,
  translatedLabel,
  translatedCorrect,
  translatedNotQuite,
}: QuickQuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const correct = selected === correctIndex

  return (
    <div className="my-8 rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-purple-400" />
        <span className="text-sm font-bold uppercase tracking-wider text-purple-400">
          {translatedLabel || 'Quick Quiz'}
        </span>
      </div>
      <p className="text-white/90 font-medium mb-4">{question}</p>
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let borderClass = 'border-white/10 hover:border-white/20'
          if (answered) {
            if (i === correctIndex) borderClass = 'border-green-500/50 bg-green-500/10'
            else if (i === selected) borderClass = 'border-red-500/50 bg-red-500/10'
            else borderClass = 'border-white/5 opacity-50'
          }
          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full text-left rounded-lg border ${borderClass} p-3 text-sm text-white/80 transition-all ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span className="font-medium text-white/50 mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div
          className={`mt-4 rounded-lg p-3 text-sm ${correct ? 'bg-green-500/10 text-green-300' : 'bg-amber-500/10 text-amber-300'}`}
        >
          <span className="font-bold">{correct ? (translatedCorrect || 'Correct!') : (translatedNotQuite || 'Not quite.')}</span>{' '}
          {explanation}
        </div>
      )}
    </div>
  )
}

// Internal Link Card (styled preview link to another article)

interface InternalLinkProps {
  to: string
  title: string
  description?: string
}

export function InternalLink({ to, title, description }: InternalLinkProps) {
  return (
    <Link
      to={to}
      className="my-6 flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group no-underline"
    >
      <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
        <ArrowRight className="h-5 w-5 text-cyan-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-white/90 group-hover:text-cyan-400 transition-colors truncate">
          {title}
        </div>
        {description && (
          <div className="text-xs text-white/40 mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
    </Link>
  )
}

// Section Divider

export function SectionDivider() {
  return <span className="section-divider" aria-hidden="true" />
}
