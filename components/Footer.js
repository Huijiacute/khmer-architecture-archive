"use client";

import Link from "next/link";
import collection from "../collection.config.js";
import { useLanguage } from "./LanguageContext.js";

export default function Footer() {
  const { t, isKhmer } = useLanguage();

  const navLinks = [
    { label: t("navMain"), href: "/" },
    { label: t("navArchive"), href: "/archive" },
    { label: t("navTimeline"), href: "/timeline" },
    { label: t("navMap"), href: "/map" },
    { label: t("navAbout"), href: "/about" },
  ];

  const colHead = {
    fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 18,
  };

  const credit = { fontSize: 13, color: "#888", lineHeight: 1.8 };

  return (
    <footer style={{ backgroundColor: "#1C1C1C", color: "#FAFAF8", paddingTop: 64, paddingBottom: 36, marginTop: 80 }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, paddingBottom: 40, borderBottom: "1px solid #333" }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 22, fontWeight: 700, color: "#FAFAF8", marginBottom: 10 }}>
              {isKhmer ? "បណ្ណសារស្ថាបត្យកម្មខ្មែរ" : collection.name}
            </p>
            <p style={{ fontSize: 13, color: "#999", lineHeight: 1.8, maxWidth: 360 }}>
              {isKhmer ? "បណ្ណសារស្ថាបត្យកម្មនៃស្ថាបត្យករខ្មែរដ៏ល្បីល្បាញ លោក វណ្ណ ម៉ូលីវណ្ណ និងបេតិកភណ្ឌកម្ពុជា។" : collection.description}
            </p>
          </div>

          <div>
            <p style={colHead}>{t("footerNavigation")}</p>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontSize: 13, color: "#888", marginBottom: 10, textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <p style={colHead}>{t("footerCredits")}</p>
            <p style={credit}>
              {t("curatedBy")}<br />
              <strong style={{ color: "#FAFAF8" }}>{collection.curator}</strong>
            </p>
            <p style={{ ...credit, marginTop: 14 }}>
              {t("source")}<br />
              <strong style={{ color: "#FAFAF8" }}>{collection.source}</strong>
            </p>
            <p style={{ ...credit, marginTop: 14 }}>
              {t("footerCourse")}<br />
              <span>{t("footerUniversity")}</span>
            </p>
          </div>
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: "#666", textAlign: "center" }}>
          © 2026 {collection.name}. {t("footerCopyright")}
        </p>
      </div>
    </footer>
  );
}
