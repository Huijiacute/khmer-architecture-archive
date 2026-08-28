import Link from "next/link";
import collection from "../collection.config.js";
import landmarks from "../lib/landmarks.js";
import EntryCard from "../components/EntryCard.js";
import SmallEntryCard from "../components/SmallEntryCard.js";

/* ── Hero section ─────────────────────────────────────── */
function Hero() {
  const section = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "calc(100vh - 64px)",
    alignItems: "stretch",
  };

  const textSide = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "80px 60px 80px 40px",
    maxWidth: 600,
    margin: "0 auto 0 auto",
  };

  const label = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 24,
  };

  const lightWord = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(52px, 6vw, 88px)",
    fontWeight: 300,
    color: "#9A9A9A",
    lineHeight: 1.0,
    display: "block",
  };

  const boldWord = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(52px, 6vw, 88px)",
    fontWeight: 700,
    color: "#1A1A1A",
    lineHeight: 1.0,
    display: "block",
    marginBottom: 32,
  };

  const subtitle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    color: "#6A6A6A",
    lineHeight: 1.8,
    marginBottom: 40,
    maxWidth: 380,
  };

  const imgSide = {
    position: "relative",
    overflow: "hidden",
  };

  const img = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const counter = {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 48,
  };

  const numStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13,
    color: "#9A9A9A",
  };

  const divider = { width: 40, height: 1, background: "#D0C9BF" };

  return (
    <section style={section}>
      <div style={textSide}>
        <p style={label}>Khmer Living Archive</p>
        <span style={lightWord}>KHMER</span>
        <span style={boldWord}>Architecture</span>
        <p style={subtitle}>{collection.description}</p>
        <Link href="/archive" className="btn-primary">
          Explore Archive →
        </Link>
        <div style={counter}>
          <span style={numStyle}>01</span>
          <div style={divider} />
          <span style={numStyle}>{landmarks.length.toString().padStart(2, "0")}</span>
        </div>
      </div>
      <div style={imgSide}>
        <img
          src="/angkor_hero.jpg"
          alt="Angkor Wat at golden hour"
          style={img}
        />
      </div>
    </section>
  );
}

/* ── About strip ─────────────────────────────────────────── */
function AboutStrip() {
  const section = {
    padding: "100px 40px",
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
  };

  const imageGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: 8,
    height: 380,
  };

  const imgStyle = (span) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    gridRow: span || "auto",
  });

  const aboutLabel = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 16,
  };

  const heading = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 52,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 24,
    lineHeight: 1.05,
  };

  const body = {
    fontSize: 15,
    color: "#6A6A6A",
    lineHeight: 1.85,
    marginBottom: 32,
  };

  return (
    <section style={section}>
      <div style={imageGrid}>
        <img
          src="https://images.unsplash.com/photo-1588598198321-9735fd0f2f8f?w=600&q=80"
          alt="Angkor Wat"
          style={{ ...imgStyle("1 / 3"), gridColumn: "1" }}
        />
        <img
          src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&q=80"
          alt="Bayon"
          style={imgStyle()}
        />
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
          alt="Independence Monument"
          style={imgStyle()}
        />
      </div>
      <div>
        <p style={aboutLabel}>About</p>
        <h2 style={heading}>Preserving a<br />Living Legacy</h2>
        <div style={{ width: 48, height: 2, background: "#C9A96E", marginBottom: 24 }} />
        <p style={body}>
          This archive documents the architectural heritage of Cambodia — from the
          sandstone temples of Angkor to the New Khmer modernism of Vann Molyvann.
          Each structure tells a story of culture, faith, and identity across more than
          a thousand years.
        </p>
        <Link href="/about" className="btn-primary">
          Read More →
        </Link>
      </div>
    </section>
  );
}

