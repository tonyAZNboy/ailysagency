import { useState } from 'react'
import { Link2, Twitter, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const btnClass =
    'inline-flex items-center justify-center h-11 w-11 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors'

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className={cn(btnClass, copied && 'text-cyan-400 border-cyan-500/40')}
        title={copied ? 'Copied!' : 'Copy link'}
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        title="Share on X"
        aria-label="Share on X"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      {copied && (
        <span className="text-xs text-cyan-400 animate-in fade-in">
          Copied!
        </span>
      )}
    </div>
  )
}
