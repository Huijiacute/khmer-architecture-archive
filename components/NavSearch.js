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
      style={{ display: "flex", width: fullWidth ? "100%" : "auto" }}
    >
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={isKhmer ? "ស្វែងរក..." : "Search..."}
        aria-label={label}
        style={{
          width: fullWidth ? "100%" : 170,
          padding: "7px 12px",
          border: "1px solid #D5CFC5",
          borderRight: "none",
          borderRadius: "4px 0 0 4px",
          backgroundColor: "#FFFFFF",
          color: "#1A1A1A",
          fontSize: 12,
          fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      <button
        type="submit"
        aria-label={label}
        style={{
          padding: "7px 12px",
          border: "1px solid #1A1A1A",
          borderRadius: "0 4px 4px 0",
          backgroundColor: "#1A1A1A",
          color: "#FAFAF8",
          fontSize: 13,
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        🔍
      </button>
    </form>
  );
}
