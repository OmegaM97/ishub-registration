import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Navbar({ onApplyClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 group flex-shrink-0">
            <BrandLogo />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-1 sm:justify-end">
            <a
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="/admin/login"
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              Admin
            </a>
          </div>

          <button
            onClick={onApplyClick}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl2 shadow-soft hover:shadow-softHover transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            Apply Now
          </button>
        </div>
      </nav>
    </header>
  );
}
