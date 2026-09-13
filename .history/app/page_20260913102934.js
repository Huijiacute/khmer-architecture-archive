"use client";

import Link from "next/link";
import collection from "../collection.config.js";
import landmarks from "../lib/landmarks.js";
import EntryCard from "../components/EntryCard.js";
import SmallEntryCard from "../components/SmallEntryCard.js";
import ArchiveSection from "../components/ArchiveSection.js";
import MapSection from "../components/MapSection.js";
import { useLanguage } from "../components/LanguageContext.js";

/* ── Hero section ─────────────────────────────────────── */
function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero-section">
      <div className="hero-content-center">
        <p className="section-label animate-slide-up delay-1" style={{ color: "#D4AF37", marginBottom: 18 }}>
          {t("heroTag")}
        </p>

        <h1 className="animate-slide-up delay-2" style={{ lineHeight: 1.05, marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif",
              fontSize: "clamp(42px, 6vw, 84px)",
              fontWeight: 300,
              color: "#E8E3DC",
              display: "block",
              letterSpacing: "0.02em",
            }}
          >
            {t("heroTitleLight")}
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif",
              fontSize: "clamp(42px, 6vw, 84px)",
              fontWeight: 700,
              color: "#FFFFFF",
              display: "block",
              letterSpacing: "0.02em",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)",
            }}
          >
            {t("heroTitleBold")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-slide-up delay-3"
          style={{
            fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
            fontSize: 16,
            color: "#E2DCD5",
            lineHeight: 1.8,
            marginBottom: 36,
            maxWidth: 580,
            textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          {t("heroSubtitle")}
        </p>

        <div className="animate-slide-up delay-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
          <a
            href="#archive"
            className="btn-primary"
            style={{
              background: "#C9A96E",
              color: "#1A1A1A",
              fontWeight: 700,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {t("exploreArchive")}
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#C9A96E" }}>01</span>
            <div style={{ width: 40, height: 1, background: "rgba(201, 169, 110, 0.5)" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#C9A96E" }}>
              {landmarks.length.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ── Mission pillars ─────────────────────────────────────── */
function Mission() {
  const { t } = useLanguage();

  const pillars = [
    { n: "1", title: t("missionDocTitle"), text: t("missionDocText") },
    { n: "2", title: t("missionPresTitle"), text: t("missionPresText") },
  ];

  return (
    <section style={{ backgroundColor: "#F3EFE9", padding: "80px 20px" }}>
      <div className="container">
        <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "#1A1A1A", marginBottom: 48 }}>
          {t("missionHeading")}
        </h2>
        <div className="mission-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {pillars.map((p) => (
            <div key={p.n} style={{ display: "flex", gap: 20 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(54px, 6vw, 76px)", fontWeight: 300, color: "#D9D2C7", lineHeight: 1, width: 50, flexShrink: 0 }}>
                {p.n}
              </span>
              <div>
                <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  {p.title}
                </p>
                <p style={{ fontSize: 14, color: "#6A6A6A", lineHeight: 1.8 }}>
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page export ─────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedEntrySection />
      <RufaEntrySection />
      <Mission />
      <ArchiveSection />
      <MapSection />
    </>
  );
}
