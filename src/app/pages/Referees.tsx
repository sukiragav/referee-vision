import { useState } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const T = {
  bg: "#111111",
  orange: "#E8651A",
  white: "#FFFFFF",
  charcoal: "#1C1C1C",
  grey: "#888888",
  border: "#2A2A2A",
  inactive: "#AAAAAA",
  dimText: "#E8651A",
  breadcrumbBg: "#0D0D0D",
  hoverBg: "#1F1F1F",
  mutedText: "#666666",
  placeholderText: "#444444",
} as const;

const BARLOW = "'Barlow Condensed', sans-serif";
const DM = "'DM Sans', sans-serif";

// ─── Data ────────────────────────────────────────────────────────────────────
type Tab =
  | "MECHANICS"
  | "DUTIES"
  | "SIGNALS"
  | "FITNESS TESTS"
  | "PHYSICAL TRAINING"
  | "WARM UP EXERCISES"
  | "MENTAL PREPARATION"
  | "IMPROVE YOURSELF"
  | "FIBA LICENSING"
  | "ASSIST ARTICLES";

const TABS: Tab[] = [
  "MECHANICS",
  "DUTIES",
  "SIGNALS",
  "FITNESS TESTS",
  "PHYSICAL TRAINING",
  "WARM UP EXERCISES",
  "MENTAL PREPARATION",
  "IMPROVE YOURSELF",
  "FIBA LICENSING",
  "ASSIST ARTICLES",
];

const DOCS = [
  { label: "3PO (NATIONAL REFEREE)", version: "Version 1.0 – Valid as of 2025" },
  { label: "2PO (NATIONAL REFEREE)", version: "Version 1.0a – Valid as of 2024" },
  { label: "3PO BASIC", version: "Version 2.5 – Valid as of December 2024" },
  { label: "3PO ADVANCED", version: "Version 2.0 – Valid as of March 2023" },
  { label: "INDIVIDUAL OFFICIATING TECHNIQUES (IOT)", version: "Version 2.5 – Valid as of December 2024" },
  { label: "BASIC OFFICIATING TERMINOLOGY", version: "Version 2.1 – Valid as of May 2023" },
  { label: "4TH_REFEREE", version: "Version 1.0 – Valid as of January 2024" }, // special-cased below
  { label: "PROTOCOL CHECKLIST FOR REFEREES", version: "Version 1.0 – Valid as of June 2025" },
];

const VIDEO_COLS = [
  { heading: "FIBA 3 PERSON MECHANICS", count: 3 },
  { heading: "MOVEMENT OF OFFICIALS", count: 1 },
  { heading: "COURT COVERAGE", count: 2 },
];

// ─── Shared hook: hover state ────────────────────────────────────────────────
function useHover() {
  const [on, set] = useState(false);
  return { on, onMouseEnter: () => set(true), onMouseLeave: () => set(false) };
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, onSelect }: { active: Tab; onSelect: (t: Tab) => void }) {
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: T.charcoal,
        borderRight: `1px solid ${T.border}`,
        // 3px orange left edge
        borderLeft: `3px solid ${T.orange}`,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Label */}
      <div
        style={{
          padding: "40px 28px 16px",
          borderBottom: `1px solid ${T.border}`,
          marginBottom: 0,
        }}
      >
        <span
          style={{
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 30,
            color: T.orange,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          REFEREES
        </span>
      </div>

      {/* Nav items */}
      <div style={{ paddingTop: 0 }}>
        {TABS.map((tab) => (
          <SidebarItem key={tab} tab={tab} active={tab === active} onSelect={onSelect} />
        ))}
      </div>
    </aside>
  );
}

