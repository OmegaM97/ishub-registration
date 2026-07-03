import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'

export default function Navbar({ onApplyClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <a href="/" className="flex items-center gap-2.5 group">
          <BrandLogo />
        </a>

        {/* Right-side links */}
        <div className="flex items-center gap-5 sm:gap-8">
          <a
            href="/"
            className="hidden sm:block text-sm font-medium text-slate-600 hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="/admin/login"
            className="hidden sm:block text-sm font-medium text-slate-600 hover:text-primary transition-colors"
          >
            Admin
          </a>
          <button
            onClick={onApplyClick}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl2 shadow-soft hover:shadow-softHover transition-all duration-200 hover:-translate-y-0.5"
          >
            Apply Now
          </button>
        </div>
      </nav>
    </header>
  )
}
