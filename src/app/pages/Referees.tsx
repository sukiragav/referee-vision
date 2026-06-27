import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
      { link: "https://youtu.be/IA3xtlSfb-g", thumbnail: "https://img.youtube.com/vi/IA3xtlSfb-g/0.jpg" },
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

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ─── Shared hook: hover state ────────────────────────────────────────────────
function useHover() {
  const [on, set] = useState(false);
  return { on, onMouseEnter: () => set(true), onMouseLeave: () => set(false) };
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({
  active,
  onSelect,
  open,
  onClose,
  isMobile,
}: {
  active: Tab;
  onSelect: (t: Tab) => void;
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}) {
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {open && (
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 200,
              backdropFilter: "blur(2px)",
            }}
          />
        )}
        {/* Drawer */}
        <aside
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 260,
            height: "100vh",
            background: T.charcoal,
            borderRight: `1px solid ${T.border}`,
            zIndex: 300,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            transform: open ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: open ? "4px 0 24px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {/* Header with close */}
          <div
            style={{
              padding: "28px 20px 16px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: BARLOW,
                fontWeight: 800,
                fontSize: 26,
                color: T.orange,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              REFEREES
            </span>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: T.inactive,
                fontSize: 22,
                cursor: "pointer",
                lineHeight: 1,
                padding: 4,
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ paddingTop: 0 }}>
            {TABS.map((tab) => (
              <SidebarItem
                key={tab}
                tab={tab}
                active={tab === active}
                onSelect={(t) => { onSelect(t); onClose(); }}
              />
            ))}
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: T.charcoal,
        borderRight: `1px solid ${T.border}`,
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
function DocRow({ doc, isMobile }: { doc: (typeof DOCS)[number]; isMobile: boolean }) {
  const h = useHover();
  const isFourth = doc.label === "4TH_REFEREE";
  const Tag = doc.link ? "a" : "button";

  return (
    <div
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        minHeight: 56,
        padding: isMobile ? "12px 8px" : "0 8px",
        borderBottom: `1px solid ${T.border}`,
        gap: isMobile ? 8 : 0,
      }}
    >
      {/* Document name */}
      <span
        style={{
          fontFamily: DM,
          fontWeight: 500,
          fontSize: isMobile ? 13 : 15,
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
        <span style={{ color: T.mutedText, fontSize: isMobile ? 11 : 13, fontWeight: 400 }}>({doc.version})</span>
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
          marginLeft: isMobile ? 0 : 16,
          textTransform: "uppercase",
          textDecoration: "none",
          alignSelf: isMobile ? "flex-start" : "center",
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

function VideoModal({ url, title, onClose }: { url: string; title?: string; onClose: () => void }) {
  const isMp3 = url.endsWith(".mp3") || url.includes(".mp3?");
  const isMp4 = url.endsWith(".mp4") || url.includes(".mp4?");
  const isImage = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
  const youtubeId = getYouTubeId(url);
  const embedSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
    : null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        backdropFilter: "blur(6px)",
        padding: isImage ? "32px 16px" : "16px",
        animation: "fadeInModal 0.22s ease",
      }}
    >
      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {isMp3 ? (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(500px, 90vw)",
            background: T.charcoal,
            border: `2px solid ${T.orange}`,
            boxShadow: `0 0 60px rgba(232,101,26,0.3)`,
            position: "relative",
            padding: "40px 24px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Close button for MP3 */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "transparent",
              border: `1px solid ${T.border}`,
              color: T.inactive,
              fontSize: 18,
              cursor: "pointer",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.orange;
              e.currentTarget.style.color = T.orange;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.color = T.inactive;
            }}
            aria-label="Close audio"
          >
            ✕
          </button>
          <div style={{ color: T.orange, display: "flex", justifyContent: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="currentColor" />
              <circle cx="18" cy="16" r="3" fill="currentColor" />
            </svg>
          </div>
          {title && (
            <div
              style={{
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: 18,
                color: T.white,
                textAlign: "center",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {title}
            </div>
          )}
          <audio
            src={url}
            controls
            autoPlay
            style={{ width: "100%", display: "block" }}
          />
        </div>
      ) : isImage ? (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(860px, 92vw)",
            maxHeight: "88vh",
            background: "#ffffff",
            boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
            borderRadius: 2,
          }}
        >
          {/* Close button inside white modal */}
          <button
            onClick={onClose}
            style={{
              position: "sticky",
              top: 0,
              alignSelf: "flex-end",
              zIndex: 10,
              background: T.orange,
              border: "none",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              width: 40,
              height: 40,
              cursor: "pointer",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginBottom: -40,
            }}
          >
            ✕
          </button>
          <img
            src={url}
            alt={title || "Article"}
            style={{ width: "100%", display: "block" }}
          />
        </div>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 960,
            background: "#111",
            border: `1px solid ${T.orange}`,
            boxShadow: `0 0 60px rgba(232,101,26,0.3)`,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Modal header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: `1px solid ${T.border}`,
              background: T.charcoal,
            }}
          >
            <span
              style={{
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: 17,
                color: T.orange,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {title || "Video Player"}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: `1px solid ${T.border}`,
                color: T.inactive,
                fontSize: 18,
                cursor: "pointer",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.orange;
                e.currentTarget.style.color = T.orange;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.color = T.inactive;
              }}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
          {/* Video area */}
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
            {isMp4 ? (
              <video
                src={url}
                controls
                autoPlay
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            ) : (
              <iframe
                src={embedSrc || getYouTubeEmbedUrl(url)}
                title={title || "Video"}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>,
    document.body
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

function getYouTubeId(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([\w-]+)/);
  if (longMatch) return longMatch[1];
  return null;
}

function VideoThumb({
  index,
  link,
  thumbnail,
  onPlay,
}: {
  index: number;
  link?: string;
  thumbnail?: string;
  onPlay?: () => void;
}) {
  const h = useHover();

  const ytId = link ? getYouTubeId(link) : null;
  const resolvedThumbnail = thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

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
        filter: h.on && link ? "brightness(1.15)" : "brightness(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {resolvedThumbnail && (
        <img
          src={resolvedThumbnail}
          alt="Video thumbnail"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: h.on ? "scale(1.05)" : "scale(1)",
          }}
        />
      )}

      {/* Subtle grid lines to suggest a court diagram */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", opacity: 0.15, zIndex: 1 }}
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
          zIndex: 2,
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
            zIndex: 2,
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
  isMobile,
}: {
  heading: string;
  videos: { link?: string; thumbnail?: string }[];
  onPlay: (url: string) => void;
  isMobile: boolean;
}) {
  return (
    <div style={{ flex: isMobile ? "unset" : 1, width: isMobile ? "100%" : undefined, display: "flex", flexDirection: "column" }}>
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
            thumbnail={vid.thumbnail}
            onPlay={vid.link ? () => onPlay(vid.link!) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Playlist button ──────────────────────────────────────────────────────────
function PlaylistButton({ label, filled, onPlay, isMobile }: { label: string; filled: boolean; onPlay?: () => void; isMobile?: boolean }) {
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
        fontSize: isMobile ? 13 : 14,
        letterSpacing: "2px",
        textTransform: "uppercase",
        padding: isMobile ? "12px 20px" : "14px 40px",
        borderRadius: 0,
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
        minWidth: isMobile ? 0 : 320,
        width: isMobile ? "100%" : undefined,
        textAlign: "center",
      }}
    >
      {label}
    </button>
  );
}

