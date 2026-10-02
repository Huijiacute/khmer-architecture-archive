"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client.js";
import EntryForm from "../../../../components/EntryForm.js";

const GOLD = "#C9A96E";
const INK = "#1A1A1A";
const PARCHMENT = "#FAFAF8";

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

export default function EditEntryPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [entry, setEntry] = useState(null);
  const [userId, setUserId] = useState(null);
  const [state, setState] = useState("loading"); // loading | ready | missing | denied | error
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    async function load() {
      const [{ data: entryData, error }, { data: userData }] = await Promise.all([
        supabase.from("entries").select("*").eq("id", id).maybeSingle(),
        supabase.auth.getUser(),
      ]);
      if (!active) return;

      const uid = userData?.user?.id || null;
      setUserId(uid);

      if (error) {
        setState("error");
      } else if (!entryData) {
        setState("missing");
      } else if (!uid || uid !== entryData.owner) {
        // Owner gate in the UI is courtesy only; the RLS update policy is
        // the real enforcement. We still hide the form from non-owners.
        setState("denied");
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

  // Receives already-trimmed text values and the chosen File (or null).
  const handleSubmit = async (values, file) => {
    setSubmitting(true);
    setStatus("Saving...");

    const supabase = createClient();

    // Start from the existing photo; only replace it if the user picked a new one.
    let imageUrl = entry.image_url;

    if (file) {
      setStatus("Uploading...");
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setStatus("Your session expired. Please log in again.");
        setSubmitting(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${authUser.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        console.error(uploadError);
        setStatus("Failed to upload photo. Please try again.");
        setSubmitting(false);
        return;
      }

      imageUrl = supabase.storage.from("photos").getPublicUrl(filePath).data.publicUrl;
    }

    // ── Update the row ──
    // Columns listed explicitly; `owner` is never changed here. Ask for the
    // updated rows back: if RLS refuses the update, Supabase returns no error
    // but zero rows, so an empty result means the change did not happen.
    setStatus("Saving...");
    const { data, error } = await supabase
      .from("entries")
      .update({ ...values, image_url: imageUrl })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      setStatus("That change wasn't saved");
      setSubmitting(false);
      return;
    }

    if (!data || data.length === 0) {
      console.error("Update affected zero rows (likely blocked by RLS).");
      setStatus("That change wasn't saved");
      setSubmitting(false);
      return;
    }

    router.push(`/archive/${id}`);
    router.refresh();
  };

  if (state === "loading") return <div style={centerBox}>Loading…</div>;
  if (state === "error")
    return <div style={centerBox}>We couldn&apos;t load this entry. Please try again.</div>;
  if (state === "missing")
    return (
      <div style={centerBox}>
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 18 }}>This entry doesn&apos;t exist.</p>
          <Link href="/archive" className="btn-primary" style={{ padding: "10px 20px" }}>← Back to Archive</Link>
        </div>
      </div>
    );
  if (state === "denied")
    return (
      <div style={centerBox}>
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 18 }}>You can only edit your own entries.</p>
          <Link href={`/archive/${id}`} className="btn-primary" style={{ padding: "10px 20px" }}>← Back to the entry</Link>
        </div>
      </div>
    );

  return (
    <div style={{ backgroundColor: PARCHMENT, minHeight: "80vh", padding: "56px 20px 80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>
            Edit entry
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: INK, lineHeight: 1.1, marginBottom: 10 }}>
            {entry.title_en}
          </h1>
          <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 15, color: "#6A6A6A", lineHeight: 1.7, maxWidth: 520 }}>
            Update the details below. Leave the photo empty to keep the current one.
          </p>
        </header>

        <EntryForm
          initialValues={{
            title_en: entry.title_en || "",
            title_km: entry.title_km || "",
            era_en: entry.era_en || "",
            location_en: entry.location_en || "",
            year_en: entry.year_en || "",
            description_en: entry.description_en || "",
            story_en: entry.story_en || "",
          }}
          requirePhoto={false}
          submitLabel="Save changes →"
          submitting={submitting}
          status={status}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
