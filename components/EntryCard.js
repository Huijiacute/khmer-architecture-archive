import Link from "next/link";

export default function EntryCard({
  title = "Khmer Architecture Archive",
  khmerTitle,
  tag = "Archival Collection",
  description,
  story,
  contributor,
  places = [],
  imageUrl,
  actionHref,
  actionText = "Explore Collection →",
}) {
  const cardStyle = {
    backgroundColor: "#F7F5F0",
    border: "1px solid #E5E0D8",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    marginBottom: 32,
  };

  const imageWrap = {
    width: "100%",
    height: "clamp(220px, 32vw, 380px)",
    overflow: "hidden",
    backgroundColor: "#E5E0D8",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const bodyStyle = {
    padding: "36px 36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  };

  const tagStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C9A96E",
    marginBottom: 6,
  };

  const titleStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(28px, 3vw, 38px)",
    fontWeight: 700,
    color: "#1A1A1A",
    lineHeight: 1.15,
  };

  const metaLabel = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#1A1A1A",
    marginBottom: 8,
  };

  const textStyle = { fontSize: 14, color: "#5A5A5A", lineHeight: 1.8 };
  const pillStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#2C2C2C",
    backgroundColor: "#EAE5DB",
    padding: "4px 12px",
    borderRadius: 2,
    border: "1px solid #D8D2C5",
  };

  return (
    <article style={cardStyle}>
      {imageUrl && (
        <div style={imageWrap}>
          <img src={imageUrl} alt={title} style={imgStyle} />
        </div>
      )}

      <div style={bodyStyle}>
        <div>
          {tag && <p style={tagStyle}>{tag}</p>}
          <h2 style={titleStyle}>{title}</h2>
          {khmerTitle && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#8A8A8A", marginTop: 4 }}>
              {khmerTitle}
            </p>
          )}
          <div style={{ width: 44, height: 2, background: "#C9A96E", marginTop: 14 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {description && (
            <div>
              <p style={metaLabel}>Historical Overview</p>
              <p style={textStyle}>{description}</p>
            </div>
          )}
          {story && (
            <div>
              <p style={metaLabel}>Architectural Legacy & Story</p>
              <p style={textStyle}>{story}</p>
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid #E5E0D8", paddingTop: 18, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
          <div>
            {contributor && (
              <p style={{ fontSize: 13, color: "#7A7A7A", marginBottom: places?.length ? 10 : 0 }}>
                <strong style={{ color: "#1A1A1A" }}>Contributor:</strong> {contributor}
              </p>
            )}
            {places?.length > 0 && (
              <div>
                <p style={{ ...metaLabel, fontSize: 10, color: "#8A8A8A" }}>Featured Landmarks & Elements</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                  {places.map((place, i) => (
                    <span key={i} style={pillStyle}>{typeof place === "string" ? place : place.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {actionHref && (
            <Link href={actionHref} className="btn-primary" style={{ alignSelf: "flex-end" }}>{actionText}</Link>
          )}
        </div>
      </div>
    </article>
  );
}