function SidebarItem({
  tab,
  active,
  onSelect,
}: {
  tab: Tab;
  active: boolean;
  onSelect: (t: Tab) => void;
}) {
  const h = useHover();

  let bg = "transparent";
  let color = T.inactive;
  let borderLeft = "4px solid transparent";

  if (active) {
    bg = T.orange;
    color = T.white;
    borderLeft = `4px solid ${T.white}`;
  } else if (h.on) {
    bg = T.hoverBg;
    color = T.white;
    borderLeft = `4px solid ${T.orange}`;
  }

  return (
    <button
      onClick={() => onSelect(tab)}
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: bg,
        color,
        fontFamily: BARLOW,
        fontWeight: 600,
        fontSize: 16,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "14px 28px",
        border: "none",
        borderLeft,
        borderRadius: 0,
        cursor: "pointer",
        transition: "background 0.12s, color 0.12s, border-left-color 0.12s",
      }}
    >
      {tab}
    </button>
  );
}

// ─── Section badge ────────────────────────────────────────────────────────────
function SectionBadge({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: T.orange,
          color: "var(--off-white)",
          fontFamily: BARLOW,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "3px",
          textTransform: "uppercase",
          padding: "10px 40px",
          borderRadius: 0,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Document row ─────────────────────────────────────────────────────────────
function DocRow({ doc }: { doc: (typeof DOCS)[number] }) {
  const h = useHover();
  const isFourth = doc.label === "4TH_REFEREE";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        padding: "0 8px",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      {/* Document name */}
      <span
        style={{
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 15,
          color: T.dimText,
          flex: 1,
          minWidth: 0,
        }}
      >
        {isFourth ? (
          <>
            4<sup style={{ fontSize: "0.65em", verticalAlign: "super", lineHeight: 0 }}>TH</sup>{" "}
            REFEREE – AN ADDED VALUE
          </>
        ) : (
          doc.label
        )}
        {"  "}
        <span style={{ color: T.mutedText, fontSize: 13, fontWeight: 400 }}>({doc.version})</span>
      </span>

      {/* Download button */}
      <button
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        style={{
          background: h.on ? T.orange : "transparent",
          border: `1px solid ${T.orange}`,
          color: h.on ? T.white : T.orange,
          fontFamily: BARLOW,
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "2px",
          padding: "8px 20px",
          borderRadius: 0,
          cursor: "pointer",
          transition: "background 0.15s, color 0.15s",
          flexShrink: 0,
          marginLeft: 16,
          textTransform: "uppercase",
        }}
      >
        ↓ DOWNLOAD
      </button>
    </div>
  );
}

// ─── Video thumbnail ──────────────────────────────────────────────────────────
const THUMB_SHADES = [
  "#1A2416",
  "#16201A",
  "#1E1A16",
  "#161E20",
  "#1A161E",
  "#1E1E16",
];

function VideoThumb({ index }: { index: number }) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        flex: 1,
        aspectRatio: "16 / 9",
        background: THUMB_SHADES[index % THUMB_SHADES.length],
        border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color 0.15s, filter 0.15s",
        filter: h.on ? "brightness(1.25)" : "brightness(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid lines to suggest a court diagram */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", opacity: 0.15 }}
        preserveAspectRatio="none"
      >
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke={T.orange} strokeWidth="1" />
        <circle cx="50%" cy="50%" r="18%" stroke={T.orange} strokeWidth="1" fill="none" />
        <rect x="10%" y="20%" width="25%" height="60%" stroke={T.orange} strokeWidth="1" fill="none" />
        <rect x="65%" y="20%" width="25%" height="60%" stroke={T.orange} strokeWidth="1" fill="none" />
      </svg>

      {/* Play button */}
      <div
        style={{
          width: 32,
          height: 32,
          background: h.on ? T.orange : "rgba(232,101,26,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s",
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
          <polygon points="0,0 10,6 0,12" fill="white" />
        </svg>
      </div>
    </div>
  );
}

