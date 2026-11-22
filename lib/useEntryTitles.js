"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "./supabase/client.js";

const MAX_SUGGESTIONS = 6;

// Khmer can be typed or stored with differently ordered code points, so both
// sides are normalized to NFC before comparing. toLowerCase only affects Latin.
export function normalizeText(text) {
  return String(text || "").normalize("NFC").trim().toLowerCase();
}

// Loads published entry titles (id + English + Khmer) each time `enabled`
// turns true, so a freshly published entry shows up without a page reload.
export function useEntryTitles(enabled) {
  const supabase = useMemo(() => createClient(), []);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    supabase
      .from("entries")
      .select("id, title_en, title_km")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active || error) return;
        setTitles((data || []).map((r) => ({ id: r.id, titleEn: r.title_en || "", titleKm: r.title_km || "" })));
      });
    return () => {
      active = false;
    };
  }, [enabled, supabase]);

  return titles;
}

// Empty query: the newest titles. Otherwise titles containing the query in
// either language, with titles that START with the query listed first.
export function matchTitles(titles, query) {
  const q = normalizeText(query);
  if (!q) return titles.slice(0, MAX_SUGGESTIONS);

  const starts = [];
  const contains = [];
  for (const t of titles) {
    const en = normalizeText(t.titleEn);
    const km = normalizeText(t.titleKm);
    if (en.startsWith(q) || km.startsWith(q)) starts.push(t);
    else if (en.includes(q) || km.includes(q)) contains.push(t);
  }
  return [...starts, ...contains].slice(0, MAX_SUGGESTIONS);
}
