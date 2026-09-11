"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext.js";
import LanguageSwitcher from "./LanguageSwitcher.js";

export default function NavBar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: t("navMain"), href: "/" },
    { label: t("navArchive"), href: "/archive" },
    { label: t("navTimeline"), href: "/timeline" },
    { label: t("navMap"), href: "/map" },
  ];

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
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.02em" }}>
          KLA
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }} aria-label={t("navAria")}>
          <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: active ? "#1A1A1A" : "#8A8A8A",
                    paddingBottom: 3,
                    borderBottom: active ? "1.5px solid #C9A96E" : "1.5px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
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
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "8px 0",
                color: pathname === link.href ? "#1A1A1A" : "#6A6A6A",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
