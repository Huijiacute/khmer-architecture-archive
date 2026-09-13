"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext.js";
import LanguageSwitcher from "./LanguageSwitcher.js";

export default function NavBar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine which section is currently in view
      const sections = ["home", "archive", "map"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "home", label: t("navMain"), href: "#home" },
    { id: "archive", label: t("navArchive"), href: "#archive" },
    { id: "map", label: t("navMap"), href: "#map" },
  ];

  const handleLinkClick = (id, e) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#FAFAF8",
        borderBottom: scrolled ? "1px solid #E5E0D8" : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: 64 }}>
        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }} aria-label={t("navAria")}>
          <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: active ? "#1A1A1A" : "#8A8A8A",
                    paddingBottom: 3,
                    borderBottom: active ? "1.5px solid #C9A96E" : "1.5px solid transparent",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <LanguageSwitcher />

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
            style={{
              display: "none",
              background: "none",
              border: "1px solid #D5CFC5",
              borderRadius: 4,
              padding: "8px 10px",
              minHeight: 44,
              minWidth: 44,
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid #E5E0D8",
            backgroundColor: "#FAFAF8",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleLinkClick(link.id, e)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "8px 0",
                color: activeSection === link.id ? "#1A1A1A" : "#6A6A6A",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
