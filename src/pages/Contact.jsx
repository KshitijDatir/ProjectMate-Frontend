import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MessageSquare, Send, Twitter, Github, Linkedin } from "lucide-react";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Palette } from "lucide-react";

const channels = [
    {
        icon: Mail,
        title: "Email Me",
        desc: "For questions, feedback, or just to say hi.",
        value: "kshitijdatir1@gmail.com",
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=kshitijdatir1@gmail.com&su=Regarding%20ProjectMate",
    },
    {
        icon: Linkedin,
        title: "LinkedIn",
        desc: "Connect with me professionally.",
        value: "kshitij-datir",
        href: "https://www.linkedin.com/in/kshitij-datir-30153b28a",
    },
    {
        icon: Github,
        title: "GitHub",
        desc: "Check out the code or open an issue.",
        value: "KshitijDatir",
        href: "https://github.com/KshitijDatir",
    },
];

function Contact() {
    const navigate = useNavigate();
    const { mode, toggleMode, toggleScheme } = useTheme();

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Open user's default email client pre-filled with the form data
        const subject = encodeURIComponent("Message from ProjectMate Contact Form");
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=kshitijdatir1@gmail.com&su=${subject}&body=${body}`, "_blank");

        setSent(true);
    };

    return (
        <>
            {/* Navbar */}
            <nav
                className="sticky top-0 z-50 w-full border-b backdrop-blur"
                style={{ backgroundColor: "var(--navbar-bg)", borderColor: "var(--border)" }}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleMode}
                            className="p-2 rounded-full hologram-btn"
                            style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
                        >
                            {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button
                            onClick={toggleScheme}
                            className="p-2 rounded-full hologram-btn"
                            style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
                        >
                            <Palette size={18} />
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="hologram-link px-3 py-1 rounded-md text-sm"
                            style={{ color: "var(--text)" }}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="px-4 py-2 rounded-lg hologram-btn text-sm font-medium"
                            style={{ backgroundColor: "var(--primary)", color: "white" }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <main style={{ backgroundColor: "var(--background)" }}>
                {/* Header */}
                <section className="py-20 px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <span
                            className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-6 hologram-btn"
                            style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                        >
                            Get in Touch
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
                            We'd love to hear from you
                        </h1>
                        <p style={{ color: "var(--text-muted)" }}>
                            Whether it's feedback, a bug report, or just a hello — reach out any way you like.
                        </p>
                    </div>
                </section>

                {/* Channels */}
                <section className="px-6 pb-12">
                    <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-5 mb-16">
                        {channels.map((c, i) => (
                            <a
                                key={i}
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 rounded-xl border hologram-card group block text-center"
                                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", textDecoration: "none" }}
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-transform duration-200 group-hover:scale-110"
                                    style={{ backgroundColor: "var(--secondary)" }}
                                >
                                    <c.icon size={20} style={{ color: "var(--primary)" }} />
                                </div>
                                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{c.title}</p>
                                <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{c.desc}</p>
                                <p className="text-xs hologram-link" style={{ color: "var(--primary)" }}>{c.value}</p>
                            </a>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="max-w-xl mx-auto">
                        <div
                            className="p-8 rounded-2xl border hologram-card"
                            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <MessageSquare size={20} style={{ color: "var(--primary)" }} />
                                <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>Send a message</h2>
                            </div>

                            {sent ? (
                                <div
                                    className="p-4 rounded-xl text-center"
                                    style={{ backgroundColor: "rgba(var(--primary-rgb), 0.08)", color: "var(--success)" }}
                                >
                                    <p className="font-semibold">Message sent! ✓</p>
                                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>I'll get back to you as soon as I can.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {[
                                        { label: "Your name", name: "name", type: "text", placeholder: "Kshitij Datir" },
                                        { label: "Email address", name: "email", type: "email", placeholder: "you@example.com" },
                                    ].map((f) => (
                                        <div key={f.name}>
                                            <label className="block text-xs mb-1 font-medium" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                                            <input
                                                type={f.type}
                                                name={f.name}
                                                value={form[f.name]}
                                                onChange={handleChange}
                                                placeholder={f.placeholder}
                                                required
                                                className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 transition-all"
                                                style={{
                                                    backgroundColor: "var(--background)",
                                                    borderColor: "var(--border)",
                                                    color: "var(--text)",
                                                    "--tw-ring-color": "var(--primary)",
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label className="block text-xs mb-1 font-medium" style={{ color: "var(--text-muted)" }}>Message</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Tell us what's on your mind..."
                                            required
                                            className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 transition-all"
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
                                        className="w-full py-3 rounded-lg hologram-btn font-semibold flex items-center justify-center gap-2"
                                        style={{ backgroundColor: "var(--primary)", color: "white" }}
                                    >
                                        <Send size={16} />
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Contact;
