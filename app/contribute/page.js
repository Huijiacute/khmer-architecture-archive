"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import EntryForm from "../../components/EntryForm.js";

// ── Palette (matches the archive: parchment, near-black, sandstone gold) ──
const GOLD = "#C9A96E";
const INK = "#1A1A1A";
const PARCHMENT = "#FAFAF8";

export default function ContributePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });
  }, []);

  // Receives already-trimmed text values and the chosen File from EntryForm.
  const handleSubmit = async (values, file) => {
    setSubmitting(true);
    setStatus("Uploading...");

    const supabase = createClient();

    // Re-read the user at submit time so the owner we trust comes straight
    // from Supabase auth, not from stale component state.
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      setStatus("Your session expired. Please log in again.");
      setSubmitting(false);
      return;
    }

    // ── Upload the photo first ──
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

    const { data: { publicUrl } } = supabase.storage
      .from("photos")
      .getPublicUrl(filePath);

    // ── Save the row ──
    // Columns are listed explicitly and `owner` is set from the trusted
    // auth user — never spread from form data, so the owner cannot be spoofed.
    setStatus("Saving...");
    const { data, error: insertError } = await supabase
      .from("entries")
      .insert({ ...values, image_url: publicUrl, owner: authUser.id })
      .select()
      .single();

    if (insertError) {
      console.error(insertError);
      setStatus("Failed to save your entry. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push(`/archive/${data.id}`);
  };

  if (loading) return null;

  if (!user) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: PARCHMENT, padding: "60px 20px" }}>
        <div style={{ maxWidth: 440, textAlign: "center", backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4, padding: "44px 36px" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }} role="img" aria-label="Locked">🔒</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: 30, fontWeight: 700, color: INK, marginBottom: 10 }}>Contributors only</h1>
          <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 14, color: "#6A6A6A", lineHeight: 1.7, marginBottom: 24 }}>
            You need an account to add an entry to the archive.
          </p>
          <a href="/login" style={{ display: "inline-block", padding: "13px 28px", backgroundColor: INK, color: PARCHMENT, textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Log in to contribute
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: PARCHMENT, minHeight: "80vh", padding: "56px 20px 80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>
            Add to the archive
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: INK, lineHeight: 1.1, marginBottom: 10 }}>
            Contribute an entry
          </h1>
          <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 15, color: "#6A6A6A", lineHeight: 1.7, maxWidth: 520 }}>
            Document a Khmer landmark. Fields marked <span style={{ color: GOLD }}>*</span> are required. Khmer text is welcome everywhere.
          </p>
        </header>

        <EntryForm
          requirePhoto
          submitLabel="Submit entry →"
          submitting={submitting}
          status={status}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
