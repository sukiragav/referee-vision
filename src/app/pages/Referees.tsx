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
  {
    label: "3PO (NATIONAL REFEREE)",
    version: "Version 1.0 – Valid as of 2025",
    link: "https://library.fibairef.basketball/images/documents/a5f1318a9da314d13f1c0004959b8677/2025_FIBA_NF_3PO_Manual_v1_0.pdf",
  },
  {
    label: "2PO (NATIONAL REFEREE)",
    version: "Version 1.0a – Valid as of 2024",
    link: "https://library.fibairef.basketball/images/documents/846f47339b197f3869f51e8d23b08afa/2024_FIBA_2PO_Manual_v1_0a.pdf",
  },
  {
    label: "3PO BASIC",
    version: "Version 2.5 – Valid as of December 2024",
    link: "https://library.fibairef.basketball/images/documents/cbde37864ccb7e20599fe7a6b63df25f/FIBA_Referee_Manual_Basic_3PO_v2_5_Dec2024_en.pdf",
  },
  {
    label: "3PO ADVANCED",
    version: "Version 2.0 – Valid as of March 2023",
    link: "https://library.fibairef.basketball/images/documents/f3a38bbb2971eeee81d535bce21bec94/FIBA_Ref_Manual_Advanced_3PO_v2_0_Mar2023_en.pdf",
  },
  {
    label: "INDIVIDUAL OFFICIATING TECHNIQUES (IOT)",
    version: "Version 2.5 – Valid as of December 2024",
    link: "https://library.fibairef.basketball/images/documents/94e19c5823bd011e94ddf74fff3b9ccf/FIBA_Referee_Manual_IOT_v2_5_Dec2024_en.pdf",
  },
  {
    label: "BASIC OFFICIATING TERMINOLOGY",
    version: "Version 2.1 – Valid as of May 2023",
    link: "https://library.fibairef.basketball/images/documents/9b7fddf61a2dd90f7fca2f1f93fc2456/FIBA_Glossary_v2_1_May2023_en.pdf",
  },
  {
    label: "4TH_REFEREE",
    version: "Version 1.0 – Valid as of January 2024",
    link: "https://library.fibairef.basketball/images/documents/ea7a19dbbf2921897ab684cf7fed2c44/FIBA_4th_Referee_Guide_JAN2024_v1.pdf",
  }, // special-cased below
  {
    label: "PROTOCOL CHECKLIST FOR REFEREES",
    version: "Version 1.0 – Valid as of June 2025",
    link: "https://library.fibairef.basketball/doc/MHNKeHJOdzE5RkMzRENzM0phQmNUUT09",
  },
];

const VIDEO_COLS = [
  {
    heading: "FIBA 3 PERSON MECHANICS",
    videos: [
      { link: "https://youtu.be/IA3xtlSfb-g" },
      { link: "https://youtu.be/0abCxzDsoxY" },
      { link: "https://youtu.be/6_ZfrVAa8q0" },
    ],
  },
  {
    heading: "MOVEMENT OF OFFICIALS",
    videos: [
      { link: "https://youtu.be/bYojWYt8rkc" },
    ],
  },
  {
    heading: "COURT COVERAGE",
    videos: [
      { link: "https://youtu.be/1waAdTN7pDs" },
      { link: "https://youtu.be/U-eZv3iDTnQ" },
    ],
  },
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
  const Tag = doc.link ? "a" : "button";

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
      <Tag
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        {...(doc.link ? { href: doc.link, target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
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
          textDecoration: "none",
        }}
      >
        ↓ DOWNLOAD
      </Tag>
    </div>
  );
}