/* ── Mission pillars ─────────────────────────────────────── */
function Mission() {
  const section = {
    backgroundColor: "#F3EFE9",
    padding: "100px 40px",
  };

  const inner = {
    maxWidth: 1200,
    margin: "0 auto",
  };

  const heading = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 300,
    color: "#1A1A1A",
    marginBottom: 60,
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
  };

  const pillar = (num) => ({
    display: "flex",
    gap: 24,
  });

  const bigNum = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 80,
    fontWeight: 300,
    color: "#D9D2C7",
    lineHeight: 1,
    flexShrink: 0,
    width: 60,
  };

  const pillarBody = {
    paddingTop: 8,
  };

  const pillarTitle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 12,
  };

  const pillarText = {
    fontSize: 14,
    color: "#6A6A6A",
    lineHeight: 1.8,
  };

  return (
    <section style={section}>
      <div style={inner}>
        <h2 style={heading}>Main Focus / Mission Statement</h2>
        <div style={grid}>
          {[
            {
              n: "1",
              title: "Documentation",
              text: "Systematically record every surviving Khmer structure — its dimensions, materials, condition, and historical context — before time erases them.",
            },
            {
              n: "2",
              title: "Preservation",
              text: "Advocate for heritage protection policy, fund restoration research, and raise public awareness of Cambodia's irreplaceable architectural wealth.",
            },
          ].map((p) => (
            <div key={p.n} style={pillar(p.n)}>
              <span style={bigNum}>{p.n}</span>
              <div style={pillarBody}>
                <p style={pillarTitle}>{p.title}</p>
                <p style={pillarText}>{p.text}</p>
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
  const section = {
    padding: "100px 40px",
    maxWidth: 1200,
    margin: "0 auto",
  };

  const heading = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 300,
    color: "#1A1A1A",
    marginBottom: 40,
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "280px 200px",
    gap: 8,
  };

  const bigCard = {
    gridColumn: "1 / 3",
    gridRow: "1 / 3",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#1A1A1A",
  };

  const bigImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.7,
  };

  const bigOverlay = {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "32px",
    color: "#FAFAF8",
  };

  const bigName = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: 6,
  };

  const bigEra = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#C9A96E",
  };

  const smallCard = {
    position: "relative",
    overflow: "hidden",
  };

  const smallImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const featured = landmarks.slice(0, 5);

  const cta = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 32,
  };

  return (
    <section style={section}>
      <h2 style={heading}>Our Archive</h2>
      <div style={grid}>
        {/* Big card */}
        <div style={bigCard}>
          <img src={featured[0].imageUrl} alt={featured[0].name} style={bigImg} />
          <div style={bigOverlay}>
            <p style={bigName}>{featured[0].name}</p>
            <p style={bigEra}>{featured[0].nameKhmer} — {featured[0].era}</p>
          </div>
        </div>
        {/* Small cards */}
        {featured.slice(1).map((lm) => (
          <div key={lm.id} style={smallCard}>
            <img src={lm.imageUrl} alt={lm.name} style={smallImg} />
          </div>
        ))}
      </div>
      <div style={cta}>
        <Link href="/archive" className="btn-primary">All Archive →</Link>
      </div>
    </section>
  );
}

/* ── Featured Entry Card Section ─────────────────────────── */
function FeaturedEntrySection() {
  const section = {
    padding: "60px 40px 20px",
    maxWidth: 1200,
    margin: "0 auto",
  };

  const description =
    "Khmer Architecture Archive is a collection of a prominent Khmer Architect Vann Molyvann (1926–2017) located in Phnom Penh City. This collection explores his visionary \"New Khmer Architecture\" movement, which uniquely blended modernist design with traditional Khmer aesthetics to create iconic structures like the Royal University of Fine Arts. The archive serves as a vital resource for understanding how Molyvann defined the modern identity of Cambodia through his sustainable and culturally rich masterpieces.";

  const story =
    "During the Sangkum Reastr Niyum era (1953–1970), King Norodom Sihanouk appointed Paris-trained architect Vann Molyvann as State Architect to spearhead Cambodia's modernization. Molyvann pioneered 'New Khmer Architecture' (ស្ថាបត្យកម្មប្រពៃណីខ្មែរបែបទំនើប)—an extraordinary fusion of Bauhaus and Corbusian concrete modernism with ancient Angkorian wisdom. He integrated passive climate conditioning: elevated pilings against tropical floods, double roofs for heat dispersion, and intricate brise-soleil lattice screens for natural air cross-ventilation, forever reshaping Cambodia's modern urban landscape.";

  const places = [
    "RUFA (Royal University of Fine Arts)",
    "Chaktomuk Conference Hall",
    "Independence Monument",
    "Institute of Foreign Languages (IFL)",
    "Brown Coffee",
  ];

  return (
    <section style={section}>
      <EntryCard
        title={collection.name}
        khmerTitle="បណ្ណសារស្ថាបត្យកម្មខ្មែរ"
        tag="Featured Heritage Entry"
        description={description}
        story={story}
        contributor="RUFA, Chaktomuk Conference Hall, Independence Monument, Brown Coffee, Institute of Foreign Language"
        places={places}
        actionHref="/archive"
        actionText="Browse Architecture Archive →"
      />
    </section>
  );
}

/* ── RUFA Small Entry Card Section ─────────────────────────── */
function RufaEntrySection() {
  const section = {
    padding: "20px 40px 60px",
    maxWidth: 1200,
    margin: "0 auto",
  };

  return (
    <section style={section}>
      <SmallEntryCard />
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

