"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext.js";

const regions = [
  {
    id: "phnom-penh",
    name: "Phnom Penh",
    nameKhmer: "រាជធានីភ្នំពេញ",
    count: 6,
    descEn: "Capital city — Independence Monument, Olympic Stadium, Chaktomuk Hall, Silver Pagoda, RUFA, and IFL.",
    descKm: "រាជធានី — វិមានឯករាជ្យ ពហុកីឡដ្ឋានជាតិ សាលចតុមុខ វត្តព្រះកែវមរកត សាកលវិទ្យាល័យភូមិន្ទវិចិត្រសិល្បៈ និង IFL។",
    eraEn: "New Khmer & Post-Angkorian",
    eraKm: "សម័យខ្មែរថ្មី & សម័យក្រោយអង្គរ",
  },
  {
    id: "siem-reap",
    name: "Siem Reap",
    nameKhmer: "ខេត្តសៀមរាប",
    count: 3,
    descEn: "Heartland of the Angkor Empire — home to Angkor Wat, Bayon, and Baphuon temples.",
    descKm: "បេះដូងនៃចក្រភពអង្គរ — ជាទីតាំងនៃប្រាសាទអង្គរវត្ត ប្រាសាទបាយ័ន និងប្រាសាទបាភួន។",
    eraEn: "Angkorian",
    eraKm: "សម័យអង្គរ",
  },
  {
    id: "preah-vihear",
    name: "Preah Vihear",
    nameKhmer: "ខេត្តព្រះវិហារ",
    count: 1,
    descEn: "Remote northern province holding the breathtaking cliff-top UNESCO World Heritage temple.",
    descKm: "ខេត្តភាគខាងជើងនៃប្រទេស ដែលជាទីតាំងប្រាសាទព្រះវិហារលើកំពូលភ្នំដងរែកជាបេតិកភណ្ឌពិភពលោក។",
    eraEn: "Angkorian",
    eraKm: "សម័យអង្គរ",
  },
];

export default function MapSection() {
  const { t, isKhmer } = useLanguage();

  return (
    <section id="map" style={{ borderTop: "1px solid #E5E0D8" }}>
      <div className="map-page-layout">
        {/* Left panel */}
        <div className="map-left-panel" style={{ padding: "clamp(40px, 6vw, 80px) clamp(20px, 4vw, 48px)", maxWidth: 540 }}>
          <p className="section-label">{t("mapGeographicView")}</p>

          <h2 style={{ lineHeight: 1.05, marginBottom: 12 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 300, color: "#BABAB0", display: "block" }}>
              {t("mapTitleLight")}
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 700, color: "#1A1A1A", display: "block" }}>
              {t("mapTitleBold")}
            </span>
          </h2>
          <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 14, color: "#7A7A7A", lineHeight: 1.7, marginBottom: 24 }}>
            {t("mapSubtitle")}
          </p>

          <p style={{ fontSize: 14, color: "#5A5A5A", lineHeight: 1.8, marginBottom: 36 }}>
            {t("mapIntro")}
          </p>

          <div>
            {regions.map((r) => (
              <div key={r.id} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "20px 0", borderTop: "1px solid #E5E0D8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A" }}>
                    {isKhmer ? r.nameKhmer : r.name}
                  </span>
                  <span style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 12, fontWeight: 600, color: "#1A1A1A" }}>
                    {r.count} {r.count === 1 ? t("siteSingular") : t("sitePlural")}
                  </span>
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 15, color: "#8A8A8A" }}>
                  {isKhmer ? r.name : r.nameKhmer}
                </span>
                <span style={{ fontSize: 11, color: "#C9A96E", fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginTop: 2 }}>
                  {isKhmer ? r.eraKm : r.eraEn}
                </span>
                <p style={{ fontSize: 13, color: "#6A6A6A", lineHeight: 1.7, marginTop: 4 }}>
                  {isKhmer ? r.descKm : r.descEn}
                </p>
                <a
                  href="#archive"
                  style={{
                    fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C9A96E",
                    marginTop: 8,
                    display: "inline-block",
                  }}
                >
                  {t("viewInArchive")}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — OpenStreetMap */}
        <div className="map-right-panel">
          <iframe
            title="Cambodia Landmark Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=102.3%2C10.4%2C107.6%2C14.7&layer=mapnik&marker=12.5657%2C104.9910"
            style={{ width: "100%", height: "100%", minHeight: 380, border: "none", display: "block" }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
