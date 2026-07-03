export default function SubmissionResult({ onBackHome }) {
  const searchParams = new URLSearchParams(window.location.search);
  const status = searchParams.get("status") || "success";
  const message =
    searchParams.get("message") ||
    (status === "success"
      ? "Your application was submitted successfully."
      : "There was an issue submitting your application.");

  const title =
    status === "success" ? "Application Submitted" : "Submission Failed";
  const accentClass =
    status === "success"
      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
      : "bg-rose-50 text-rose-900 border-rose-200";

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full rounded-[2rem] border p-10 shadow-soft bg-white">
        <div className={`mb-8 rounded-3xl border px-8 py-6 ${accentClass}`}>
          <h1 className="text-3xl font-extrabold mb-4">{title}</h1>
          <p className="text-base leading-7">{message}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center justify-center rounded-xl2 bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark"
          >
            Return Home
          </button>
          <p className="text-sm text-slate-600">
            You can close this page or submit another application from the home
            page.
          </p>
        </div>
      </div>
    </main>
  );
}
