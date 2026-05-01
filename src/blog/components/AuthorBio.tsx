import { CheckCircle2 } from 'lucide-react'
import type { BlogAuthor } from '../types'

interface AuthorBioProps {
  author: BlogAuthor
  /** Translated "Verified by {{team}}" string */
  translatedVerifiedBy?: string
  /** Translated org description (replaces English bio) */
  translatedOrgDescription?: string
  /** Translated team name */
  translatedResearchTeam?: string
  /** Translated role label (replaces English author.role) */
  translatedRole?: string
  /** Translated author display name (replaces English author.name) */
  translatedName?: string
}

export function AuthorBio({ author, translatedVerifiedBy, translatedOrgDescription, translatedResearchTeam, translatedRole, translatedName }: AuthorBioProps) {
  const teamName = translatedResearchTeam || 'AiLys Research'
  const verifiedLabel = translatedVerifiedBy
    ? translatedVerifiedBy.replace('{{team}}', teamName)
    : `Verified by ${teamName}`
  const bio = translatedOrgDescription || author.bio

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-lg font-bold text-white">
          {author.avatarInitials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-semibold text-white">{translatedName || author.name}</h4>
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
              <CheckCircle2 className="h-3 w-3" />
              {verifiedLabel}
            </span>
          </div>
          <p className="text-sm text-white/50 mt-0.5">{translatedRole || author.role}</p>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">
            {bio}
          </p>
        </div>
      </div>
    </div>
  )
}
