"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageContext.js";
import NavSearchSuggestions from "./NavSearchSuggestions.js";
import { matchTitles, useEntryTitles } from "../lib/useEntryTitles.js";

// Search box for the top navigation. It hands the query to the archive
// search on the home page: if we're already there it scrolls and filters in
// place, otherwise it opens /?q=...#archive.
export default function NavSearch({ fullWidth = false, onDone }) {
  const { isKhmer } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const titles = useEntryTitles(focused);
  const items = matchTitles(titles, value);

  const label = isKhmer ? "ស្វែងរកក្នុងបណ្ណសារ" : "Search the archive";

  function run(term) {
    const q = term.trim().normalize("NFC");
    if (!q) return;
    setOpen(false);

    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("archive-search", { detail: q }));
      document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?q=${encodeURIComponent(q)}#archive`);
    }
    onDone?.();
  }

  function submit(e) {
    e.preventDefault();
    run(value);
  }

  function pick(item) {
    const title = (isKhmer ? item.titleKm || item.titleEn : item.titleEn || item.titleKm) || "";
    setValue(title);
    run(title);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      const step = e.key === "ArrowDown" ? 1 : -1;
      // -1 means "nothing highlighted"; arrows wrap through the list and back to it.
      setActive((a) => {
        const next = a + step;
        if (next < -1) return items.length - 1;
        return next >= items.length ? -1 : next;
      });
    } else if (e.key === "Enter" && open && items[active]) {
      e.preventDefault();
      pick(items[active]);
    }
  }

  return (
    <div style={{ position: "relative", width: fullWidth ? "100%" : undefined }}>
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
        onChange={(e) => { setValue(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => { setFocused(true); setOpen(true); }}
        onBlur={() => { setFocused(false); setOpen(false); }}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-controls="nav-search-list"
        autoComplete="off"
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
    {open && focused && (
      <NavSearchSuggestions id="nav-search-list" items={items} query={value} activeIndex={active} isKhmer={isKhmer} onPick={pick} />
    )}
    </div>
  );
}
