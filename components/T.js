"use client";

import { useLanguage } from "./LanguageContext.js";

// Renders one string in the visitor's language. Lets server components
// (which can't call useLanguage) show English or Khmer text, never both.
export default function T({ en, km }) {
  const { isKhmer } = useLanguage();
  return <>{isKhmer ? km : en}</>;
}
