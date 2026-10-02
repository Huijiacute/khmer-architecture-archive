"use client";

import { useState } from "react";

// ── Shared entry form (used by /contribute and /archive/[id]/edit) ──
// Same fields, same validation rules in one place so both pages stay
// identical. The parent owns the save logic and passes it in via onSubmit;
// this component only collects + validates input, then hands back the
// trimmed text values and the chosen File (or null if unchanged).

const GOLD = "#C9A96E";
const INK = "#1A1A1A";

const labelStyle = {
  display: "block",
  fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: INK,
  marginBottom: 6,
};

const requiredMark = { color: GOLD, marginLeft: 4 };

const hintStyle = {
  fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
  fontSize: 11,
  color: "#9A9A8E",
  marginTop: 6,
};

const errorStyle = {
  fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
  fontSize: 12,
  color: "#B4452F",
  marginTop: 6,
};

function fieldStyle(hasError) {
  return {
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "#FFFFFF",
    border: `1px solid ${hasError ? "#D98B74" : "#D5CEBF"}`,
    borderRadius: 2,
    color: INK,
    fontSize: 15,
    fontFamily: "'Inter', 'Kantumruy Pro', sans-serif",
    lineHeight: 1.6,
    outline: "none",
    boxSizing: "border-box",
  };
}

const TEXT_FIELDS = [
  { id: "title_en", label: "Title (English)", required: true, hint: "The landmark's name in English." },
  { id: "title_km", label: "Title (ខ្មែរ)", required: true, hint: "ឈ្មោះសំណង់ជាភាសាខ្មែរ." },
  { id: "era_en", label: "Era", required: true, hint: "e.g. Angkorian, New Khmer, Contemporary." },
  { id: "location_en", label: "Province / Location", required: true, hint: "Where the landmark stands." },
  { id: "year_en", label: "Year Built", required: true, hint: "Year, or year/month/day." },
];

const TEXTAREA_FIELDS = [
  { id: "description_en", label: "Description", required: true, hint: "Required. Max 150 words." },
  { id: "story_en", label: "Story", required: false, hint: "Optional. Max 200 words." },
];

const EMPTY = { title_en: "", title_km: "", era_en: "", location_en: "", year_en: "", description_en: "", story_en: "" };

export default function EntryForm({
  initialValues = EMPTY,
  requirePhoto = true, // contribute requires a photo; edit keeps the old one
  submitLabel = "Submit entry →",
  status = "",
  submitting = false,
  onSubmit,
}) {
  const [formData, setFormData] = useState({ ...EMPTY, ...initialValues });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.title_en.trim()) e.title_en = "Required";
    if (!formData.title_km.trim()) e.title_km = "Required";
    if (!formData.era_en.trim()) e.era_en = "Required";
    if (!formData.location_en.trim()) e.location_en = "Required";
    if (!formData.year_en.trim()) e.year_en = "Required";
    if (!formData.description_en.trim()) e.description_en = "Required";
    else if (formData.description_en.trim().split(/\s+/).length > 150) e.description_en = "Max 150 words";
    if (formData.story_en.trim() && formData.story_en.trim().split(/\s+/).length > 200) e.story_en = "Max 200 words";

    // Photo: required on contribute, optional on edit. When a file IS picked
    // (either mode), it must still be a valid image within the size limit.
    if (requirePhoto && !file) e.file = "Required";
    else if (file && !["image/jpeg", "image/png"].includes(file.type)) e.file = "JPG or PNG only";
    else if (file && file.size > 10 * 1024 * 1024) e.file = "Max 10MB";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const trimmed = {
      title_en: formData.title_en.trim(),
      title_km: formData.title_km.trim(),
      era_en: formData.era_en.trim(),
      location_en: formData.location_en.trim(),
      year_en: formData.year_en.trim(),
      description_en: formData.description_en.trim(),
      story_en: formData.story_en.trim(),
    };
    onSubmit(trimmed, file);
  };

  const fileName = file?.name;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E0D8", borderRadius: 4, padding: "clamp(24px, 4vw, 40px)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {TEXT_FIELDS.map(({ id, label, required, hint }) => (
          <div key={id}>
            <label htmlFor={id} style={labelStyle}>
              {label}{required && <span style={requiredMark}>*</span>}
            </label>
            <input
              id={id}
              style={fieldStyle(Boolean(errors[id]))}
              value={formData[id]}
              onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
              aria-invalid={Boolean(errors[id])}
              aria-describedby={`${id}-hint`}
            />
            {errors[id]
              ? <div style={errorStyle}>{errors[id]}</div>
              : <div id={`${id}-hint`} style={hintStyle}>{hint}</div>}
          </div>
        ))}

        {TEXTAREA_FIELDS.map(({ id, label, required, hint }) => (
          <div key={id}>
            <label htmlFor={id} style={labelStyle}>
              {label}{required && <span style={requiredMark}>*</span>}
            </label>
            <textarea
              id={id}
              rows={id === "story_en" ? 6 : 4}
              style={{ ...fieldStyle(Boolean(errors[id])), resize: "vertical", minHeight: 96 }}
              value={formData[id]}
              onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
              aria-invalid={Boolean(errors[id])}
              aria-describedby={`${id}-hint`}
            />
            {errors[id]
              ? <div style={errorStyle}>{errors[id]}</div>
              : <div id={`${id}-hint`} style={hintStyle}>{hint}</div>}
          </div>
        ))}

        {/* ── Photo picker ── */}
        <div>
          <label htmlFor="photo" style={labelStyle}>
            Photo{requirePhoto && <span style={requiredMark}>*</span>}
          </label>
          <label
            htmlFor="photo"
            style={{
              display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
              padding: "12px 14px", backgroundColor: "#FFFFFF",
              border: `1px dashed ${errors.file ? "#D98B74" : "#C9BFA8"}`, borderRadius: 2,
            }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: INK, backgroundColor: "#EAE5DB", padding: "8px 14px", borderRadius: 2, flexShrink: 0 }}>
              Choose photo
            </span>
            <span style={{ fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, color: fileName ? INK : "#9A9A8E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {fileName || "No file selected"}
            </span>
          </label>
          <input
            id="photo"
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => setFile(e.target.files[0] || null)}
            style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0 0 0 0)", border: 0 }}
          />
          {errors.file
            ? <div style={errorStyle}>{errors.file}</div>
            : <div style={hintStyle}>{requirePhoto ? "Required. JPG or PNG, max 10MB." : "Optional. Leave empty to keep the current photo. JPG or PNG, max 10MB."}</div>}
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: 6, padding: "15px 24px",
            backgroundColor: submitting ? "#D8C9A6" : GOLD, color: INK, border: "none", borderRadius: 2,
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: submitting ? "not-allowed" : "pointer", transition: "background-color 0.2s ease",
          }}
        >
          {submitting ? (status || "Saving…") : submitLabel}
        </button>

        {status && (
          <div
            role="status"
            style={{
              fontFamily: "'Inter', 'Kantumruy Pro', sans-serif", fontSize: 13, textAlign: "center",
              color: status.startsWith("Failed") || status.startsWith("That change") ? "#B4452F" : "#6A6A6A",
            }}
          >
            {status}
          </div>
        )}
      </div>
    </form>
  );
}
