"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext.js";
import LanguageSwitcher from "./LanguageSwitcher.js";
import NavSearch from "./NavSearch.js";
import UserMenu from "./UserMenu.js";
import { createClient } from "../lib/supabase/client.js";

// Routes that render their own standalone, chrome-free layout.
const HIDDEN_ON = ["/login", "/signup"];

export default function NavBar() {
  const pathname = usePathname();
  const { t, isKhmer } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [userEmail, setUserEmail] = useState(null);
  const [isReviewer, setIsReviewer] = useState(false);

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

    async function checkReviewer(session) {
      if (!session) { setIsReviewer(false); return; }
      const { data } = await supabase.rpc("is_reviewer");
      setIsReviewer(data === true);
    }

    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
      checkReviewer(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      checkReviewer(session);
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
    { id: "home", label: t("navMain"), href: "/#home" },
    { id: "archive", label: t("navArchive"), href: "/#archive" },
  ];

  // Signed-in users get My Entries (and Review, for reviewers) right in the
  // main bar so they don't have to hunt for them in the account menu.
  const desktopLinks = [
    ...navLinks,
    ...(userEmail ? [{ id: "my-entries", label: isKhmer ? "សំណង់របស់ខ្ញុំ" : "My Entries", href: "/my-entries" }] : []),
    ...(userEmail && isReviewer ? [{ id: "review", label: isKhmer ? "ជួរពិនិត្យ" : "Review", href: "/review" }] : []),
  ];

  // Section links are active only on the home page; page links by route.
  const isActive = (link) =>
    link.id === "my-entries" || link.id === "review"
      ? pathname === link.href
      : pathname === "/" && activeSection === link.id;

  const handleLinkClick = (id, e) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  // Auth pages render their own clean, chrome-free layout — no nav here.
  if (HIDDEN_ON.includes(pathname)) return null;

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
        <nav style={{ display: "flex", alignItems: "center", width: "100%", gap: 24 }} aria-label={t("navAria")}>
          {/* Primary links (left) */}
          <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {desktopLinks.map((link) => {
              const active = isActive(link);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  style={{
                    fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
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

          {/* Utilities + account (right): search, language, then Contribute / account */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
            <div className="desktop-links" style={{ display: "flex", alignItems: "center" }}>
              <NavSearch />
            </div>
            <LanguageSwitcher />

            {userEmail ? (
              <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: 12, borderLeft: "1px solid #E5E0D8" }}>
                <Link
                  href="/contribute"
                  style={{
                    fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#1A1A1A",
                    backgroundColor: "#C9A96E",
                    padding: "10px 16px",
                    borderRadius: 999,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isKhmer ? "+ ចូលរួម" : "+ Contribute"}
                </Link>
                <UserMenu email={userEmail} isReviewer={isReviewer} onLogout={handleLogout} />
              </div>
            ) : (
              <Link
                href="/login"
                style={{
                  fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#FAFAF8",
                  backgroundColor: "#1A1A1A",
                  padding: "10px 18px",
                  borderRadius: 999,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {isKhmer ? "ចូលគណនី" : "Sign In"}
              </Link>
            )}
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
          </div>
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
          <NavSearch fullWidth onDone={() => setMenuOpen(false)} />
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
          {userEmail && (
            <>
              <Link
                href="/my-entries"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  color: pathname === "/my-entries" ? "#1A1A1A" : "#6A6A6A",
                  textDecoration: "none",
                }}
              >
                {isKhmer ? "សំណង់របស់ខ្ញុំ" : "My Entries"}
              </Link>
              {isReviewer && (
                <Link
                  href="/review"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "8px 0",
                    color: pathname === "/review" ? "#1A1A1A" : "#6A6A6A",
                    textDecoration: "none",
                  }}
                >
                  {isKhmer ? "ជួរពិនិត្យ" : "Review"}
                </Link>
              )}
              <Link
                href="/contribute"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  color: pathname === "/contribute" ? "#1A1A1A" : "#6A6A6A",
                  textDecoration: "none",
                }}
              >
                {isKhmer ? "ដាក់ស្នើសំណង់" : "Contribute"}
              </Link>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                style={{
                  marginTop: 8, padding: "12px 0", background: "none", border: "none",
                  borderTop: "1px solid #E5E0D8", textAlign: "left", cursor: "pointer",
                  fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A3B3B",
                }}
              >
                {isKhmer ? "ចាកចេញ" : "Log out"} · {userEmail}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
