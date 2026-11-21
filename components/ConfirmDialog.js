"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext.js";

const INK = "#1A1A1A";
const DANGER = "#B4452F";

// Modal confirmation. Closes on Escape and backdrop click; focus starts on
// Cancel (the safe choice) so a stray Enter never deletes anything.
export default function ConfirmDialog({ open, title, message, itemName, confirmLabel, busy, error, onConfirm, onCancel }) {
  const { isKhmer } = useLanguage();
  const cancelRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape" && !busy) onCancel(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, busy, onCancel]);

  if (!open) return null;

  const font = "'Inter', 'Kantumruy Pro', sans-serif";
  const btn = {
    padding: "12px 22px", fontFamily: font, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", borderRadius: 2, cursor: busy ? "not-allowed" : "pointer",
  };

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) onCancel(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 2000, backgroundColor: "rgba(26,26,26,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        style={{
          width: "100%", maxWidth: 440, backgroundColor: "#FFFFFF", borderRadius: 6,
          padding: "32px 28px 24px", boxShadow: "0 24px 60px -12px rgba(0,0,0,0.35)", fontFamily: font,
        }}
      >
        <div
          aria-hidden="true"
          style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#FBEDE9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DANGER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>

        <h2 id="confirm-title" style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 26, fontWeight: 700, color: INK, marginBottom: 8 }}>
          {title}
        </h2>
        {itemName && (
          <p style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8, wordBreak: "break-word" }}>“{itemName}”</p>
        )}
        <p id="confirm-desc" style={{ fontSize: 14, color: "#6A6A6A", lineHeight: 1.7, marginBottom: error ? 14 : 24 }}>{message}</p>

        {error && (
          <div role="alert" style={{ backgroundColor: "#FBEDE9", border: "1px solid #D98B74", color: DANGER, padding: "10px 12px", borderRadius: 2, fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button ref={cancelRef} type="button" onClick={onCancel} disabled={busy} style={{ ...btn, backgroundColor: "#FFFFFF", color: INK, border: `1px solid ${INK}` }}>
            {isKhmer ? "បោះបង់" : "Cancel"}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ ...btn, backgroundColor: hover && !busy ? "#8F3322" : DANGER, color: "#FFFFFF", border: `1px solid ${hover && !busy ? "#8F3322" : DANGER}`, opacity: busy ? 0.7 : 1 }}
          >
            {busy ? (isKhmer ? "កំពុងលុប…" : "Deleting…") : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
