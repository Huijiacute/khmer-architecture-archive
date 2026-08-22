import Link from "next/link";

const regions = [
  {
    id: "phnom-penh",
    name: "Phnom Penh",
    nameKhmer: "ភ្នំពេញ",
    count: 3,
    description: "Capital city — Independence Monument, Olympic Stadium, Chaktomuk Hall.",
    era: "New Khmer",
  },
  {
    id: "siem-reap",
    name: "Siem Reap",
    nameKhmer: "សៀមរាប",
    count: 3,
    description: "Gateway to Angkor — home to Angkor Wat, Bayon, and Baphuon.",
    era: "Angkorian",
  },
  {
    id: "battambang",
    name: "Battambang",
    nameKhmer: "បាត់ដំបង",
    count: 1,
    description: "Colonial-era architecture alongside ancient Khmer temple ruins.",
    era: "Post-Angkorian",
  },
  {
    id: "preah-vihear",
    name: "Preah Vihear",
    nameKhmer: "ព្រះវិហារ",
    count: 1,
    description: "Remote northern province holding the UNESCO cliff-top Preah Vihear temple.",
    era: "Angkorian",
  },
];

export default function MapPage() {
  /* Layout: left text panel + right map, matching reference page 3 */
  const page = {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    minHeight: "calc(100vh - 64px)",
    alignItems: "start",
  };

  const leftPanel = {
    padding: "80px 60px 80px 40px",
    maxWidth: 520,
  };

  const label = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 20,
  };

  const lightTitle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(40px, 5vw, 72px)",
    fontWeight: 300,
    color: "#BABAB0",
    lineHeight: 1.0,
    display: "block",
  };

  const boldTitle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(40px, 5vw, 72px)",
    fontWeight: 700,
    color: "#1A1A1A",
    lineHeight: 1.0,
    display: "block",
    marginBottom: 32,
  };

  const introText = {
    fontSize: 14,
    color: "#6A6A6A",
    lineHeight: 1.85,
    marginBottom: 48,
    maxWidth: 400,
  };

  const regionCard = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "20px 0",
    borderTop: "1px solid #E5E0D8",
  };

  const regionName = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 600,
    color: "#1A1A1A",
  };

  const regionKhmer = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    fontWeight: 300,
    color: "#9A9A9A",
  };

  const regionMeta = {
    fontSize: 12,
    color: "#C9A96E",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 500,
  };

  const regionDesc = {
    fontSize: 13,
    color: "#6A6A6A",
    lineHeight: 1.7,
    marginTop: 4,
  };

  const rightPanel = {
    position: "sticky",
    top: 64,
    height: "calc(100vh - 64px)",
  };

  const mapIframe = {
    width: "100%",
    height: "100%",
    border: "none",
    display: "block",
  };

  return (
    <div style={page}>
      {/* Left panel */}
      <div style={leftPanel}>
        <p style={label}>Geographic View</p>
        <span style={lightTitle}>Landmark</span>
        <span style={boldTitle}>Map</span>
        <p style={introText}>
          Khmer architecture spans Cambodia from the sandstone mountains of
          the north to the riverbanks of the capital. Explore landmarks by
          province — each region holds a distinct architectural chapter.
        </p>

        {regions.map((r) => (
          <div key={r.id} style={regionCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={regionName}>{r.name}</span>
              <span style={{ ...regionMeta, color: "#1A1A1A", fontSize: 13 }}>
                {r.count} {r.count === 1 ? "site" : "sites"}
              </span>
            </div>
            <span style={regionKhmer}>{r.nameKhmer}</span>
            <span style={regionMeta}>{r.era}</span>
            <p style={regionDesc}>{r.description}</p>
            <Link
              href={`/archive`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C9A96E",
                marginTop: 6,
              }}
            >
              View in Archive →
            </Link>
          </div>
        ))}
      </div>

      {/* Right panel — OpenStreetMap, no API key */}
      <div style={rightPanel}>
        <iframe
          title="Cambodia Landmark Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=102.3%2C10.4%2C107.6%2C14.7&layer=mapnik&marker=12.5657%2C104.9910"
          style={mapIframe}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}
