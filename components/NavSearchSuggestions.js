"use client";

import { normalizeText } from "../lib/useEntryTitles.js";

// Wraps the part of `text` that matches `query` in <strong>.
function Highlight({ text, query }) {
  const q = normalizeText(query);
  const plain = String(text || "").normalize("NFC");
  const at = q ? plain.toLowerCase().indexOf(q) : -1;
  if (at < 0) return plain;
  return (
    <>
      {plain.slice(0, at)}
      <strong style={{ color: "#1A1A1A", backgroundColor: "#F3E9D2" }}>{plain.slice(at, at + q.length)}</strong>
      {plain.slice(at + q.length)}
    </>
  );
}

// Dropdown under the nav search box. Presentational: the parent owns state.
export default function NavSearchSuggestions({ id, items, query, activeIndex, isKhmer, onPick }) {
  const font = "'Inter', 'Kantumruy Pro', sans-serif";

  return (
    <ul
      id={id}
      role="listbox"
      style={{
        position: "absolute",
        top: 40,
        left: 0,
        zIndex: 60,
        minWidth: 300,
        width: "100%",
        margin: 0,
        padding: 6,
        listStyle: "none",
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E0D8",
        borderRadius: 14,
        boxShadow: "0 12px 28px rgba(26,26,26,0.12)",
        fontFamily: font,
      }}
    >
      {items.length === 0 && (
        <li style={{ padding: "10px 12px", fontSize: 13, color: "#8A8A8A" }}>
          {isKhmer ? "រកមិនឃើញចំណងជើងដែលត្រូវគ្នា" : "No matching titles"}
        </li>
      )}
      {items.map((item, i) => {
        const main = isKhmer ? item.titleKm || item.titleEn : item.titleEn || item.titleKm;
        const other = isKhmer ? item.titleEn : item.titleKm;
        return (
          <li
            key={item.id}
            role="option"
            aria-selected={i === activeIndex}
            onMouseDown={(e) => {
              e.preventDefault(); // keep input focus so blur doesn't close the list first
              onPick(item);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
              backgroundColor: i === activeIndex ? "#F7F3EC" : "transparent",
            }}
          >
            <div style={{ fontSize: 13, color: "#4A4A4A" }}><Highlight text={main} query={query} /></div>
            {other && other !== main && (
              <div style={{ fontSize: 11, color: "#8A8A8A", marginTop: 2 }}><Highlight text={other} query={query} /></div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
