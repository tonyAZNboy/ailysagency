import { Link } from 'react-router-dom'
import { Shield, Sparkles, Calendar } from 'lucide-react'

type BlogCTAVariant = 'default' | 'pricing' | 'book'

interface BlogCTAProps {
  variant?: BlogCTAVariant
  heading?: string
  subtitle?: string
  button?: string
  href?: string
}

const VARIANTS: Record<BlogCTAVariant, { heading: string; subtitle: string; button: string; href: string; Icon: typeof Shield }> = {
  default: {
    heading: 'Ready to see your AI visibility?',
    subtitle: 'Want to know where your business stands inside AI search? Run the free 24-hour AI Visibility audit.',
    button: 'Run Free Audit',
    href: '/audit',
    Icon: Shield,
  },
  pricing: {
    heading: 'Plans built for local businesses',
    subtitle: 'See plans built for local businesses, from $300/mo CAD.',
    button: 'See Pricing',
    href: '/#pricing-builder',
    Icon: Sparkles,
  },
  book: {
    heading: 'Talk to a real strategist',
    subtitle: 'Want a 60-minute strategy call, no pitch, strategy doc sent regardless?',
    button: 'Book a Call',
    href: '/book-call',
    Icon: Calendar,
  },
}

export function BlogCTA({ variant = 'default', heading, subtitle, button, href }: BlogCTAProps) {
  const v = VARIANTS[variant]
  const Icon = v.Icon
  const finalHeading = heading || v.heading
  const finalSubtitle = subtitle || v.subtitle
  const finalButton = button || v.button
  const finalHref = href || v.href

  return (
    <div className="my-10 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-cyan-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          {finalHeading}
        </h3>
        <p className="text-white/60 max-w-md">
          {finalSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            to={finalHref}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition-colors"
          >
            {finalButton} &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
