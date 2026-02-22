import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Send,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

function ApplicationDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [decisionMessage, setDecisionMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/requests/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load application");
        setApplication(data.request);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, [id, token]);

  async function handleDecision(decision) {
    try {
      setProcessing(true);
      setActionError("");
      setActionSuccess("");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/decision`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ decision, message: decisionMessage }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Action failed");

      setApplication((prev) => ({ ...prev, status: decision }));
      setActionSuccess(`Application ${decision.toLowerCase()} successfully`);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "var(--primary)" }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="text-center" style={{ color: "var(--error)" }}>
          <XCircle size={48} className="mx-auto mb-4" />
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const { applicantSnapshot, project, sop, status } = application;

  // Get first letter for avatar
  const initial = applicantSnapshot.name?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <DashboardNavbar />

      <main
        className="min-h-screen py-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 hologram-link"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1
              className="text-2xl font-bold flex items-center gap-2"
              style={{ color: "var(--text)" }}
            >
              <FileText size={24} style={{ color: "var(--primary)" }} />
              Application for {project.title}
            </h1>
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                backgroundColor:
                  status === "PENDING"
                    ? "rgba(var(--accent-rgb), 0.15)"
                    : status === "ACCEPTED"
                      ? "rgba(var(--primary-rgb), 0.15)"
                      : "rgba(var(--text-muted-rgb), 0.15)",
                color:
                  status === "PENDING"
                    ? "var(--accent)"
                    : status === "ACCEPTED"
                      ? "var(--primary)"
                      : "var(--text-muted)",
              }}
            >
              {status}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column – Applicant & SOP */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div
                className="p-6 rounded-xl border shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <Link
                  to={`/users/${application.applicant._id}`}
                  className="flex items-start gap-4 mb-6 hologram-card group rounded-xl"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                  >
                    {initial}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                      {applicantSnapshot.name}
                    </h2>
                    <p className="flex items-center gap-1 text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                      <Mail size={14} />
                      {applicantSnapshot.email}
                    </p>
                  </div>
                </Link>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap size={18} style={{ color: "var(--primary)" }} />
                    <div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        College
                      </p>
                      <p style={{ color: "var(--text)" }}>{applicantSnapshot.college}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen size={18} style={{ color: "var(--primary)" }} />
                    <div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Branch
                      </p>
                      <p style={{ color: "var(--text)" }}>{applicantSnapshot.branch}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={18} style={{ color: "var(--primary)" }} />
                    <div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Year
                      </p>
                      <p style={{ color: "var(--text)" }}>{applicantSnapshot.year}</p>
                    </div>
                  </div>
                  {applicantSnapshot.resumeUrl && (
                    <div className="flex items-start gap-2">
                      <FileText size={18} style={{ color: "var(--primary)" }} />
                      <div>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                          Resume
                        </p>
                        <a
                          href={applicantSnapshot.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hologram-link text-sm"
                          style={{ color: "var(--primary)" }}
                        >
                          View Resume
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {applicantSnapshot.skills?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {applicantSnapshot.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded"
                          style={{ backgroundColor: "var(--secondary)", color: "var(--text)" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SOP Card */}
              <div
                className="p-6 rounded-xl border shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                  <FileText size={20} style={{ color: "var(--primary)" }} />
                  Statement of Purpose
                </h2>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "var(--background)" }}
                >
                  <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {sop}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column – Decision */}
            <div className="lg:col-span-1 space-y-6">
              <div
                className="sticky top-24 p-6 rounded-xl border shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                  {status === "PENDING" ? "Make a Decision" : "Decision"}
                </h2>

                {status === "PENDING" ? (
                  <>
                    <textarea
                      placeholder="Optional message to applicant..."
                      value={decisionMessage}
                      onChange={(e) => setDecisionMessage(e.target.value)}
                      className="w-full border rounded-lg p-3 h-24 mb-4 focus:ring-2"
                      style={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                        "--tw-ring-color": "var(--primary)",
                      }}
                    />

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleDecision("ACCEPTED")}
                        disabled={processing}
                        className="w-full py-3 rounded-lg hologram-btn flex items-center justify-center gap-2 disabled:opacity-50"
                        style={{ backgroundColor: "var(--primary)", color: "white" }}
                      >
                        <CheckCircle size={18} />
                        {processing ? "Processing..." : "Accept"}
                      </button>

                      <button
                        onClick={() => handleDecision("REJECTED")}
                        disabled={processing}
                        className="w-full py-3 rounded-lg hologram-btn flex items-center justify-center gap-2 disabled:opacity-50"
                        style={{ backgroundColor: "var(--accent)", color: "white" }}
                      >
                        <XCircle size={18} />
                        {processing ? "Processing..." : "Reject"}
                      </button>
                    </div>

                    {actionError && (
                      <p className="mt-4 text-sm" style={{ color: "var(--error)" }}>
                        {actionError}
                      </p>
                    )}

                    {actionSuccess && (
                      <p className="mt-4 text-sm" style={{ color: "var(--success)" }}>
                        {actionSuccess}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-lg text-center"
                      style={{
                        backgroundColor:
                          status === "ACCEPTED"
                            ? "rgba(var(--primary-rgb), 0.1)"
                            : "rgba(var(--accent-rgb), 0.1)",
                      }}
                    >
                      {status === "ACCEPTED" ? (
                        <CheckCircle size={32} style={{ color: "var(--primary)" }} className="mx-auto mb-2" />
                      ) : (
                        <XCircle size={32} style={{ color: "var(--error)" }} className="mx-auto mb-2" />
                      )}
                      <p className="font-medium" style={{ color: "var(--text)" }}>
                        Application {status.toLowerCase()}
                      </p>
                    </div>

                    {/* If there was a decision message, show it */}
                    {application.decisionMessage && (
                      <div>
                        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                          Message
                        </p>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          {application.decisionMessage}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ApplicationDetail;