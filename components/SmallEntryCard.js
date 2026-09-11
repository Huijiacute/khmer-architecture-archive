"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext.js";

export default function SmallEntryCard({
  imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  actionHref = "/archive",
}) {
  const { t } = useLanguage();

  const metaLabelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#1A1A1A",
    width: 120,
    flexShrink: 0,
  };

  const textStyle = { fontSize: 14, color: "#5A5A5A", lineHeight: 1.6 };

  const rows = [
    { label: t("rufaFoundedLabel"), val: t("rufaFoundedVal") },
    { label: t("rufaLocationLabel"), val: t("rufaLocationVal") },
    { label: t("rufaMissionLabel"), val: t("rufaMissionVal") },
    { label: t("rufaGoalLabel"), val: t("rufaGoalVal") },
  ];

  return (
    <article
      className="small-entry-card"
      style={{
        backgroundColor: "#F7F5F0",
        border: "1px solid #E5E0D8",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <div className="small-entry-img-wrap" style={{ flex: "0 0 40%", minHeight: 260, position: "relative" }}>
        <img
          src={imageUrl}
          alt={t("rufaTitle")}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ flex: "1", padding: "clamp(24px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: 16 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "#1A1A1A" }}>
          {t("rufaTitle")}
        </h3>

        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "baseline", borderBottom: "1px solid #E5E0D8", paddingBottom: 10 }}>
            <span style={metaLabelStyle}>{r.label}</span>
            <span style={{ ...textStyle, flex: 1, minWidth: 160 }}>{r.val}</span>
          </div>
        ))}

        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <span style={metaLabelStyle}>{t("rufaProgramsLabel")}</span>
          <span style={textStyle}>{t("rufaProgramsVal")}</span>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <Link href={actionHref} className="btn-primary">
            {t("browseArchiveBtn")}
          </Link>
        </div>
      </div>
    </article>
  );
}
