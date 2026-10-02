"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client.js";
import IFLDetailPage from "../ifl/page.js";
import IISPPDetailPage from "../iispp/page.js";
import FrenchDetailPage from "../french/page.js";

const GOLD = "#C9A96E";
const INK = "#1A1A1A";
const PARCHMENT = "#FAFAF8";

// A UUID (what every new contributed entry gets) looks like
// xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. The Sprint 1 pages used short
// numeric/slug ids, so we route those to the original static pages and
// treat anything UUID-shaped as a live database entry.
function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value || ""
  );
}

const centerBox = {
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: PARCHMENT,
  padding: "60px 20px",
  fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
  color: "#6A6A6A",
  fontSize: 15,
};

// Renders a single entry fetched live from Supabase (newly contributed rows).
function DbEntryDetail({ id }) {
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [userId, setUserId] = useState(null);
  const [state, setState] = useState("loading"); // loading | ready | missing | error
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    async function load() {
      // Fetch the entry and the current user together.
      const [{ data: entryData, error }, { data: userData }] = await Promise.all([
        supabase.from("entries").select("*").eq("id", id).maybeSingle(),
        supabase.auth.getUser(),
      ]);
      if (!active) return;

      setUserId(userData?.user?.id || null);

      if (error) {
        setState("error");
      } else if (!entryData) {
        setState("missing");
      } else {
        setEntry(entryData);
        setState("ready");
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [id]);

  // The owner comparison here only decides whether to SHOW the buttons.
  // It is politeness, not enforcement — the real refusal is the RLS policy
  // on the entries table (owners delete/edit their own). The .select() row
  // check below is how we find out when the database quietly said no.
  const isOwner = Boolean(userId && entry && userId === entry.owner);

  const handleDelete = async () => {
    if (!window.confirm("Delete this entry? This cannot be undone.")) return;

    setDeleting(true);
    setActionError("");
    const supabase = createClient();

    // Ask for the deleted rows back. If RLS refuses, Supabase reports no
    // error but returns zero rows — so an empty array means "not saved".
    const { data, error } = await supabase
      .from("entries")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      setActionError("That change wasn't saved");
      setDeleting(false);
      return;
    }

    if (!data || data.length === 0) {
      console.error("Delete affected zero rows (likely blocked by RLS).");
      setActionError("That change wasn't saved");
      setDeleting(false);
      return;
    }

    router.push("/archive");
    router.refresh();
  };

  if (state === "loading") return <div style={centerBox}>Loading the entry…</div>;
  if (state === "error")
    return <div style={centerBox}>We couldn&apos;t load this entry. Please try again.</div>;
  if (state === "missing")
    return (
      <div style={centerBox}>
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 18 }}>This entry doesn&apos;t exist.</p>
          <Link href="/archive" className="btn-primary" style={{ padding: "10px 20px" }}>
            ← Back to Archive
          </Link>
        </div>
      </div>
    );

  return (
    <div style={{ backgroundColor: PARCHMENT, minHeight: "100vh", padding: "60px 0 100px" }}>
      <div className="container">
        <div style={{ marginBottom: 32, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/archive"
            className="btn-primary"
            style={{ padding: "10px 20px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}
          >
            ← Back to Archive
          </Link>

          {/* Owner-only controls. Hidden for everyone else as a courtesy;
              the database policies are what actually enforce ownership. */}
          {isOwner && (
            <div style={{ display: "flex", gap: 10 }}>
              <Link
                href={`/archive/${id}/edit`}
                style={{
                  padding: "10px 20px", backgroundColor: INK, color: PARCHMENT, textDecoration: "none",
                  fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                }}
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: "10px 20px", backgroundColor: "#FFFFFF", color: "#B4452F",
                  border: "1px solid #D98B74", cursor: deleting ? "not-allowed" : "pointer",
                  fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                }}
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          )}
        </div>

        {actionError && (
          <div
            role="alert"
            style={{
              marginBottom: 24, padding: "12px 16px", backgroundColor: "#FBEDE9", border: "1px solid #D98B74",
              color: "#B4452F", fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13,
            }}
          >
            {actionError}
          </div>
        )}

        <div style={{ marginBottom: 36, borderBottom: "1px solid #E5E0D8", paddingBottom: 28 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 10,
            }}
          >
            {[entry.era_en, entry.location_en, entry.year_en].filter(Boolean).join(" · ")}
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: INK,
              lineHeight: 1.15,
              marginBottom: 6,
            }}
          >
            {entry.title_en}
          </h1>
          {entry.title_km && (
            <p
              style={{
                fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif",
                fontSize: "clamp(20px, 3vw, 30px)",
                color: "#6A6A6A",
              }}
            >
              {entry.title_km}
            </p>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          {entry.image_url && (
            <div style={{ overflow: "hidden", border: "1px solid #E5E0D8", backgroundColor: "#E2DDD5" }}>
              <img
                src={entry.image_url}
                alt={entry.title_en}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          <div>
            {entry.description_en && (
              <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 16, color: INK, lineHeight: 1.8, marginBottom: 24 }}>
                {entry.description_en}
              </p>
            )}
            {entry.story_en && (
              <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 15, color: "#6A6A6A", lineHeight: 1.9 }}>
                {entry.story_en}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EntryByIdPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id;

  // Live database entries (contributed via /contribute) use UUID ids.
  if (isUuid(id)) {
    return <DbEntryDetail id={id} />;
  }

  // Legacy Sprint 1 ids keep their original static pages so old links work.
  if (id === "2" || id === "iispp") {
    return <IISPPDetailPage />;
  }
  if (id === "3" || id === "french") {
    return <FrenchDetailPage />;
  }
  return <IFLDetailPage />;
}
