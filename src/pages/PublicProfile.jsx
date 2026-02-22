import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Code,
  ArrowLeft,
  Award,
  Users,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Phone,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

function PublicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
        );
        if (!res.ok) throw new Error("Profile not found");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [id]);

  // Get initial for avatar
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  // Ensure URL always has a protocol
  const ensureUrl = (url) => {
    if (!url) return "#";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

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
        <div className="text-center" style={{ color: "var(--accent)" }}>
          <User size={48} className="mx-auto mb-4" />
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Conditional Navbar */}
      {token ? (
        <DashboardNavbar />
      ) : (
        <nav
          className="sticky top-0 z-50 w-full border-b backdrop-blur"
          style={{ backgroundColor: "var(--navbar-bg)", borderColor: "var(--border)" }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold" style={{ color: "var(--text)" }}>
                ProjectMate
              </span>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className="hologram-link px-3 py-1 rounded-md"
                style={{ color: "var(--text)" }}
              >
                What is ProjectMate?
              </button>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="hologram-link px-3 py-1 rounded-md"
                  style={{ color: "var(--text)" }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 rounded-lg hologram-btn font-medium"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                >
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

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

          {/* Public viewer banner */}
          {!token && (
            <div
              className="mb-6 p-4 rounded-lg text-sm flex items-center gap-2"
              style={{
                backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                color: "var(--accent)",
                border: `1px solid var(--border)`,
              }}
            >
              <Users size={18} />
              <span>You are viewing a public developer profile.</span>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column – Profile card */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-24 p-6 rounded-xl border shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mb-4"
                    style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                  >
                    {initial}
                  </div>
                  <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                    {user.name}
                  </h1>
                  {user.college && (
                    <p className="text-sm mt-1 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <GraduationCap size={14} />
                      {user.college}
                    </p>
                  )}
                </div>

                <div className="border-t my-4" style={{ borderColor: "var(--border)" }} />

                <div className="space-y-3 text-sm">
                  {user.branch && (
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} style={{ color: "var(--primary)" }} />
                      <span style={{ color: "var(--text-muted)" }}>{user.branch}</span>
                    </div>
                  )}
                  {user.year && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} style={{ color: "var(--primary)" }} />
                      <span style={{ color: "var(--text-muted)" }}>Year {user.year}</span>
                    </div>
                  )}
                  {user.contact && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} style={{ color: "var(--primary)" }} />
                      <span style={{ color: "var(--text-muted)" }}>{user.contact}</span>
                    </div>
                  )}
                  {user.resumeUrl && (
                    <div className="flex items-center gap-2">
                      <FileText size={16} style={{ color: "var(--primary)" }} />
                      <a
                        href={user.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hologram-link"
                        style={{ color: "var(--primary)" }}
                      >
                        View Resume
                      </a>
                    </div>
                  )}
                </div>

                {/* Social links */}
                {(user.github || user.linkedin || user.website) && (
                  <>
                    <div className="border-t my-4" style={{ borderColor: "var(--border)" }} />
                    <div className="space-y-3 text-sm">
                      {user.github && (
                        <a
                          href={ensureUrl(user.github)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hologram-link group transition-all duration-200"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Github size={16} className="group-hover:scale-110 transition-transform duration-200" style={{ color: "var(--primary)" }} />
                          <span className="truncate group-hover:text-[var(--primary)] transition-colors duration-200">
                            {user.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                          </span>
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" style={{ color: "var(--primary)" }} />
                        </a>
                      )}
                      {user.linkedin && (
                        <a
                          href={ensureUrl(user.linkedin)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hologram-link group transition-all duration-200"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Linkedin size={16} className="group-hover:scale-110 transition-transform duration-200" style={{ color: "var(--primary)" }} />
                          <span className="truncate group-hover:text-[var(--primary)] transition-colors duration-200">
                            {user.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                          </span>
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" style={{ color: "var(--primary)" }} />
                        </a>
                      )}
                      {user.website && (
                        <a
                          href={ensureUrl(user.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hologram-link group transition-all duration-200"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Globe size={16} className="group-hover:scale-110 transition-transform duration-200" style={{ color: "var(--primary)" }} />
                          <span className="truncate group-hover:text-[var(--primary)] transition-colors duration-200">
                            {user.website.replace(/^https?:\/\/(www\.)?/, "")}
                          </span>
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" style={{ color: "var(--primary)" }} />
                        </a>
                      )}
                    </div>
                  </>
                )}

                {user.skills?.length > 0 && (
                  <>
                    <div className="border-t my-4" style={{ borderColor: "var(--border)" }} />
                    <div>
                      <h3 className="text-sm font-semibold mb-2 flex items-center gap-1" style={{ color: "var(--text)" }}>
                        <Code size={16} style={{ color: "var(--primary)" }} />
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded"
                            style={{ backgroundColor: "var(--secondary)", color: "var(--text)" }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right column – Placeholder for activity / projects */}
            <div className="lg:col-span-2 space-y-6">
              <div
                className="p-6 rounded-xl border shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text)" }}>
                  <Award size={20} style={{ color: "var(--primary)" }} />
                  About {user.name}
                </h2>
                {user.bio ? (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{user.bio}</p>
                ) : (
                  <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
                    {user.name} hasn't added a bio yet.
                  </p>
                )}
              </div>

              {/* Stats cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  className="p-5 rounded-xl border shadow-sm"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "var(--secondary)" }}
                    >
                      <Briefcase size={20} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Projects Managed
                      </p>
                      <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                        {user.managedProjects || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="p-5 rounded-xl border shadow-sm"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "var(--secondary)" }}
                    >
                      <Users size={20} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Contributed Projects
                      </p>
                      <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                        {user.contributedProjects || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA for non-logged-in users */}
          {!token && (
            <div
              className="mt-12 text-center border-t pt-8"
              style={{ borderColor: "var(--border)" }}
            >
              <h3
                className="text-lg font-semibold flex items-center justify-center gap-2"
                style={{ color: "var(--text)" }}
              >
                <Users size={20} style={{ color: "var(--primary)" }} />
                Want to collaborate with developers like {user.name}?
              </h3>
              <p className="mt-2" style={{ color: "var(--text-muted)" }}>
                Join ProjectMate and build projects together.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="mt-4 px-6 py-2 rounded-lg hologram-btn font-medium"
                style={{ backgroundColor: "var(--primary)", color: "white" }}
              >
                Create Free Account
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PublicProfile;