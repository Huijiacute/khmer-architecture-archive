import Link from "next/link";

export default function SmallEntryCard({
  imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", 
  imageAlt = "Royal University of Fine Arts",
  title = "Royal University of Fine Arts (RUFA)",
  founded = "1965",
  mission = "To cultivate the next generation of Cambodian artists and architects.",
  location = "Phnom Penh, Cambodia",
  goal = "Preserve traditional arts while embracing modern design.",
  programs = "He set up the first architecture degree program in Cambodia. He wanted students to learn modern design while respecting traditional Khmer culture and the local climate.",
  actionHref = "/archive",
  actionText = "Browse Architecture Archive →",
}) {
  const cardStyle = {
    backgroundColor: "#F7F5F0",
    border: "1px solid #E5E0D8",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    gap: 0,
  };

  const imageContainerStyle = {
    flex: "0 0 40%",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const contentStyle = {
    flex: "1",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  };

  const titleStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 28,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 8,
  };

  const metaLabelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#1A1A1A",
    width: 140,
    flexShrink: 0,
  };

  const textStyle = { 
    fontSize: 14, 
    color: "#5A5A5A", 
    lineHeight: 1.6 
  };

  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "baseline",
    borderBottom: "1px solid #E5E0D8",
    paddingBottom: 12,
  };

  return (
    <article style={cardStyle}>
      <div style={imageContainerStyle}>
        <img src={imageUrl} alt={imageAlt} style={imageStyle} />
      </div>
      <div style={contentStyle}>
        <h3 style={titleStyle}>{title}</h3>
        
        <div style={rowStyle}>
          <span style={metaLabelStyle}>Founded</span>
          <span style={textStyle}>{founded}</span>
        </div>
        
        <div style={rowStyle}>
          <span style={metaLabelStyle}>Location</span>
          <span style={textStyle}>{location}</span>
        </div>

        <div style={rowStyle}>
          <span style={metaLabelStyle}>Mission</span>
          <span style={textStyle}>{mission}</span>
        </div>

        <div style={rowStyle}>
          <span style={metaLabelStyle}>Goal</span>
          <span style={textStyle}>{goal}</span>
        </div>

        <div style={{ ...rowStyle, borderBottom: "none", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          <span style={metaLabelStyle}>Programs</span>
          <span style={textStyle}>{programs}</span>
        </div>

        <div style={{ marginTop: "auto", alignSelf: "flex-start", paddingTop: 16 }}>
          <Link href={actionHref} className="btn-primary">
            {actionText}
          </Link>
        </div>
      </div>
    </article>
  );
}