// ─── Video modal ─────────────────────────────────────────────────────────────
function getYouTubeEmbedUrl(url: string): string {
  // Handles youtu.be/ID and youtube.com/watch?v=ID formats
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  const longMatch = url.match(/[?&]v=([\w-]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1`;
  return url;
}

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          background: "transparent",
          border: "none",
          color: T.white,
          fontSize: 32,
          cursor: "pointer",
          lineHeight: 1,
          opacity: 0.8,
          zIndex: 1001,
        }}
      >
        ✕
      </button>

      {/* Modal content – stop propagation so clicking video doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 90vw)",
          aspectRatio: "16 / 9",
          background: "#000",
          border: `2px solid ${T.orange}`,
          boxShadow: `0 0 60px rgba(232,101,26,0.3)`,
          position: "relative",
        }}
      >
        <iframe
          src={getYouTubeEmbedUrl(url)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      </div>
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

function VideoThumb({ index, link, onPlay }: { index: number; link?: string; onPlay?: () => void }) {
  const h = useHover();

  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={link ? onPlay : undefined}
      style={{
        flex: 1,
        aspectRatio: "16 / 9",
        background: THUMB_SHADES[index % THUMB_SHADES.length],
        border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: link ? "pointer" : "default",
        transition: "border-color 0.15s, filter 0.15s",
        filter: h.on && link ? "brightness(1.25)" : "brightness(1)",
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
          background: link
            ? h.on ? T.orange : "rgba(232,101,26,0.7)"
            : "rgba(100,100,100,0.4)",
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

      {/* "Coming soon" label for thumbnails without a link */}
      {!link && (
        <span
          style={{
            position: "absolute",
            bottom: 6,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: BARLOW,
            fontSize: 10,
            letterSpacing: "1.5px",
            color: T.mutedText,
            textTransform: "uppercase",
          }}
        >
          Coming soon
        </span>
      )}
    </div>
  );
}

// ─── Video column ─────────────────────────────────────────────────────────────
function VideoColumn({
  heading,
  videos,
  onPlay,
}: {
  heading: string;
  videos: { link?: string }[];
  onPlay: (url: string) => void;
}) {
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
        {videos.map((vid, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={vid.link}
            onPlay={vid.link ? () => onPlay(vid.link!) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Playlist button ──────────────────────────────────────────────────────────
function PlaylistButton({ label, filled, onPlay }: { label: string; filled: boolean; onPlay?: () => void }) {
  const h = useHover();
  return (
    <button
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onPlay}
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
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div>
      {/* YouTube video modal */}
      {activeVideo && (
        <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

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
          <VideoColumn
            key={col.heading}
            heading={col.heading}
            videos={col.videos}
            onPlay={(url) => setActiveVideo(url)}
          />
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
        <PlaylistButton label="▶ WATCH MECHANICS PLAYLIST" filled={true} onPlay={() => setActiveVideo("https://youtu.be/GJKj5KOzSl0")} />
        <PlaylistButton label="▶ WATCH GUESSING PLAYLIST" filled={false} onPlay={() => setActiveVideo("https://youtu.be/tqDVuO6uUoo")} />
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
              <rect x="0" y="0" width="12" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
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

// ─── Assist Articles content ──────────────────────────────────────────────────
const ASSIST_ARTICLES_DATA = [
  { id: 1, title: "ARGENTINA'S MAN-TO-MAN PLAYS", articles: ["Rubén Magnano's offensive sets", "Man-to-man spacing concepts", "Transition break structures"] },
  { id: 2, title: "SHOOTERS: MORE EFFICIENCY & LESS TURNOVERS", articles: ["Three-point shooting drills", "Reducing turnovers under pressure", "Screening for shooters"] },
  { id: 3, title: "KENTUCKY MAN-TO-MAN OFFENSE", articles: ["Kentucky Play '40' breakdown", "High-low offensive entry", "Creating mismatch opportunities"] },
  { id: 4, title: "AUSTRALIAN WORLD JUNIOR CHAMPION DEFENSE", articles: ["Full court pressure defense", "Rotations on baseline drives", "Contesting the perimeter shooter"] },
  { id: 5, title: "THE GAME PHILOSOPHY OF THE SPURS", articles: ["Gregg Popovich's offensive flow", "Ball movement & extra passes", "Pick & roll defense concepts"] },
  { id: 6, title: "ZONE DEFENSE CONCEPTS", articles: ["Match-up zone strategies", "Defending the high post", "Box and one variations"] },
  { id: 7, title: "BASIC DEFENSE OF THE CROATIAN TEAM", articles: ["Croatian national team defense", "Denying the wings", "Help and recover technique"] },
  { id: 8, title: "SAN ANTONIO SPURS OFFENSE", articles: ["Motion offense systems", "Corner screen variations", "Spurs half-court sets"] },
  { id: 9, title: "FAST BREAK ATTACK SYSTEMS", articles: ["Transition lane spacing", "Secondary break options", "Quick hitter plays"] },
  { id: 10, title: "DEFENSIVE ROTATIONS & HELPS", articles: ["Strong-side help rules", "Recovering from traps", "Defending lob passes"] },
  { id: 11, title: "INDIVIDUAL OFFICIATING TECHNIQUES (IOT)", articles: ["Referee court coverage", "Lead and trail responsibilities", "Correct angle of view"] },
  { id: 12, title: "WAKE FOREST OFFENSE", articles: ["Flex offense variations", "High post feeding options", "Backdoor cut sets"] },
  { id: 13, title: "RETROGRADE DEFENSE SYSTEMS", articles: ["Slowing down transition", "Guarding the outlet pass", "Defensive balance rules"] },
  { id: 14, title: "ZONE OFFENSE DRILLS & PLAYS", articles: ["Breaking 2-3 zone defense", "High-low post execution", "Short corner passing"] },
  { id: 15, title: "3-PERSON MECHANICS ADVANCED", articles: ["Rotations in 3PO", "Switching after fouls", "Coverage of the paint"] },
  { id: 16, title: "SAN ANTONIO SPURS DEFENSIVE SETS", articles: ["Spurs pick & roll coverage", "Protecting the paint", "Communicating on screens"] },
  { id: 17, title: "OFFICIATING UNDER PRESSURE", articles: ["Mental preparation tips", "Handling game tension", "Conflict resolution on court"] },
  { id: 18, title: "TRANSITION GAME SECRETS", articles: ["Fast break execution", "Outlet pass accuracy", "Rim run optimization"] },
  { id: 19, title: "SCREENING COVERS & DEFENSE", articles: ["Defending off-ball screens", "Switching vs. pushing through", "Hedge and recover drills"] },
  { id: 20, title: "FIBA OFFICIAL INTERPRETATIONS", articles: ["Unsportsmanlike foul criteria", "Travel rule clarifications", "Cylinder principle guides"] },
  { id: 21, title: "WORLD GAME 2006: ONE GLOBE, ONE GOAL", articles: ["Global basketball development", "Coaching education pathways", "Officiating standardizations"] },
  { id: 22, title: "INDIVIDUAL SKILL DEVELOPMENT", articles: ["Ball handling fundamentals", "Footwork in the post", "Shooting off the dribble"] },
  { id: 23, title: "THE ART OF SCREENING", articles: ["Setting legal block screens", "Pick and roll angles", "Down screen execution"] },
  { id: 24, title: "REBOUNDING PRINCIPLES", articles: ["Box out techniques", "Offensive rebound positioning", "Transition off rebound"] },
  { id: 25, title: "RUSSIA'S TEAM DEFENSIVE PLAYS", articles: ["Aggressive ball pressure", "Denial of passing lanes", "Russia's zone press"] },
  { id: 26, title: "OUT OF BOUNDS SETS (OB)", articles: ["Baseline out of bounds plays", "Sideline out of bounds entries", "Last second shot setups"] },
  { id: 27, title: "TEX WINTER'S TRIANGLE OFFENSE", articles: ["Triangle spacing positions", "Post feed options", "Blind pig entry cuts"] },
  { id: 28, title: "DEFENDING THE PICK & ROLL", articles: ["Drop coverage execution", "Show and recover technique", "Blitzing the screen"] },
  { id: 29, title: "PHYSICAL TRAINING FOR OFFICIALS", articles: ["Aerobic capacity building", "Agility and footwork drills", "Recovery between games"] },
  { id: 30, title: "YOUTH BASKETBALL PHILOSOPHY", articles: ["Coaching mini-basketball", "Fundamental skill focus", "Keeping it fun for kids"] },
  { id: 31, title: "PRESSING DEFENSE SYSTEMS", articles: ["1-2-1-1 full court press", "Trapping the corners", "Safety position rules"] },
  { id: 32, title: "REFEREE COMMUNICATION METHODS", articles: ["Signal clarity & timing", "Pre-game referee meetings", "Interacting with coaches"] },
  { id: 34, title: "SPECIAL SITUATION PLAYS", articles: ["Defending with seconds left", "Free throw rebound plays", "Jump ball scenarios"] },
  { id: 35, title: "DOUBLE TEAM TRAPPING SECRETS", articles: ["Baseline trap rotation", "Wing trap containment", "Stealing the outlet pass"] },
  { id: 36, title: "BUILDING CHAMPIONSHIP CULTURE", articles: ["Team chemistry exercises", "Leadership development", "Setting team standards"] },
  { id: 37, title: "DEFENDING THE INTERIOR PAINT", articles: ["Post defense positioning", "Rotations from weak side", "Blocking out tall players"] },
  { id: 38, title: "YOUTH FITNESS & ATHLETICISM", articles: ["Strength basics for youth", "Coordination exercises", "Injury prevention tips"] },
  { id: 39, title: "SHOOTING METRIC PERCENTAGES", articles: ["Effective field goal rate", "Shot selection optimization", "Tracking shot analytics"] },
  { id: 40, title: "EUROPEAN ZONE OFFENSE", articles: ["Continuous screening sets", "Ball reversal speed", "Attacking the seams"] },
  { id: 41, title: "MENTAL TOUGHNESS & PREPARATION", articles: ["Visualisation before games", "Self-talk techniques", "Overcoming mistakes"] },
  { id: 42, title: "COOPERATION OF OFFICIALS", articles: ["Eye contact on court", "Dual coverage decisions", "Correcting score mistakes"] },
  { id: 43, title: "BFI NATIONAL REFEREE SYSTEM", articles: ["India licensing guidelines", "Fitness testing protocols", "BFI referee pathways"] },
  { id: 44, title: "PREPARATION FOR TOURNAMENTS", articles: ["Nutrition prep for tournaments", "Scouting team plays", "Managing sleep schedule"] },
];

function AssistCard({
  issueNumber,
  title,
  articles,
}: {
  issueNumber: number;
  title: string;
  articles: string[];
}) {
  const h = useHover();
  const formattedNum = String(issueNumber).padStart(2, "0");

  // Choose a distinct color stripe for the left border based on issue number
  const stripeColors = ["#0056B3", "#FFC107", "#DC3545", "#28A745", "#6C757D", "#E8651A"];
  const stripeColor = stripeColors[(issueNumber - 1) % stripeColors.length];

  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        aspectRatio: "3 / 4",
        background: T.charcoal,
        border: h.on ? `1.5px solid ${T.orange}` : `1.5px solid ${T.border}`,
        position: "relative",
        display: "flex",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.15s, transform 0.15s",
        transform: h.on ? "translateY(-4px)" : "none",
        boxSizing: "border-box",
      }}
    >
      {/* Left vertical color bar */}
      <div
        style={{
          width: 28,
          background: stripeColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 0",
          flexShrink: 0,
          borderRight: `1px solid ${T.border}`,
          boxSizing: "border-box",
        }}
      >
        {/* Small FIBA-like basket logo icon at the top of stripe */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>

        {/* Rotated text "ASSIST XX" */}
        <div
          style={{
            transform: "rotate(-90deg) translate(-2px, 0px)",
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 10,
            color: T.white,
            letterSpacing: "1.5px",
            whiteSpace: "nowrap",
          }}
        >
          ASSIST{formattedNum}
        </div>

        <div /> {/* Spacer */}
      </div>

      {/* Main Cover area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 12,
          position: "relative",
          background: `linear-gradient(135deg, #232323 0%, #151515 100%)`,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Subtle court graphic background */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none" }}
          preserveAspectRatio="none"
        >
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="30" stroke="white" strokeWidth="1" fill="none" />
        </svg>

        {/* FIBA ASSIST header inside cover */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
          <span style={{ fontFamily: BARLOW, fontSize: 8, fontWeight: 700, color: T.grey, letterSpacing: "1px" }}>
            FIBA TECH
          </span>
          <span style={{ fontFamily: BARLOW, fontSize: 8, fontWeight: 700, color: stripeColor, letterSpacing: "1px" }}>
            N° {formattedNum}
          </span>
        </div>

        {/* Issue title */}
        <div style={{ zIndex: 1, marginTop: 4, flex: 1, display: "flex", alignItems: "center" }}>
          <h4
            style={{
              fontFamily: BARLOW,
              fontWeight: 800,
              fontSize: 12,
              lineHeight: "1.2",
              color: T.white,
              letterSpacing: "0.5px",
              margin: 0,
              textTransform: "uppercase",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h4>
        </div>

        {/* Small decorative details at the bottom of the card */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1, marginTop: 4 }}>
          <span style={{ fontSize: 8, color: T.grey, fontFamily: DM, letterSpacing: "0.5px" }}>
            COACH & REF
          </span>
          {/* Tiny arrow */}
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke={stripeColor} strokeWidth="2">
            <path d="M1 9l8-8M1 1h8v8" />
          </svg>
        </div>

        {/* Hover overlay: reveals the list of articles within */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(17, 17, 17, 0.96)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 12,
            opacity: h.on ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
            zIndex: 2,
            pointerEvents: h.on ? "auto" : "none",
            borderLeft: `3px solid ${stripeColor}`,
            boxSizing: "border-box",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: BARLOW,
                fontSize: 11,
                fontWeight: 800,
                color: stripeColor,
                letterSpacing: "1px",
                marginBottom: 6,
                textTransform: "uppercase",
              }}
            >
              IN THIS ISSUE:
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {articles.map((art, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                  <span style={{ color: stripeColor, fontSize: 8, marginTop: 1 }}>•</span>
                  <span style={{ fontFamily: DM, fontSize: 10, color: T.white, lineHeight: "1.2" }}>
                    {art}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            style={{
              width: "100%",
              background: stripeColor,
              border: "none",
              color: T.white,
              fontFamily: BARLOW,
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "1px",
              padding: "5px 0",
              cursor: "pointer",
              textAlign: "center",
              textTransform: "uppercase",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            READ ARTICLE
          </button>
        </div>
      </div>
    </div>
  );
}

function AssistArticlesContent() {
  return (
    <div>
      <SectionBadge label="ASSIST ARTICLES" />

      {/* Subtitle */}
      <div
        style={{
          fontFamily: BARLOW,
          fontSize: 14,
          fontWeight: 700,
          color: T.orange,
          letterSpacing: "1px",
          textAlign: "center",
          marginTop: 12,
          textTransform: "uppercase",
        }}
      >
        ( HOVER OVER THE IMAGE TO SEE THE ARTICLES WITHIN )
      </div>

      {/* 8-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 12,
          marginTop: 28,
        }}
      >
        {ASSIST_ARTICLES_DATA.map((issue) => (
          <AssistCard
            key={issue.id}
            issueNumber={issue.id}
            title={issue.title}
            articles={issue.articles}
          />
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
          ) : activeTab === "ASSIST ARTICLES" ? (
            <AssistArticlesContent />
          ) : (
            <PlaceholderContent tab={activeTab} />
          )}
        </main>
      </div>
    </div>
  );
}
