"use client";

import collection from "../../collection.config.js";
import { useLanguage } from "../../components/LanguageContext.js";

export default function AboutPage() {
  const { t, isKhmer } = useLanguage();

  const goalsEn = [
    "Document every surviving Khmer structure with photographic and written records.",
    "Provide open-access scholarly information to researchers, students, and architects.",
    "Advocate for heritage protection in collaboration with UNESCO and local institutions.",
    "Honour the memory of Vann Molyvann and the visionary New Khmer Architecture movement.",
    "Build a living, community-driven resource that grows each semester at AUPP.",
  ];

  const goalsKm = [
    "ចងក្រងឯកសារគ្រប់សំណង់ស្ថាបត្យកម្មខ្មែរដែលនៅសេសសល់ ទាំងទម្រង់រូបថត និងកំណត់ត្រាជាលាយលក្ខណ៍អក្សរ។",
    "ផ្តល់ព័ត៌មានសិក្សាស្រាវជ្រាវបែបបើកចំហដល់អ្នកស្រាវជ្រាវ និស្សិត និងស្ថាបត្យករ។",
    "តស៊ូមតិដើម្បីកិច្ចការពារបេតិកភណ្ឌ ដោយសហការជាមួយអង្គការយូណេស្កូ និងស្ថាប័នជាតិ។",
    "រំឭកដល់វិញ្ញាណក្ខន្ធលោក វណ្ណ ម៉ូលីវណ្ណ និងចលនាស្ថាបត្យកម្មខ្មែរថ្មីដ៏មានចក្ខុវិស័យ។",
    "កសាងធនធានបណ្ណសាររស់ដែលចូលរួមដោយសហគមន៍ និងរីកចម្រើនជាបន្តបន្ទាប់នៅ AUPP។",
  ];

  const stepsEn = [
    { n: "01", title: "Choose a Structure", text: "Select a Khmer building or monument you have visited or researched deeply." },
    { n: "02", title: "Write Your Entry", text: "Describe its history, architectural style, current condition, and cultural significance." },
    { n: "03", title: "Add an Image", text: "Provide a photograph you own or an archival image with proper attribution." },
    { n: "04", title: "Submit for Review", text: "Fill in the form below. Submissions are reviewed by the curatorial team before publication." },
  ];

  const stepsKm = [
    { n: "01", title: "ជ្រើសរើសសំណង់មួយ", text: "ជ្រើសរើសអគារ ឬវិមានខ្មែរដែលអ្នកធ្លាប់បានទៅទស្សនា ឬបានស្រាវជ្រាវយ៉ាងស៊ីជម្រៅ។" },
    { n: "02", title: "សរសេរការរួមចំណែករបស់អ្នក", text: "រៀបរាប់ពីប្រវត្តិ រចនាប័ទ្មស្ថាបត្យកម្ម ស្ថានភាពបច្ចុប្បន្ន និងសារៈសំខាន់នៃវប្បធម៌។" },
    { n: "03", title: "ភ្ជាប់រូបថត", text: "ផ្តល់នូវរូបថតផ្ទាល់ខ្លួន ឬរូបថតបណ្ណសារដែលមានការបញ្ជាក់ប្រភពត្រឹមត្រូវ។" },
    { n: "04", title: "ដាក់ស្នើដើម្បីពិនិត្យ", text: "បំពេញទម្រង់បែបបទខាងក្រោម។ ការរួមចំណែកនឹងត្រូវបានពិនិត្យដោយក្រុមការងារមុនពេលផ្សព្វផ្សាយ។" },
  ];

  const activeGoals = isKhmer ? goalsKm : goalsEn;
  const activeSteps = isKhmer ? stepsKm : stepsEn;

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* ── Page Header: Special Inverted Title & Subtitle Rule ── */}
      <div className="about-header-grid" style={{ padding: "clamp(40px, 6vw, 80px) 20px 50px", maxWidth: 1200, margin: "0 auto", borderBottom: "1px solid #E5E0D8", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "end" }}>
        <div>
          <h1 style={{ lineHeight: 1.05, marginBottom: 12 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(36px, 6vw, 84px)", fontWeight: 300, color: "#BABAB0", display: "block" }}>
              {t("aboutTitleLight")}
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(36px, 6vw, 84px)", fontWeight: 700, color: "#1A1A1A", display: "block" }}>
              {t("aboutTitleBold")}
            </span>
          </h1>
          <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 14, color: "#7A7A7A", lineHeight: 1.7 }}>
            {t("aboutSubtitle")}
          </p>
        </div>
        <p style={{ fontSize: 15, color: "#5A5A5A", lineHeight: 1.85 }}>
          {isKhmer
            ? "បណ្ណសារស្ថាបត្យកម្មនៃស្ថាបត្យករខ្មែរដ៏ល្បីល្បាញ លោក វណ្ណ ម៉ូលីវណ្ណ និងបេតិកភណ្ឌកម្ពុជា។"
            : collection.description}
        </p>
      </div>

      <div className="container">
        {/* Credits Row */}
        <div className="about-credits-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, margin: "48px 0 64px" }}>
          <div style={{ backgroundColor: "#F3EFE9", padding: "32px 24px" }}>
            <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 8 }}>
              {t("curatedBy")}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A" }}>
              {collection.curator}
            </p>
          </div>

          <div style={{ backgroundColor: "#F3EFE9", padding: "32px 24px" }}>
            <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 8 }}>
              {t("source")}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A" }}>
              {collection.source}
            </p>
          </div>

          <div style={{ backgroundColor: "#F3EFE9", padding: "32px 24px" }}>
            <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 8 }}>
              {t("institution")}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A" }}>
              {t("institutionVal")}
            </p>
          </div>
        </div>

        {/* Goals */}
        <div style={{ padding: "48px 0", borderTop: "1px solid #E5E0D8" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, color: "#1A1A1A", marginBottom: 32 }}>
            {t("preservationGoals")}
          </h2>
          {activeGoals.map((g, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#C9A96E", flexShrink: 0, marginTop: 9 }} />
              <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8 }}>{g}</p>
            </div>
          ))}
        </div>

        {/* How to Contribute */}
        <div style={{ padding: "48px 0 80px", borderTop: "1px solid #E5E0D8" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, color: "#1A1A1A", marginBottom: 32 }}>
            {t("howToContribute")}
          </h2>
          <div className="about-steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {activeSteps.map((s) => (
              <div key={s.n} style={{ border: "1px solid #E5E0D8", padding: "28px 24px", backgroundColor: "#FAFAF8" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "#D9D2C7", display: "block", marginBottom: 8 }}>
                  {s.n}
                </span>
                <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                  {s.title}
                </p>
                <p style={{ fontSize: 14, color: "#6A6A6A", lineHeight: 1.8 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submission form */}
      <div style={{ backgroundColor: "#F3EFE9", padding: "64px 20px" }}>
        <div className="container about-form-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <div>
            <p className="section-label">{t("submitEntry")}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15, marginBottom: 16 }}>
              {t("shareWhatYouKnow")}
            </h2>
            <p style={{ fontSize: 14, color: "#6A6A6A", lineHeight: 1.8, maxWidth: 400 }}>
              {t("submitDesc")}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="c-name" style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6A6A" }}>
                {t("formName")}
              </label>
              <input id="c-name" type="text" placeholder={isKhmer ? "ឧ. សុខា ចាន់" : "e.g. Sokha Chan"} style={{ border: "none", borderBottom: "1px solid #C5BEB4", backgroundColor: "transparent", padding: "10px 0", fontSize: 14, outline: "none" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="c-landmark" style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6A6A" }}>
                {t("formLandmark")}
              </label>
              <input id="c-landmark" type="text" placeholder={isKhmer ? "ឈ្មោះជាភាសាខ្មែរ ឬអង់គ្លេស" : "English or Khmer name"} style={{ border: "none", borderBottom: "1px solid #C5BEB4", backgroundColor: "transparent", padding: "10px 0", fontSize: 14, outline: "none" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="c-era" style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6A6A" }}>
                {t("formEra")}
              </label>
              <input id="c-era" type="text" placeholder={isKhmer ? "ឧ. សម័យអង្គរ ឬ សម័យខ្មែរថ្មី" : "e.g. Angkorian or New Khmer"} style={{ border: "none", borderBottom: "1px solid #C5BEB4", backgroundColor: "transparent", padding: "10px 0", fontSize: 14, outline: "none" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="c-desc" style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6A6A" }}>
                {t("formDesc")}
              </label>
              <textarea id="c-desc" placeholder={isKhmer ? "ប្រវត្តិ រចនាប័ទ្ម ស្ថានភាព សារៈសំខាន់..." : "History, style, condition, significance…"} rows={4} style={{ border: "none", borderBottom: "1px solid #C5BEB4", backgroundColor: "transparent", padding: "10px 0", fontSize: 14, outline: "none", resize: "vertical" }} />
            </div>

            <div>
              <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>
                {t("formSubmit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
