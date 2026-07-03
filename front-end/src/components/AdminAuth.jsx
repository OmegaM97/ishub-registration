import { useState } from "react";
import { ArrowLeft, Lock, Mail, ShieldCheck } from "lucide-react";
import logo from "../assets/ishub-logo.jpg";

export default function AdminAuth({ onBackHome }) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("success");
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(
        "https://ishub-registration-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        window.localStorage.setItem("ishub_auth_token", data.access_token);
        window.location.href = "/admin/dashboard";
      } else {
        setMessage(
          data.detail ||
            data.message ||
            "Login failed. Please check your credentials.",
        );
        setMessageType("error");
      }
    } catch (error) {
      setMessage(`Login could not be completed: ${error}`);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back Home
        </button>

        <section className="grid lg:grid-cols-[0.9fr_1.1fr] bg-white border border-slate-200 rounded-xl2 shadow-soft overflow-hidden">
          <div className="bg-slate-900 px-6 py-10 sm:px-10 lg:py-14 text-white">
            <img
              src={logo}
              alt="ISHub logo"
              className="h-16 w-16 rounded-full object-cover shadow-softHover ring-4 ring-cyan-200/30"
            />
            <p className="mt-8 text-sm font-semibold text-blue-200 uppercase tracking-wide">
              Admin Access
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Manage ISHub Bootcamp Applications
            </h1>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Sign in to review student registrations, manage bootcamp tracks,
              and keep application information organized.
            </p>

            <div className="mt-10 space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-light" />
                Admin-only login
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-light" />
                Ready to connect to your backend API
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-light" />
                Clean form validation for required fields
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Admin Login
            </h2>
            <p className="mt-3 text-slate-600">
              Access the admin side with your email and password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <AuthField
                label="Username"
                name="username"
                type="text"
                icon={Mail}
                autoComplete="username"
                required
              />

              <AuthField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                autoComplete="current-password"
                minLength="8"
                required
              />

              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(event) => setShowPassword(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                Show password
              </label>

              {message && (
                <div
                  className={`rounded-xl2 border px-4 py-3 text-sm font-medium ${
                    messageType === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-rose-200 bg-rose-50 text-rose-800"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl2 px-7 py-3.5 font-semibold shadow-soft transition-all duration-200 hover:-translate-y-0.5 ${
                  isSubmitting
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark text-white"
                }`}
              >
                {isSubmitting ? "Logging in..." : "Login"}
                <ShieldCheck size={18} />
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

function AuthField({ label, name, type = "text", icon: Icon, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          id={name}
          name={name}
          type={type}
          className={`w-full rounded-xl2 border border-slate-200 bg-white py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100 ${
            Icon ? "pl-11 pr-4" : "px-4"
          }`}
          {...props}
        />
      </div>
    </div>
  );
}
