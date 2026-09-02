"use client";

import { useState } from "react";
import Link from "next/link";
import entries from "../../data/entries.js";
import EntryCard from "../../components/EntryCard.js";

const eras = ["All", "Pre-Angkorian", "Angkorian", "Post-Angkorian", "New Khmer", "Contemporary"];

export default function ArchivePage() {
  const [activeEra, setActiveEra] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isClearHovered, setIsClearHovered] = useState(false);

  /* ── Filter entries by era and search term ── */
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = entries.filter((entry) => {
    // 1. Era filter
    if (activeEra !== "All" && entry.era !== activeEra) {
      return false;
    }

    // 2. Search filter (title only, per requirement)
    if (!normalizedQuery) {
      return true;
    }

    const titleCorpus = [
      entry.title,
      entry.name,
      entry.khmerTitle,
      entry.nameKhmer,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return titleCorpus.includes(normalizedQuery);
  });

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // searchQuery is already filtering live as you type
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleResetAll = () => {
    setSearchQuery("");
    setActiveEra("All");
  };

  /* ── styles ── */
  const pageHeader = {
    padding: "80px 40px 40px",
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
    marginBottom: 40,
  };

  const searchControls = {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    marginBottom: 32,
  };

  const searchBox = {
    display: "flex",
    alignItems: "center",
    flex: "1 1 360px",
    maxWidth: 640,
    position: "relative",
    border: "1px solid #D0C9BF",
    backgroundColor: "#FFFFFF",
    transition: "border-color 0.2s ease",
  };

  const searchInput = {
    flex: 1,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: "#1A1A1A",
    backgroundColor: "transparent",
    border: "none",
    padding: "12px 16px",
    outline: "none",
  };

  const clearBtn = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: isClearHovered ? "#1A1A1A" : "#8A8A8A",
    backgroundColor: isClearHovered ? "#EAE5DB" : "transparent",
    border: "none",
    padding: "6px 12px",
    borderRadius: 2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 4,
    transition: "all 0.2s ease",
  };

  const searchBtn = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    backgroundColor: isSearchHovered ? "#C9A96E" : "#1A1A1A",
    color: "#FAFAF8",
    border: `1px solid ${isSearchHovered ? "#C9A96E" : "#1A1A1A"}`,
    padding: "12px 26px",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transform: isSearchHovered ? "translateY(-1px)" : "translateY(0)",
    boxShadow: isSearchHovered ? "0 4px 14px rgba(201, 169, 110, 0.35)" : "none",
  };

  const filterBar = {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  };

  const filterBtn = (era) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "10px 18px",
    border: "1px solid",
    borderColor: activeEra === era ? "#1A1A1A" : "#D0C9BF",
    backgroundColor: activeEra === era ? "#1A1A1A" : "transparent",
    color: activeEra === era ? "#FAFAF8" : "#6A6A6A",
    cursor: "pointer",
    transition: "all 0.2s ease",
  });

  const listWrap = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "48px 40px 80px",
  };

  const statusStrip = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
    paddingBottom: 16,
    borderBottom: "1px solid #E5E0D8",
    fontSize: 13,
    color: "#6A6A6A",
  };

  const emptyStateWrap = {
    padding: "64px 32px",
    textAlign: "center",
    backgroundColor: "#F7F5F0",
    border: "1px solid #E5E0D8",
    borderRadius: 4,
    margin: "32px 0",
  };

  const emptyIcon = {
    fontSize: 40,
    marginBottom: 16,
    display: "inline-block",
  };

  const emptyTitle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(26px, 3.5vw, 34px)",
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 12,
  };

  const emptyDesc = {
    fontSize: 14,
    color: "#5A5A5A",
    maxWidth: 520,
    margin: "0 auto 20px",
    lineHeight: 1.8,
  };

  const suggestionBox = {
    marginTop: 16,
    marginBottom: 28,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  };

  const suggestionLabel = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#8A8A8A",
    marginRight: 4,
  };

  const suggestionChip = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "#1A1A1A",
    backgroundColor: "#EAE5DB",
    border: "1px solid #D0C9BF",
    padding: "5px 14px",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <>
      <div style={pageHeader}>
        <span style={lightTitle}>Our</span>
        <span style={boldTitle}>Archive</span>

        {/* ── Search bar with functional search button and clear button ── */}
        <div style={searchControls}>
          <div style={searchBox}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search by title (e.g. Angkor Wat, Bayon, Olympic Stadium, វិមានឯករាជ្យ)..."
              style={searchInput}
              aria-label="Search architecture archive"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                onMouseEnter={() => setIsClearHovered(true)}
                onMouseLeave={() => setIsClearHovered(false)}
                style={clearBtn}
                title="Clear search"
                aria-label="Clear search input"
              >
                ✕ Clear
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => {}}
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            style={searchBtn}
            aria-label="Search"
          >
            <span>Search</span>
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.2s ease",
                transform: isSearchHovered ? "translateX(3px)" : "translateX(0)",
              }}
            >
              →
            </span>
          </button>
        </div>

        {/* ── Era filter buttons ── */}
        <div style={filterBar}>
          {eras.map((era) => (
            <button
              key={era}
              style={filterBtn(era)}
              onClick={() => setActiveEra(era)}
              aria-pressed={activeEra === era}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      <div style={listWrap}>
        {/* ── Search and Filter Status Bar ── */}
        {(searchQuery || activeEra !== "All") && (
          <div style={statusStrip}>
            <div>
              <span>
                Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "entry" : "entries"}
              </span>
              {searchQuery && (
                <span> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
              )}
              {activeEra !== "All" && (
                <span> in <strong>{activeEra}</strong></span>
              )}
            </div>
            <button
              type="button"
              onClick={handleResetAll}
              style={{
                background: "none",
                border: "none",
                color: "#C9A96E",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Friendly Empty State ── */}
        {filtered.length === 0 && (
          <div style={emptyStateWrap}>
            <div style={emptyIcon} role="img" aria-label="Khmer temple icon">
              🏛️
            </div>
            <h2 style={emptyTitle}>No matching titles found, but don&apos;t worry!</h2>
            <p style={emptyDesc}>
              {searchQuery ? (
                <>
                  We looked through our Cambodian architectural records for &ldquo;<strong>{searchQuery}</strong>&rdquo;{activeEra !== "All" ? ` in the ${activeEra} era` : ""}, but couldn&apos;t find an exact title match.
                  <br />
                  Cambodia&apos;s architectural legacy spans over a millennium — try one of our popular landmarks below or search in Khmer script!
                </>
              ) : (
                <>
                  There are currently no architectural landmarks cataloged in the <strong>{activeEra}</strong> era.
                  <br />
                  Select another era above or click below to explore the entire archive.
                </>
              )}
            </p>

            <div style={suggestionBox}>
              <span style={suggestionLabel}>Try searching:</span>
              {["Angkor Wat", "Bayon", "Silver Pagoda", "Olympic Stadium", "RUFA"].map((titleSuggestion) => (
                <button
                  key={titleSuggestion}
                  type="button"
                  onClick={() => setSearchQuery(titleSuggestion)}
                  style={suggestionChip}
                >
                  {titleSuggestion}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleResetAll}
              className="btn-primary"
              style={{ cursor: "pointer" }}
            >
              Browse All Architectural Titles →
            </button>
          </div>
        )}

        {/* ── Every entry visible through EntryCard ── */}
        {filtered.map((entry) => (
          <EntryCard
            key={entry.id}
            title={entry.title || entry.name}
            khmerTitle={entry.khmerTitle || entry.nameKhmer}
            tag={`${entry.era} · ${entry.location} · ${entry.year}`}
            description={entry.description}
            story={entry.story}
            contributor={entry.contributor}
            places={entry.places}
            imageUrl={entry.imageUrl}
            actionHref="/timeline"
            actionText="View in Timeline →"
          />
        ))}

        {/* ── Pagination / Count Indicator ── */}
        {filtered.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 24 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700 }}>01</span>
            <span style={{ color: "#C9A96E" }}>/</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#9A9A9A" }}>
              {String(filtered.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
