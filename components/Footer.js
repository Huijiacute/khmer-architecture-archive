import Link from "next/link";
import collection from "../collection.config.js";

const navLinks = [
  { label: "Main", href: "/" },
  { label: "Archive", href: "/archive" },
  { label: "Timeline", href: "/timeline" },
  { label: "Map", href: "/map" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  const wrap = {
    backgroundColor: "#1C1C1C",
    color: "#FAFAF8",
    paddingTop: 64,
    paddingBottom: 32,
    marginTop: 100,
  };

  const inner = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: 48,
    paddingBottom: 48,
    borderBottom: "1px solid #333",
  };

  const colHead = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 20,
  };

  const archiveName = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 600,
    color: "#FAFAF8",
    marginBottom: 10,
  };

  const desc = {
    fontSize: 13,
    color: "#888",
    lineHeight: 1.7,
    maxWidth: 280,
  };

  const footLink = {
    display: "block",
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
    transition: "color 0.2s",
    textDecoration: "none",
  };

  const credit = {
    fontSize: 13,
    color: "#888",
    lineHeight: 1.8,
  };

  const copy = {
    marginTop: 28,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  };

  return (
    <footer style={wrap}>
      <div style={inner}>
        <div style={grid}>
          {/* Col 1 — branding */}
          <div>
            <p style={archiveName}>{collection.name}</p>
            <p style={desc}>{collection.description}</p>
          </div>

          {/* Col 2 — navigation */}
          <div>
            <p style={colHead}>Navigation</p>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={footLink}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3 — credits */}
          <div>
            <p style={colHead}>Credits</p>
            <p style={credit}>
              Curated by<br />
              <strong style={{ color: "#FAFAF8" }}>{collection.curator}</strong>
            </p>
            <p style={{ ...credit, marginTop: 16 }}>
              Source<br />
              <strong style={{ color: "#FAFAF8" }}>{collection.source}</strong>
            </p>
            <p style={{ ...credit, marginTop: 16 }}>
              ICT 340 — Vibe Coding<br />
              <span>AUPP, Fall 2026</span>
            </p>
          </div>
        </div>

        <p style={copy}>© 2026 {collection.name}. Built at AUPP.</p>
      </div>
    </footer>
  );
}
