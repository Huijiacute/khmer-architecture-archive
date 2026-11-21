"use client";

import { useState, useMemo } from "react";
import { createClient } from "../lib/supabase/client.js";
import { useLanguage } from "./LanguageContext.js";

const RED = "#C62828";
const btn = { padding: "10px 18px", borderRadius: 2, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${RED}`, backgroundColor: "#FFFFFF", color: RED };

// Confirm-then-delete for one entry. Shown only to the owner or a reviewer
// (a display choice); the database delete policy is what enforces it.
export default function DeleteEntryButton({ id, onDeleted }) {
  const { isKhmer } = useLanguage();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const supabase = useMemo(() => createClient(), []);

  async function remove() {
    setBusy(true);
    setError("");
    const { data, error: err } = await supabase.from("entries").delete().eq("id", id).select();
    if (err || !data || data.length === 0) {
      setError(isKhmer ? "មិនអាចលុបសំណង់នេះបានទេ។" : "Couldn't delete this entry.");
      setConfirming(false);
      setBusy(false);
      return;
    }
    onDeleted(id);
  }

  if (!confirming) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <button type="button" onClick={() => setConfirming(true)} style={btn}>{isKhmer ? "លុប" : "Delete"}</button>
        {error && <span style={{ fontSize: 12, color: RED }}>{error}</span>}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontSize: 13, color: RED }}>{isKhmer ? "លុបជាអចិន្ត្រៃយ៍?" : "Delete permanently?"}</span>
      <button type="button" disabled={busy} onClick={remove} style={{ ...btn, backgroundColor: RED, color: "#FFFFFF" }}>
        {isKhmer ? "បាទ/ចាស លុប" : "Yes, delete"}
      </button>
      <button type="button" onClick={() => setConfirming(false)} style={{ ...btn, color: "#1A1A1A", borderColor: "#E5E0D8" }}>
        {isKhmer ? "បោះបង់" : "Cancel"}
      </button>
    </div>
  );
}
