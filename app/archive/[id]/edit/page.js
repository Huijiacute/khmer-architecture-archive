"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client.js";
import EntryForm from "../../../../components/EntryForm.js";
import ConfirmDialog from "../../../../components/ConfirmDialog.js";
import { useLanguage } from "../../../../components/LanguageContext.js";

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
  const { isKhmer } = useLanguage();

  const [entry, setEntry] = useState(null);
  const [userId, setUserId] = useState(null);
  const [state, setState] = useState("loading"); // loading | ready | missing | denied | error
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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
    setStatus(isKhmer ? "កំពុងរក្សាទុក…" : "Saving...");

    const supabase = createClient();

    // Start from the existing photo; only replace it if the user picked a new one.
    let imageUrl = entry.image_url;

    if (file) {
      setStatus(isKhmer ? "កំពុងផ្ទុករូបថតឡើង…" : "Uploading...");
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setStatus(isKhmer ? "សម័យចូលប្រើរបស់អ្នកបានផុតកំណត់។ សូមចូលគណនីម្តងទៀត។" : "Your session expired. Please log in again.");
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
        setStatus(isKhmer ? "មិនអាចផ្ទុករូបថតឡើងបានទេ។ សូមព្យាយាមម្តងទៀត។" : "Failed to upload photo. Please try again.");
        setSubmitting(false);
        return;
      }

      imageUrl = supabase.storage.from("photos").getPublicUrl(filePath).data.publicUrl;
    }

    // ── Update the row ──
    // Every owner edit goes back to 'pending'. The database policy requires
    // this too (supabase/review_fix.sql), so it is not just politeness.
    const updatePayload = { ...values, image_url: imageUrl, status: "pending" };

    setStatus(isKhmer ? "កំពុងរក្សាទុក…" : "Saving...");
    const { data, error } = await supabase
      .from("entries")
      .update(updatePayload)
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      setStatus(isKhmer ? "ការកែប្រែនេះមិនត្រូវបានរក្សាទុកទេ" : "That change wasn't saved");
      setSubmitting(false);
      return;
    }

    if (!data || data.length === 0) {
      console.error("Update affected zero rows (likely blocked by RLS).");
      setStatus(isKhmer ? "ការកែប្រែនេះមិនត្រូវបានរក្សាទុកទេ" : "That change wasn't saved");
      setSubmitting(false);
      return;
    }

    router.push(`/archive/${id}`);
    router.refresh();
  };

  // Delete: re-verify ownership at click time, then let the database have the
  // final say. The "owners delete their own entries" RLS policy refuses anyone
  // else; a refusal comes back as zero deleted rows, never as an error.
  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError("");
    const supabase = createClient();

    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser || authUser.id !== entry.owner) {
      setDeleteError(isKhmer ? "អ្នកអាចលុបបានតែសំណង់ដែលអ្នកបានដាក់ស្នើប៉ុណ្ណោះ។" : "You can only delete entries you submitted.");
      setDeleting(false);
      return;
    }

    const { data, error } = await supabase.from("entries").delete().eq("id", id).select();

    if (error || !data || data.length === 0) {
      console.error(error || "Delete affected zero rows (likely blocked by RLS).");
      setDeleteError(isKhmer ? "មិនអាចលុបសំណង់នេះបានទេ។ សូមព្យាយាមម្តងទៀត។" : "Couldn't delete this entry. Please try again.");
      setDeleting(false);
      return;
    }

    router.push("/my-entries");
    router.refresh();
  };

  if (state === "loading") return <div style={centerBox}>{isKhmer ? "កំពុងផ្ទុក…" : "Loading…"}</div>;
  if (state === "error")
    return <div style={centerBox}>{isKhmer ? "មិនអាចផ្ទុកសំណង់នេះបានទេ។ សូមព្យាយាមម្តងទៀត។" : "We couldn't load this entry. Please try again."}</div>;
  if (state === "missing")
    return (
      <div style={centerBox}>
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 18 }}>{isKhmer ? "មិនមានសំណង់នេះទេ។" : "This entry doesn't exist."}</p>
          <Link href="/#archive" className="btn-primary" style={{ padding: "10px 20px" }}>← {isKhmer ? "ត្រឡប់ទៅបណ្ណសារ" : "Back to Archive"}</Link>
        </div>
      </div>
    );
  if (state === "denied")
    return (
      <div style={centerBox}>
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 18 }}>{isKhmer ? "អ្នកអាចកែសម្រួលបានតែសំណង់របស់អ្នកផ្ទាល់ប៉ុណ្ណោះ។" : "You can only edit your own entries."}</p>
          <Link href={`/archive/${id}`} className="btn-primary" style={{ padding: "10px 20px" }}>← {isKhmer ? "ត្រឡប់ទៅសំណង់" : "Back to the entry"}</Link>
        </div>
      </div>
    );

  return (
    <div style={{ backgroundColor: PARCHMENT, minHeight: "80vh", padding: "56px 20px 80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>
            {isKhmer ? "កែសម្រួលសំណង់" : "Edit entry"}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', 'Kantumruy Pro', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: INK, lineHeight: 1.1, marginBottom: 10 }}>
            {isKhmer ? (entry.title_km || entry.title_en) : entry.title_en}
          </h1>
          <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 15, color: "#6A6A6A", lineHeight: 1.7, maxWidth: 520 }}>
            {isKhmer ? "កែប្រែព័ត៌មានខាងក្រោម។ ទុកប្រអប់រូបថតឱ្យទទេ ដើម្បីរក្សារូបថតបច្ចុប្បន្ន។" : "Update the details below. Leave the photo empty to keep the current one."}
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
            contributor_en: entry.contributor_en || "",
            contributor_km: entry.contributor_km || "",
          }}
          requirePhoto={false}
          submitLabel={isKhmer ? "រក្សាទុកការកែប្រែ →" : "Save changes →"}
          submitting={submitting}
          status={status}
          statusIsError={!submitting && Boolean(status)}
          onSubmit={handleSubmit}
        />

        {/* Danger zone: only reachable by the owner (non-owners are blocked above). */}
        <section
          aria-labelledby="danger-title"
          style={{ marginTop: 32, padding: "22px 24px", border: "1px solid #E8C9C0", borderRadius: 4, backgroundColor: "#FFFFFF", display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
        >
          <div style={{ flex: "1 1 260px" }}>
            <h2 id="danger-title" style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, fontWeight: 700, color: "#B4452F", marginBottom: 4 }}>
              {isKhmer ? "លុបសំណង់នេះ" : "Delete this entry"}
            </h2>
            <p style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, color: "#6A6A6A", lineHeight: 1.6 }}>
              {isKhmer ? "សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។ មានតែអ្នកដែលបានដាក់ស្នើសំណង់នេះប៉ុណ្ណោះដែលអាចលុបបាន។" : "This cannot be undone. Only the person who submitted an entry can delete it."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setDeleteError(""); setConfirmOpen(true); }}
            style={{ padding: "11px 20px", backgroundColor: "#FFFFFF", color: "#B4452F", border: "1px solid #D98B74", borderRadius: 2, fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}
          >
            {isKhmer ? "លុបសំណង់" : "Delete entry"}
          </button>
        </section>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={isKhmer ? "លុបសំណង់នេះមែនទេ?" : "Delete this entry?"}
        itemName={isKhmer ? (entry.title_km || entry.title_en) : entry.title_en}
        message={isKhmer ? "សំណង់នេះនឹងត្រូវលុបជាអចិន្ត្រៃយ៍ ហើយមិនអាចយកមកវិញបានទេ។" : "This will permanently remove the entry from the archive. This cannot be undone."}
        confirmLabel={isKhmer ? "លុបជាអចិន្ត្រៃយ៍" : "Delete permanently"}
        busy={deleting}
        error={deleteError}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
