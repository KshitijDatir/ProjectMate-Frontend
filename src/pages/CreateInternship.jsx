import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Briefcase,
  Building2,
  User,
  FileText,
  Link,
  Calendar,
  Eye,
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { createInternship } from "../api/internshipsApi";

function CreateInternship() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    role: "",
    description: "",
    applicationLink: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (
      !formData.title ||
      !formData.companyName ||
      !formData.role ||
      !formData.description ||
      !formData.applicationLink ||
      !formData.deadline
    ) {
      setError("Please fill all required fields");
      return;
    }

    const payload = {
      title: formData.title,
      companyName: formData.companyName,
      role: formData.role,
      description: formData.description,
      applicationLink: formData.applicationLink,
      deadline: formData.deadline,
    };

    try {
      setLoading(true);
      await createInternship(token, payload);

      if (from === "dashboard") {
        navigate("/dashboard");
      } else {
        navigate("/home?tab=internships");
      }
    } catch (err) {
      setError(err.message || "Failed to create internship");
    } finally {
      setLoading(false);
    }
  }

  // Format date for preview
  const formattedDeadline = formData.deadline
    ? new Date(formData.deadline).toLocaleDateString()
    : "—";

  return (
    <>
      <DashboardNavbar />

      <main
        className="min-h-screen py-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-2xl font-bold mb-6 flex items-center gap-2"
            style={{ color: "var(--text)" }}
          >
            <Briefcase className="w-6 h-6" style={{ color: "var(--primary)" }} />
            Create Internship
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form – 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 rounded-xl border shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                {error && (
                  <div
                    className="p-3 rounded-md text-sm"
                    style={{
                      backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                      color: "var(--error)",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Title */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <FileText size={16} style={{ color: "var(--primary)" }} />
                    Internship Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="e.g., Software Engineering Intern"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <Building2 size={16} style={{ color: "var(--primary)" }} />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="e.g., TechCorp"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <User size={16} style={{ color: "var(--primary)" }} />
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="e.g., Backend Intern"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <FileText size={16} style={{ color: "var(--primary)" }} />
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="Work on Node.js and MongoDB"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Application Link */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <Link size={16} style={{ color: "var(--primary)" }} />
                    Application Link *
                  </label>
                  <input
                    type="url"
                    name="applicationLink"
                    value={formData.applicationLink}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="https://company.com/apply"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <Calendar size={16} style={{ color: "var(--primary)" }} />
                    Deadline *
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg hologram-btn font-medium disabled:opacity-50"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                >
                  {loading ? "Creating..." : "Create Internship"}
                </button>
              </form>
            </div>

            {/* Live Preview Card – 1/3 width on desktop */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-24 p-6 rounded-xl border shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h2
                  className="text-lg font-semibold mb-4 flex items-center gap-2"
                  style={{ color: "var(--text)" }}
                >
                  <Eye size={20} style={{ color: "var(--primary)" }} />
                  Internship Preview
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Title
                    </p>
                    <p className="font-medium" style={{ color: "var(--text)" }}>
                      {formData.title || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Company
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {formData.companyName || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Role
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {formData.role || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Description
                    </p>
                    <p className="text-sm line-clamp-3" style={{ color: "var(--text-muted)" }}>
                      {formData.description || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Application Link
                    </p>
                    <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
                      {formData.applicationLink || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Deadline
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {formattedDeadline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default CreateInternship;