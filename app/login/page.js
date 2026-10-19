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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Only honor same-site relative paths (must start with a single "/").
  // This prevents open-redirects to external URLs via ?next=.
  const nextParam = searchParams.get("next");
  const redirectTo =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Deliberately generic: never reveal whether the email exists or
        // the password was wrong. Log the real cause for debugging only.
        console.error("Login failed:", signInError);
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  // Go back to wherever the user came from; fall back to home if there's
  // no history (e.g. they opened /login directly).
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
            Sign In
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
            Access contributor features and your archive entries.
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

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label htmlFor="login-email" style={labelStyle}>
                Email Address
              </label>
              <input
                id="login-email"
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
              <label htmlFor="login-password" style={labelStyle}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p
            style={{
              marginTop: 26,
              fontSize: 12,
              color: "#8A8A8A",
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href={nextParam ? `/signup?next=${encodeURIComponent(redirectTo)}` : "/signup"}
              style={{ color: GOLD, fontWeight: 600, textDecoration: "underline" }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  // useSearchParams() requires a Suspense boundary during static generation.
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