// ─── Mechanics content ────────────────────────────────────────────────────────
function MechanicsContent({ isMobile }: { isMobile: boolean }) {
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
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>

      {/* Orange divider */}
      <div style={{ height: 2, background: T.orange, marginTop: 48 }} />

      {/* Video grid */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 24,
          marginTop: 24,
        }}
      >
        {VIDEO_COLS.map((col) => (
          <VideoColumn
            key={col.heading}
            heading={col.heading}
            videos={col.videos}
            onPlay={(url) => setActiveVideo(url)}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Playlist buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "stretch" : "center",
          gap: 16,
          marginTop: 48,
          paddingBottom: 8,
        }}
      >
        <PlaylistButton label="▶ WATCH MECHANICS PLAYLIST" filled={true} onPlay={() => setActiveVideo("https://youtu.be/GJKj5KOzSl0")} isMobile={isMobile} />
        <PlaylistButton label="▶ WATCH GUESSING PLAYLIST" filled={false} onPlay={() => setActiveVideo("https://youtu.be/tqDVuO6uUoo")} isMobile={isMobile} />
      </div>
    </div>
  );
}

// ─── Article thumbnail ────────────────────────────────────────────────────────
function ArticleThumb({ onClick }: { onClick?: () => void }) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onClick}
      style={{
        flex: 1,
        aspectRatio: "7.14 / 4",
        background: h.on ? "#F0EDE8" : "#FFFFFF",
        border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        cursor: onClick ? "pointer" : "default",
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
  { heading: "START OF THE GAME", type: "video" as const, link: "https://youtu.be/7_7VkJloKtM" },
  { heading: "DUTIES OF OFFICIALS", type: "video" as const, link: "https://youtu.be/AaMsOlo7JxE" },
  { heading: "ARTICLE", type: "view" as const, link: "https://www.refereevision.com/duties_art_new.jpg" },
];

function DutiesContent({ isMobile }: { isMobile: boolean }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div>
      {/* YouTube video modal */}
      {activeVideo && (
        <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      <SectionBadge label="DUTIES" />

      {/* Three-column grid */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 24,
          marginTop: 36,
        }}
      >
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
                <VideoThumb
                  index={i}
                  link={col.link}
                  onPlay={col.link ? () => setActiveVideo(col.link) : undefined}
                />
              ) : (
                <ArticleThumb onClick={col.link ? () => setActiveVideo(col.link) : undefined} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ─── Fitness Tests content ──────────────────────────────────────────────────
const FITNESS_ITEMS: { label: string; action: "play" | "download" | "watch"; link?: string }[] = [
  {
    label: "FIBA BASIC FITNESS TEST (Audio)",
    action: "play",
    link: "https://library.fibairef.basketball/images/documents/35bd8c8b5c831b242ae0b77b61088378/GOL2021_23__FIBA_Referees_Basic_Fitness_Test.mp3",
  },
  {
    label: "FIBA YO YO ELITE FITNESS TEST (Audio)",
    action: "play",
    link: "https://library.fibairef.basketball/images/documents/568b699453a1a2c1d415a6187e9a685f/FIBA_Yo_Yo_Elite_Test_May_2019.mp3",
  },
  {
    label: "FIBA YO YO ELITE FITNESS TEST SETUP GUIDELINES (Video)",
    action: "watch",
    link: "https://library.fibairef.basketball/images/documents/cf943473ff20941a653bc7b48b74c666/FIBA_Elite_YoYo_FitnessTest__Set_up_Guidelines_low.mp4",
  },
  { label: "FIBA BASIC FITNESS TEST (Version 4.0)", action: "download", link: "https://drive.google.com/file/d/1qU6tg3rlTOk06lVfiEpwkD0oh_SNb56O/view" },
  { label: "FIBA YO YO ELITE FITNESS TEST (Version 2.0 - June 2020)", action: "download", link: "https://drive.google.com/file/d/1MqUx9ruNXlpez0-kzLJ2fBUNJM9NR62R/view" },
  { label: "FIBA FITNESS TESTS - DECODED", action: "download", link: "https://drive.google.com/file/d/1e6EqEOa3DwByIIIvFTChUP7xNdpuHlCx/view" }
];

function FitnessRow({
  item,
  isMobile,
  onAction,
}: {
  item: { label: string; action: "play" | "download" | "watch"; link?: string };
  isMobile?: boolean;
  onAction?: () => void;
}) {
  const h = useHover();
  const isDownload = item.action === "download";
  const Tag = isDownload && item.link ? "a" : "button";

  return (
    <div
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        minHeight: 56,
        padding: isMobile ? "12px 8px" : "0 8px",
        borderBottom: `1px solid ${T.border}`,
        gap: isMobile ? 8 : 0,
      }}
    >
      <span
        style={{
          fontFamily: DM,
          fontWeight: 500,
          fontSize: isMobile ? 13 : 15,
          color: T.dimText,
          flex: 1,
          minWidth: 0,
        }}
      >
        {item.label}
      </span>
      <Tag
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        onClick={Tag === "button" ? onAction : undefined}
        {...(Tag === "a" ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {})}
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
          cursor: (isDownload ? item.link : true) ? "pointer" : "default",
          transition: "background 0.15s, color 0.15s",
          flexShrink: 0,
          marginLeft: isMobile ? 0 : 16,
          textTransform: "uppercase",
          gap: 6,
          alignSelf: isMobile ? "flex-start" : "center",
          textDecoration: "none",
          opacity: (isDownload && !item.link) ? 0.5 : 1,
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
      </Tag>
    </div>
  );
}

function FitnessTestsContent({ isMobile }: { isMobile: boolean }) {
  const [activeMedia, setActiveMedia] = useState<{ url: string; title: string } | null>(null);

  return (
    <div>
      {/* Media popup modal */}
      {activeMedia && (
        <VideoModal
          url={activeMedia.url}
          title={activeMedia.title}
          onClose={() => setActiveMedia(null)}
        />
      )}

      <SectionBadge label="FITNESS TESTS" />
      <div style={{ marginTop: 36 }}>
        {FITNESS_ITEMS.map((item, i) => (
          <FitnessRow
            key={i}
            item={item}
            isMobile={isMobile}
            onAction={() => {
              if (item.link) {
                setActiveMedia({ url: item.link, title: item.label });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Physical Training content ──────────────────────────────────────────────────
const PHYSICAL_TRAINING_ITEMS: { label: string; action: "play" | "download" | "watch"; link?: string }[] = [
  { label: "IMPROVE YOUR MOBILITY (June 2024)", action: "download", link: "https://library.fibairef.basketball/images/documents/4fe8808c90a5a977c8a51f720e2ac726/FIBA_IY_Mobility_2024_en_.pdf" },
  { label: "IMPROVE YOUR SPECIFIC TRAINING (Version 1.0)", action: "download", link: "https://drive.google.com/file/d/1fRMN9sIqCzupPQKp5PxHXcgMa63y38gQ/view" },
  { label: "PHYSICAL TRAINING MANUAL (Version 5.0)", action: "download", link: "https://drive.google.com/file/d/1MFwJqlmPaQ2ki_M3vWJkUmwMkvR_IXoG/view" },
  { label: "PHYSCIAL DEMANDS & PROFILE (Version 1.0)", action: "download", link: "https://drive.google.com/file/d/1B_x3raUpIbQxo2rS_f9ZA6CtdmF4b82-/view" },
  { label: "IMPROVE YOUR GAME WARMUP & STRETCHING (Version 2.0)", action: "download", link: "https://drive.google.com/file/d/1tP0LFiKWFgvLwLwSpi_7qJsLuzeYNTUe/view" },
  { label: "IMPROVE YOUR JET LAG (Version 2.0)", action: "download", link: "https://drive.google.com/file/d/1hldU_ePDjM01T5AQ8AlCxOud3C9GSeee/view" },
  { label: "PHYSICAL TRAINING, NUTRITION AND SLEEP DURING SELF-QUARANTINE  (Version 1.0)", action: "download", link: "https://drive.google.com/file/d/1nHsu7FUNYf1sTbI4NOQGn2DrJxjrVRz4/view" }
];

function PhysicalTrainingContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="PHYSICAL TRAINING" />
      <div style={{ marginTop: 36 }}>
        {PHYSICAL_TRAINING_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

// ─── Warm Up Exercises content ──────────────────────────────────────────────────
const WARMUP_EXERCISES: { label: string; link?: string }[] = [
  { label: "ACTIVE STRETCHING", link: "https://youtu.be/Cf0VGIWa5eM" },
  { label: "BACK KICKS", link: "https://youtu.be/5YHldELDQsU" },
  { label: "FOOTWORK ACTIVATION", link: "https://youtu.be/JmA2aeFqyXk" },
  { label: "HALF COURT ACTIVATION", link: "https://youtu.be/_u7hWjA_jSA" },
  { label: "HIGH KNEES", link: "https://youtu.be/swd3bYNRe8k " },
  { label: "KARAOKE", link: "https://youtu.be/TmVWBcTs2OE" },
  { label: "SIDE TO SIDE", link: "https://youtu.be/lR6-eS-fMf4" },
  { label: "SIDE TO SIDE SPRINT", link: "https://youtu.be/AVueE8lAc4E" },
  { label: "NO LOOK SPRINTS", link: "https://youtu.be/CSN7LeM-0sk" },
  { label: "SUICIDES", link: "https://youtu.be/2bmK0idBMHA" },
  { label: "TURN AROUND SPRINT", link: "https://youtu.be/94onVkqlpJE" },
  { label: "LAST 2 MIN SPRINT", link: "https://youtu.be/21QL3mZZwhQ" },
];

function ExerciseCard({
  item,
  index,
  onPlay,
}: {
  item: { label: string; link?: string };
  index: number;
  onPlay?: () => void;
}) {
  const h = useHover();
  const ytId = item.link ? getYouTubeId(item.link) : null;
  const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

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
        {item.label}
      </div>
      {/* Thumbnail */}
      <div
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        onClick={item.link ? onPlay : undefined}
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
          cursor: item.link ? "pointer" : "default",
          transition: "border-color 0.15s, filter 0.15s",
          filter: h.on && item.link ? "brightness(1.15)" : "brightness(1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Video thumbnail"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.6,
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: h.on ? "scale(1.05)" : "scale(1)",
            }}
          />
        )}
        <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.15, zIndex: 1 }} preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke={T.orange} strokeWidth="1" />
          <circle cx="50%" cy="50%" r="18%" stroke={T.orange} strokeWidth="1" fill="none" />
        </svg>
        <div
          style={{
            width: 24,
            height: 24,
            background: item.link
              ? h.on ? T.orange : "rgba(232,101,26,0.7)"
              : "rgba(100,100,100,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background 0.15s",
          }}
        >
          <svg width="8" height="10" viewBox="0 0 10 12" fill="none">
            <polygon points="0,0 10,6 0,12" fill="white" />
          </svg>
        </div>

        {!item.link && (
          <span
            style={{
              position: "absolute",
              bottom: 6,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: BARLOW,
              fontSize: 9,
              letterSpacing: "1px",
              color: T.mutedText,
              textTransform: "uppercase",
              zIndex: 2,
            }}
          >
            Soon
          </span>
        )}
      </div>
    </div>
  );
}

function WarmUpExercisesContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const hNba = useHover();
  const cols = isMobile ? 2 : isTablet ? 3 : 4;

  return (
    <div>
      {/* Video Modal popup */}
      {activeVideo && (
        <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      <SectionBadge label="WARM UP EXERCISES" />

      {/* Responsive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: isMobile ? 12 : 20,
          marginTop: 36,
        }}
      >
        {WARMUP_EXERCISES.map((item, i) => (
          <ExerciseCard
            key={item.label}
            item={item}
            index={i}
            onPlay={() => {
              if (item.link) {
                setActiveVideo(item.link);
              }
            }}
          />
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
          onClick={() => setActiveVideo("https://youtu.be/ZN4LpKA_ym4")}
          style={{
            width: 90,
            aspectRatio: "16 / 9",
            background: THUMB_SHADES[4],
            border: hNba.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "border-color 0.15s, filter 0.15s",
            filter: hNba.on ? "brightness(1.15)" : "brightness(1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {(() => {
            const ytId = getYouTubeId("https://youtu.be/ZN4LpKA_ym4");
            return ytId && (
              <img
                src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                alt="NBA Referee Fitness thumbnail"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.6,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: hNba.on ? "scale(1.05)" : "scale(1)",
                }}
              />
            );
          })()}
          <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.15, zIndex: 1 }} preserveAspectRatio="none">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke={T.orange} strokeWidth="1" />
            <circle cx="50%" cy="50%" r="18%" stroke={T.orange} strokeWidth="1" fill="none" />
          </svg>
          <div
            style={{
              width: 24,
              height: 24,
              background: hNba.on ? T.orange : "rgba(232,101,26,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
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
const MENTAL_ITEMS: { label: string; action: "play" | "download" | "watch"; link?: string }[] = [
  { label: "GENERAL GUIDELINES (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/c2bcc1344039e9d31a43efd6bc13dddd/FIBA_Mental_Preparation_General_Guidelines_v2.0_June2020_en.pdf" },
  { label: "FOR COMPETITIONS (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/859a32d67beea3aebbfdc49c5a021f9f/FIBA_Mental_Preparation_for_Competitions_v2.0_June2020_en.pdf" },
  { label: "PRE-GAME (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/23dbe88c53c2119fdf513c7e81aa8c77/FIBA_IY_Mental_Preparation_Pre_Game_v2.0_June2020_en.pdf" },
  { label: "POST-GAME EVALUATION (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/1f483ee55f7885e9ec721774665a767e/FIBA_IY_Mental_Preparation_Post_Game_Evaluation_v2.0_June2020_en.pdf" },
  { label: "FACING UNCERTAINTY (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/4eff2246a7604778c2213281285b20c7/FIBA_Mental_Preparation_Facing_Uncertainty_v1.0_Apr2020_en.pdf" },
  { label: "GOAL-SETTING (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/46c914672d2c73361a5fdce2ea336feb/FIBA_IY_Mental_Preparation_Goal_setting_v2.0_July2020_en.pdf" },
  { label: "CONCENTRATION & ATTENTION (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/6d8d915862ee06dc7759723a2c45f3b3/FIBA_IY_Mental_Preparation_Concentration_and_Attention_v2.0_July2020_en.pdf" },
  { label: "AROUSAL CONTROL (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/27ac54d95ce84c54b98bcaa15642213e/FIBA_IY_Arousal_control_v2.0_July2020_en.pdf" },
  { label: "VISUALISATION & IMAGERY (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/4de7933e469d1f96b8f6611a26cf26a2/FIBA_IY_Mental_Preparation_Visualisation_and_imagery_v2.0_July2020_en.pdf" },
  { label: "SELF-TALK (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/a5b66ca3516a9206a8f4096a5f4e3348/FIBA_IY_Mental_Preparation_Self_talk_v2.0_July2020_en.pdf" },
  { label: "INJURY & RECOVERY (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/6ec67849843ab93377be0c06ef2b707c/FIBA_IY_Mental_Preparation_during_injury_and_recovery_v2.0_July2020_en.pdf" },
  { label: "FACING STRESSFUL & CHALLENGING SITUATIONS (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/1ee2d6d431a40d3133f2215b1a9e43c9/FIBA_IY_Mental_Preparation_Facing_stressful__challenging_situations_v2.0_July2020_en.pdf" },
  { label: "KEEPING MOTIVATION, PASSION & ENTHUSIASM FOR OFFICIATING (Version 2.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/6e285d7da5e783ce5dcefcfa1adc3e20/FIBA_IY_Mental_Preparation_Keeping_motivationpassion_and_enthusiasm_for_officiating_v2.0_July2020_en.pdf" }
];

function MentalPreparationContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="MENTAL PREPARATION" />
      <div style={{ marginTop: 36 }}>
        {MENTAL_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

// ─── Improve Yourself content ──────────────────────────────────────────────────
const IMPROVE_YOURSELF_ITEMS: { label: string; action: "play" | "download" | "watch"; link?: string }[] = [
  { label: "ROTATIONS (Version 1.0) 💥", action: "download", link: "https://library.fibairef.basketball/doc/dlg0aFFPZUhrUzFxWnI2Wm12b3pGZz09" },
  { label: "HEAD COACH'S CHALLENGE (Version 2.1)", action: "download", link: "https://library.fibairef.basketball/doc/bHYzalg3N04xUmRzZmdhL1QyQzd5Zz09" },
  { label: "REFEREEING THE HELP DEFENDER (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/63388408072964d0b3407fdad25c011a/FIBA_IY_HelpDefender_v1_0_Feb2026.pdf" },
  { label: "TIMING OF THE WHISTLE (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/414590e206f47a135687c2fcc2f30e95/FIBA_IY_WhistleTiming_v1_0_July2025.pdf" },
  { label: "OUT-OF-BOUNDS DECISIONS (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/doc/T0dQQkRtWVhCdmVNcGFYbjJaUG8vUT09" },
  { label: "MOBILITY (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/4fe8808c90a5a977c8a51f720e2ac726/FIBA_IY_Mobility_2024_en_.pdf" },
  { label: "EMOTIONAL INTELLIGENCE (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/9c0315e865b13ea3e29bd1ccace2067f/FIBA_IY_Emotional_Intelligence_v1_0_May2022_en.pdf" },
  { label: "FIRST IMPRESSION (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/b565e5aecf464c8ac451a9d7395bda1f/FIBA_IY_First_Impression_v1_0_May2022_en.pdf" },
  { label: "SEASON'S SELF-EVALUATION (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/c010d906cbb4749b187fab71c3498392/FIBA_IY_Seasons_Self_Evaluation_v1_0_en.pdf" },
  { label: "GROWTH MINDSET (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/86e6c151a1bb65a64a1e89b3a22d47d7/FIBA_IY_Growth_Mindset_v1_0_Feb2022_en.pdf" },
  { label: "CONTROL THE CONTROLLABLE (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/3abdfe35d014373daeb216dade6ed17a/FIBA_IY_Control_Controllable_v1_0_Feb2022_en.pdf" },
  { label: "BUILDING SELF-DISCIPLINE (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/images/documents/14f1908d9b52e6483c485b9a3fc8e28a/FIBA_IY_Self_Discipline_v1_0_Feb2022_en.pdf" }
];

function ImproveYourselfContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="IMPROVE YOURSELF" />
      <div style={{ marginTop: 36 }}>
        {IMPROVE_YOURSELF_ITEMS.map((item, i) => (
          <FitnessRow key={i} item={item} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

// ─── FIBA Licensing content ──────────────────────────────────────────────────
const FIBA_LICENSING_ITEMS: { label: string; action: "play" | "download" | "watch"; link?: string }[] = [
  { label: "GUIDELINES TO NATIONAL FEDERATIONS (Version 1.0 October 2022)", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/nf-guidelines.pdf" },
  { label: "LICENSING 2023-25 INTRODUCTION", action: "watch", link: "https://youtu.be/hcfdn3tQoyM" },
  { label: "FIBA GOL 2023-25 Referees’ Physical Training Plan", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/referees-physical-training-plan.pdf" },
  { label: "FIBA GOL 2023-25 Entry Form", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/entry-form.pdf" },
  { label: "FIBA GOL 2023-25 Fitness Test Result", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/fitness-test-results.pdf" },
  { label: "FIBA GOL 2023-25 Fitness Test Consent Form", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/fitness-test-consent-form.pdf" },
  { label: "FIBA GOL 2023-25 Medical Certificate", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/medical-certificate.pdf" },
  { label: "FIBA GOL 2023-25 MAP (FIBA Management & Administration Platform) User Guidelines", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/map-guidelines.pdf" },
  { label: "LIST OF NATIONAL FEDERATIONS (27ᵗʰ January 2017)", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/nf-list.pdf" },
  { label: "COMBINED WORLD RANKING (4ᵗʰ October 2022)", action: "download", link: "https://www.fiba.basketball/documents/en/gol2023-25/world-ranking.pdf" }
];

function FibaLicensingContent({ isMobile }: { isMobile: boolean }) {
  const [activeMedia, setActiveMedia] = useState<{ url: string; title: string } | null>(null);

  return (
    <div>
      {/* Media popup modal */}
      {activeMedia && (
        <VideoModal
          url={activeMedia.url}
          title={activeMedia.title}
          onClose={() => setActiveMedia(null)}
        />
      )}

      <SectionBadge label="FIBA LICENSING" />
      <div style={{ marginTop: 36 }}>
        {FIBA_LICENSING_ITEMS.map((item, i) => (
          <FitnessRow
            key={i}
            item={item}
            isMobile={isMobile}
            onAction={() => {
              if (item.link) {
                setActiveMedia({ url: item.link, title: item.label });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Assist Articles content ──────────────────────────────────────────────────
const ASSIST_ARTICLES_DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 19 },
  { id: 20 },
  { id: 21 },
  { id: 22 },
  { id: 23 },
  { id: 24 },
  { id: 25 },
  { id: 26 },
  { id: 27 },
  { id: 28 },
  { id: 29 },
  { id: 30 },
  { id: 31 },
  { id: 32 },
  { id: 34 },
  { id: 35 },
  { id: 36 },
  { id: 37 },
  { id: 38 },
  { id: 39 },
  { id: 40 },
  { id: 41 },
  { id: 42 },
  { id: 43 },
  { id: 44 },
];

function AssistCard({ issueNumber }: { issueNumber: number }) {
  const h = useHover();
  const formattedNum = String(issueNumber).padStart(2, "0");
  const thumbnail = `https://www.refereevision.com/Referees/${formattedNum}.jpg`;
  const pdfLink = `https://www.refereevision.com/Referees/${formattedNum}_${issueNumber === 1 ? "Ref" : "ref"}.pdf`;

  const stripeColors = ["#0056B3", "#FFC107", "#DC3545", "#28A745", "#6C757D", "#E8651A"];
  const stripeColor = stripeColors[(issueNumber - 1) % stripeColors.length];

  return (
    <a
      href={pdfLink}
      target="_blank"
      rel="noopener noreferrer"
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
        transition: "border-color 0.2s, transform 0.25s, box-shadow 0.25s",
        transform: h.on ? "scale(1.08)" : "scale(1)",
        boxShadow: h.on ? `0 8px 28px rgba(0,0,0,0.55)` : "none",
        boxSizing: "border-box",
        textDecoration: "none",
        zIndex: h.on ? 10 : 1,
      }}
    >
      {/* Left vertical color bar with ASSIST XX */}
      <div
        style={{
          width: 22,
          background: stripeColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          borderRight: `1px solid ${T.border}`,
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            transform: "rotate(-90deg)",
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 9,
            color: T.white,
            letterSpacing: "1.5px",
            whiteSpace: "nowrap",
          }}
        >
          ASSIST{formattedNum}
        </div>
      </div>

      {/* Image fills the rest */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          src={thumbnail}
          alt={`Assist ${formattedNum}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.25s ease",
            transform: h.on ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Subtle orange overlay tint on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: h.on ? "rgba(232,101,26,0.18)" : "transparent",
            transition: "background 0.25s",
            pointerEvents: "none",
          }}
        />
      </div>
    </a>
  );
}

function AssistArticlesContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const cols = isMobile ? 2 : isTablet ? 3 : 5;

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
        {isMobile ? "( TAP AN ISSUE TO OPEN )" : "( HOVER OVER THE IMAGE TO SEE THE ARTICLES WITHIN )"}
      </div>

      {/* Responsive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: isMobile ? 10 : 16,
          marginTop: 28,
        }}
      >
        {ASSIST_ARTICLES_DATA.map((issue) => (
          <AssistCard
            key={issue.id}
            issueNumber={issue.id}
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const width = useWindowWidth();

  const isMobile = width < 640;
  const isTablet = width < 1024;

  // Close sidebar when resizing to desktop
  useEffect(() => {
    if (!isMobile && sidebarOpen) setSidebarOpen(false);
  }, [isMobile, sidebarOpen]);

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
      {/* Mobile top bar */}
      {isMobile && (
        <div
          style={{
            background: T.charcoal,
            borderBottom: `1px solid ${T.border}`,
            borderTop: `3px solid ${T.orange}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <span
            style={{
              fontFamily: BARLOW,
              fontWeight: 800,
              fontSize: 22,
              color: T.orange,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            REFEREES
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: BARLOW,
                fontSize: 13,
                color: T.inactive,
                letterSpacing: "1px",
                textTransform: "uppercase",
                maxWidth: 160,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {activeTab}
            </span>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "transparent",
                border: `1px solid ${T.border}`,
                color: T.white,
                cursor: "pointer",
                padding: "6px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                borderRadius: 2,
              }}
              aria-label="Open menu"
            >
              <span style={{ display: "block", width: 18, height: 2, background: T.orange }} />
              <span style={{ display: "block", width: 18, height: 2, background: T.orange }} />
              <span style={{ display: "block", width: 18, height: 2, background: T.orange }} />
            </button>
          </div>
        </div>
      )}

      {/* Two-column body */}
      <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
        <Sidebar
          active={activeTab}
          onSelect={setActiveTab}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            background: "var(--off-white)",
            padding: isMobile ? "24px 16px" : isTablet ? "32px 28px" : "48px 56px",
            minHeight: "100%",
            boxSizing: "border-box",
            overflowX: "hidden",
          }}
        >
          {activeTab === "MECHANICS" ? (
            <MechanicsContent isMobile={isMobile} />
          ) : activeTab === "DUTIES" ? (
            <DutiesContent isMobile={isMobile} />
          ) : activeTab === "FITNESS TESTS" ? (
            <FitnessTestsContent isMobile={isMobile} />
          ) : activeTab === "PHYSICAL TRAINING" ? (
            <PhysicalTrainingContent isMobile={isMobile} />
          ) : activeTab === "WARM UP EXERCISES" ? (
            <WarmUpExercisesContent isMobile={isMobile} isTablet={isTablet} />
          ) : activeTab === "MENTAL PREPARATION" ? (
            <MentalPreparationContent isMobile={isMobile} />
          ) : activeTab === "IMPROVE YOURSELF" ? (
            <ImproveYourselfContent isMobile={isMobile} />
          ) : activeTab === "FIBA LICENSING" ? (
            <FibaLicensingContent isMobile={isMobile} />
          ) : activeTab === "ASSIST ARTICLES" ? (
            <AssistArticlesContent isMobile={isMobile} isTablet={isTablet} />
          ) : (
            <PlaceholderContent tab={activeTab} />
          )}
        </main>
      </div>
    </div>
  );
}
