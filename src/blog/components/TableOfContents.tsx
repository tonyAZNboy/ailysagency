import { useEffect, useState } from 'react'
import { List, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogHeading } from '../types'

interface TableOfContentsProps {
  headings: BlogHeading[]
  /** Translated heading for "Table of Contents" */
  translatedHeading?: string
  /** Translated aria-label for the mobile toggle button */
  translatedToggleLabel?: string
}

export function TableOfContents({ headings, translatedHeading, translatedToggleLabel }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    )

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const tocList = (
    <nav className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
        {translatedHeading || 'Table of Contents'}
      </p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={() => setIsOpen(false)}
          className={cn(
            'block rounded-lg px-3 py-2 text-sm transition-colors min-h-[44px] flex items-center',
            activeId === heading.id
              ? 'bg-cyan-500/10 text-cyan-400 font-medium'
              : 'text-white/50 hover:text-white/80 hover:bg-white/5',
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-4">
        {tocList}
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 lg:hidden flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
        aria-label={translatedToggleLabel || 'Toggle table of contents'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
      </button>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-20 right-4 w-72 rounded-xl border border-white/10 bg-[#0a0e1a] p-4 shadow-2xl">
            {tocList}
          </div>
        </div>
      )}
    </>
  )
}
