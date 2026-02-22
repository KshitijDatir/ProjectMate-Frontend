import { useNavigate } from "react-router-dom";
import { Users, Target, Zap, Heart, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Palette } from "lucide-react";

const values = [
    {
        icon: Users,
        title: "Community First",
        desc: "Built by students, for students. Every feature comes from real collaboration needs.",
    },
    {
        icon: Target,
        title: "Purposeful Matching",
        desc: "We connect people by skills and goals — not just names on a list.",
    },
    {
        icon: Zap,
        title: "Move Fast",
        desc: "Apply in seconds. No lengthy forms, no gatekeeping. Just build.",
    },
    {
        icon: Heart,
        title: "Open & Honest",
        desc: "Transparent applications, real feedback, and clear project status at all times.",
    },
];

function About() {
    const navigate = useNavigate();
    const { mode, toggleMode, toggleScheme } = useTheme();

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
                {/* Hero */}
                <section className="py-24 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <span
                            className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-6 hologram-btn"
                            style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                        >
                            About Us
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--text)" }}>
                            We believe every student deserves{" "}
                            <span style={{ color: "var(--accent)" }}>great collaborators</span>
                        </h1>
                        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            ProjectMate was born from a simple frustration — finding the right teammate for a project
                            was harder than building the project itself. So we built the platform we wished existed in college.
                        </p>
                    </div>
                </section>

                {/* Story */}
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="p-8 rounded-2xl border hologram-card"
                            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                        >
                            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                                Our Story
                            </h2>
                            <p className="leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                                You know the feeling. You get a great idea for a hackathon, a side hustle, or a final year project.
                                You're excited to build it. But then you realize you need a frontend person, or someone who knows
                                machine learning, or just someone as dedicated as you are. So you post in chaotic college WhatsApp groups,
                                ask around in lectures, and get a bunch of "maybe next time" replies.
                            </p>
                            <p className="leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                                I built ProjectMate because I was living that exact frustration. As a solo student developer
                                learning full-stack, I realized that the biggest barrier to building great things isn't the code —
                                it's finding the right people to write it with.
                            </p>
                            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                This platform isn't some corporate product; it's a living project built by a student, for students.
                                Every feature — the direct applications, the skill matching, the simple UI — comes from exactly what
                                I wished existed when I was looking for a team. I'm learning and shipping in public, so as I grow
                                as a developer, this platform grows to serve you better.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "var(--text)" }}>
                            What we stand for
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {values.map((v, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-xl border hologram-card group cursor-default"
                                    style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                                        style={{ backgroundColor: "var(--secondary)" }}
                                    >
                                        <v.icon size={20} style={{ color: "var(--primary)" }} />
                                    </div>
                                    <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{v.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6 text-center">
                    <div className="max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                            Ready to find your team?
                        </h2>
                        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
                            Join thousands of students already building on ProjectMate.
                        </p>
                        <button
                            onClick={() => navigate("/register")}
                            className="px-8 py-3 rounded-xl hologram-btn font-semibold inline-flex items-center gap-2"
                            style={{ backgroundColor: "var(--primary)", color: "white" }}
                        >
                            Create Free Account
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default About;
