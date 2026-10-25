"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client.js";
import { useLanguage } from "../../components/LanguageContext.js";

const GOLD = "#C9A96E";
const INK = "#1A1A1A";
const PARCHMENT = "#FAFAF8";
const centerBox = { minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: PARCHMENT, padding: "60px 20px", fontFamily: "'Inter', sans-serif", color: "#6A6A6A", fontSize: 15 };

export default function MyEntriesPage() {
  const { isKhmer } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!active) return;
      setUser(authUser);
      if (!authUser) { setLoading(false); return; }
      const { data } = await supabase.from("entries").select("*").eq("owner", authUser.id).order("created_at", { ascending: false });
      if (!active) return;
      setEntries(data || []);
      setLoading(false);
    }
    load();
    return () => { active = false; };
  }, [supabase]);

  if (loading) return <div style={centerBox}>Loading…</div>;
  if (!user) {
    return (
      <div style={centerBox}>
        <div style={{ textAlign: "center", maxWidth: 440, backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4, padding: "44px 36px" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: INK, marginBottom: 10 }}>{isKhmer ? "ទាមទារការចូលគណនី" : "Sign in required"}</h1>
          <p style={{ fontSize: 14, color: "#6A6A6A", marginBottom: 24 }}>{isKhmer ? "សូមចូលគណនីដើម្បីមើលសំណង់របស់អ្នក។" : "Please log in to view your entries."}</p>
          <Link href="/login?next=/my-entries" style={{ display: "inline-block", padding: "13px 28px", backgroundColor: INK, color: PARCHMENT, textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{isKhmer ? "ចូលគណនី" : "Log in"}</Link>
        </div>
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case "published": return isKhmer ? "បានផ្សាយ (Published)" : "Published (បានផ្សាយ)";
      case "returned": return isKhmer ? "បានស្នើសុំកែសម្រួល (Returned)" : "Returned (បានស្នើសុំកែសម្រួល)";
      case "pending":
      default: return isKhmer ? "កំពុងរង់ចាំការពិនិត្យ (Pending Review)" : "Pending Review (កំពុងរង់ចាំការពិនិត្យ)";

  return (
    <div style={{ backgroundColor: PARCHMENT, minHeight: "80vh", padding: "56px 20px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <header style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>{isKhmer ? "គណនីរបស់ខ្ញុំ" : "Contributor Dashboard"}</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: INK, marginBottom: 10 }}>{isKhmer ? "សំណង់របស់ខ្ញុំ" : "My Entries"}</h1>
            <p style={{ fontSize: 15, color: "#6A6A6A" }}>{isKhmer ? "គ្រប់គ្រង និងតាមដានស្ថានភាពសំណង់ដែលអ្នកបានដាក់ស្នើ។" : "Manage and track the review status of your contributed entries."}</p>
          </div>
          <Link href="/contribute" style={{ padding: "12px 20px", backgroundColor: GOLD, color: INK, textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{isKhmer ? "+ បន្ថែមសំណង់ថ្មី" : "+ Add New Entry"}</Link>
        </header>

        {entries.length === 0 ? (
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4, padding: "48px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "#6A6A6A", marginBottom: 20 }}>{isKhmer ? "អ្នកមិនទាន់បានដាក់ស្នើសំណង់ណាមួយទេ។" : "You haven't submitted any entries yet."}</p>
            <Link href="/contribute" style={{ display: "inline-block", padding: "12px 24px", backgroundColor: INK, color: PARCHMENT, textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{isKhmer ? "ដាក់ស្នើសំណង់ដំបូងរបស់អ្នក" : "Submit Your First Entry"}</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {entries.map((entry) => (
              <div key={entry.id} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: INK, marginBottom: 4 }}>{entry.title_en} {entry.title_km ? `· ${entry.title_km}` : ""}</h2>
                    <p style={{ fontSize: 13, color: "#8A8A8A" }}>{entry.era_en} · {entry.location_en} · {entry.year_en}</p>
                  </div>
                  <div style={{ padding: "6px 12px", borderRadius: 16, backgroundColor: "#F5F2EC", border: "1px solid #E5E0D8", fontSize: 12, fontWeight: 600, color: getStatusColor(entry.status), display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span>●</span> {getStatusText(entry.status)}
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#5A5A5A", lineHeight: 1.6 }}>{entry.description_en}</p>
                <div style={{ display: "flex", gap: 12, paddingTop: 12, borderTop: "1px solid #F0EBE1" }}>
                  <Link href={`/archive/${entry.id}`} style={{ fontSize: 12, fontWeight: 600, color: INK, textDecoration: "underline" }}>{isKhmer ? "មើលព័ត៌មានលម្អិត" : "View Entry"}</Link>
                  <span style={{ color: "#D0C9BF" }}>|</span>
                  <Link href={`/archive/${entry.id}/edit`} style={{ fontSize: 12, fontWeight: 600, color: INK, textDecoration: "underline" }}>{isKhmer ? "កែសម្រួល" : "Edit Entry"}</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

    }
  };

  const getStatusColor = (status) => {
    if (status === "published") return "#2E7D32";
    if (status === "returned") return "#C62828";
    return "#B26A00";
  };
