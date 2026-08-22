import landmarks from "../../lib/landmarks.js";

const eraData = [
  {
    number: "01",
    name: "Pre-Angkorian",
    nameKhmer: "សម័យមុនអង្គរ",
    range: "1st – 9th Century CE",
    description:
      "The earliest Khmer kingdoms — Funan and Chenla — produced brick-and-laterite temples dedicated to Hindu deities. Structures like Sambor Prei Kuk show the embryonic Khmer style before the great empire.",
    color: "#8B7355",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
  },
  {
    number: "02",
    name: "Angkorian",
    nameKhmer: "សម័យអង្គរ",
    range: "9th – 15th Century CE",
    description:
      "The apex of Khmer civilisation. Temple-mountains, elaborate bas-reliefs, and hydraulic city planning reached their zenith under kings like Suryavarman II (Angkor Wat) and Jayavarman VII (Bayon, Ta Prohm).",
    color: "#C9A96E",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd0f2f8f?w=600&q=80",
  },
  {
    number: "03",
    name: "Post-Angkorian",
    nameKhmer: "សម័យក្រោយអង្គរ",
    range: "15th – 19th Century CE",
    description:
      "After the abandonment of Angkor, the capital moved to the Phnom Penh region. Architecture shifted to timber royal palaces and Buddhist monasteries, with less monumental stone construction.",
    color: "#6B8E7A",
    image: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=600&q=80",
  },
  {
    number: "04",
    name: "New Khmer Era",
    nameKhmer: "សម័យខ្មែរថ្មី",
    range: "1953 – 1975",
    description:
      "Post-independence Cambodia saw architect Vann Molyvann fuse modernist concrete with traditional Khmer forms — the Olympic Stadium, Independence Monument, and Chaktomuk Hall define this golden era.",
    color: "#A0522D",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
  },
  {
    number: "05",
    name: "Contemporary",
    nameKhmer: "សម័យបច្ចុប្បន្ន",
    range: "1993 – Present",
    description:
      "Post-Khmer Rouge reconstruction blends global high-rise typologies with renewed interest in Khmer identity. NGO-led heritage conservation now sits alongside rapid urbanisation in Phnom Penh and Siem Reap.",
    color: "#4A6FA5",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
];

export default function TimelinePage() {
  const pageHeader = {
    padding: "80px 40px 60px",
    maxWidth: 1200,
    margin: "0 auto",
    borderBottom: "1px solid #E5E0D8",
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
    marginBottom: 0,
  };

  const timelineWrap = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px 100px",
  };

  const eraRow = {
    display: "grid",
    gridTemplateColumns: "80px 1fr 360px",
    gap: 48,
    padding: "72px 0",
    borderBottom: "1px solid #E5E0D8",
    alignItems: "center",
  };

  const numStyle = (color) => ({
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 72,
    fontWeight: 300,
    color: color,
    lineHeight: 1,
    opacity: 0.35,
  });

  const body = {
    paddingRight: 40,
  };

  const eraLabel = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 12,
  };

  const eraName = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 40,
    fontWeight: 700,
    color: "#1A1A1A",
    lineHeight: 1.05,
    marginBottom: 4,
  };

  const eraKhmer = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 300,
    color: "#9A9A9A",
    marginBottom: 20,
  };

  const eraDesc = {
    fontSize: 14,
    color: "#6A6A6A",
    lineHeight: 1.85,
    maxWidth: 480,
  };

  const eraImg = {
    width: "100%",
    height: 240,
    objectFit: "cover",
  };

  /* Map era name → relevant landmarks */
  const getLandmarks = (eraName) =>
    landmarks.filter((l) => l.era === eraName).slice(0, 2);

  const landmarkPills = {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 20,
  };

  const pill = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    padding: "5px 12px",
    border: "1px solid #D0C9BF",
    color: "#6A6A6A",
  };

  return (
    <>
      <div style={pageHeader}>
        <span style={lightTitle}>Eras &amp;</span>
        <span style={boldTitle}>Timeline</span>
      </div>

      <div style={timelineWrap}>
        {eraData.map((era) => {
          const related = getLandmarks(era.name);
          return (
            <div key={era.number} style={eraRow}>
              <span style={numStyle(era.color)}>{era.number}</span>
              <div style={body}>
                <p style={eraLabel}>{era.range}</p>
                <h2 style={eraName}>{era.name}</h2>
                <p style={eraKhmer}>{era.nameKhmer}</p>
                <p style={eraDesc}>{era.description}</p>
                {related.length > 0 && (
                  <div style={landmarkPills}>
                    {related.map((lm) => (
                      <span key={lm.id} style={pill}>{lm.name}</span>
                    ))}
                  </div>
                )}
              </div>
              <img src={era.image} alt={era.name} style={eraImg} />
            </div>
          );
        })}
      </div>
    </>
  );
}
