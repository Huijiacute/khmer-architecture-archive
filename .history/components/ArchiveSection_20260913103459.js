"use client";

import { useState } from "react";
import entries from "../data/entries.js";
import EntryCard from "./EntryCard.js";
import { useLanguage } from "./LanguageContext.js";

export default function ArchiveSection() {
  const { t, isKhmer } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isClearHovered, setIsClearHovered] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = entries.filter((entry) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchableCorpus = [
      entry.title,
      entry.titleEn,
      entry.titleKm,
      entry.name,
      entry.nameKhmer,
      entry.khmerTitle,
      entry.description,
      entry.descriptionEn,
      entry.descriptionKm,
      entry.story,
      entry.storyEn,
      entry.storyKm,
      entry.location,
      entry.locationEn,
      entry.locationKm,
      entry.era,
      entry.eraEn,
      entry.eraKm,
      entry.year,
      entry.yearEn,
      entry.yearKm,
      entry.contributor,
      entry.contributorEn,
      entry.contributorKm,
      Array.isArray(entry.places) ? entry.places.join(" ") : "",
      Array.isArray(entry.placesEn) ? entry.placesEn.join(" ") : "",
      Array.isArray(entry.placesKm) ? entry.placesKm.join(" ") : "",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableCorpus.includes(normalizedQuery);
  });

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const suggestions = isKhmer
    ? ["អង្គរវត្ត", "ប្រាសាទបាយ័ន", "វិមានឯករាជ្យ", "វណ្ណ ម៉ូលីវណ្ណ", "ពហុកីឡដ្ឋានជាតិ"]
    : ["Angkor Wat", "Bayon", "Olympic Stadium", "Vann Molyvann", "Independence Monument"];

  return (
    <section id="archive" style={{ padding: "60px 0 80px", backgroundColor: "#FAFAF8" }}>
      {/* ── Section Header ── */}
      <div className="container" style={{ paddingBottom: 32 }}>
        <p className="section-label">{t("navArchive")}</p>
        <h2 style={{ lineHeight: 1.05, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, color: "#BABAB0", display: "block" }}>
            {t("archiveTitleLight")}
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, color: "#1A1A1A", display: "block" }}>
            {t("archiveTitleBold")}
          </span>
        </h2>

        <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: "clamp(14px, 2vw, 16px)", color: "#7A7A7A", lineHeight: 1.7, marginBottom: 32, maxWidth: 640 }}>
          {t("archiveSubtitle")}
        </p>

        {/* ── Search Bar ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "stretch", width: "100%", maxWidth: 680 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: "1 1 280px",
              minHeight: 48,
              border: "1px solid #D0C9BF",
              backgroundColor: "#FFFFFF",
              paddingRight: 6,
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchAria")}
              style={{
                flex: 1,
                fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                fontSize: 14,
                color: "#1A1A1A",
                backgroundColor: "transparent",
                border: "none",
                padding: "12px 16px",
                outline: "none",
                width: "100%",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                onMouseEnter={() => setIsClearHovered(true)}
                onMouseLeave={() => setIsClearHovered(false)}
                style={{
                  fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: isClearHovered ? "#1A1A1A" : "#8A8A8A",
                  backgroundColor: isClearHovered ? "#EAE5DB" : "transparent",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 2,
                  cursor: "pointer",
                  minHeight: 36,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexShrink: 0,
                }}
                aria-label={t("clearBtn")}
              >
                ✕ {t("clearBtn")}
              </button>
            )}
          </div>

          <button
            type="button"
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            aria-label={t("searchBtn")}
            style={{
              fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              backgroundColor: isSearchHovered ? "#C9A96E" : "#1A1A1A",
              color: "#FAFAF8",
              border: "none",
              padding: "14px 28px",
              minHeight: 48,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <span>{t("searchBtn")}</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* ── Results Container ── */}
      <div className="container" style={{ paddingTop: 16 }}>

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div
            style={{
              padding: "clamp(36px, 6vw, 64px) 20px",
              textAlign: "center",
              backgroundColor: "#F7F5F0",
              border: "1px solid #E5E0D8",
              borderRadius: 4,
              margin: "24px 0 48px",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 16 }} role="img" aria-label="Cambodian temple icon">
              🏛️
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 700, color: "#1A1A1A", marginBottom: 12 }}>
              {t("emptyTitle")}
            </h3>
            <p style={{ fontSize: 14, color: "#5A5A5A", maxWidth: 540, margin: "0 auto 24px", lineHeight: 1.8 }}>
              {t("emptyDesc").replace("{query}", searchQuery)}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 32 }}>
              <span style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8A8A" }}>
                {t("trySearching")}
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSearchQuery(s)}
                  style={{
                    fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                    fontSize: 12,
                    color: "#1A1A1A",
                    backgroundColor: "#EAE5DB",
                    border: "1px solid #D0C9BF",
                    padding: "6px 14px",
                    borderRadius: 16,
                    cursor: "pointer",
                    minHeight: 36,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="btn-primary"
            >
              {t("browseAllBtn")}
            </button>
          </div>
        )}

        {/* ── Render List of Entries ── */}
        <div>
          {filtered.map((entry) => (
            <EntryCard
              key={entry.id}
              title={entry.title || entry.name}
              titleEn={entry.titleEn || entry.title}
              titleKm={entry.titleKm || entry.khmerTitle || entry.nameKhmer}
              khmerTitle={entry.khmerTitle || entry.nameKhmer}
              tag={`${entry.eraEn || entry.era} · ${entry.locationEn || entry.location} · ${entry.yearEn || entry.year}`}
              tagKm={`${entry.eraKm || entry.era} · ${entry.locationKm || entry.location} · ${entry.yearKm || entry.year}`}
              description={entry.description}
              descriptionEn={entry.descriptionEn || entry.description}
              descriptionKm={entry.descriptionKm}
              story={entry.story}
              storyEn={entry.storyEn || entry.story}
              storyKm={entry.storyKm}
              contributor={entry.contributor}
              contributorEn={entry.contributorEn || entry.contributor}
              contributorKm={entry.contributorKm}
              places={entry.places}
              placesEn={entry.placesEn || entry.places}
              placesKm={entry.placesKm}
              imageUrl={entry.imageUrl}
              actionHref="/timeline"
              actionText={t("viewTimelineBtn")}
            />
          ))}
        </div>

        {/* ── Result Count & Bottom Status ── */}
        {filtered.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 24, borderTop: "1px solid #E5E0D8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700 }}>01</span>
              <span style={{ color: "#C9A96E" }}>/</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#9A9A9A" }}>
                {String(filtered.length).padStart(2, "0")}
              </span>
            </div>
            <span style={{ fontSize: 13, color: "#8A8A8A" }}>
              {t("allEntriesLoaded")}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
