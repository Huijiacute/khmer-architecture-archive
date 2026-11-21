"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase/client.js";
import { useLanguage } from "./LanguageContext.js";

const INK = "#1A1A1A";
const RED = "#C62828";
const btn = { padding: "8px 16px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid #E5E0D8", backgroundColor: "#FFFFFF", color: INK };

// Reviewer tool: published entries with a confirm-then-delete button.
// The database policy ("owners or reviewers delete entries") is the real gate.
export default function PublishedList({ initialEntries }) {
  const { isKhmer } = useLanguage();
  const [entries, setEntries] = useState(initialEntries);
  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const supabase = useMemo(() => createClient(), []);

  async function remove(id) {
    setBusyId(id);
    setError("");
    const { data, error: err } = await supabase.from("entries").delete().eq("id", id).select();
    if (err || !data || data.length === 0) {
      setError(isKhmer ? "មិនអាចលុបសំណង់នេះបានទេ។ សូមព្យាយាមម្តងទៀត។" : "Couldn't delete this entry. Please try again.");
    } else {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
    setConfirmId(null);
    setBusyId(null);
  }

  if (entries.length === 0) {
    return <p style={{ fontSize: 14, color: "#8A8A8A" }}>{isKhmer ? "មិនមានសំណង់ដែលបានផ្សាយទេ។" : "No published entries."}</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {error && <p style={{ fontSize: 13, color: RED }}>{error}</p>}
      {entries.map((e) => (
        <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4, padding: "12px 16px" }}>
          <Link href={`/archive/${e.id}`} style={{ flex: 1, minWidth: 180, fontWeight: 600, color: INK }}>
            {isKhmer ? e.title_km || e.title_en : e.title_en}
          </Link>
          {confirmId === e.id ? (
            <>
              <span style={{ fontSize: 13, color: RED }}>{isKhmer ? "លុបជាអចិន្ត្រៃយ៍?" : "Delete permanently?"}</span>
              <button type="button" disabled={busyId === e.id} onClick={() => remove(e.id)} style={{ ...btn, backgroundColor: RED, color: "#FFFFFF", borderColor: RED }}>
                {isKhmer ? "បាទ/ចាស លុប" : "Yes, delete"}
              </button>
              <button type="button" onClick={() => setConfirmId(null)} style={btn}>{isKhmer ? "បោះបង់" : "Cancel"}</button>
            </>
          ) : (
            <button type="button" onClick={() => setConfirmId(e.id)} style={{ ...btn, color: RED, borderColor: RED }}>
              {isKhmer ? "លុប" : "Delete"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
