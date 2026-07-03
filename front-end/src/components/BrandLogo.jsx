import logo from "../assets/ishub-logo.jpg";

export default function BrandLogo({ textClassName = "text-slate-900", compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="ISHub logo"
        className="h-10 w-10 rounded-full object-cover shadow-soft ring-2 ring-cyan-200/70"
      />
      {!compact && (
        <span className={`font-bold text-lg tracking-tight ${textClassName}`}>
          ISHub<span className="text-primary"> Bootcamp</span>
        </span>
      )}
    </div>
  );
}
