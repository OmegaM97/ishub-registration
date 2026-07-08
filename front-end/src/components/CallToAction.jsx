import { ArrowRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

export default function CallToAction({ onApplyClick }) {
  const ref = useReveal();

  return (
    <section className="py-24 lg:py-28 px-6">
      <div
        ref={ref}
        className="reveal relative max-w-6xl mx-auto rounded-xl2 overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-blue-900 px-8 py-16 sm:px-16 sm:py-20 text-center shadow-softHover"
      >
        {/* decorative shapes */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-primary-light/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white tracking-tight">
            Ready to Build Your Future?
          </h2>
          <p className="mt-5 text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Registration for the ISHub Summer Bootcamp is currently closed. New
            applications are not being accepted at the moment, but we will share
            updates soon for future opportunities.
          </p>
          <button
            onClick={onApplyClick}
            className="group mt-9 inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl2 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            aria-label="Apply Now - applications closed"
            title="Applications are closed"
          >
            Apply Now
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