// ─── Video column ─────────────────────────────────────────────────────────────
function VideoColumn({ heading, count }: { heading: string; count: number }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Heading */}
      <div
        style={{
          background: T.charcoal,
          border: `2px solid ${T.orange}`,
          fontFamily: BARLOW,
          fontWeight: 800,
          fontSize: 17,
          color: T.white,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textAlign: "center",
          padding: "16px 12px",
          borderRadius: 0,
          marginBottom: 8,
        }}
      >
        {heading}
      </div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: count }).map((_, i) => (
          <VideoThumb key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Playlist button ──────────────────────────────────────────────────────────
function PlaylistButton({ label, filled }: { label: string; filled: boolean }) {
  const h = useHover();
  return (
    <button
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        background: filled ? (h.on ? "#CC5514" : T.orange) : h.on ? T.orange : "transparent",
        border: `2px solid ${T.orange}`,
        color: filled || h.on ? T.white : T.orange,
        fontFamily: BARLOW,
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: "2px",
        textTransform: "uppercase",
        padding: "14px 40px",
        borderRadius: 0,
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
        minWidth: 320,
        textAlign: "center",
      }}
    >
      {label}
    </button>
  );
}

// ─── Mechanics content ────────────────────────────────────────────────────────
function MechanicsContent() {
  return (
    <div>
      <SectionBadge label="MECHANICS" />

      {/* Documents */}
      <div style={{ marginTop: 36 }}>
        {DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} />
        ))}
      </div>

      {/* Orange divider */}
      <div style={{ height: 2, background: T.orange, marginTop: 48 }} />

      {/* Video grid */}
      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        {VIDEO_COLS.map((col) => (
          <VideoColumn key={col.heading} heading={col.heading} count={col.count} />
        ))}
      </div>

      {/* Playlist buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 48,
          paddingBottom: 8,
        }}
      >
        <PlaylistButton label="▶ WATCH MECHANICS PLAYLIST" filled={true} />
        <PlaylistButton label="▶ WATCH GUESSING PLAYLIST" filled={false} />
      </div>
    </div>
  );
}

// ─── Article thumbnail ────────────────────────────────────────────────────────
function ArticleThumb() {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        flex: 1,
        aspectRatio: "7.14 / 4",
        background: h.on ? "#F0EDE8" : "#FFFFFF",
        border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        cursor: "pointer",
        transition: "border-color 0.15s, background 0.15s",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Orange header bar */}
      <div style={{ height: 6, background: T.orange, flexShrink: 0 }} />
      {/* Document lines */}
      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 6,
              background: i === 0 ? T.orange : i % 4 === 0 ? "#CCCCCC" : "#E0E0E0",
              borderRadius: 2,
              width: i % 3 === 2 ? "60%" : "100%",
            }}
          />
        ))}
      </div>
      {/* Hover overlay */}
      {h.on && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(232,101,26,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: BARLOW,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "2px",
              color: T.orange,
              textTransform: "uppercase",
              border: `1px solid ${T.orange}`,
              padding: "6px 16px",
              background: "white",
            }}
          >
            VIEW
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Duties content ───────────────────────────────────────────────────────────
const DUTIES_COLS = [
  { heading: "START OF THE GAME", type: "video" as const, count: 1 },
  { heading: "DUTIES OF OFFICIALS", type: "video" as const, count: 1 },
  { heading: "ARTICLE", type: "article" as const },
];

