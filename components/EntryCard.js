"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext.js";

export default function EntryCard({
  title,
  titleEn,
  titleKm,
  khmerTitle,
  tag,
  tagKm,
  description,
  descriptionEn,
  descriptionKm,
  story,
  storyEn,
  storyKm,
  contributor,
  contributorEn,
  contributorKm,
  places = [],
  placesEn,
  placesKm,
  imageUrl,
  actionHref,
  actionText,
}) {
  const { language, t } = useLanguage();
  const isKm = language === "km";

  const dTitle = isKm ? (titleKm || khmerTitle || titleEn || title) : (titleEn || title || titleKm);
  const dSubTitle = isKm ? (titleEn || title) : (titleKm || khmerTitle);
  const dTag = isKm ? (tagKm || tag) : (tag || tagKm);
  const dDesc = isKm ? (descriptionKm || descriptionEn || description) : (descriptionEn || description || descriptionKm);
  const dStory = isKm ? (storyKm || storyEn || story) : (storyEn || story || storyKm);
  const dContributor = isKm ? (contributorKm || contributorEn || contributor) : (contributorEn || contributor || contributorKm);
  const dPlaces = (isKm ? (placesKm || placesEn || places) : (placesEn || places || placesKm)) || [];
  const dActionText = actionText || t("viewTimelineBtn");

  const metaLabel = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#1A1A1A",
    marginBottom: 8,
  };

  return (
    <article
      style={{
        backgroundColor: "#F7F5F0",
        border: "1px solid #E5E0D8",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginBottom: 32,
      }}
    >
      {imageUrl && (
        <div style={{ width: "100%", height: "clamp(220px, 32vw, 380px)", overflow: "hidden", backgroundColor: "#E5E0D8" }}>
          <img src={imageUrl} alt={dTitle || "Landmark"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      <div style={{ padding: "clamp(20px, 4vw, 36px)", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          {dTag && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 6 }}>
              {dTag}
            </p>
          )}
          <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2 }}>
            {dTitle}
          </h2>
          {dSubTitle && dSubTitle !== dTitle && (
            <p style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(16px, 2vw, 20px)", color: "#8A8A8A", marginTop: 4 }}>
              {dSubTitle}
            </p>
          )}
          <div style={{ width: 44, height: 2, background: "#C9A96E", marginTop: 12 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {dDesc && (
            <div>
              <p style={metaLabel}>{t("historicalOverview")}</p>
              <p style={{ fontSize: 14, color: "#5A5A5A", lineHeight: 1.8 }}>{dDesc}</p>
            </div>
          )}
          {dStory && (
            <div>
              <p style={metaLabel}>{t("architecturalLegacy")}</p>
              <p style={{ fontSize: 14, color: "#5A5A5A", lineHeight: 1.8 }}>{dStory}</p>
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid #E5E0D8", paddingTop: 18, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
          <div>
            {dContributor && (
              <p style={{ fontSize: 13, color: "#7A7A7A", marginBottom: dPlaces?.length ? 10 : 0 }}>
                <strong style={{ color: "#1A1A1A" }}>{t("contributorLabel")}</strong> {dContributor}
              </p>
            )}
            {dPlaces?.length > 0 && (
              <div>
                <p style={{ ...metaLabel, fontSize: 10, color: "#8A8A8A" }}>{t("featuredLandmarks")}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                  {dPlaces.map((place, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                        fontSize: 12,
                        color: "#2C2C2C",
                        backgroundColor: "#EAE5DB",
                        padding: "4px 12px",
                        borderRadius: 2,
                        border: "1px solid #D8D2C5",
                      }}
                    >
                      {typeof place === "string" ? place : place.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {actionHref && (
            <Link href={actionHref} className="btn-primary" style={{ alignSelf: "flex-end" }}>
              {dActionText}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
