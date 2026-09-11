"use client";

import landmarks from "../../lib/landmarks.js";
import { useLanguage } from "../../components/LanguageContext.js";

const eraData = [
  {
    number: "01",
    name: "Pre-Angkorian",
    nameKhmer: "សម័យមុនអង្គរ",
    rangeEn: "1st – 9th Century CE",
    rangeKm: "សតវត្សរ៍ទី១ – ទី៩ នៃ គ.ស.",
    descEn:
      "The earliest Khmer kingdoms — Funan and Chenla — produced brick-and-laterite temples dedicated to Hindu deities. Structures like Sambor Prei Kuk show the embryonic Khmer style before the great empire.",
    descKm:
      "សម័យកាលនៃនគរខ្មែរដំបូងបង្អស់ — ហ្វូណន និងចេនឡា — បានសាងសង់ប្រាសាទឥដ្ឋ និងថ្មបាយក្រៀមឧទ្ទិសដល់អាទិទេពហិណ្ឌូ។ សំណង់ដូចជាសំបូរព្រៃគុកបង្ហាញពីទម្រង់ស្ថាបត្យកម្មខ្មែរដំបូងមុនសម័យមហានគរ។",
    color: "#8B7355",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
  },
  {
    number: "02",
    name: "Angkorian",
    nameKhmer: "សម័យអង្គរ",
    rangeEn: "9th – 15th Century CE",
    rangeKm: "សតវត្សរ៍ទី៩ – ទី១៥ នៃ គ.ស.",
    descEn:
      "The apex of Khmer civilisation. Temple-mountains, elaborate bas-reliefs, and hydraulic city planning reached their zenith under kings like Suryavarman II (Angkor Wat) and Jayavarman VII (Bayon, Ta Prohm).",
    descKm:
      "កំពូលនៃអរិយធម៌ខ្មែរ។ ប្រាសាទភ្នំ ចម្លាក់ក្រឡោតទាបដ៏ល្អវិចិត្រ និងផែនការរៀបចំទីក្រុងប្រព័ន្ធធារាសាស្ត្របានឈានដល់កម្រិតកំពូលក្រោមស្នាព្រះហស្តព្រះបាទសូរ្យវរ្ម័នទី២ (អង្គរវត្ត) និងព្រះបាទជ័យវរ្ម័នទី៧ (បាយ័ន, តាព្រហ្ម)។",
    color: "#C9A96E",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd0f2f8f?w=600&q=80",
  },
  {
    number: "03",
    name: "Post-Angkorian",
    nameKhmer: "សម័យក្រោយអង្គរ",
    rangeEn: "15th – 19th Century CE",
    rangeKm: "សតវត្សរ៍ទី១៥ – ទី១៩ នៃ គ.ស.",
    descEn:
      "After the abandonment of Angkor, the capital moved to the Phnom Penh region. Architecture shifted to timber royal palaces and Buddhist monasteries, with less monumental stone construction.",
    descKm:
      "បន្ទាប់ពីការផ្លាស់ប្តូរពីរាជធានីអង្គរ រាជធានីបានរំកិលមកកាន់តំបន់ចតុមុខ (ភ្នំពេញ)។ ស្ថាបត្យកម្មបានប្រែប្រួលមករកការសាងសង់ព្រះរាជវាំងឈើ និងវត្តអារាមព្រះពុទ្ធសាសនា។",
    color: "#6B8E7A",
    image: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=600&q=80",
  },
  {
    number: "04",
    name: "New Khmer Era",
    nameKhmer: "សម័យខ្មែរថ្មី",
    rangeEn: "1953 – 1975",
    rangeKm: "គ.ស. ១៩៥៣ – ១៩៧៥",
    descEn:
      "Post-independence Cambodia saw architect Vann Molyvann fuse modernist concrete with traditional Khmer forms — the Olympic Stadium, Independence Monument, and Chaktomuk Hall define this golden era.",
    descKm:
      "កម្ពុជាក្រោយទទួលបានឯករាជ្យបានឃើញស្ថាបត្យករ វណ្ណ ម៉ូលីវណ្ណ រួមបញ្ចូលបេតុងទំនើបនិយមជាមួយទម្រង់ប្រពៃណីខ្មែរ — ពហុកីឡដ្ឋានជាតិ វិមានឯករាជ្យ និងសាលចតុមុខ បានកំណត់យុគសម័យមាសនេះ។",
    color: "#A0522D",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
  },
  {
    number: "05",
    name: "Contemporary",
    nameKhmer: "សម័យបច្ចុប្បន្ន",
    rangeEn: "1993 – Present",
    rangeKm: "គ.ស. ១៩៩៣ – បច្ចុប្បន្ន",
    descEn:
      "Post-Khmer Rouge reconstruction blends global high-rise typologies with renewed interest in Khmer identity. NGO-led heritage conservation now sits alongside rapid urbanisation in Phnom Penh and Siem Reap.",
    descKm:
      "ការកសាងឡើងវិញក្រោយសម័យសង្គ្រាមរួមបញ្ចូលអគារខ្ពស់ៗបែបសកលភាវូបនីយកម្មជាមួយចំណាប់អារម្មណ៍ថ្មីលើអត្តសញ្ញាណខ្មែរ និងការអភិរក្សបេតិកភណ្ឌ។",
    color: "#4A6FA5",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
];

export default function TimelinePage() {
  const { t, isKhmer } = useLanguage();

  const getLandmarks = (eraName) =>
    landmarks.filter((l) => l.era === eraName).slice(0, 2);

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* ── Page Header: Special Inverted Title & Subtitle Rule ── */}
      <div style={{ padding: "clamp(40px, 6vw, 80px) 20px 40px", maxWidth: 1200, margin: "0 auto", borderBottom: "1px solid #E5E0D8" }}>
        <h1 style={{ lineHeight: 1.05, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(36px, 6vw, 84px)", fontWeight: 300, color: "#BABAB0", display: "block" }}>
            {t("timelineTitleLight")}
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(36px, 6vw, 84px)", fontWeight: 700, color: "#1A1A1A", display: "block" }}>
            {t("timelineTitleBold")}
          </span>
        </h1>
        {/* Inverted Subtitle: English in Khmer mode, Khmer in English mode */}
        <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: "clamp(14px, 2vw, 16px)", color: "#7A7A7A", lineHeight: 1.7, maxWidth: 640 }}>
          {t("timelineSubtitle")}
        </p>
      </div>

      <div className="container" style={{ paddingBottom: 100 }}>
        {eraData.map((era) => {
          const related = getLandmarks(era.name);
          return (
            <div key={era.number} className="timeline-era-row" style={{ display: "grid", gridTemplateColumns: "80px 1fr 320px", gap: 36, padding: "clamp(40px, 6vw, 64px) 0", borderBottom: "1px solid #E5E0D8", alignItems: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 300, color: era.color, lineHeight: 1, opacity: 0.35 }}>
                {era.number}
              </span>

              <div style={{ paddingRight: 20 }}>
                <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 8 }}>
                  {isKhmer ? era.rangeKm : era.rangeEn}
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15, marginBottom: 4 }}>
                  {isKhmer ? era.nameKhmer : era.name}
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 18, fontWeight: 300, color: "#8A8A8A", marginBottom: 14 }}>
                  {isKhmer ? era.name : era.nameKhmer}
                </p>
                <p style={{ fontSize: 14, color: "#5A5A5A", lineHeight: 1.85, maxWidth: 520 }}>
                  {isKhmer ? era.descKm : era.descEn}
                </p>
                {related.length > 0 && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
                    {related.map((lm) => (
                      <span
                        key={lm.id}
                        style={{
                          fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
                          fontSize: 11,
                          padding: "4px 12px",
                          border: "1px solid #D0C9BF",
                          backgroundColor: "#F7F5F0",
                          color: "#5A5A5A",
                          borderRadius: 2,
                        }}
                      >
                        {isKhmer ? (lm.nameKhmer || lm.name) : lm.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ width: "100%", height: 220, overflow: "hidden", backgroundColor: "#E5E0D8" }}>
                <img src={era.image} alt={era.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
