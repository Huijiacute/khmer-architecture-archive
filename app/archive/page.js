"use client";

import { useState } from "react";
import Link from "next/link";
import landmarks from "../../lib/landmarks.js";

const eras = ["All", "Pre-Angkorian", "Angkorian", "Post-Angkorian", "New Khmer", "Contemporary"];

export default function ArchivePage() {
  const [activeEra, setActiveEra] = useState("All");

  const filtered =
    activeEra === "All"
      ? landmarks
      : landmarks.filter((l) => l.era === activeEra);

  /* ── styles ── */
  const pageHeader = {
    padding: "80px 40px 60px",
    maxWidth: 1200,
    margin: "0 auto",
    borderBottom: "1px solid #E5E0D8",
  };

  const lightTitle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(48px, 7vw, 96px)",
    fontWeight: 300,
    color: "#BABAB0",
    lineHeight: 1.0,
    display: "block",
  };

  const boldTitle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(48px, 7vw, 96px)",
    fontWeight: 700,
    color: "#1A1A1A",
    lineHeight: 1.0,
    display: "block",
    marginBottom: 48,
  };

  const filterBar = {
    display: "flex",
    gap: 4,
    flexWrap: "wrap",
  };

  const filterBtn = (era) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "10px 20px",
    border: "1px solid",
    borderColor: activeEra === era ? "#1A1A1A" : "#D0C9BF",
    backgroundColor: activeEra === era ? "#1A1A1A" : "transparent",
    color: activeEra === era ? "#FAFAF8" : "#6A6A6A",
    cursor: "pointer",
    transition: "all 0.2s ease",
  });

  const listWrap = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px 80px",
  };

  /* Card row: alternating image-left / image-right (always left for simplicity) */
  const card = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 0,
    borderBottom: "1px solid #E5E0D8",
    minHeight: 320,
  };

  const cardImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const cardBody = {
    padding: "48px 48px 48px 60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const eraTag = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 16,
  };

  const cardTitle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 36,
    fontWeight: 600,
    color: "#1A1A1A",
    marginBottom: 8,
    lineHeight: 1.1,
  };

  const cardKhmer = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 18,
    fontWeight: 300,
    color: "#9A9A9A",
    marginBottom: 20,
  };

  const cardDesc = {
    fontSize: 14,
    color: "#6A6A6A",
    lineHeight: 1.85,
    marginBottom: 28,
    maxWidth: 400,
  };

  const viewMore = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#1A1A1A",
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  };

  const locationTag = {
    fontSize: 12,
    color: "#9A9A9A",
    marginBottom: 4,
  };

  return (
    <>
      <div style={pageHeader}>
        <span style={lightTitle}>Our</span>
        <span style={boldTitle}>Archive</span>
        <div style={filterBar}>
          {eras.map((era) => (
            <button
              key={era}
              style={filterBtn(era)}
              onClick={() => setActiveEra(era)}
              aria-pressed={activeEra === era}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      <div style={listWrap}>
        {filtered.length === 0 && (
          <p style={{ padding: "60px 0", color: "#9A9A9A", fontSize: 14 }}>
            No entries in this era yet.
          </p>
        )}
        {filtered.map((lm) => (
          <div key={lm.id} style={card}>
            <div style={{ overflow: "hidden", maxHeight: 360 }}>
              <img src={lm.imageUrl} alt={lm.name} style={cardImg} />
            </div>
            <div style={cardBody}>
              <p style={eraTag}>{lm.era} · {lm.location}</p>
              <h2 style={cardTitle}>{lm.name}</h2>
              <p style={cardKhmer}>{lm.nameKhmer}</p>
              <p style={locationTag}>{lm.year}</p>
              <p style={cardDesc}>{lm.description}</p>
              <span style={viewMore}>View More →</span>
            </div>
          </div>
        ))}

        {/* Pagination counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 40 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700 }}>01</span>
          <span style={{ color: "#C9A96E" }}>/</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#9A9A9A" }}>
            {String(filtered.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </>
  );
}
