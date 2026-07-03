import { useState } from "react";
import { ArrowLeft, Clock, Send, Sparkles } from "lucide-react";
import logo from "../assets/ishub-logo.jpg";

const trackOptions = [
  { label: "Artificial intelligence", value: "AI" },
  { label: "Frontend Development", value: "Frontend" },
  { label: "Backend Development", value: "Backend" },
  { label: "Mobile Development", value: "Mobile" },
];

const experienceOptions = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
];

const currentYearOptions = [
  { label: "Freshman", value: "freshman" },
  { label: "Sophomore", value: "sophomore" },
  { label: "Junior", value: "junior" },
  { label: "Senior", value: "senior" },
];

const commitmentOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  { label: "Not sure yet", value: "No" },
];

export default function RegistrationForm({ onBackHome }) {
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (formData) => {
    const validationErrors = {};
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const telegram = String(formData.get("telegram") || "").trim();
    const university = String(formData.get("university") || "").trim();
    const currentYear = formData.get("currentYear");
    const department = String(formData.get("department") || "").trim();
    const preferredTrack = formData.get("preferredTrack");
    const priorExperience = formData.get("priorExperience");
    const commitment = formData.get("commitment");
    const motivation = String(formData.get("motivation") || "").trim();

    if (!fullName) {
      validationErrors.fullName = "Please enter your full name.";
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!/^\d{10}$/.test(phone)) {
      validationErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (telegram && !/^@/.test(telegram)) {
      validationErrors.telegram = "Telegram username must start with @.";
    }

    if (!university) {
      validationErrors.university = "Please enter your university name.";
    }

    if (
      !currentYear ||
      !["freshman", "sophomore", "junior", "senior"].includes(currentYear)
    ) {
      validationErrors.currentYear = "Please select your academic year.";
    }

    if (!department) {
      validationErrors.department = "Please enter your department.";
    }

    if (!preferredTrack) {
      validationErrors.preferredTrack = "Please select your preferred track.";
    }

    if (!priorExperience) {
      validationErrors.priorExperience = "Please choose your experience level.";
    }

    if (!commitment) {
      validationErrors.commitment = "Please choose your weekly availability.";
    }

    if (!motivation) {
      validationErrors.motivation = "Please tell us why you want to join.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError(
        "Please complete all required fields and fix any highlighted form errors before submitting.",
      );

      const firstErrorField = Object.keys(validationErrors)[0];
      const field = event.target.elements[firstErrorField];
      if (field && typeof field.focus === "function") {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
        field.focus();
      }

      return;
    }

    setErrors({});
    setFormError("");
    const payload = {
      full_name: formData.get("fullName"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
      telegram_username: formData.get("telegram"),
      github_profile: formData.get("github"),
      linkedin_profile: formData.get("linkedin"),
      university_name: formData.get("university"),
      current_year: formData.get("currentYear"),
      department: formData.get("department"),
      preferred_track: formData.get("preferredTrack"),
      prior_experience: formData.get("priorExperience"),
      availability: formData.get("commitment") === "Yes",
      why_join: formData.get("motivation"),
    };

    const redirectToResult = (status, message) => {
      const url = new URL(window.location.origin + "/submission");
      url.searchParams.set("status", status);
      url.searchParams.set("message", message);
      window.location.href = url.toString();
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://ishub-registration-production.up.railway.app/applications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        redirectToResult(
          "success",
          "Your application has been submitted successfully.",
        );
      } else {
        const errorText = await response.text();
        redirectToResult(
          "error",
          `Submission failed: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    } catch (error) {
      redirectToResult("error", `Unable to submit application: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back Home
        </button>

        <section className="bg-white border border-slate-200 rounded-xl2 shadow-soft overflow-hidden">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-blue-900 px-6 py-10 sm:px-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <img
                src={logo}
                alt="ISHub logo"
                className="h-20 w-20 rounded-full object-cover shadow-softHover ring-4 ring-cyan-200/50"
              />
              <div>
                <p className="text-sm font-semibold text-blue-100 uppercase tracking-wide">
                  Student Application
                </p>
                <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  ISHub Summer Bootcamp Registration
                </h1>
                <p className="mt-4 text-blue-100 max-w-2xl leading-relaxed">
                  Complete the form below so we can understand your background,
                  interests, and availability for the program.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10">
            {formError && (
              <div className="mb-6 rounded-xl2 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                {formError}
              </div>
            )}
            <div className="mb-8 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-xl2 border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
                <Sparkles size={18} className="text-primary shrink-0" />
                <span>
                  Fields marked with <RequiredMark /> are required.
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl2 border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <Clock size={18} className="text-primary shrink-0" />
                <span>This application takes about 3-5 minutes.</span>
              </div>
            </div>

            <SectionTitle title="Student Information" />
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                required
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="\d{10}"
                maxLength={10}
                placeholder="0914232313"
                autoComplete="tel"
                required
                error={errors.phone}
              />
              <FormField
                label="Telegram Username"
                name="telegram"
                placeholder="@username"
                required
                pattern="^@.*"
                title="Telegram username must start with @"
                error={errors.telegram}
              />
              <FormField
                label="GitHub Profile"
                name="github"
                type="url"
                placeholder="https://github.com/username"
              />
              <FormField
                label="LinkedIn Profile"
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <SectionTitle title="Academic Details" className="mt-10" />
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="University Name"
                name="university"
                placeholder="Enter your university name"
                required
              />
              <SelectField
                label="Academic Year"
                name="currentYear"
                options={currentYearOptions}
                placeholder="Select your academic year"
                required
                error={errors.currentYear}
              />
              <FormField
                label="Department"
                name="department"
                placeholder="Example: Computer Science"
                required
              />
              <SelectField
                label="Preferred Track"
                name="preferredTrack"
                options={trackOptions}
                placeholder="Choose your preferred track"
                required
              />
            </div>

            <SectionTitle
              title="Experience and Availability"
              className="mt-10"
            />
            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label="Prior Experience"
                name="priorExperience"
                options={experienceOptions}
                placeholder="Choose your experience level"
                required
              />
              <SelectField
                label="Can you commit 10+ hours/week?"
                name="commitment"
                options={commitmentOptions}
                placeholder="Choose your availability"
                required
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="motivation"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Why do you want to join?
                <RequiredMark />
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows="5"
                required
                className="w-full rounded-xl2 border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100 resize-y"
                placeholder="Tell us what you hope to learn, build, or achieve during the bootcamp."
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-xl2 shadow-soft transition-all duration-200 hover:-translate-y-0.5 ${
                  isSubmitting
                    ? "bg-slate-300 text-slate-700 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Send size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function SectionTitle({ title, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <div className="mt-2 h-px bg-slate-200" />
    </div>
  );
}

function RequiredMark() {
  return (
    <span className="ml-1 text-red-500" aria-label="required">
      *
    </span>
  );
}

function FormField({ label, name, type = "text", required, error, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        {label}
        {required && <RequiredMark />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl2 border px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100 ${
          error ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"
        }`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  required,
  ...props
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        {label}
        {required && <RequiredMark />}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        required={required}
        className="w-full rounded-xl2 border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
