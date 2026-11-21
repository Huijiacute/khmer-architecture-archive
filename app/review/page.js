import { createClient } from "../../lib/supabase/server.js";
import ReviewQueue from "../../components/ReviewQueue.js";
import PublishedList from "../../components/PublishedList.js";
import T from "../../components/T.js";

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
  fontFamily: "'Inter', sans-serif",
  color: "#6A6A6A",
  fontSize: 15,
};

export default async function ReviewPage() {
  const supabase = await createClient();

  // Check if the current user is logged in at all.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div style={centerBox}>
        <div
          style={{
            textAlign: "center",
            maxWidth: 440,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E0D8",
            borderRadius: 4,
            padding: "44px 36px",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 30,
              fontWeight: 700,
              color: INK,
              marginBottom: 10,
            }}
          >
            <T en="Sign in required" km="ទាមទារការចូលគណនី" />
          </h1>
          <p style={{ fontSize: 14, color: "#6A6A6A", marginBottom: 24 }}>
            <T en="Please log in to access this page." km="សូមចូលគណនីដើម្បីចូលប្រើទំព័រនេះ។" />
          </p>
          <a
            href="/login?next=/review"
            style={{
              display: "inline-block",
              padding: "13px 28px",
              backgroundColor: INK,
              color: PARCHMENT,
              textDecoration: "none",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <T en="Log in" km="ចូលគណនី" />
          </a>
        </div>
      </div>
    );
  }

  // Check reviewer role via RPC.
  const { data: isReviewer } = await supabase.rpc("is_reviewer");

  if (!isReviewer) {
    return (
      <div style={centerBox}>
        <div
          style={{
            textAlign: "center",
            maxWidth: 440,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E0D8",
            borderRadius: 4,
            padding: "44px 36px",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>🚫</div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 700,
              color: INK,
              marginBottom: 10,
            }}
          >
            <T en="Reviewers only" km="សម្រាប់អ្នកត្រួតពិនិត្យប៉ុណ្ណោះ" />
          </h1>
          <p style={{ fontSize: 14, color: "#6A6A6A" }}>
            <T en="This page is for archive reviewers only." km="ទំព័រនេះសម្រាប់តែអ្នកត្រួតពិនិត្យបណ្ណសារប៉ុណ្ណោះ។" />
          </p>
        </div>
      </div>
    );
  }

  // Fetch pending entries oldest-first.
  const { data: entries, error: queueError } = await supabase
    .from("entries")
    .select(
      "id, title_en, title_km, era_en, location_en, year_en, description_en, description_km, image_url, contributor_en, created_at"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  // Published entries, newest first, for the reviewer's delete tool.
  const { data: published } = await supabase
    .from("entries")
    .select("id, title_en, title_km")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <div style={{ backgroundColor: PARCHMENT, minHeight: "80vh", padding: "56px 20px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <header style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 10,
            }}
          >
            <T en="Reviewer Dashboard" km="ផ្ទាំងអ្នកត្រួតពិនិត្យ" />
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: INK,
              marginBottom: 10,
            }}
          >
            <T en="Review Queue" km="ជួរពិនិត្យ" />
          </h1>
          <p style={{ fontSize: 15, color: "#6A6A6A" }}>
            <T en="Entries awaiting your decision, oldest first." km="សំណង់កំពុងរង់ចាំការសម្រេចរបស់អ្នក ចាស់ៗមុនគេ។" />
          </p>
        </header>

        {queueError ? (
          <p style={{ fontSize: 14, color: "#C62828", backgroundColor: "#FFF5F5", border: "1px solid #FFCDD2", borderRadius: 4, padding: "14px 16px" }}>
            <T
              en="Couldn't load the review queue. Check that supabase/review.sql was run in your Supabase project."
              km="មិនអាចផ្ទុកជួរពិនិត្យបានទេ។ សូមពិនិត្យថា supabase/review.sql ត្រូវបានដំណើរការក្នុង Supabase។"
            />
            {" "}({queueError.message})
          </p>
        ) : (
          <ReviewQueue initialEntries={entries || []} />
        )}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: INK, marginBottom: 6 }}>
            <T en="Published Entries" km="សំណង់ដែលបានផ្សាយ" />
          </h2>
          <p style={{ fontSize: 14, color: "#6A6A6A", marginBottom: 20 }}>
            <T en="Reviewers can remove any published entry. Deleting is permanent." km="អ្នកត្រួតពិនិត្យអាចលុបសំណង់ដែលបានផ្សាយណាមួយ។ ការលុបគឺអចិន្ត្រៃយ៍។" />
          </p>
          <PublishedList initialEntries={published || []} />
        </section>
      </div>
    </div>
  );
}