import { AlertCircle } from "lucide-react";

export default function ClosedPage({ onBackHome }) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-soft sm:px-12">
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              Announcement
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Applications Are Now Closed
            </h1>
          </div>
        </div>

        <div className="mt-8 space-y-6 text-slate-700">
          <p className="text-lg">
            Registration for the <strong>ISHub Summer Bootcamp</strong> has
            officially closed, and we are no longer accepting new applications
            for this cohort.
          </p>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {" "}
              To Everyone Who Applied
            </h2>
            <p className="mt-2">
              Thank you for choosing <strong>ISHub Summer Bootcamp</strong> and
              trusting us to be part of your learning journey. We truly
              appreciate your enthusiasm and look forward to helping you build
              valuable skills and achieve your goals. We can't wait to welcome
              you to the bootcamp!
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {" "}
              Missed the Registration?
            </h3>
            <p className="mt-2">
              Don't worry if you weren't able to register this time. Another
              opportunity is just around the corner! We encourage you to keep
              learning, stay motivated, and check back regularly for
              announcements about our next bootcamp.
            </p>
            <p className="mt-3 font-medium text-slate-900">
              <strong>
                Follow our updates and be ready to apply as soon as registration
                reopens.
              </strong>
            </p>
            <p className="mt-4 text-slate-600">
              We look forward to welcoming you to the next ISHub Summer
              Bootcamp. Until then, keep learning, keep building, and keep
              believing in your potential!
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center justify-center rounded-xl2 bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark"
          >
            Back Home
          </button>
        </div>
      </div>
    </main>
  );
}
