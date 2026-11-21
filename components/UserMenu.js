"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext.js";

// Account dropdown: avatar button that opens email, My Entries, Review
// (reviewers only) and Log out. Closes on outside click and Escape.
export default function UserMenu({ email, isReviewer, onLogout }) {
  const { isKhmer } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = {
    display: "block", width: "100%", textAlign: "left", padding: "10px 16px",
    background: "none", border: "none", cursor: "pointer", textDecoration: "none",
    fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, color: "#1A1A1A",
    boxSizing: "border-box",
  };
  const hover = (on) => (e) => { e.currentTarget.style.backgroundColor = on ? "#F5F2EC" : "transparent"; };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={isKhmer ? "ម៉ឺនុយគណនី" : "Account menu"}
        style={{
          width: 34, height: 34, borderRadius: "50%", border: "1px solid #D5CFC5",
          backgroundColor: open ? "#1A1A1A" : "#EFECE6", color: open ? "#FAFAF8" : "#1A1A1A",
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer",
          transition: "background-color 0.2s ease, color 0.2s ease",
        }}
      >
        {(email || "?").charAt(0).toUpperCase()}
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute", right: 0, top: 44, minWidth: 220, zIndex: 1100,
            backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 6,
            boxShadow: "0 12px 32px -8px rgba(0,0,0,0.15)", padding: "6px 0",
          }}
        >
          <div style={{ padding: "10px 16px 12px", borderBottom: "1px solid #F0EBE1" }}>
            <div style={{ fontSize: 11, color: "#8A8A8A", marginBottom: 2 }}>
              {isKhmer ? "បានចូលជា" : "Signed in as"}
            </div>
            <div title={email} style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {email}
            </div>
          </div>
          <Link href="/my-entries" role="menuitem" onClick={() => setOpen(false)} style={item} onMouseEnter={hover(true)} onMouseLeave={hover(false)}>
            {isKhmer ? "សំណង់របស់ខ្ញុំ" : "My Entries"}
          </Link>
          {isReviewer && (
            <Link href="/review" role="menuitem" onClick={() => setOpen(false)} style={item} onMouseEnter={hover(true)} onMouseLeave={hover(false)}>
              {isKhmer ? "ជួរពិនិត្យ" : "Review Queue"}
            </Link>
          )}
          <div style={{ borderTop: "1px solid #F0EBE1", marginTop: 4, paddingTop: 4 }}>
            <button type="button" role="menuitem" onClick={() => { setOpen(false); onLogout(); }} style={item} onMouseEnter={hover(true)} onMouseLeave={hover(false)}>
              {isKhmer ? "ចាកចេញ" : "Log out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
