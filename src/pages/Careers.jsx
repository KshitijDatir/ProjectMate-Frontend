import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Rocket, Globe, BookOpen, Zap, Inbox } from "lucide-react";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Palette } from "lucide-react";

const perks = [
    { icon: Rocket, title: "Work on something real", desc: "Every line of code you write impacts thousands of students." },
    { icon: Globe, title: "Remote-first", desc: "Work from anywhere. We care about output, not office time." },
    { icon: BookOpen, title: "Learning budget", desc: "Books, courses, conferences — we invest in you." },
    { icon: Zap, title: "Move fast", desc: "Small team, big impact. No bureaucracy, no red tape." },
];


function Careers() {
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
                    <div className="max-w-2xl mx-auto">
                        <span
                            className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-6 hologram-btn"
                            style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                        >
                            We're hiring
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--text)" }}>
                            Help us change how{" "}
                            <span style={{ color: "var(--accent)" }}>students collaborate</span>
                        </h1>
                        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            We're a small, fast-moving team building tools for the next generation of builders.
                            If that sounds like your kind of work, we'd love to meet you.
                        </p>
                    </div>
                </section>

                {/* Perks */}
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 mb-8">
                            <Sparkles size={20} style={{ color: "var(--primary)" }} />
                            <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Why join us</h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {perks.map((p, i) => (
                                <div
                                    key={i}
                                    className="p-5 rounded-xl border hologram-card flex items-start gap-4"
                                    style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: "var(--secondary)" }}
                                    >
                                        <p.icon size={18} style={{ color: "var(--primary)" }} />
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-1" style={{ color: "var(--text)" }}>{p.title}</p>
                                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Roles */}
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl font-bold mb-8" style={{ color: "var(--text)" }}>Open roles</h2>
                        <div
                            className="p-10 rounded-2xl border text-center hologram-card"
                            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: "var(--secondary)" }}
                            >
                                <Inbox size={28} style={{ color: "var(--primary)" }} />
                            </div>
                            <p className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                                No open roles right now
                            </p>
                            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
                                We don't have any open positions at the moment, but we're always
                                interested in hearing from talented people. Send us a note and we'll
                                reach out when something opens up.
                            </p>
                            <button
                                onClick={() => navigate("/contact")}
                                className="px-6 py-2 rounded-lg hologram-btn font-medium inline-flex items-center gap-2 text-sm"
                                style={{ backgroundColor: "var(--primary)", color: "white" }}
                            >
                                Get in touch <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Careers;
