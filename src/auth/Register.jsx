import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, googleLogin } from "./authApi";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import { useGoogleLogin } from "@react-oauth/google";

function Register() {
  const { login, token, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Remove the aggressive global redirect here, because we handle navigation explicitly
  // in the handleSubmit and loginWithGoogle success handlers.
  // useEffect(() => {
  //   if (!loading && token) navigate("/home", { replace: true });
  // }, [token, loading, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await registerUser(form);
      login(data.token);
      if (data.isNewUser) {
        navigate("/profile", { replace: true, state: { editMode: true } });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setSubmitting(true);
        setError("");
        const data = await googleLogin(tokenResponse.credential || tokenResponse.access_token);
        login(data.token);
        if (data.isNewUser) {
          navigate("/profile", { replace: true, state: { editMode: true } });
        } else {
          navigate("/home", { replace: true });
        }
      } catch (err) {
        setError(err.message || "Google signup failed");
      } finally {
        setSubmitting(false);
      }
    },
    onError: () => {
      setError("Google Signup Failed");
    },
  });

  return (
    <AuthLayout title="Join ProjectMate" subtitle="Create an account to get started">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-2xl font-bold text-center" style={{ color: 'var(--text)' }}>Sign Up</h2>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Full name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              '--tw-ring-color': 'var(--primary)'
            }}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              '--tw-ring-color': 'var(--primary)'
            }}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              '--tw-ring-color': 'var(--primary)'
            }}
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            style={{ accentColor: 'var(--primary)' }}
          />
          <label htmlFor="terms" className="ml-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            I agree to the{" "}
            <a href="/terms" className="hologram-link" style={{ color: 'var(--primary)' }}>
              Terms & Conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full hologram-btn py-3 rounded-md font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>

        {/* Social login - simple text buttons (no icons) */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: 'var(--border)' }}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
              Or register with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            disabled={submitting}
            className="w-full py-2 px-4 border rounded-md hologram-btn font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign up with Google
          </button>
        </div>

        <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{" "}
          <Link to="/login" className="hologram-link font-medium" style={{ color: 'var(--primary)' }}>
            Log in
          </Link>
        </p>

        <div className="text-center">
          <Link to="/" className="hologram-link text-sm" style={{ color: 'var(--text-muted)' }}>
            ← Back to website
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Register;