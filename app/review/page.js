import { createClient } from "../../lib/supabase/server.js";
import ReviewQueue from "../../components/ReviewQueue.js";

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
            ទាមទារការចូលគណនី · Sign in required
          </h1>
          <p style={{ fontSize: 14, color: "#6A6A6A", marginBottom: 24 }}>
            សូមចូលគណនីដើម្បីចូលប្រើទំព័រនេះ។ · Please log in to access this page.
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
            ចូលគណនី · Log in
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
            អ្នកត្រួតពិនិត្យបណ្ណសារប៉ុណ្ណោះ · Reviewers only
          </h1>
          <p style={{ fontSize: 14, color: "#6A6A6A" }}>
            ទំព័រនេះសម្រាប់តែអ្នកត្រួតពិនិត្យបណ្ណសារប៉ុណ្ណោះ។ · This page is for archive reviewers only.
          </p>
        </div>
      </div>
    );
  }

  // Fetch pending entries oldest-first.
  const { data: entries } = await supabase
    .from("entries")
    .select(
      "id, title_en, title_km, era_en, location_en, year_en, description_en, description_km, image_url, contributor_en, created_at"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

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
            ផ្ទាំងអ្នកត្រួតពិនិត្យ · Reviewer Dashboard
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
            ជួរពិនិត្យ · Review Queue
          </h1>
          <p style={{ fontSize: 15, color: "#6A6A6A" }}>
            សំណង់កំពុងរង់ចាំការសម្រេចរបស់អ្នក ចាស់ៗមុនគេ។ · Entries awaiting your decision, oldest first.
          </p>
        </header>

        <ReviewQueue initialEntries={entries || []} />
      </div>
    </div>
  );
}
