"use client";

import { useLanguage } from "./LanguageContext.js";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const wrapStyle = {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#EFECE6",
    borderRadius: 20,
    padding: "3px 4px",
    gap: 2,
    border: "1px solid #D5CFC5",
  };

  const btnStyle = (active) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: active ? 700 : 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "6px 14px",
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    minHeight: 36,
    minWidth: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: active ? "#1A1A1A" : "transparent",
    color: active ? "#FAFAF8" : "#6A6A6A",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={wrapStyle}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        style={btnStyle(language === "en")}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("km")}
        style={{
          ...btnStyle(language === "km"),
          fontFamily: "'Kantumruy Pro', 'Inter', sans-serif",
        }}
        aria-pressed={language === "km"}
        aria-label="ប្តូរទៅជាភាសាខ្មែរ (Switch to Khmer)"
      >
        ខ្មែរ
      </button>
    </div>
  );
}
