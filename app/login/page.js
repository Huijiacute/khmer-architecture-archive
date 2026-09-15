"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(signInError.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Invalid email or password");
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
          Sign In
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
          Access contributor features and your archive entries.
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
          Don't have an account?{" "}
          <Link
            href="/signup"
            style={{
              color: "#C9A96E",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}