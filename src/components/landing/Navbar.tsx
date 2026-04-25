import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiLysLogo } from "@/components/brand/AiLysLogo";
import { MagneticWrapper } from "@/components/animation";
import { LanguageSelector } from "@/components/landing/LanguageSelector";
import { useLang } from "@/i18n/LangContext";

export function Navbar() {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuScrollRef = useRef<HTMLDivElement>(null);

  const blogHref = lang === 'en' ? '/blog' : `/${lang}/blog`;
  const navLinks = [
    { label: t.nav.features, href: "#services" },
    { label: t.nav.howItWorks, href: "#process" },
    { label: t.nav.pricing, href: "#services" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.blog, href: blogHref },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When mobile menu opens: if content overflows, enable scrolling and scroll to show last item (language selector)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const el = mobileMenuScrollRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      if (el.scrollHeight > el.clientHeight) {
        el.scrollTo({ top: el.scrollHeight - el.clientHeight, behavior: 'smooth' });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [mobileMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileMenuOpen]);

  const handleScrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300" style={{
        paddingTop: scrolled ? '0.5rem' : '1rem',
        paddingBottom: scrolled ? '0.5rem' : '1rem'
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="liquid-glass-navbar transition-all duration-300 px-4 py-2" style={{
            boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.25)' : '0 4px 16px rgba(0, 0, 0, 0.15)',
            borderBottom: '1px solid rgba(0, 243, 255, 0.1)'
          }}>
            <div className="flex items-center justify-between">
              {/* Logo - scrolls to top */}
              <button
                onClick={() => {
                  if (window.location.pathname !== '/') {
                    navigate('/');
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
                aria-label="Go to home">

                <AiLysLogo variant="full" size="md" className="transition-transform duration-300 hover:scale-[1.03]" />
              </button>

              {/* Desktop Navigation */}
              <div className="flex items-center gap-4 lg:gap-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <button key={link.label} onClick={() => handleScrollTo(link.href)} className={`relative text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left" style={{
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)'
                      }} />
                    </button>);

                })}
              </div>

              {/* Desktop CTA */}
              <div className="flex items-center gap-2 lg:gap-3">
                <LanguageSelector />
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth/login')} className="hover:bg-primary/10 text-xs lg:text-sm px-2 lg:px-4">
                  {t.nav.login}
                </Button>
                <MagneticWrapper strength={0.1}>
                  <Button size="sm" onClick={() => navigate('/auth/signup')} className="rounded-full text-xs lg:text-sm px-3 lg:px-4">
                    {t.nav.startTrial}
                  </Button>
                </MagneticWrapper>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - icon + menu toggle only */}
      <div className="md:hidden fixed top-0 left-0 z-50" ref={menuRef}>
        {/* Compact top-left bar: icon + menu toggle */}
        <div className="flex items-center gap-0 p-2 px-[2px] py-[2px]">
          <button
            onClick={() => {
              if (window.location.pathname !== '/') navigate('/');else
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center transition-all duration-300"
            aria-label="Go to home">

            <AiLysLogo variant="wordmark" size="sm" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center transition-all duration-300"
            aria-label="Toggle menu">

            <div className="relative w-5 h-5">
              <Menu className={`w-5 h-5 absolute text-foreground transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <X className={`w-5 h-5 absolute text-foreground transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
            </div>
          </button>
        </div>

        {/* Compact dropdown menu - 50% width, liquid glass, scrollable when content overflows */}
        <div
          ref={mobileMenuScrollRef}
          className={`absolute top-full left-2 transition-all duration-300 ease-out rounded-xl ${mobileMenuOpen ? 'opacity-100 max-h-[80vh] overflow-y-auto overflow-x-hidden' : 'opacity-0 max-h-0 overflow-hidden pointer-events-none'}`}
          style={{
            width: '50%',
            minWidth: '180px',
            background: 'rgba(0, 20, 25, 0.75)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(0, 243, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 243, 255, 0.08)'
          }}>

          <div className="px-2 py-2 space-y-0">
            {navLinks.map((link, index) =>
            <button
              key={link.label}
              onClick={() => handleScrollTo(link.href)}
              className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-200"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                transition: `opacity 0.2s ease-out ${index * 40}ms, transform 0.2s ease-out ${index * 40}ms`
              }}>

                {link.label}
              </button>
            )}
            <div className="border-t border-primary/15 mt-1.5 pt-1.5 space-y-0.5">
              <button
                onClick={() => {setMobileMenuOpen(false);navigate('/auth/login');}}
                className="w-full text-center py-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-colors rounded-md">
                {t.nav.login}
              </button>
              <button
                onClick={() => {setMobileMenuOpen(false);navigate('/auth/signup');}}
                className="w-full py-2 text-xs font-bold text-primary-foreground rounded-md transition-colors"
                style={{
                  background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(185 100% 40%))'
                }}>
                {t.nav.startTrial}
              </button>
              <div className="flex justify-center pt-0.5">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);

}