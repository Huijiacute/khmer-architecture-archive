"use client";

import Link from "next/link";
import { useLanguage } from "../../../components/LanguageContext.js";

const iisppImages = [
  { src: "/ISPP_main.JPG", label: "IISPP Main", title: "Main Campus Building & Plaza", titleKm: "អគារសិក្សាចម្បង និងទីលាន" },
  { src: "/ISPP.JPG", label: "IISPP", title: "Front Elevation & Entrance", titleKm: "ផ្នែកខាងមុខ និងច្រកចូល" },
  { src: "/ISPP_1.JPG", label: "IISPP_1", title: "Walkways & Shaded Facade", titleKm: "ផ្លូវដើរ និងផ្នែកខាងមុខមានម្លប់" },
  { src: "/ISPP_2.JPG", label: "IISPP_2", title: "Academic Wings & Classroom Pavilion", titleKm: "ស្លាបអាគារសិក្សា និងសាលសិក្សា" },
  { src: "/ISPP_3.JPG", label: "IISPP_3", title: "Courtyard Architecture & Greenery", titleKm: "ស្ថាបត្យកម្មទីធ្លា និងទេសភាពបៃតង" },
  { src: "/ISPP_4.JPG", label: "IISPP_4", title: "Structural Symmetry & Modern Columns", titleKm: "ស៊ីមេទ្រីរចនាសម្ព័ន្ធ និងសសរទំនើប" },
  { src: "/ISPP_5.JPG", label: "IISPP_5", title: "Open Air Walkways & Student Spaces", titleKm: "ផ្លូវដើរចំហរ និងទីធ្លាសម្រាប់និស្សិត" },
];

// Khmer numerals for the "Photo X of N" label.
const khDigits = (n) => String(n).replace(/\d/g, (d) => "០១២៣៤៥៦៧៨៩"[d]);

export default function IISPPDetailPage() {
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
            {isKhmer
              ? "វិទ្យាស្ថានសិក្សាអន្តរជាតិ និងគោលនយោបាយសាធារណៈ (IISPP)"
              : "Institute for International Studies and Public Policy (IISPP)"}
          </h1>
          <p style={{ fontSize: 15, color: "#6A6A6A", maxWidth: 760, lineHeight: 1.8 }}>
            {isKhmer
              ? "ការប្រមូលផ្តុំរូបភាពស្ថាបត្យកម្មនៃវិទ្យាស្ថានសិក្សាអន្តរជាតិ និងគោលនយោបាយសាធារណៈ (IISPP) នៅក្នុងបរិវេណសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ។"
              : "A photographic collection of the Institute for International Studies and Public Policy (IISPP) located within the Royal University of Phnom Penh campus."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          {iisppImages.map((img, idx) => (
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
                  {isKhmer ? `រូបភាពទី ${khDigits(idx + 1)} ក្នុងចំណោម ${khDigits(iisppImages.length)}` : `Photo ${idx + 1} of ${iisppImages.length}`}
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
