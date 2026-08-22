"use client";

import collection from "../../collection.config.js";

const goals = [
  "Document every surviving Khmer structure with photographic and written records.",
  "Provide open-access scholarly information to researchers and students.",
  "Advocate for heritage protection in collaboration with UNESCO and local NGOs.",
  "Honour the memory of Vann Molyvann and the New Khmer Architecture movement.",
  "Build a living, community-driven resource that grows each semester.",
];

const steps = [
  { n: "01", title: "Choose a Structure", text: "Select a Khmer building or monument you have visited or researched deeply." },
  { n: "02", title: "Write Your Entry", text: "Describe its history, architecture style, current condition, and cultural significance. Include Khmer script name if known." },
  { n: "03", title: "Add an Image", text: "Provide a photograph you own or a Creative Commons image with proper attribution." },
  { n: "04", title: "Submit for Review", text: "Fill in the form below. Submissions are reviewed by the curatorial team before publication." },
];

export default function AboutPage() {
  const pageHeader = {
    padding: "80px 40px 60px",
    maxWidth: 1200,
    margin: "0 auto",
    borderBottom: "1px solid #E5E0D8",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "end",
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
  };

  const missionText = {
    fontSize: 16,
    color: "#6A6A6A",
    lineHeight: 1.9,
    paddingBottom: 8,
  };

  const inner = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px",
  };

  /* Credits row */
  const creditsRow = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 2,
    margin: "80px 0",
  };

  const creditCard = {
    backgroundColor: "#F3EFE9",
    padding: "40px 32px",
  };

  const creditLabel = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 12,
  };

  const creditValue = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 24,
    fontWeight: 600,
    color: "#1A1A1A",
    lineHeight: 1.2,
  };

  /* Goals */
  const goalsSection = {
    padding: "80px 0",
    borderTop: "1px solid #E5E0D8",
  };

  const sectionHead = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 40,
    fontWeight: 300,
    color: "#1A1A1A",
    marginBottom: 40,
  };

  const goalItem = {
    display: "flex",
    alignItems: "flex-start",
    gap: 20,
    marginBottom: 20,
  };

  const goalDot = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "#C9A96E",
    flexShrink: 0,
    marginTop: 8,
  };

  const goalText = {
    fontSize: 15,
    color: "#4A4A4A",
    lineHeight: 1.8,
  };

  /* Contribute steps */
  const stepsGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 2,
    margin: "40px 0 80px",
  };

  const stepCard = {
    border: "1px solid #E5E0D8",
    padding: "36px 32px",
  };

  const stepNum = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 48,
    fontWeight: 300,
    color: "#D9D2C7",
    display: "block",
    marginBottom: 12,
  };

  const stepTitle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: 10,
  };

  const stepText = {
    fontSize: 14,
    color: "#6A6A6A",
    lineHeight: 1.8,
  };

  /* Form */
  const formSection = {
    backgroundColor: "#F3EFE9",
    padding: "80px 40px",
    marginBottom: 0,
  };

  const formInner = {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
  };

  const field = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  };

  const label = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#6A6A6A",
  };

  const input = {
    border: "none",
    borderBottom: "1px solid #C5BEB4",
    backgroundColor: "transparent",
    padding: "10px 0",
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    color: "#1A1A1A",
    outline: "none",
  };

  const textarea = {
    ...input,
    resize: "vertical",
    minHeight: 100,
    borderBottom: "1px solid #C5BEB4",
  };

  return (
    <>
      {/* Header */}
      <div style={pageHeader}>
        <div>
          <span style={lightTitle}>About</span>
          <span style={boldTitle}>This Archive</span>
        </div>
        <p style={missionText}>{collection.description}</p>
      </div>

      <div style={inner}>
        {/* Credits */}
        <div style={creditsRow}>
          <div style={creditCard}>
            <p style={creditLabel}>Curated by</p>
            <p style={creditValue}>{collection.curator}</p>
          </div>
          <div style={creditCard}>
            <p style={creditLabel}>Source</p>
            <p style={creditValue}>{collection.source}</p>
          </div>
          <div style={creditCard}>
            <p style={creditLabel}>Institution</p>
            <p style={creditValue}>AUPP — ICT 340, Fall 2026</p>
          </div>
        </div>

        {/* Goals */}
        <div style={goalsSection}>
          <h2 style={sectionHead}>Preservation Goals</h2>
          {goals.map((g, i) => (
            <div key={i} style={goalItem}>
              <div style={goalDot} />
              <p style={goalText}>{g}</p>
            </div>
          ))}
        </div>

        {/* How to contribute */}
        <h2 style={{ ...sectionHead, borderTop: "1px solid #E5E0D8", paddingTop: 80 }}>
          How to Contribute
        </h2>
        <div style={stepsGrid}>
          {steps.map((s) => (
            <div key={s.n} style={stepCard}>
              <span style={stepNum}>{s.n}</span>
              <p style={stepTitle}>{s.title}</p>
              <p style={stepText}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submission form (visual only) */}
      <div style={formSection}>
        <div style={formInner}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 20 }}>
              Submit an Entry
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 12 }}>
              Share What You Know
            </h2>
            <p style={{ fontSize: 14, color: "#6A6A6A", lineHeight: 1.8, maxWidth: 360 }}>
              Every entry enriches the archive. If you have visited a Khmer structure,
              written about it, or hold oral knowledge passed down through community,
              your contribution matters.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={field}>
              <label style={label} htmlFor="contrib-name">Your Name *</label>
              <input id="contrib-name" type="text" placeholder="e.g. Sokha Chan" style={input} />
            </div>
            <div style={field}>
              <label style={label} htmlFor="contrib-landmark">Landmark Name *</label>
              <input id="contrib-landmark" type="text" placeholder="English or Khmer name" style={input} />
            </div>
            <div style={field}>
              <label style={label} htmlFor="contrib-era">Era</label>
              <input id="contrib-era" type="text" placeholder="e.g. Angkorian" style={input} />
            </div>
            <div style={field}>
              <label style={label} htmlFor="contrib-description">Description *</label>
              <textarea id="contrib-description" placeholder="History, style, condition, significance…" style={textarea} />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>
              Send Entry →
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
