import { useEffect, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";

const API_BASE = "https://ishub-registration-production.up.railway.app";

export default function AdminDashboard({ onBackHome }) {
  const token = window.localStorage.getItem("ishub_auth_token");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(
    token ? "" : "Please log in first to access the admin dashboard.",
  );
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/applications?page=1&page_size=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.detail || data?.message || `HTTP ${response.status}`,
          );
        }

        const result = await response.json();
        setApplications(result.items || []);
      } catch (err) {
        setError(err.message || "Unable to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const handleExport = async () => {
    if (!token) {
      setError("Please log in first to export applications.");
      return;
    }

    setExporting(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/applications/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.detail || data?.message || `HTTP ${response.status}`,
        );
      }

      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "applications.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(href);
    } catch (err) {
      setError(err.message || "Unable to download applications.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back Home
        </button>

        <section className="bg-white border border-slate-200 rounded-xl2 shadow-soft overflow-hidden">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-blue-900 px-8 py-10 sm:px-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-blue-100 uppercase tracking-wide">
                  Admin Dashboard
                </p>
                <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Manage Applications
                </h1>
                <p className="mt-4 text-blue-100 max-w-2xl leading-relaxed">
                  View recent registrations and export application data for
                  reporting.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExport}
                disabled={exporting}
                className={`inline-flex items-center gap-2 rounded-xl2 px-6 py-3 text-sm font-semibold text-white shadow-soft transition ${
                  exporting
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                <Download size={18} />
                {exporting ? "Exporting..." : "Export to Excel"}
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {loading ? (
              <div className="rounded-xl2 border border-slate-200 bg-slate-50 px-6 py-8 text-center text-slate-600">
                Loading applications...
              </div>
            ) : error ? (
              <div className="rounded-xl2 border border-rose-200 bg-rose-50 px-6 py-8 text-sm text-rose-800">
                {error}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm max-h-[60vh] overflow-y-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 text-left text-sm uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-4">ID</th>
                        <th className="px-4 py-4">Name</th>
                        <th className="px-4 py-4">Email</th>
                        <th className="px-4 py-4">Track</th>
                        <th className="px-4 py-4">Experience</th>
                        <th className="px-4 py-4">Availability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                      {applications.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-4 py-8 text-center text-slate-500"
                          >
                            No applications were found.
                          </td>
                        </tr>
                      ) : (
                        applications.map((application) => (
                          <tr key={application.id}>
                            <td className="px-4 py-4">{application.id}</td>
                            <td className="px-4 py-4">
                              {application.full_name}
                            </td>
                            <td className="px-4 py-4">{application.email}</td>
                            <td className="px-4 py-4">
                              {application.preferred_track}
                            </td>
                            <td className="px-4 py-4">
                              {application.prior_experience}
                            </td>
                            <td className="px-4 py-4">
                              {application.availability ? "Yes" : "No"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-slate-500">
                  Showing the first page of applications. Use export to download
                  all records.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
