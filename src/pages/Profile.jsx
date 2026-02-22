import { useEffect, useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Code,
  Edit,
  Save,
  X,
  Briefcase,
  Users,
  Award,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

function Profile() {
  const { token } = useAuth();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState({});
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(location.state?.editMode || false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load profile");

      setUser(data.user);
      setStats(data.stats);

      setForm({
        college: data.user.college || "",
        branch: data.user.branch || "",
        year: data.user.year || "",
        skills: data.user.skills?.join(", ") || "",
        contact: data.user.contact || "",
        resumeUrl: data.user.resumeUrl || "",
        bio: data.user.bio || "",
        github: data.user.github || "",
        linkedin: data.user.linkedin || "",
        website: data.user.website || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            skills: form.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setSuccess("Profile updated successfully");
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Ensure URL always has a protocol
  const ensureUrl = (url) => {
    if (!url) return "#";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  // Get initial for avatar
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

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

  return (
    <>
      <DashboardNavbar />

      <main
        className="min-h-screen py-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text)" }}>
                <User size={24} style={{ color: "var(--primary)" }} />
                My Profile
              </h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Manage your personal information and public profile
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-3 sm:mt-0 px-5 py-2 rounded-lg hologram-btn flex items-center gap-2"
                style={{ backgroundColor: "var(--primary)", color: "white" }}
              >
                <Edit size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
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
                    Managing Projects
                  </p>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {stats?.managedProjects || 0}
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
                    {stats?.contributedProjects || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div
            className="rounded-xl border shadow-sm overflow-hidden"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            {/* Avatar & basic info */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                >
                  {initial}
                </div>
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    {user.name}
                  </h2>
                  <p className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
                    <Mail size={14} />
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Form / View */}
            <div className="p-6">
              {success && (
                <div
                  className="mb-4 p-3 rounded-md text-sm"
                  style={{
                    backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                    color: "var(--success)",
                  }}
                >
                  {success}
                </div>
              )}
              {error && (
                <div
                  className="mb-4 p-3 rounded-md text-sm"
                  style={{
                    backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                    color: "var(--error)",
                  }}
                >
                  {error}
                </div>
              )}

              {isEditing ? (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="College"
                      name="college"
                      icon={<GraduationCap size={16} />}
                      value={form.college}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Branch"
                      name="branch"
                      icon={<BookOpen size={16} />}
                      value={form.branch}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Year"
                      name="year"
                      icon={<Calendar size={16} />}
                      value={form.year}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Contact"
                      name="contact"
                      icon={<Mail size={16} />}
                      value={form.contact}
                      onChange={handleChange}
                    />
                  </div>

                  <InputField
                    label="Bio"
                    name="bio"
                    icon={<Award size={16} />}
                    value={form.bio}
                    onChange={handleChange}
                    isTextarea
                  />

                  <InputField
                    label="Skills (comma separated)"
                    name="skills"
                    icon={<Code size={16} />}
                    value={form.skills}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Resume URL"
                    name="resumeUrl"
                    icon={<FileText size={16} />}
                    value={form.resumeUrl}
                    onChange={handleChange}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="GitHub"
                      name="github"
                      icon={<Github size={16} />}
                      value={form.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                    />
                    <InputField
                      label="LinkedIn"
                      name="linkedin"
                      icon={<Linkedin size={16} />}
                      value={form.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <InputField
                    label="Personal Website"
                    name="website"
                    icon={<Globe size={16} />}
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-6 py-2 rounded-lg hologram-btn flex items-center gap-2 disabled:opacity-50"
                      style={{ backgroundColor: "var(--primary)", color: "white" }}
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 rounded-lg hologram-btn flex items-center gap-2"
                      style={{ border: `1px solid var(--border)`, color: "var(--text)" }}
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <ProfileRow
                    label="College"
                    value={user.college}
                    icon={<GraduationCap size={16} />}
                  />
                  <ProfileRow
                    label="Branch"
                    value={user.branch}
                    icon={<BookOpen size={16} />}
                  />
                  <ProfileRow
                    label="Year"
                    value={user.year}
                    icon={<Calendar size={16} />}
                  />
                  <ProfileRow
                    label="Contact"
                    value={user.contact}
                    icon={<Mail size={16} />}
                  />
                  <ProfileRow
                    label="Bio"
                    value={user.bio}
                    icon={<Award size={16} />}
                  />
                  <ProfileRow
                    label="Skills"
                    value={
                      user.skills?.length > 0 ? (
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
                      ) : (
                        "-"
                      )
                    }
                    icon={<Code size={16} />}
                  />
                  <ProfileRow
                    label="Resume"
                    value={
                      user.resumeUrl ? (
                        <a
                          href={user.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hologram-link"
                          style={{ color: "var(--primary)" }}
                        >
                          View Resume
                        </a>
                      ) : (
                        "-"
                      )
                    }
                    icon={<FileText size={16} />}
                  />
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    {user.github && (
                      <ProfileRow
                        label="GitHub"
                        value={
                          <a
                            href={ensureUrl(user.github)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hologram-link"
                            style={{ color: "var(--primary)" }}
                          >
                            {user.github.replace(/^https?:\/\/(www\.)?/, "")}
                          </a>
                        }
                        icon={<Github size={16} />}
                      />
                    )}
                    {user.linkedin && (
                      <ProfileRow
                        label="LinkedIn"
                        value={
                          <a
                            href={ensureUrl(user.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hologram-link"
                            style={{ color: "var(--primary)" }}
                          >
                            {user.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                          </a>
                        }
                        icon={<Linkedin size={16} />}
                      />
                    )}
                  </div>
                  {user.website && (
                    <ProfileRow
                      label="Website"
                      value={
                        <a
                          href={ensureUrl(user.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hologram-link"
                          style={{ color: "var(--primary)" }}
                        >
                          {user.website.replace(/^https?:\/\/(www\.)?/, "")}
                        </a>
                      }
                      icon={<Globe size={16} />}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Helper Components
function ProfileRow({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div style={{ color: "var(--primary)" }} className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
        <div style={{ color: "var(--text)" }}>{value || "-"}</div>
      </div>
    </div>
  );
}

function InputField({ label, name, icon, value, onChange, placeholder, isTextarea = false }) {
  return (
    <div>
      <label className="block text-xs mb-1 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {icon}
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          placeholder={placeholder}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--text)",
            "--tw-ring-color": "var(--primary)",
          }}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--text)",
            "--tw-ring-color": "var(--primary)",
          }}
        />
      )}
    </div>
  );
}

export default Profile;