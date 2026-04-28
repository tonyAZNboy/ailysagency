import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { LandingChatWidget } from '@/components/landing/LandingChatWidget'
import { NetworkBackground } from '@/components/backgrounds/NetworkBackground'
import { useLang } from '@/i18n/LangContext'
import { SUPPORTED_LANGS, type SupportedLang } from '@/i18n/index'
import { BlogPostPage } from '@/blog/components/BlogPostPage'

export default function BlogPost() {
  const { lang: urlLang } = useParams<{ lang?: string; slug?: string }>()
  const { setLang } = useLang()

  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang)
    }
  }, [urlLang, setLang])

  return (
    <div className="relative min-h-screen text-white">
      <NetworkBackground />
      <Navbar />
      <main className="relative z-10">
        <BlogPostPage />
      </main>
      <Footer />
      <LandingChatWidget />
    </div>
  )
}
