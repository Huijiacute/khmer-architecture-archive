"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext.js";

const GOLD = "#C9A96E";
const INK = "#1A1A1A";

// Shown in place of the contribute form after a successful submission.
export default function SubmitSuccess({ title, onAnother }) {
  const { isKhmer } = useLanguage();
  const headingRef = useRef(null);

  // Move focus and view to the confirmation (keyboard / screen-reader friendly).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    headingRef.current?.focus();
  }, []);

  const font = "'Inter', 'Kantumruy Pro', sans-serif";
  const btn = {
    display: "inline-block", padding: "14px 26px", fontFamily: font, fontSize: 11, fontWeight: 700,
    letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer",
    borderRadius: 2, border: `1px solid ${INK}`,
  };

  return (
    <div
      role="status"
      style={{
        backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4,
        padding: "clamp(32px, 6vw, 56px) clamp(24px, 5vw, 48px)", textAlign: "center",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 64, height: 64, borderRadius: "50%", margin: "0 auto 24px",
          backgroundColor: "#EAF4EA", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5 13 10 18 19 7" />
        </svg>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: INK, marginBottom: 12, outline: "none" }}
      >
        {isKhmer ? "បានដាក់ស្នើដោយជោគជ័យ" : "Entry submitted"}
      </h2>

      {title && (
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: GOLD, marginBottom: 12 }}>“{title}”</p>
      )}

      <p style={{ fontFamily: font, fontSize: 15, color: "#6A6A6A", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>
        {isKhmer
          ? "សំណង់របស់អ្នកកំពុងរង់ចាំការពិនិត្យ។ វានឹងបង្ហាញលើបណ្ណសារនៅពេលអ្នកត្រួតពិនិត្យអនុម័ត។ អ្នកអាចតាមដានស្ថានភាពក្នុង «សំណង់របស់ខ្ញុំ»។"
          : "It's now waiting for review and will appear in the archive once a reviewer approves it. You can follow its status in My Entries."}
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/my-entries" style={{ ...btn, backgroundColor: INK, color: "#FAFAF8" }}>
          {isKhmer ? "មើលសំណង់របស់ខ្ញុំ" : "View My Entries"}
        </Link>
        <button type="button" onClick={onAnother} style={{ ...btn, backgroundColor: "#FFFFFF", color: INK }}>
          {isKhmer ? "ដាក់ស្នើសំណង់ផ្សេងទៀត" : "Submit another"}
        </button>
      </div>
    </div>
  );
}
