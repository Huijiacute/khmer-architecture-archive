"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase/client.js";
import { useLanguage } from "./LanguageContext.js";

const GOLD = "#C9A96E";
const INK = "#1A1A1A";
const PARCHMENT = "#FAFAF8";

export default function ReviewQueue({ initialEntries }) {
  const { isKhmer } = useLanguage();
  const [entries, setEntries] = useState(initialEntries);
  const [busy, setBusy] = useState({}); // entry id → true while RPC in flight
  const [errors, setErrors] = useState({}); // entry id → error message
  const supabase = useMemo(() => createClient(), []);

  async function decide(entry, decision) {
    setBusy((b) => ({ ...b, [entry.id]: true }));
    setErrors((e) => ({ ...e, [entry.id]: null }));

    try {
      const { data, error } = await supabase.rpc("review_entry", {
        entry_id: entry.id,
        decision,
      });

      if (error || data !== true) {
        setErrors((e) => ({
          ...e,
          [entry.id]: isKhmer
            ? "មិនអាចធ្វើបច្ចុប្បន្នភាពសំណង់នេះបានទេ។ សូមព្យាយាមម្តងទៀត។"
            : "Couldn't update this entry. Please try again.",
        }));
      } else {
        setEntries((prev) => prev.filter((e) => e.id !== entry.id));
      }
    } catch {
      setErrors((e) => ({
        ...e,
        [entry.id]: isKhmer
          ? "មិនអាចធ្វើបច្ចុប្បន្នភាពសំណង់នេះបានទេ។ សូមព្យាយាមម្តងទៀត។"
          : "Couldn't update this entry. Please try again.",
      }));
    } finally {
      setBusy((b) => ({ ...b, [entry.id]: false }));
    }
  }

  if (entries.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E0D8",
          borderRadius: 4,
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 15, color: "#6A6A6A" }}>
          {isKhmer
            ? "គ្មានសំណង់រង់ចាំការពិនិត្យទេ។"
            : "No entries waiting for review."}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {entries.map((entry) => {
        const isBusy = busy[entry.id] || false;
        const errorMsg = errors[entry.id] || null;

        return (
          <div
            key={entry.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E0D8",
              borderRadius: 4,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Title */}
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: INK,
                  marginBottom: 4,
                }}
              >
                {entry.title_en}
                {entry.title_km ? ` · ${entry.title_km}` : ""}
              </h2>
              <p style={{ fontSize: 13, color: "#8A8A8A" }}>
                {[entry.era_en, entry.location_en, entry.year_en]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>

            {/* Photo */}
            {entry.image_url && (
              <img
                src={entry.image_url}
                alt={entry.title_en}
                style={{
                  width: "100%",
                  maxHeight: 320,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid #E5E0D8",
                }}
              />
            )}

            {/* Description */}
            <div>
              <p style={{ fontSize: 14, color: "#5A5A5A", lineHeight: 1.7 }}>
                {entry.description_en}
              </p>
              {entry.description_km && (
                <p
                  style={{
                    fontSize: 14,
                    color: "#5A5A5A",
                    lineHeight: 1.7,
                    marginTop: 8,
                  }}
                >
                  {entry.description_km}
                </p>
              )}
            </div>

            {/* Meta */}
            <div
              style={{
                fontSize: 13,
                color: "#8A8A8A",
                display: "flex",
                flexWrap: "wrap",
                gap: "4px 20px",
              }}
            >
              {entry.contributor_en && (
                <span>
                  <span style={{ fontWeight: 600, color: INK }}>
                    {isKhmer ? "អ្នករួមចំណែក" : "Contributor"}:{" "}
                  </span>
                  {entry.contributor_en}
                </span>
              )}
              {entry.created_at && (
                <span>
                  <span style={{ fontWeight: 600, color: INK }}>
                    {isKhmer ? "បានដាក់ស្នើ" : "Submitted"}:{" "}
                  </span>
                  {new Date(entry.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* View full entry link */}
            <div style={{ paddingTop: 4 }}>
              <Link
                href={`/archive/${entry.id}`}
                style={{ fontSize: 12, fontWeight: 600, color: INK, textDecoration: "underline" }}
              >
                {isKhmer ? "មើលសំណង់ពេញ" : "View full entry"}
              </Link>
            </div>

            {/* Error message */}
            {errorMsg && (
              <p
                style={{
                  fontSize: 13,
                  color: "#C62828",
                  backgroundColor: "#FFF5F5",
                  border: "1px solid #FFCDD2",
                  borderRadius: 4,
                  padding: "10px 14px",
                }}
              >
                {errorMsg}
              </p>
            )}

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                gap: 12,
                paddingTop: 4,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                disabled={isBusy}
                onClick={() => decide(entry, "published")}
                style={{
                  padding: "11px 24px",
                  backgroundColor: isBusy ? "#D0C9BF" : INK,
                  color: PARCHMENT,
                  border: "none",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: isBusy ? "not-allowed" : "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "background-color 0.2s ease",
                }}
              >
                {isKhmer ? "ផ្សាយ (Publish)" : "Publish (ផ្សាយ)"}
              </button>
              <button
                type="button"
                disabled={isBusy}
                onClick={() => decide(entry, "returned")}
                style={{
                  padding: "11px 24px",
                  backgroundColor: "#FFFFFF",
                  color: INK,
                  border: "1px solid #C9A96E",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: isBusy ? "not-allowed" : "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.2s ease",
                }}
              >
                {isKhmer ? "ស្នើសុំកែសម្រួល (Return)" : "Return (ស្នើសុំកែសម្រួល)"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
