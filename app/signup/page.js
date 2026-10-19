"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";

// ── Palette (matches the archive: parchment, near-black, sandstone gold) ──
const GOLD = "#C9A96E";
const INK = "#1A1A1A";
const PARCHMENT = "#FAFAF8";

const labelStyle = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: INK,
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #D5CEBF",
  borderRadius: 2,
  color: INK,
  fontSize: 14,
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carry a same-site ?next= onward to the login page so a user who began
  // at "Add entry" lands on /contribute after signing in. External URLs
  // are ignored to avoid open redirects.
  const nextParam = searchParams.get("next");
  const safeNext =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : null;
  const loginHref = safeNext
    ? `/login?next=${encodeURIComponent(safeNext)}`
    : "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!supabaseConfigured) {
      setError("Sign-up is not available yet: Supabase is not configured.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setError(signUpError.message || "Failed to create account");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Failed to create account. Please try again.");
      setLoading(false);
    }
  };

  // Return to the previous page; fall back to home if opened directly.
  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <div
      style={{
        backgroundColor: PARCHMENT,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        color: INK,
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        <button
          type="button"
          onClick={handleBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            marginBottom: 20,
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6A6A6A",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E0D8",
            borderRadius: 4,
            padding: "44px 36px",
            boxShadow: "0 2px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Khmer Living Archive
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif",
              fontSize: "clamp(30px, 4vw, 38px)",
              fontWeight: 700,
              color: INK,
              lineHeight: 1.15,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Join the Archive
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#6A6A6A",
              lineHeight: 1.6,
              marginBottom: 28,
              textAlign: "center",
            }}
          >
            Create a contributor account to document and submit entries.
          </p>

          {error && (
            <div
              role="alert"
              style={{
                backgroundColor: "#FBEDE9",
                border: "1px solid #D98B74",
                color: "#B4452F",
                padding: "12px 14px",
                borderRadius: 2,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {success ? (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div
                style={{
                  backgroundColor: "#F3EEE3",
                  border: "1px solid #D8C9A6",
                  color: INK,
                  padding: "20px 16px",
                  borderRadius: 2,
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                <p style={{ fontWeight: 700, color: "#9A7B33", marginBottom: 6 }}>
                  Account created!
                </p>
                <p style={{ fontSize: 13, color: "#6A6A6A" }}>
                  Check your email to confirm, then sign in to begin contributing.
                </p>
              </div>

              <Link
                href={loginHref}
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  backgroundColor: GOLD,
                  color: INK,
                  borderRadius: 2,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Go to Sign In →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label htmlFor="signup-email" style={labelStyle}>
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="signup-password" style={labelStyle}>
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="signup-confirm" style={labelStyle}>
                  Confirm Password
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 10,
                  padding: "14px 24px",
                  backgroundColor: GOLD,
                  color: INK,
                  border: "none",
                  borderRadius: 2,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </form>
          )}

          <p
            style={{
              marginTop: 26,
              fontSize: 12,
              color: "#8A8A8A",
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Already have an account?{" "}
            <Link
              href={loginHref}
              style={{ color: GOLD, fontWeight: 600, textDecoration: "underline" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  // useSearchParams() requires a Suspense boundary during static generation.
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
