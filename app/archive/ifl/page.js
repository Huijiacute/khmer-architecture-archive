"use client";

import Link from "next/link";
import { useLanguage } from "../../../components/LanguageContext.js";

const iflImages = [
  { src: "/IFL_1.JPG", label: "IFL_1", title: "Main Campus & Elevated Causeway", titleKm: "បរិវេណសាលាចម្បង និងផ្លូវដើរលើកកម្ពស់" },
  { src: "/IFL_2.JPG", label: "IFL_2", title: "Classroom Wings & Light Wells", titleKm: "ស្លាបអាគារសិក្សា និងចន្លោះទទួលពន្លឺ" },
  { src: "/IFL_3.JPG", label: "IFL_3", title: "Brise-Soleil Concrete Facade", titleKm: "ផ្នែកខាងមុខបេតុងបាំងពន្លឺថ្ងៃ" },
  { src: "/IFL_4.JPG", label: "IFL_4", title: "Lotus Retention Ponds & Water Reflecting Basins", titleKm: "ស្រះស្តុកទឹកដាំឈូក និងអាងឆ្លុះរូបទឹក" },
  { src: "/IFL_5.JPG", label: "IFL_5", title: "Amphitheater & Lecture Hall Structure", titleKm: "រចនាសម្ព័ន្ធសាលសម្តែងរាងរង្វង់ និងសាលបង្រៀន" },
  { src: "/IFL_6.JPG", label: "IFL_6", title: "Architectural Symmetry & Structural Geometry", titleKm: "ស៊ីមេទ្រីស្ថាបត្យកម្ម និងធរណីមាត្រនៃរចនាសម្ព័ន្ធ" },
];

// Khmer numerals for the "Photo X of N" label.
const khDigits = (n) => String(n).replace(/\d/g, (d) => "០១២៣៤៥៦៧៨៩"[d]);

export default function IFLDetailPage() {
  const { isKhmer } = useLanguage();

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", padding: "60px 0 100px" }}>
      <div className="container">
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/#archive"
            className="btn-primary"
            style={{ padding: "10px 20px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}
          >
            ← {isKhmer ? "ត្រឡប់ទៅបណ្ណសារវិញ" : "Back to Archive"}
          </Link>
        </div>

        <div style={{ marginBottom: 44, borderBottom: "1px solid #E5E0D8", paddingBottom: 28 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: 10,
            }}
          >
            {isKhmer ? "ការប្រមូលរូបភាពលម្អិត" : "Detailed Photographic Collection"}
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {isKhmer ? "វិទ្យាស្ថានភាសាបរទេស (IFL)" : "Institute of Foreign Languages (IFL)"}
          </h1>
          <p style={{ fontSize: 15, color: "#6A6A6A", maxWidth: 760, lineHeight: 1.8 }}>
            {isKhmer
              ? "ការប្រមូលផ្តុំរូបភាពស្ថាបត្យកម្មពេញលេញចំនួន ៦ នៃវិទ្យាស្ថានភាសាបរទេស។"
              : "A photographic collection of the Institute of Foreign Languages campus."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          {iflImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#F7F5F0",
                border: "1px solid #E5E0D8",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div style={{ width: "100%", height: 320, overflow: "hidden", backgroundColor: "#E2DDD5", position: "relative" }}>
                <img
                  src={img.src}
                  alt={isKhmer ? img.titleKm : img.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "18px 22px" }}>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "#C9A96E", marginBottom: 4 }}>
                  {isKhmer ? `រូបភាពទី ${khDigits(idx + 1)} ក្នុងចំណោម ${khDigits(6)}` : `Photo ${idx + 1} of ${6}`}
                </p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 20, fontWeight: 700, color: "#1A1A1A" }}>
                  {isKhmer ? img.titleKm : img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
