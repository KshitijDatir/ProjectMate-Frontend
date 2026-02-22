import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FileText,
  Users,
  Code,
  User,
  Eye,
  Edit3,
  Briefcase,
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../api/projectsApi";

function CreateProject() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    requiredSkills: "",
    teamSize: "",
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

    if (!formData.title || !formData.description || !formData.teamSize) {
      setError("Please fill all required fields");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      details: formData.details,
      requiredSkills: formData.requiredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      teamSize: Number(formData.teamSize),
    };

    try {
      setLoading(true);
      await createProject(token, payload);

      if (from === "dashboard") {
        navigate("/dashboard");
      } else {
        navigate("/home?tab=projects");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Live preview data
  const skillArray = formData.requiredSkills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

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
            <Edit3 className="w-6 h-6" style={{ color: "var(--primary)" }} />
            Create New Project
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
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="e.g., Smart Job Tracker"
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
                    <Edit3 size={16} style={{ color: "var(--primary)" }} />
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Project Details */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <Code size={16} style={{ color: "var(--primary)" }} />
                    Tech Stack / Details
                  </label>
                  <input
                    type="text"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="e.g., React, Node.js, MongoDB"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Required Skills */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <Users size={16} style={{ color: "var(--primary)" }} />
                    Required Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="requiredSkills"
                    value={formData.requiredSkills}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 transition-all"
                    placeholder="e.g., React, Node.js, MongoDB"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      "--tw-ring-color": "var(--primary)",
                    }}
                  />
                </div>

                {/* Team Size */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1 flex items-center gap-2"
                    style={{ color: "var(--text)" }}
                  >
                    <Briefcase size={16} style={{ color: "var(--primary)" }} />
                    Team Size *
                  </label>
                  <input
                    type="number"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    min={1}
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
                  {loading ? "Creating..." : "Create Project"}
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
                  Project Preview
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
                      Description
                    </p>
                    <p className="text-sm line-clamp-3" style={{ color: "var(--text-muted)" }}>
                      {formData.description || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Tech Stack
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {formData.details || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Required Skills
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skillArray.length > 0 ? (
                        skillArray.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded"
                            style={{ backgroundColor: "var(--secondary)", color: "var(--text)" }}
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                          —
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Team Size
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {formData.teamSize ? `${formData.teamSize} members` : "—"}
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

export default CreateProject;