"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext.js";
import LanguageSwitcher from "./LanguageSwitcher.js";
import { createClient } from "../lib/supabase/client.js";

export default function NavBar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [userEmail, setUserEmail] = useState(null);

  // Only talk to Supabase if it's configured; otherwise degrade to logged-out.
  const supabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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

  // Load current auth session and keep it in sync on login/logout.
  useEffect(() => {
    if (!supabaseConfigured) return;

    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!supabaseConfigured) return;

    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
  };

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
        zIndex: 1000,
        width: "100%",
        backgroundColor: scrolled ? "rgba(250, 250, 248, 0.92)" : "rgba(250, 250, 248, 0.98)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(229, 224, 216, 0.9)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 20px -2px rgba(0, 0, 0, 0.06)" : "0 0 0 rgba(0,0,0,0)",
        transition: "background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          height: scrolled ? 54 : 64,
          transition: "height 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
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

          {/* Auth: signed-in user or sign in / sign up links */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 4 }}>
            {userEmail ? (
              <>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#1A1A1A",
                    maxWidth: 180,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={userEmail}
                >
                  {userEmail}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "1px solid #D5CFC5",
                    borderRadius: 4,
                    color: "#1A1A1A",
                    padding: "7px 14px",
                    fontSize: 11,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#8A8A8A",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#1A1A1A",
                    border: "1px solid #1A1A1A",
                    padding: "7px 14px",
                    textDecoration: "none",
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
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
