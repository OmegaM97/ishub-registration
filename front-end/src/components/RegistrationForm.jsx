import { ArrowLeft, Clock, Send, Sparkles } from "lucide-react";
import logo from "../assets/ishub-logo.jpg";

const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
];

const trackOptions = [
  "Artificial intelligence",
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
];

const experienceOptions = [
  "No prior experience",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const commitmentOptions = ["Yes", "No", "Not sure yet"];

export default function RegistrationForm({ onBackHome }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for applying to ISHub Summer Bootcamp!");
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

          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
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
                placeholder="+251 900 000 000"
                autoComplete="tel"
                required
              />
              <FormField
                label="Telegram Username"
                name="telegram"
                placeholder="@username"
                required
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
                label="Current Year"
                name="currentYear"
                options={yearOptions}
                placeholder="Choose your current year"
                required
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
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-3.5 rounded-xl2 shadow-soft hover:shadow-softHover transition-all duration-200 hover:-translate-y-0.5"
              >
                Submit Application
                <Send size={18} />
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

function FormField({ label, name, type = "text", required, ...props }) {
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
        className="w-full rounded-xl2 border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
        {...props}
      />
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
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
