"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../lib/translations.js";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: () => "",
  isKhmer: false,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("archive_lang");
      if (saved === "km" || saved === "en") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else if (navigator.language && navigator.language.startsWith("km")) {
        setLanguageState("km");
        document.documentElement.lang = "km";
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const setLanguage = (lang) => {
    const valid = lang === "km" ? "km" : "en";
    setLanguageState(valid);
    try {
      localStorage.setItem("archive_lang", valid);
      document.documentElement.lang = valid;
    } catch {
      // Ignore localStorage errors in private browsing
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "km" : "en");
  };

  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] ?? translations.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isKhmer: language === "km",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
