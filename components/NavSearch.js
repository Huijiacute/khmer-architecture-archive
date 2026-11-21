"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageContext.js";

// Search box for the top navigation. It hands the query to the archive
// search on the home page: if we're already there it scrolls and filters in
// place, otherwise it opens /?q=...#archive.
export default function NavSearch({ fullWidth = false, onDone }) {
  const { isKhmer } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const label = isKhmer ? "ស្វែងរកក្នុងបណ្ណសារ" : "Search the archive";

  function submit(e) {
    e.preventDefault();
    const q = value.trim().normalize("NFC");
    if (!q) return;

    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("archive-search", { detail: q }));
      document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?q=${encodeURIComponent(q)}#archive`);
    }
    onDone?.();
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: fullWidth ? "100%" : focused || value ? 220 : 170,
        padding: "0 12px",
        height: 34,
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        border: `1px solid ${focused ? "#C9A96E" : "#E5E0D8"}`,
        borderRadius: 999,
        transition: "width 0.25s ease, border-color 0.2s ease",
      }}
    >
      <button
        type="submit"
        aria-label={label}
        style={{
          display: "flex",
          alignItems: "center",
          padding: 0,
          border: "none",
          background: "none",
          color: focused ? "#1A1A1A" : "#8A8A8A",
          cursor: "pointer",
          transition: "color 0.2s ease",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={isKhmer ? "ស្វែងរក" : "Search"}
        aria-label={label}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          color: "#1A1A1A",
          fontSize: 12,
          fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
          letterSpacing: "0.02em",
        }}
      />
    </form>
  );
}
