import { ArrowRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

export default function Hero({ onApplyClick }) {
  const copyRef = useReveal();
  const illustrationRef = useReveal();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Gradient background with abstract geometric shapes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-primary-light/40 to-primary/20 blur-3xl -z-10" />
      <div className="absolute top-40 -left-32 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-primary/20 to-primary-dark/10 blur-3xl -z-10" />
      {/* subtle dot grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #93C5FD 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 70%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div ref={copyRef} className="reveal">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Applications open for Summer 2026
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight text-slate-900">
            Kickstart Your Tech Journey with{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              ISHub Summer Bootcamp
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Join our intensive 2-month Summer Bootcamp designed to help students
            gain practical experience in modern technology. Learn directly from
            experienced mentors, collaborate with passionate teammates, build
            real-world projects, and strengthen your technical skills through
            hands-on learning.
          </p>

          <p className="mt-4 text-base text-slate-500 leading-relaxed">
            Whether you're beginning your programming journey or looking to
            improve your existing knowledge, ISHub Summer Bootcamp provides a
            supportive environment where you can grow, learn, and prepare for
            future opportunities in the technology industry.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={onApplyClick}
              className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-3.5 rounded-xl2 shadow-soft hover:shadow-softHover transition-all duration-200 hover:-translate-y-0.5"
            >
              Apply Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Applications are open. Clicking "Apply Now" takes you directly to
            the registration form.
          </p>
        </div>

        {/* Right: illustration */}
        <div ref={illustrationRef} className="relative reveal">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative animate-floatSlow">
      <svg
        viewBox="0 0 560 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(37,99,235,0.18)]"
      >
        <defs>
          <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        {/* base platform */}
        <ellipse
          cx="280"
          cy="430"
          rx="210"
          ry="18"
          fill="#DBEAFE"
          opacity="0.6"
        />

        {/* laptop / student 1 */}
        <rect
          x="60"
          y="230"
          width="170"
          height="110"
          rx="16"
          fill="#FFFFFF"
          stroke="#DBEAFE"
          strokeWidth="2"
        />
        <rect
          x="76"
          y="246"
          width="138"
          height="78"
          rx="8"
          fill="url(#screenGrad)"
        />
        <rect
          x="88"
          y="258"
          width="60"
          height="8"
          rx="4"
          fill="#FFFFFF"
          opacity="0.85"
        />
        <rect
          x="88"
          y="272"
          width="90"
          height="6"
          rx="3"
          fill="#FFFFFF"
          opacity="0.6"
        />
        <rect
          x="88"
          y="284"
          width="70"
          height="6"
          rx="3"
          fill="#FFFFFF"
          opacity="0.6"
        />
        <circle cx="90" cy="358" r="26" fill="#1E40AF" opacity="0.9" />
        <circle cx="90" cy="346" r="12" fill="#FDE68A" />
        <rect
          x="66"
          y="362"
          width="48"
          height="30"
          rx="12"
          fill="#1E40AF"
          opacity="0.9"
        />

        {/* laptop / student 2 */}
        <rect
          x="330"
          y="200"
          width="170"
          height="110"
          rx="16"
          fill="#FFFFFF"
          stroke="#DBEAFE"
          strokeWidth="2"
        />
        <rect
          x="346"
          y="216"
          width="138"
          height="78"
          rx="8"
          fill="url(#cardGrad)"
        />
        <rect
          x="358"
          y="228"
          width="50"
          height="8"
          rx="4"
          fill="#FFFFFF"
          opacity="0.85"
        />
        <rect
          x="358"
          y="242"
          width="100"
          height="6"
          rx="3"
          fill="#FFFFFF"
          opacity="0.6"
        />
        <rect
          x="358"
          y="254"
          width="80"
          height="6"
          rx="3"
          fill="#FFFFFF"
          opacity="0.6"
        />
        <circle cx="460" cy="328" r="26" fill="#2563EB" opacity="0.9" />
        <circle cx="460" cy="316" r="12" fill="#FCA5A5" />
        <rect
          x="436"
          y="332"
          width="48"
          height="30"
          rx="12"
          fill="#2563EB"
          opacity="0.9"
        />

        {/* connecting network lines */}
        <path
          d="M 210 300 C 260 270, 300 270, 340 260"
          stroke="#93C5FD"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          fill="none"
        />
        <circle cx="275" cy="278" r="5" fill="#2563EB" />

        {/* cloud element */}
        <g transform="translate(230,90)">
          <path
            d="M20 40c-11 0-20-9-20-20 0-10 8-19 18-20 3-13 15-22 29-20 12 2 21 12 22 24 10 1 18 10 18 20 0 11-9 20-20 20H20z"
            fill="#EFF6FF"
            stroke="#BFDBFE"
            strokeWidth="1.5"
          />
        </g>

        {/* floating code / gear tokens */}
        <g transform="translate(150,60)">
          <rect
            width="56"
            height="56"
            rx="14"
            fill="url(#cardGrad)"
            opacity="0.95"
          />
          <text
            x="28"
            y="35"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="20"
            fill="white"
          >
            {"</>"}
          </text>
        </g>

        <g transform="translate(370,60)">
          <circle cx="24" cy="24" r="24" fill="#60A5FA" opacity="0.9" />
          <path
            d="M24 14a10 10 0 100 20 10 10 0 000-20zm0 4a1 1 0 011 1v1.1a5 5 0 011.7.7l.8-.8a1 1 0 111.4 1.4l-.8.8c.3.5.6 1.1.7 1.7H30a1 1 0 010 2h-1.1a5 5 0 01-.7 1.7l.8.8a1 1 0 11-1.4 1.4l-.8-.8a5 5 0 01-1.7.7V30a1 1 0 01-2 0v-1.1a5 5 0 01-1.7-.7l-.8.8a1 1 0 11-1.4-1.4l.8-.8a5 5 0 01-.7-1.7H18a1 1 0 010-2h1.1a5 5 0 01.7-1.7l-.8-.8a1 1 0 111.4-1.4l.8.8a5 5 0 011.7-.7V19a1 1 0 011-1z"
            fill="white"
          />
        </g>

        {/* server / networking rack for the Networking track */}
        <rect
          x="240"
          y="330"
          width="70"
          height="90"
          rx="12"
          fill="#FFFFFF"
          stroke="#DBEAFE"
          strokeWidth="2"
        />
        <rect x="252" y="342" width="46" height="10" rx="3" fill="#2563EB" />
        <rect x="252" y="358" width="46" height="10" rx="3" fill="#60A5FA" />
        <rect x="252" y="374" width="46" height="10" rx="3" fill="#2563EB" />
        <rect x="252" y="390" width="46" height="10" rx="3" fill="#60A5FA" />
        <circle cx="288" cy="347" r="2" fill="#BFDBFE" />
        <circle cx="288" cy="363" r="2" fill="#1E3A8A" />
      </svg>
    </div>
  );
}