function DutiesContent() {
  return (
    <div>
      <SectionBadge label="DUTIES" />

      {/* Three-column grid */}
      <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
        {DUTIES_COLS.map((col, i) => (
          <div key={col.heading} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Column heading */}
            <div
              style={{
                background: T.charcoal,
                border: `2px solid ${T.orange}`,
                fontFamily: BARLOW,
                fontWeight: 800,
                fontSize: 17,
                color: T.white,
                letterSpacing: "1px",
                textTransform: "uppercase",
                textAlign: "center",
                padding: "16px 12px",
                marginBottom: 8,
              }}
            >
              {col.heading}
            </div>

            {/* Content */}
            <div style={{ display: "flex", gap: 6 }}>
              {col.type === "video" ? (
                <VideoThumb index={i} />
              ) : (
                <ArticleThumb />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Fitness Tests content ──────────────────────────────────────────────────
const FITNESS_ITEMS: { label: string; action: "play" | "download" | "watch" }[] = [
  { label: "FIBA BASIC FITNESS TEST (Audio)", action: "play" },
  { label: "FIBA YO YO ELITE FITNESS TEST (Audio)", action: "play" },
  { label: "FIBA YO YO ELITE FITNESS TEST SETUP GUIDELINES (Video)", action: "play" },
  { label: "FIBA BASIC FITNESS TEST (Version 4.0)", action: "download" },
  { label: "FIBA YO YO ELITE FITNESS TEST (Version 2.0 - June 2020)", action: "download" },
  { label: "FIBA FITNESS TESTS - DECODED", action: "download" },
];

function FitnessRow({ item }: { item: { label: string; action: "play" | "download" | "watch" } }) {
  const h = useHover();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        padding: "0 8px",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <span
        style={{
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 15,
          color: T.dimText,
          flex: 1,
          minWidth: 0,
        }}
      >
        {item.label}
      </span>
      <button
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        style={{
          background: h.on ? T.orange : "transparent",
          border: `1px solid ${T.orange}`,
          color: h.on ? T.white : T.orange,
          fontFamily: BARLOW,
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "2px",
          padding: "8px 20px",
          borderRadius: 0,
          cursor: "pointer",
          transition: "background 0.15s, color 0.15s",
          flexShrink: 0,
          marginLeft: 16,
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {item.action === "play" ? (
          <>
            <svg width="10" height="10" viewBox="0 0 10 12" fill="currentColor">
              <polygon points="0,0 10,6 0,12" />
            </svg>
            PLAY
          </>
        ) : item.action === "watch" ? (
          <>
            <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
              <rect x="0" y="0" width="12" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <polygon points="4.5,2.5 9,5 4.5,7.5" />
            </svg>
            WATCH
          </>
        ) : (
          <>↓ DOWNLOAD</>
        )}
      </button>
    </div>
  );
}

function FitnessTestsContent() {
  return (
    <div>
      <SectionBadge label="FITNESS TESTS" />
      <div style={{ marginTop: 36 }}>
        {FITNESS_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── Physical Training content ──────────────────────────────────────────────────
const PHYSICAL_TRAINING_ITEMS: { label: string; action: "play" | "download" }[] = [
  { label: "IMPROVE YOUR MOBILITY (June 2024)", action: "download" },
  { label: "IMPROVE YOUR SPECIFIC TRAINING (Version 1.0)", action: "download" },
  { label: "PHYSICAL TRAINING MANUAL (Version 5.0)", action: "download" },
  { label: "PHYSCIAL DEMANDS & PROFILE (Version 1.0)", action: "download" },
  { label: "IMPROVE YOUR GAME WARMUP & STRETCHING (Version 2.0)", action: "download" },
  { label: "IMPROVE YOUR JET LAG (Version 2.0)", action: "download" },
  { label: "PHYSICAL TRAINING, NUTRITION AND SLEEP DURING SELF-QUARANTINE  (Version 1.0)", action: "download" },
];

function PhysicalTrainingContent() {
  return (
    <div>
      <SectionBadge label="PHYSICAL TRAINING" />
      <div style={{ marginTop: 36 }}>
        {PHYSICAL_TRAINING_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── Warm Up Exercises content ──────────────────────────────────────────────────
const WARMUP_EXERCISES = [
  "ACTIVE STRETCHING",
  "BACK KICKS",
  "FOOTWORK ACTIVATION",
  "HALF COURT ACTIVATION",
  "HIGH KNEES",
  "KARAOKE",
  "SIDE TO SIDE",
  "SIDE TO SIDE SPRINT",
  "NO LOOK SPRINTS",
  "SUICIDES",
  "TURN AROUND SPRINT",
  "LAST 2 MIN SPRINT",
];

function ExerciseCard({ label, index }: { label: string; index: number }) {
  const h = useHover();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Title box */}
      <div
        style={{
          border: `2px solid ${T.orange}`,
          background: T.charcoal,
          fontFamily: BARLOW,
          fontWeight: 800,
          fontSize: 15,
          color: T.white,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textAlign: "center",
          padding: "10px 8px",
        }}
      >
        {label}
      </div>
      {/* Thumbnail */}
      <div
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        style={{
          aspectRatio: "9 / 16",
          maxWidth: 100,
          margin: "0 auto",
          width: "100%",
          background: THUMB_SHADES[index % THUMB_SHADES.length],
          border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "border-color 0.15s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.15 }} preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke={T.orange} strokeWidth="1" />
          <circle cx="50%" cy="50%" r="18%" stroke={T.orange} strokeWidth="1" fill="none" />
        </svg>
        <div
          style={{
            width: 24,
            height: 24,
            background: h.on ? T.orange : "rgba(232,101,26,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            transition: "background 0.15s",
          }}
        >
          <svg width="8" height="10" viewBox="0 0 10 12" fill="none">
            <polygon points="0,0 10,6 0,12" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function WarmUpExercisesContent() {
  const hNba = useHover();
  return (
    <div>
      <SectionBadge label="WARM UP EXERCISES" />

      {/* 4-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginTop: 36,
        }}
      >
        {WARMUP_EXERCISES.map((ex, i) => (
          <ExerciseCard key={ex} label={ex} index={i} />
        ))}
      </div>

      {/* NBA Referee Fitness section */}
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div
          style={{
            border: `2px solid ${T.orange}`,
            background: T.charcoal,
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 17,
            color: T.white,
            letterSpacing: "1px",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "12px 48px",
          }}
        >
          NBA REFEREE FITNESS
        </div>
        <div
          onMouseEnter={hNba.onMouseEnter}
          onMouseLeave={hNba.onMouseLeave}
          style={{
            width: 90,
            aspectRatio: "16 / 9",
            background: THUMB_SHADES[4],
            border: hNba.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "border-color 0.15s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              background: hNba.on ? T.orange : "rgba(232,101,26,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            <svg width="8" height="10" viewBox="0 0 10 12" fill="none">
              <polygon points="0,0 10,6 0,12" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mental Preparation content ──────────────────────────────────────────────────
const MENTAL_ITEMS: { label: string; action: "play" | "download" }[] = [
  { label: "GENERAL GUIDELINES (Version 2.0)", action: "download" },
  { label: "FOR COMPETITIONS (Version 2.0)", action: "download" },
  { label: "PRE-GAME (Version 2.0)", action: "download" },
  { label: "POST-GAME EVALUATION (Version 2.0)", action: "download" },
  { label: "FACING UNCERTAINTY (Version 1.0)", action: "download" },
  { label: "GOAL-SETTING (Version 2.0)", action: "download" },
  { label: "CONCENTRATION & ATTENTION (Version 2.0)", action: "download" },
  { label: "AROUSAL CONTROL (Version 2.0)", action: "download" },
  { label: "VISUALISATION & IMAGERY (Version 2.0)", action: "download" },
  { label: "SELF-TALK (Version 2.0)", action: "download" },
  { label: "INJURY & RECOVERY (Version 2.0)", action: "download" },
  { label: "FACING STRESSFUL & CHALLENGING SITUATIONS (Version 2.0)", action: "download" },
  { label: "KEEPING MOTIVATION, PASSION & ENTHUSIASM FOR OFFICIATING (Version 2.0)", action: "download" },
];

function MentalPreparationContent() {
  return (
    <div>
      <SectionBadge label="MENTAL PREPARATION" />
      <div style={{ marginTop: 36 }}>
        {MENTAL_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── Improve Yourself content ──────────────────────────────────────────────────
const IMPROVE_YOURSELF_ITEMS: { label: string; action: "play" | "download" | "watch" }[] = [
  { label: "ROTATIONS (Version 1.0) 💥", action: "download" },
  { label: "HEAD COACH'S CHALLENGE (Version 2.1)", action: "download" },
  { label: "REFEREEING THE HELP DEFENDER (Version 1.0)", action: "download" },
  { label: "TIMING OF THE WHISTLE (Version 1.0)", action: "download" },
  { label: "OUT-OF-BOUNDS DECISIONS (Version 1.0)", action: "download" },
  { label: "MOBILITY (Version 1.0)", action: "download" },
  { label: "EMOTIONAL INTELLIGENCE (Version 1.0)", action: "download" },
  { label: "FIRST IMPRESSION (Version 1.0)", action: "download" },
  { label: "SEASON'S SELF-EVALUATION (Version 1.0)", action: "download" },
  { label: "GROWTH MINDSET (Version 1.0)", action: "download" },
  { label: "CONTROL THE CONTROLLABLE (Version 1.0)", action: "download" },
  { label: "BUILDING SELF-DISCIPLINE (Version 1.0)", action: "download" },
];

function ImproveYourselfContent() {
  return (
    <div>
      <SectionBadge label="IMPROVE YOURSELF" />
      <div style={{ marginTop: 36 }}>
        {IMPROVE_YOURSELF_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── FIBA Licensing content ──────────────────────────────────────────────────
const FIBA_LICENSING_ITEMS: { label: string; action: "play" | "download" | "watch" }[] = [
  { label: "GUIDELINES TO NATIONAL FEDERATIONS (Version 1.0 October 2022)", action: "download" },
  { label: "LICENSING 2023-25 INTRODUCTION", action: "watch" },
  { label: "FIBA GOL 2023-25 Referees\u2019 Physical Training Plan", action: "download" },
  { label: "FIBA GOL 2023-25 Entry Form", action: "download" },
  { label: "FIBA GOL 2023-25 Fitness Test Result", action: "download" },
  { label: "FIBA GOL 2023-25 Fitness Test Consent Form", action: "download" },
  { label: "FIBA GOL 2023-25 Medical Certificate", action: "download" },
  { label: "FIBA GOL 2023-25 MAP (FIBA Management & Administration Platform) User Guidelines", action: "download" },
  { label: "LIST OF NATIONAL FEDERATIONS (27\u1d57\u02b0 January 2017)", action: "download" },
  { label: "COMBINED WORLD RANKING (4\u1d57\u02b0 October 2022)", action: "download" },
];

function FibaLicensingContent() {
  return (
    <div>
      <SectionBadge label="FIBA LICENSING" />
      <div style={{ marginTop: 36 }}>
        {FIBA_LICENSING_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── Placeholder tab content ──────────────────────────────────────────────────
function PlaceholderContent({ tab }: { tab: Tab }) {
  return (
    <div>
      <SectionBadge label={tab} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 96,
        }}
      >
        <span style={{ fontFamily: DM, fontSize: 16, color: T.placeholderText }}>
          Content coming soon
        </span>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Referees() {
  const [activeTab, setActiveTab] = useState<Tab>("MECHANICS");

  return (
    <div
      style={{
        background: T.bg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: DM,
      }}
    >
      {/* Two-column body */}
      <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
        <Sidebar active={activeTab} onSelect={setActiveTab} />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            background: "var(--off-white)",
            padding: "48px 56px",
            minHeight: "100%",
            boxSizing: "border-box",
          }}
        >
          {activeTab === "MECHANICS" ? (
            <MechanicsContent />
          ) : activeTab === "DUTIES" ? (
            <DutiesContent />
          ) : activeTab === "FITNESS TESTS" ? (
            <FitnessTestsContent />
          ) : activeTab === "PHYSICAL TRAINING" ? (
            <PhysicalTrainingContent />
          ) : activeTab === "WARM UP EXERCISES" ? (
            <WarmUpExercisesContent />
          ) : activeTab === "MENTAL PREPARATION" ? (
            <MentalPreparationContent />
          ) : activeTab === "IMPROVE YOURSELF" ? (
            <ImproveYourselfContent />
          ) : activeTab === "FIBA LICENSING" ? (
            <FibaLicensingContent />
          ) : (
            <PlaceholderContent tab={activeTab} />
          )}
        </main>
      </div>
    </div>
  );
}
