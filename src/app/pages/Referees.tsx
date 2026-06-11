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
  dimText: "#DDDDDD",
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
  | "IMPROVE YOUR"
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
  "IMPROVE YOUR",
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
            fontSize: 11,
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
          color: T.white,
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
        <PlaylistButton label="▶ WATCH MECHANICS PLAYLIST" filled={true} />
        <PlaylistButton label="▶ WATCH GUESSING PLAYLIST" filled={false} />
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
            background: T.bg,
            padding: "48px 56px",
            minHeight: "100%",
            boxSizing: "border-box",
          }}
        >
          {activeTab === "MECHANICS" ? (
            <MechanicsContent />
          ) : (
            <PlaceholderContent tab={activeTab} />
          )}
        </main>
      </div>
    </div>
  );
}
