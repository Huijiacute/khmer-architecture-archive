"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client.js";

const labelStyle = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#E8E3DC",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  backgroundColor: "#11100E",
  border: "1px solid rgba(201, 169, 110, 0.3)",
  color: "#FAFAF8",
  fontSize: 14,
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

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

  return (
    <div
      style={{
        backgroundColor: "#161412",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        color: "#FAFAF8",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          backgroundColor: "#1C1A17",
          border: "1px solid rgba(201, 169, 110, 0.25)",
          padding: "44px 36px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4AF37",
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
            color: "#FFFFFF",
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
            color: "#E2DCD5",
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
              backgroundColor: "rgba(220, 38, 38, 0.15)",
              border: "1px solid rgba(220, 38, 38, 0.4)",
              color: "#FCA5A5",
              padding: "12px 14px",
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
                backgroundColor: "rgba(201, 169, 110, 0.15)",
                border: "1px solid rgba(201, 169, 110, 0.4)",
                color: "#E8E3DC",
                padding: "20px 16px",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              <p style={{ fontWeight: 600, color: "#D4AF37", marginBottom: 6 }}>
                Account created!
              </p>
              <p style={{ fontSize: 13, color: "#E2DCD5" }}>
                Check your email to confirm, then sign in to begin contributing.
              </p>
            </div>

            <Link
              href="/login"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                backgroundColor: "#C9A96E",
                color: "#1A1A1A",
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
                backgroundColor: "#C9A96E",
                color: "#1A1A1A",
                border: "none",
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
            href="/login"
            style={{
              color: "#C9A96E",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}