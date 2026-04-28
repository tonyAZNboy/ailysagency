import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogFAQItem } from '../types'

interface BlogFAQProps {
  items: BlogFAQItem[]
  heading?: string
}

export function BlogFAQ({ items, heading }: BlogFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    // Remove ANY existing FAQPage JSON-LD anywhere in the document (head or body)
    // before adding our own. Prevents "Duplicate field FAQPage" errors in Google
    // Search Console that come from any other source on the page.
    const isFaqPageSchema = (el: HTMLScriptElement): boolean => {
      try {
        const parsed = JSON.parse(el.textContent || '')
        if (parsed['@type'] === 'FAQPage') return true
        if (Array.isArray(parsed['@graph'])) {
          return parsed['@graph'].some((n: { '@type'?: string }) => n?.['@type'] === 'FAQPage')
        }
        return false
      } catch {
        return false
      }
    }
    document
      .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
      .forEach((el) => {
        if (isFaqPageSchema(el)) el.remove()
      })

    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(faqLd)
    script.dataset.blogJsonld = 'faq'
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        {heading || 'Frequently Asked Questions'}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <details
              key={index}
              open={isOpen}
              onToggle={(e) => {
                const open = (e.target as HTMLDetailsElement).open
                setOpenIndex(open ? index : openIndex === index ? null : openIndex)
              }}
              className={cn(
                'rounded-xl border transition-colors duration-200',
                isOpen
                  ? 'border-cyan-500/50 bg-cyan-500/5'
                  : 'border-white/10 bg-white/5',
              )}
            >
              <summary
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left list-none [&::-webkit-details-marker]:hidden min-h-[44px]"
              >
                <span className="font-medium text-white">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-cyan-400 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </summary>
              <p className="px-4 pb-4 text-white/60 leading-relaxed">
                {item.answer}
              </p>
            </details>
          )
        })}
      </div>
    </section>
  )
}
