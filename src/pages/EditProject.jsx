import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  Users,
  Code,
  Edit,
  Eye,
  AlertCircle,
  Info,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

function EditProject() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    requiredSkills: "",
    teamSize: "",
  });

  const [membersCount, setMembersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  // Fetch project data
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/projects/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load project");
        }

        setFormData({
          title: data.project.title,
          description: data.project.description,
          details: data.project.details || "",
          requiredSkills: data.project.requiredSkills?.join(", ") || "",
          teamSize: data.project.teamSize,
        });

        setMembersCount(data.project.members?.length || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    }

    fetchProject();
  }, [id, token]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const newTeamSize = Number(formData.teamSize);

    if (!formData.title || !formData.description || !newTeamSize) {
      setError("Please fill all required fields");
      return;
    }

    if (isNaN(newTeamSize) || newTeamSize < 1) {
      setError("Invalid team size");
      return;
    }

    if (newTeamSize < membersCount) {
      setError("Team size cannot be smaller than current members");
      return;
    }

    if (newTeamSize === membersCount) {
      const confirmClose = window.confirm(
        "Team size equals current members. This will CLOSE the project. Continue?"
      );
      if (!confirmClose) return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        details: formData.details,
        requiredSkills: formData.requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        teamSize: newTeamSize,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error(
            "This project was modified by someone else. Please refresh and try again."
          );
        }
        throw new Error(data.message || "Update failed");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Skills array for preview
  const skillArray = formData.requiredSkills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (fetching) {
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
            <Edit className="w-6 h-6" style={{ color: "var(--primary)" }} />
            Edit Project
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
                    className="p-3 rounded-md text-sm flex items-center gap-2"
                    style={{
                      backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                      color: "var(--error)",
                    }}
                  >
                    <AlertCircle size={16} />
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
                    Project Details
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
                    <Users size={16} style={{ color: "var(--primary)" }} />
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
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    Current members: {membersCount}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg hologram-btn font-medium disabled:opacity-50"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                >
                  {loading ? "Updating..." : "Update Project"}
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
                      {formData.teamSize
                        ? `${formData.teamSize} members (current: ${membersCount})`
                        : "—"}
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

export default EditProject;