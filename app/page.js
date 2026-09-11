"use client";

import Link from "next/link";
import collection from "../collection.config.js";
import landmarks from "../lib/landmarks.js";
import EntryCard from "../components/EntryCard.js";
import SmallEntryCard from "../components/SmallEntryCard.js";
import { useLanguage } from "../components/LanguageContext.js";

/* ── Hero section ─────────────────────────────────────── */
function Hero() {
  const { t, isKhmer } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-text-side">
        <p className="section-label">{t("heroTag")}</p>
        <h1 style={{ lineHeight: 1.05, marginBottom: 24 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(42px, 5.5vw, 84px)", fontWeight: 300, color: "#9A9A9A", display: "block" }}>
            {t("heroTitleLight")}
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(42px, 5.5vw, 84px)", fontWeight: 700, color: "#1A1A1A", display: "block" }}>
            {t("heroTitleBold")}
          </span>
        </h1>

        {/* Inverted Subtitle Rule: English when Khmer, Khmer when English */}
        <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 15, color: "#6A6A6A", lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
          {t("heroSubtitle")}
        </p>

        <div>
          <Link href="/archive" className="btn-primary">
            {t("exploreArchive")}
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#9A9A9A" }}>01</span>
          <div style={{ width: 40, height: 1, background: "#D0C9BF" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#9A9A9A" }}>
            {landmarks.length.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="hero-img-side" style={{ minHeight: "360px", position: "relative", overflow: "hidden" }}>
        <img
          src="/angkor_hero.jpg"
          alt="Angkor Wat at golden hour"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </section>
  );
}

/* ── Featured Entry Card Section ─────────────────────────── */
function FeaturedEntrySection() {
  const { t, isKhmer } = useLanguage();

  const descEn =
    "Khmer Architecture Archive is a collection of a prominent Khmer Architect Vann Molyvann (1926–2017) located in Phnom Penh City. This collection explores his visionary 'New Khmer Architecture' movement, which uniquely blended modernist design with traditional Khmer aesthetics to create iconic structures like the Royal University of Fine Arts.";

  const descKm =
    "បណ្ណសារស្ថាបត្យកម្មខ្មែរ គឺជាបណ្តុំចងក្រងស្នាដៃរបស់ស្ថាបត្យករខ្មែរដ៏ឆ្នើម លោក វណ្ណ ម៉ូលីវណ្ណ (១៩២៦–២០១៧) នៅរាជធានីភ្នំពេញ។ ការប្រមូលចងក្រងនេះបង្ហាញពីចលនា 'ស្ថាបត្យកម្មខ្មែរថ្មី' ដ៏មានចក្ខុវិស័យ ដែលបានរួមបញ្ចូលគ្នាយ៉ាងល្អឯកនូវការរចនាបែបទំនើបនិយមជាមួយសោភ័ណភាពប្រពៃណីខ្មែរ។";

  const storyEn =
    "During the Sangkum Reastr Niyum era (1953–1970), King Norodom Sihanouk appointed Paris-trained architect Vann Molyvann as State Architect to spearhead Cambodia's modernization. Molyvann pioneered 'New Khmer Architecture'—an extraordinary fusion of concrete modernism with ancient Angkorian wisdom.";

  const storyKm =
    "ក្នុងសម័យសង្គមរាស្ត្រនិយម (១៩៥៣–១៩៧០) ព្រះបាទនរោត្តម សីហនុ បានតែងតាំងស្ថាបត្យករ វណ្ណ ម៉ូលីវណ្ណ ជាស្ថាបត្យកររដ្ឋដឹកនាំការធ្វើទំនើបកម្មប្រទេសកម្ពុជា។ លោកបានត្រួសត្រាយផ្លូវ 'ស្ថាបត្យកម្មខ្មែរថ្មី' ដែលជាការរួមបញ្ចូលគ្នារវាងបេតុងទំនើបនិយម និងចំណេះដឹងបុរាណនៃសម័យអង្គរ។";

  const placesEn = ["RUFA", "Chaktomuk Conference Hall", "Independence Monument", "Institute of Foreign Languages (IFL)"];
  const placesKm = ["សាកលវិទ្យាល័យភូមិន្ទវិចិត្រសិល្បៈ", "សាលសន្និបាតចតុមុខ", "វិមានឯករាជ្យ", "វិទ្យាស្ថានភាសាបរទេស"];

  return (
    <section className="container" style={{ padding: "40px 20px 20px" }}>
      <EntryCard
        title={isKhmer ? "បណ្ណសារស្ថាបត្យកម្មខ្មែរ" : collection.name}
        titleEn={collection.name}
        titleKm="បណ្ណសារស្ថាបត្យកម្មខ្មែរ"
        khmerTitle="បណ្ណសារស្ថាបត្យកម្មខ្មែរ"
        tag={t("featuredEntryTag")}
        tagKm={t("featuredEntryTag")}
        description={isKhmer ? descKm : descEn}
        descriptionEn={descEn}
        descriptionKm={descKm}
        story={isKhmer ? storyKm : storyEn}
        storyEn={storyEn}
        storyKm={storyKm}
        contributor="RUFA, Chaktomuk, Independence Monument, IFL"
        contributorKm="សាកលវិទ្យាល័យភូមិន្ទវិចិត្រសិល្បៈ, ចតុមុខ, វិមានឯករាជ្យ, IFL"
        places={isKhmer ? placesKm : placesEn}
        placesEn={placesEn}
        placesKm={placesKm}
        actionHref="/archive"
        actionText={t("browseArchiveBtn")}
      />
    </section>
  );
}

/* ── RUFA Small Entry Card Section ─────────────────────────── */
function RufaEntrySection() {
  return (
    <section className="container" style={{ padding: "20px 20px 60px" }}>
      <SmallEntryCard />
    </section>
  );
}

/* ── About strip ─────────────────────────────────────────── */
function AboutStrip() {
  const { t } = useLanguage();

  return (
    <section className="container about-strip-grid" style={{ padding: "80px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
      <div className="about-img-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8, height: 360 }}>
        <img
          src="https://images.unsplash.com/photo-1588598198321-9735fd0f2f8f?w=600&q=80"
          alt="Angkor Wat"
          style={{ width: "100%", height: "100%", objectFit: "cover", gridRow: "1 / 3", gridColumn: "1" }}
        />
        <img
          src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&q=80"
          alt="Bayon"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
          alt="Independence Monument"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div>
        <p className="section-label">{t("aboutTag")}</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#1A1A1A", marginBottom: 20, lineHeight: 1.15, whiteSpace: "pre-line" }}>
          {t("aboutHeading")}
        </h2>
        <div style={{ width: 48, height: 2, background: "#C9A96E", marginBottom: 24 }} />
        <p style={{ fontSize: 15, color: "#6A6A6A", lineHeight: 1.85, marginBottom: 28 }}>
          {t("aboutBody")}
        </p>
        <Link href="/about" className="btn-primary">
          {t("readMore")}
        </Link>
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

/* ── Featured landmarks grid ─────────────────────────────── */
function FeaturedGrid() {
  const { t, isKhmer } = useLanguage();
  const featured = landmarks.slice(0, 5);

  return (
    <section className="container" style={{ padding: "80px 20px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "#1A1A1A", marginBottom: 36 }}>
        {t("ourArchiveHeading")}
      </h2>
      <div className="featured-grid-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "260px 180px", gap: 8 }}>
        <div className="featured-big-card" style={{ gridColumn: "1 / 3", gridRow: "1 / 3", position: "relative", overflow: "hidden", backgroundColor: "#1A1A1A" }}>
          <img src={featured[0].imageUrl} alt={featured[0].name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, padding: "clamp(20px, 4vw, 32px)", color: "#FAFAF8" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 6 }}>
              {isKhmer ? (featured[0].nameKhmer || featured[0].name) : featured[0].name}
            </p>
            <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A96E" }}>
              {isKhmer ? featured[0].name : featured[0].nameKhmer} — {isKhmer ? (featured[0].eraKm || featured[0].era) : featured[0].era}
            </p>
          </div>
        </div>

        {featured.slice(1).map((lm) => (
          <div key={lm.id} style={{ position: "relative", overflow: "hidden" }}>
            <img src={lm.imageUrl} alt={lm.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
        <Link href="/archive" className="btn-primary">
          {t("allArchiveBtn")}
        </Link>
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
      <AboutStrip />
      <Mission />
      <FeaturedGrid />
    </>
  );
}
