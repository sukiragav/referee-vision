import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";
import { renderWithOrdinals } from "../utils/renderWithOrdinals";

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

const DOCS: {
  label: string;
  version: string;
  link: string;
  pinned?: boolean;
}[] = [
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
    version: "Version 3.0a - Valid as of October 2026",
    link: "https://library.fibairef.basketball/images/documents/4d74a028de82e7ae5cbb849f6cbd6186/FIBA_Referee_Manual_Basic_3PO_v3_0a_Oct2026_en.pdf",
    pinned: true,
  },
  {
    label: "3PO ADVANCED",
    version: "Version 3.0a - Valid as of October 2026",
    link: "https://library.fibairef.basketball/images/documents/e0072fec69d381d1f2272eb35cc5e4c4/FIBA_Referee_Manual_Advanced_3PO_v3_0a_.pdf",
    pinned: true,
  },
  {
    label: "INDIVIDUAL OFFICIATING TECHNIQUES (IOT)",
    version: "Version 3.0a - Valid as of October 2026",
    link: "https://library.fibairef.basketball/images/documents/224fd66bc61af7fa35c70a06a6c2940f/FIBA_Referee_Manual_IOT_v3_0a_Oct2026_en.pdf",
    pinned: true,
  },
  {
    label: "BASIC OFFICIATING TERMINOLOGY",
    version: "Version 3.0 - Valid as of October 2026",
    link: "https://library.fibairef.basketball/images/documents/e775a9cfc5a2a0179cd23a75f3471017/FIBA_Glossary_v3_0_Oct2026_en_.pdf",
    pinned: true,
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
    const drawerContent = (
      <>
        {/* Backdrop */}
        {open && (
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.65)",
              zIndex: 99998,
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
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            transform: open ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: open ? "4px 0 24px rgba(0,0,0,0.7)" : "none",
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

    return typeof document !== "undefined" ? createPortal(drawerContent, document.body) : drawerContent;
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
        top: 52,
        height: "calc(100vh - 52px)",
        alignSelf: "flex-start",
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
        className="section-badge-pill"
        style={{
          background: T.orange,
          color: "var(--off-white)",
          fontFamily: BARLOW,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "3px",
          textTransform: "uppercase",
          padding: "10px 40px",
          borderRadius: 30,
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
        {isFourth
          ? renderWithOrdinals("4TH REFEREE – AN ADDED VALUE")
          : renderWithOrdinals(doc.label)}
        {"  "}
        <span style={{ color: T.mutedText, fontSize: isMobile ? 11 : 13, fontWeight: 400 }}>({renderWithOrdinals(doc.version)})</span>
        {doc.pinned && " 📌"}
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
  // Handles youtu.be/ID, youtube.com/watch?v=ID, and embed formats
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  const longMatch = url.match(/[?&]v=([\w-]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1`;
  const embedMatch = url.match(/embed\/([\w-]+)/);
  if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}?autoplay=1`;
  return url;
}

function VideoModal({ url, title, onClose }: { url: string; title?: string; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const isMp3 = url.endsWith(".mp3") || url.includes(".mp3?");
  const isMp4 = url.endsWith(".mp4") || url.includes(".mp4?");
  const isPdf = /\.pdf(\?.*)?$/i.test(url);
  const isImage = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
  const isSignal = isImage && /sig/i.test(url);
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
        padding: isSignal ? "16px 12px" : isImage ? "32px 16px" : "16px",
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
          style={
            isSignal
              ? {
                maxWidth: "96vw",
                maxHeight: "92vh",
                background: "#ffffff",
                boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                position: "relative",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: 4,
              }
              : {
                width: "min(960px, 94vw)",
                height: "90vh",
                background: "#ffffff",
                boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                overflow: "hidden",
              }
          }
        >
          {/* Header toolbar for non-signal documents (Article, Interpretation, Presentation) */}
          {!/sig/i.test(url) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                background: "#1E1E1E",
                borderBottom: `2px solid ${T.orange}`,
                zIndex: 20,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {title && (
                  <span
                    style={{
                      fontFamily: BARLOW,
                      fontWeight: 800,
                      fontSize: 14,
                      color: T.white,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {title}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Zoom out */}
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                  title="Zoom Out"
                  style={{
                    background: "#2A2A2A",
                    border: `1px solid ${T.border}`,
                    color: "#fff",
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = T.orange)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2A2A2A")}
                >
                  −
                </button>
                {/* Zoom percentage */}
                <button
                  onClick={() => setZoom(1)}
                  title="Reset Zoom"
                  style={{
                    background: "#2A2A2A",
                    border: `1px solid ${T.border}`,
                    color: T.orange,
                    fontFamily: BARLOW,
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: "0.5px",
                    padding: "0 10px",
                    height: 32,
                    borderRadius: 4,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Math.round(zoom * 100)}%
                </button>
                {/* Zoom in */}
                <button
                  onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                  title="Zoom In"
                  style={{
                    background: "#2A2A2A",
                    border: `1px solid ${T.border}`,
                    color: "#fff",
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = T.orange)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#2A2A2A")}
                >
                  +
                </button>
                {/* Close button */}
                <button
                  onClick={onClose}
                  title="Close"
                  style={{
                    background: T.orange,
                    border: "none",
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 6,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Close button inside modal for signals */}
          {/sig/i.test(url) && (
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10,
                background: T.orange,
                border: "none",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                width: 34,
                height: 34,
                cursor: "pointer",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
              }}
            >
              ✕
            </button>
          )}

          {isSignal ? (
            <img
              src={url}
              alt={title || "Signal"}
              style={{
                width: "min(350px, 92vw)",
                maxWidth: "96vw",
                maxHeight: "92vh",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                flex: 1,
                overflow: "auto",
                background: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "16px",
              }}
            >
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                  transition: "transform 0.15s ease",
                  display: "inline-block",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  background: "#fff",
                }}
              >
                <img
                  src={url}
                  alt={title || "Article"}
                  style={{
                    width: "100%",
                    maxWidth: 900,
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ) : isPdf ? (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(1080px, 94vw)",
            height: "90vh",
            background: "#1E1E1E",
            boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            overflow: "hidden",
            border: `1px solid ${T.border}`,
          }}
        >
          {/* Top toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              background: "#1A1A1A",
              borderBottom: `2px solid ${T.orange}`,
              zIndex: 20,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: BARLOW,
                fontWeight: 800,
                fontSize: 15,
                color: T.white,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {title || "Assist Article"}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: T.orange,
                  fontFamily: BARLOW,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "1px",
                  textDecoration: "none",
                  border: `1px solid ${T.orange}`,
                  padding: "4px 10px",
                  borderRadius: 3,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                OPEN NEW TAB ↗
              </a>
              <button
                onClick={onClose}
                title="Close"
                style={{
                  background: T.orange,
                  border: "none",
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                  width: 32,
                  height: 32,
                  borderRadius: 4,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          </div>
          {/* PDF Frame */}
          <iframe
            src={url}
            title={title || "PDF Document"}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              border: "none",
              background: "#fff",
            }}
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
  const embedMatch = url.match(/embed\/([\w-]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
}

function VideoThumb({
  index,
  link,
  thumbnail,
  onPlay,
  isMobile,
}: {
  index: number;
  link?: string;
  thumbnail?: string;
  onPlay?: () => void;
  isMobile?: boolean;
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
        width: isMobile ? "100%" : 130,
        height: isMobile ? "auto" : 95.1,
        aspectRatio: isMobile ? "130 / 95.1" : undefined,
        maxWidth: isMobile ? "100%" : 130,
        background: THUMB_SHADES[index % THUMB_SHADES.length],
        border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: link ? "pointer" : "default",
        transition: "border-color 0.15s, filter 0.15s",
        filter: h.on && link ? "brightness(1.15)" : "brightness(1)",
        position: "relative",
        overflow: "hidden",
        flex: isMobile ? "1 1 0" : "0 0 130px",
        minWidth: 0,
        boxSizing: "border-box",
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
        className="video-thumb-play-btn"
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
      <div
        style={{
          display: "flex",
          gap: isMobile ? 8 : 6,
          height: isMobile ? undefined : 95.1,
          justifyContent: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {videos.map((vid, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={vid.link}
            thumbnail={vid.thumbnail}
            isMobile={isMobile}
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
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              {col.type === "video" ? (
                <VideoThumb
                  index={i}
                  link={col.link}
                  isMobile={isMobile}
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
    label: "FIBA BASIC FITNESS TEST (Video)",
    action: "watch",
    link: "https://assets.fiba.basketball/video/upload/documents-referees-game-officials-gol-2027-29-basic-fitness-test-basic-fitness-test-video.mp4"
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
        {renderWithOrdinals(item.label)}
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
          width: 130,
          height: 95.1,
          maxWidth: "100%",
          margin: "0 auto",
          background: THUMB_SHADES[index % THUMB_SHADES.length],
          border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
          borderRadius: 10,
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
          className="video-thumb-play-btn"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: item.link
              ? h.on ? T.orange : "rgba(232,101,26,0.7)"
              : "rgba(100,100,100,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background 0.15s",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ marginLeft: 2 }}>
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
          className="video-thumb-card"
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
            className="video-thumb-play-btn"
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
  { label: "ROTATIONS (Version 1.0)", action: "download", link: "https://library.fibairef.basketball/doc/dlg0aFFPZUhrUzFxWnI2Wm12b3pGZz09" },
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
  { label: "GUIDELINES FOR NATIONAL MEMBER FEDERATIONS (Version 1.0 October 2026)", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-gol-guidelines-en.pdf" },
  { label: "MAP USER GUIDELINES", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-map-user-guidelines-en.pdf" },
  { label: "FIBA GOL 2027-29 Referees' Physical Training Plan", action: "download", link: "https://assets.fiba.basketball/image/upload/v1792052119/documents-referees-game-officials-gol-2027-29-basic-fitness-test-training-plan.pdf" },
  { label: "FIBA GOL 2027-29 Entry Form", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-required-forms-entry-form.pdf" },
  { label: "FIBA GOL 2027-29 Fitness Test Result", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-required-forms-fitness-test-results-form.pdf" },
  { label: "FIBA GOL 2027-29 Fitness Test Consent Form", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-required-forms-fitness-test-consent-form.pdf" },
  { label: "FIBA GOL 2027-29 Medical Certificate", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-required-forms-medical-certificate.pdf" },
  { label: "FIBA GOL 2027-29 MAP (FIBA Management & Administration Platform) User Guidelines", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-required-forms-map-user-registration-form-for-nfs.pdf" },
  { label: "LIST OF NATIONAL FEDERATIONS (2nd September 2024)", action: "download", link: "https://assets.fiba.basketball/image/upload/v1728662673/documents-corporate-others-gol-2025-27-fiba-ranking.pdf" },
  { label: "COMBINED WORLD RANKING (2nd September 2024)", action: "download", link: "https://assets.fiba.basketball/image/upload/documents-referees-game-officials-gol-2027-29-fiba-combined-world-ranking-september-2026.pdf" }
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
interface AssistArticleItem {
  id: number;
  tooltip?: string;
}

const ASSIST_ARTICLES_DATA: AssistArticleItem[] = [
  {
    id: 1,
    tooltip: `Issue: Mar/Apr 2003
Little known world of FIBA referees - Lubomir Kotleba
Solving Conflicts - Carl Jungebrand
Work of the table officials:Time-outs and Substitutions - Valentin Lazarov`,
  },
  {
    id: 2,
    tooltip: `Issue: May/June 2003
How to become a better official - Fred Horgan
Recruiting of new young referees - Edvard de Jager
Right or Wrong  
Commissioner's Checklist`,
  },
  {
    id: 3,
    tooltip: `Issue: Jul/Aug 2003
The role of the FIBA National Referee Instructor - Alberto Garcia
Communication - Paul Loube
Right or Wrong
The Officials Conference`,
  },
  {
    id: 4,
    tooltip: `Issue: Sep/Oct 2003
Mental Preparation: A key to success in officiating - Paul Deschales
Right or Wrong
The role, duties and responsibilities of the public announcer - Tomas Grossman`,
  },
  {
    id: 5,
    tooltip: `Issue:Nov/Dec 2003
Australian Referee Education System - Bill Mildenhall
Right or Wrong`,
  },
  {
    id: 6,
    tooltip: `Issue: Jan/Feb 2004
Officiating NCAA Women's Basketball - Marcy Weston & Sally Bell
Officiating of Wheel Chair Basketball - Don Steponchev`,
  },
  {
    id: 7,
    tooltip: `Issue: Mar/Apr 2004
Training Courses for officials - Alison Muir
Factor affecting information processing in Officiating - Stavros Douvis & Antonis Travlos
Right or Wrong`,
  },
  {
    id: 8,
    tooltip: `Issue: May/Jun 2004
Tracking two and three officials with a computer - Mateja Loncar, Brane Dezman & Simon Licen
Right or Wrong`,
  },
  {
    id: 9,
    tooltip: `Issue: Jul/Aug 2004
Tower Philosohy: Advantages and Disadvantages - Paul Loube
Right or Wrong`,
  },
  {
    id: 10,
    tooltip: `Issue: Sep/Oct 2004
Refereeing the Defense - Fred Horgan
Do you have the right level of tension? - Bill Mildenhall
Right or Wrong`,
  },
  {
    id: 11,
    tooltip: `Issue: Nov/Dec 2004
Evaluating and improving an official's performance - Paul Brazeau
Contact: The princple of Offensive threat - Fred Horgan
Right or Wrong`,
  },
  {
    id: 12,
    tooltip: `Issue: Jan/Feb 2005
Three person officiating - Pat Rosenow
Improving officiating skills through mentoring - Bill Mildenhall
Right or Wrong`,
  },
  {
    id: 13,
    tooltip: `Issue: Mar/Apr 2005
Philosophy and education of referees - Costas Rigas
Right or Wrong`,
  },
  {
    id: 14,
    tooltip: `Issue: May/Jun 2005
FIBA vs North American rules comparison - Anthony Reimer
Right or Wrong`,
  },
  {
    id: 15,
    tooltip: `Issue: Jul/Aug 2005
Basketball Statistics Manual
Right or Wrong`,
  },
  {
    id: 16,
    tooltip: `Issue: Sep/Oct 2005
Argentinian Basketball Referees Association - Jorgo Jose Gonzalez
Do you speak English? - Alexel Davydov
Right or Wrong`,
  },
  {
    id: 17,
    tooltip: `Issue: Nov/Dec 2005
Evaluating and improving an official's performance - Paul Brazeau
Contact: The princple of Offensive threat - Fred Horgan
Right or Wrong`,
  },
  {
    id: 18,
    tooltip: `Issue: Jan/Feb 2006
The search for eternal truth on the court - Lazlo Nemeth
Mental skills for referees, mentors and instructors - Alan Richardson
Right or Wrong`,
  },
  {
    id: 19,
    tooltip: `Issue: Mar/Apr 2006
Pschyology of Officiating - Valentin Lazarov
Right or Wrong`,
  },
  {
    id: 20,
    tooltip: `Issue: May/Jun 2006
The importance of mentorship - Nancy Ethier
A woman on the refereeing world - Chantal Julien
Right or Wrong`,
  },
  {
    id: 21,
    tooltip: `Issue: Jul/Aug 2006
The silent supporting cast`,
  },
  {
    id: 22,
    tooltip: `Issue: Sep/Oct 2006
The importance of psychological strength in officiating - Carl Jungebrand
Right or Wrong`,
  },
  {
    id: 23,
    tooltip: `Issue: Nov/Dec 2006
Concepts of modern officiating (Part I) - Valentin Lazarov
Right or Wrong`,
  },
  {
    id: 24,
    tooltip: `Issue: Jan/Feb 2007 
Concepts of modern officiating (Part II) - Valentin Lazarov
Right or Wrong`,
  },
  {
    id: 25,
    tooltip: `Issue: Mar/Apr 2007
The third team on the court - Pat Rosenow
Right or Wrong`,
  },
  {
    id: 26,
    tooltip: `Issue: May/Jun 2007
Let the rules be the guide - Peter Webb & Ray McClure
Right or Wrong`,
  },
  {
    id: 27,
    tooltip: `Issue: Jul/Aug 2007
Play situations: Interpretating Contact - Alan Richardson & Clifford Luyk
Right or Wrong`,
  },
  {
    id: 28,
    tooltip: `Issue: Sep/Oct 2007
The difficult job of a referee's observer - Jaime Andreu
Right or Wrong`,
  },
  {
    id: 29,
    tooltip: `Issue: Nov/Dec 2007
Issues related to the officiating relationships - Alan Richardson
Right or Wrong`,
  },
  {
    id: 30,
    tooltip: `Issue: Jan/Feb 2008
Refereeing post play situation - Alan Richardson
Right or Wrong`,
  },
  {
    id: 31,
    tooltip: `Issue: Mar/Apr 2008
What did you say? - Tom Lopes
Right or Wrong`,
  },
  {
    id: 32,
    tooltip: `Issue: May/Jun 2008
FIBA 3on3 Basketball game
FIBA historic rule changes
Right or Wrong`,
  },
  {
    id: 34,
    tooltip: `Issue: Sep/Oct 2008
1986:A key year for modern officiating - Jaime Andreu
Right or Wrong`,
  },
  {
    id: 35,
    tooltip: `Issue: Nov/Dec 2008
Building Concentration - Alan Richardson
Right or Wrong`,
  },
  {
    id: 36,
    tooltip: `Issue: Jan/Feb 2009
Developing training techniques for concentration - Alan Richardson
Right or Wrong`,
  },
  {
    id: 37,
    tooltip: `Issue: Mar/Apr 2009
The importance of physical preparation for referees - Alexey Chudin
Right or Wrong`,
  },
  {
    id: 38,
    tooltip: `Issue: May/Jun 2009
Visualisation, Imagery - Alan Richardson
Right or Wrong`,
  },
  {
    id: 39,
    tooltip: `Issue: Jul/Aug 2009
Mental toughness - Alan Richardson
Right or Wrong`,
  },
  {
    id: 40,
    tooltip: `Issue: Sep/Oct 2009
Eight qualities of a great referee - Richard Stokes
Right or Wrong`,
  },
  {
    id: 41,
    tooltip: `Issue: Nov/Dec 2009
Article 31: Goaltending and Interference - Fred Horgan
Right or Wrong`,
  },
  {
    id: 42,
    tooltip: `Issue: Jan/Feb 2010
Digital Scoresheet (DSS) - Richard Stokes & Miguel Betancor
Right or Wrong`,
  },
  {
    id: 43,
    tooltip: `Issue: Mar/Apr 2010
Consistency and Credibility - Fred Horgan
Right or Wrong`,
  },
  {
    id: 44,
    tooltip: `Issue: May/Jun 2010
Referees development program in Japan - Nobuo Hashimoto
Right or Wrong`,
  },
];

function AssistCard({
  issueNumber,
  tooltip,
  onOpen,
}: {
  issueNumber: number;
  tooltip?: string;
  onOpen: (pdfUrl: string, title: string) => void;
}) {
  const h = useHover();
  const formattedNum = String(issueNumber).padStart(2, "0");
  const thumbnail = `https://www.refereevision.com/Referees/${formattedNum}.jpg`;
  const pdfLink = `https://www.refereevision.com/Referees/${formattedNum}_${issueNumber === 1 ? "Ref" : "ref"}.pdf`;
  const title = `ASSIST ARTICLE #${formattedNum}`;

  const stripeColors = ["#0056B3", "#FFC107", "#DC3545", "#28A745", "#6C757D", "#E8651A"];
  const stripeColor = stripeColors[(issueNumber - 1) % stripeColors.length];

  return (
    <div
      onClick={() => onOpen(pdfLink, title)}
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      title={tooltip}
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
    </div>
  );
}

function AssistArticlesContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const [activeDoc, setActiveDoc] = useState<{ url: string; title: string } | null>(null);
  const cols = isMobile ? 2 : isTablet ? 3 : 5;

  return (
    <div>
      {activeDoc && (
        <VideoModal
          url={activeDoc.url}
          title={activeDoc.title}
          onClose={() => setActiveDoc(null)}
        />
      )}

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
        {isMobile ? "( TAP AN ISSUE TO OPEN )" : "( CLICK AN ISSUE TO OPEN IN POPUP )"}
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
            tooltip={issue.tooltip}
            onOpen={(url, title) => setActiveDoc({ url, title })}
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
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (tabParam && TABS.includes(tabParam as Tab)) {
      return tabParam as Tab;
    }
    return "MECHANICS";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    if (tabParam && TABS.includes(tabParam as Tab)) {
      setActiveTab(tabParam as Tab);
    }
  }, [tabParam]);

  const isMobile = width < 640;
  const isTablet = width < 1024;

  const handleTabSelect = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [activeTab]);

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
            top: 68,
            zIndex: 40,
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
          onSelect={handleTabSelect}
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
          ) : activeTab === "SIGNALS" ? (
            <SignalsContent />
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

function SignalsCard({
  label,
  sublabel,
  image,
  index,
  onClick,
}: {
  label?: string;
  sublabel?: string;
  image?: string;
  index?: number;
  onClick?: () => void;
}) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onClick}
      style={{
        width: 110,
        height: 150,
        background: "#FFFFFF",
        border: h.on ? `2px solid ${T.orange}` : `1.5px solid ${T.border}`,
        borderRadius: 6,
        padding: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        transition: "transform 0.15s, border-color 0.15s",
        transform: h.on ? "scale(1.04)" : "scale(1)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      {label && (
        <div style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 9, color: "#111", textAlign: "center", textTransform: "uppercase", lineHeight: 1.1 }}>
          {label}
        </div>
      )}
      <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", margin: "4px 0" }}>
        <img
          src={image || `PLACEHOLDER_signal_${index || 1}.png`}
          alt={label || "Signal"}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          onError={e => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent && !parent.querySelector(".sig-icon")) {
              const div = document.createElement("div");
              div.className = "sig-icon";
              div.style.cssText = "font-size:32px;color:#E8651A;";
              div.innerHTML = "🙋‍♂️";
              parent.appendChild(div);
            }
          }}
        />
      </div>
      {sublabel && (
        <div style={{ fontFamily: DM, fontSize: 8, color: "#555", textAlign: "center", lineHeight: 1.1 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

function SignalsSectionBadge({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0 16px" }}>
      <div className="sub-section-badge-pill" style={{ border: `2px solid ${T.orange}`, borderRadius: 6, padding: "6px 28px", background: "transparent" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

function SignalsDemoCard({
  title,
  thumbnail,
  onClick,
}: {
  title: string;
  thumbnail: string;
  onClick: () => void;
}) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onClick}
      style={{
        width: 140,
        height: 112,
        background: T.charcoal,
        border: h.on ? `2px solid ${T.orange}` : `1.5px solid ${T.border}`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.15s, transform 0.15s, box-shadow 0.15s",
        transform: h.on ? "scale(1.04)" : "scale(1)",
        boxShadow: h.on ? "0 4px 16px rgba(232,101,26,0.25)" : "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 79,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          flexShrink: 0,
        }}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.85,
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: h.on ? "scale(1.08)" : "scale(1)",
          }}
        />
        {/* Play button */}
        <div
          className="video-thumb-play-btn"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: h.on ? T.orange : "rgba(232,101,26,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background 0.15s, transform 0.15s",
            transform: h.on ? "scale(1.1)" : "scale(1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ marginLeft: 2 }}>
            <polygon points="0,0 10,6 0,12" fill="white" />
          </svg>
        </div>
      </div>
      <div
        style={{
          height: 33,
          padding: "0 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: T.charcoal,
          borderTop: `1px solid ${T.border}`,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 11,
            color: h.on ? T.orange : T.white,
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "color 0.15s",
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function SignalsContent() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const gameClockSignals = [
    { label: "STOP THE CLOCK", sublabel: "Open palm", image: "https://www.refereevision.com/Signals/Stop_sig.png" },
    { label: "STOP THE CLOCK FOR FOUL", sublabel: "One clenched fist", image: "https://www.refereevision.com/Signals/Stopfoul_sig.png" },
    { label: "START THE CLOCK", sublabel: "Chop with hand", image: "https://www.refereevision.com/Signals/Start_sig.png" },
  ];

  const scoringSignals = [
    { label: "1 POINT", sublabel: "1 finger, 'flag' from wrist", image: "https://www.refereevision.com/Signals/1PT.png" },
    { label: "2 POINTS", sublabel: "2 fingers, 'flag' from wrist", image: "https://www.refereevision.com/Signals/2PT.png" },
    { label: "3 POINTS", sublabel: "3 fingers extended, 3 fingers raised", image: "https://www.refereevision.com/Signals/3PT.png" },
  ];

  const subTimeoutSignals = [
    { label: "SUBSTITUTION", sublabel: "Cross forearms", image: "https://www.refereevision.com/Signals/Sub_sig.png" },
    { label: "BECKONING-IN", sublabel: "Open palm, wave towards body", image: "https://www.refereevision.com/Signals/Beckon_sig.png" },
    { label: "CHARGED TIME-OUT", sublabel: "Form T, show index finger", image: "https://www.refereevision.com/Signals/Timeout_sig.png" },
    { label: "MEDIA TIME-OUT", sublabel: "Open arms with clenched fists", image: "https://www.refereevision.com/Signals/Media_sig.png" },
  ];

  const informativeSignals = [
    { label: "CANCEL SCORE / CANCEL PLAY", sublabel: "Scissor-like motion with arms", image: "https://www.refereevision.com/Signals/Cancel_sig.png" },
    { label: "VISIBLE COUNT", sublabel: "Counting while moving the palm", image: "https://www.refereevision.com/Signals/count_Sig.png" },
    { label: "COMMUNICATION", sublabel: "Thumbs up", image: "https://www.refereevision.com/Signals/Commn_sig.png" },
    { label: "SHOT CLOCK RESET", sublabel: "Rotate hand, extend index finger", image: "https://www.refereevision.com/Signals/SC_sig.png" },
    { label: "DIRECTION OF PLAY", sublabel: "Point in direction of play", image: "https://www.refereevision.com/Signals/Direction_sig.png" },
    { label: "HELD BALL / JUMP BALL", sublabel: "Thumbs up, then point direction", image: "https://www.refereevision.com/Signals/Held_sig.png" },
    { label: "IRS REVIEW", sublabel: "Rotate hand with horizontal index finger", image: "https://www.refereevision.com/Signals/irs_Sig.png" },
    { label: "HEAD COACH'S CHALLENGE", sublabel: "Referee confirms challenge", image: "https://www.refereevision.com/Signals/hcc_sig.jpg" },
  ];

  const violationSignals = [
    { label: "TRAVELLING", sublabel: "Rotate fists", image: "https://www.refereevision.com/Signals/Travel_Sig.png" },
    { label: "ILLEGAL DRIBBLE", sublabel: "Patting motion with palm", image: "https://www.refereevision.com/Signals/DoubleDribble_Sig.png" },
    { label: "CARRYING THE BALL", sublabel: "Half rotation of palm", image: "https://www.refereevision.com/Signals/Carry_Sig.png" },
    { label: "3 SECONDS", sublabel: "Arm extended, show 3 fingers", image: "https://www.refereevision.com/Signals/3Sec_Sig.png" },
    { label: "5 SECONDS", sublabel: "Show 5 fingers", image: "https://www.refereevision.com/Signals/5Sec_Sig.png" },
    { label: "8 SECONDS", sublabel: "Show 8 fingers", image: "https://www.refereevision.com/Signals/8Sec_Sig.png" },
    { label: "24 SECONDS", sublabel: "Fingers touch shoulder", image: "https://www.refereevision.com/Signals/24sec_Sig.png" },
    { label: "BALL RETURNED TO BACKCOURT", sublabel: "Wave arm in front of body", image: "https://www.refereevision.com/Signals/brtbc_Sig.png" },
    { label: "DELIBERATE KICK OR BLOCK", sublabel: "Point to the foot", image: "https://www.refereevision.com/Signals/kick_Sig.png" },
    { label: "GOALTENDING / INTERFERENCE", sublabel: "Rotate finger over other hand", image: "https://www.refereevision.com/Signals/GI_Sig.png" },
  ];

  const playerNumberSignals = [
    { label: "No. 00 & 0", sublabel: "Both hands show number 0", image: "https://www.refereevision.com/Signals/Num0_sig.png" },
    { label: "No. 1 - 5", sublabel: "Right hand shows number 1 to 5", image: "https://www.refereevision.com/Signals/Num1_5_sig.png" },
    { label: "No. 6 - 10", sublabel: "Right hand shows 5, left hand 1-5", image: "https://www.refereevision.com/Signals/Num_6_10_sig.png" },
    { label: "No. 11 - 15", sublabel: "Right hand clenched fist, left 1-5", image: "https://www.refereevision.com/Signals/Num_11_15_sig.png" },
    { label: "No. 16", sublabel: "First decade digit 1, second 6", image: "https://www.refereevision.com/Signals/Num16_sig.png" },
    { label: "No. 24", sublabel: "First decade digit 2, second 4", image: "https://www.refereevision.com/Signals/Num_24_sig.png" },
    { label: "No. 40", sublabel: "First decade digit 4, second 0", image: "https://www.refereevision.com/Signals/Num40_sig.png" },
    { label: "No. 78", sublabel: "First decade digit 7, second 8", image: "https://www.refereevision.com/Signals/Num78_sig.png" },
    { label: "No. 99", sublabel: "First decade digit 9, second 9", image: "https://www.refereevision.com/Signals/Num99_sig.png" },
  ];

  const typesOfFouls = [
    { label: "ILLEGAL CYLINDER", sublabel: "Move both arms up and down", image: "https://www.refereevision.com/Signals/IllegalCylinder_Sig.png" },
    { label: "HOLDING", sublabel: "Grasp wrist downward", image: "https://www.refereevision.com/Signals/Hold_Sig.png" },
    { label: "BLOCKING / ILLEGAL SCREEN", sublabel: "Both hands on hips", image: "https://www.refereevision.com/Signals/screen_Sig.png" },
    { label: "PUSHING / CHARGING", sublabel: "Imitate push", image: "https://www.refereevision.com/Signals/Push_Sig.png" },
    { label: "HANDCHECKING", sublabel: "Grab palm and forward motion", image: "https://www.refereevision.com/Signals/handcheck_Sig.png" },
    { label: "ILLEGAL USE OF HANDS", sublabel: "Strike wrist", image: "https://www.refereevision.com/Signals/Illegaluseofhands_Sig.png" },
    { label: "CHARGING WITH BALL", sublabel: "Clenched fist strike open palm", image: "https://www.refereevision.com/Signals/Charge_Sig.png" },
    { label: "ILLEGAL CONTACT TO HAND", sublabel: "Strike palm towards forearm", image: "https://www.refereevision.com/Signals/strike_Sig.png" },
    { label: "HOOKING", sublabel: "Move lower arm backwards", image: "https://www.refereevision.com/Signals/hook_Sig.png" },
    { label: "EXCESSIVE SWINGING ELBOW", sublabel: "Swing elbow backwards", image: "https://www.refereevision.com/Signals/elbow_Sig.png" },
    { label: "HIT TO THE HEAD", sublabel: "Imitate contact to head", image: "https://www.refereevision.com/Signals/HittoHead_sig.png" },
    { label: "FOUL BY TEAM IN CONTROL", sublabel: "Point clenched fist to basket", image: "https://www.refereevision.com/Signals/Offensive_Sig.png" },
    { label: "FOUL ON ACT OF SHOOTING", sublabel: "One arm raised, indicate free throws", image: "https://www.refereevision.com/Signals/faos_Sig.png" },
    { label: "FOUL NOT ON ACT OF SHOOTING", sublabel: "One arm raised, point to floor", image: "https://www.refereevision.com/Signals/notfaos_Sig.png" },
    { label: "FOUL OFF ACT OF FOUL", sublabel: "Move both arms with open palm", image: "https://www.refereevision.com/Signals/passoff_sig.png" },
  ];

  const specialFouls = [
    { label: "DOUBLE FOUL", sublabel: "Wave clenched fists on both hands", image: "https://www.refereevision.com/Signals/doublefoul_Sig.png" },
    { label: "TECHNICAL FOUL", sublabel: "Form T, showing palms", image: "https://www.refereevision.com/Signals/tech_Sig.png" },
    { label: "UNSPORTSMANLIKE FOUL", sublabel: "Grasp wrist upward", image: "https://www.refereevision.com/Signals/usf_Sig.png" },
    { label: "DISQUALIFYING FOUL", sublabel: "Clenched fists on both hands", image: "https://www.refereevision.com/Signals/dqf_Sig.png" },
    { label: "FAKE A FOUL", sublabel: "Raise lower arm twice", image: "https://www.refereevision.com/Signals/fake_Sig.png" },
    { label: "ILLEGAL BOUNDARY LINE CROSSING", sublabel: "Wave arm parallel to boundary line", image: "https://www.refereevision.com/Signals/boundary_Sig.png" },
  ];

  const reportingToTable = [
    { label: "AFTER FOUL WITHOUT FREE THROWS", sublabel: "Point in direction of play", image: "https://www.refereevision.com/Signals/Foul_wo_FT_sig.png" },
    { label: "AFTER FOUL BY TEAM IN CONTROL", sublabel: "Clenched fist in direction of play", image: "https://www.refereevision.com/Signals/TCFoul_sig.png" },
    { label: "1 FREE THROW", sublabel: "Hold up 1 finger", image: "https://www.refereevision.com/Signals/1FT_sig.png" },
    { label: "2 FREE THROWS", sublabel: "Hold up 2 fingers", image: "https://www.refereevision.com/Signals/2FT_sig.png" },
    { label: "3 FREE THROWS", sublabel: "Hold up 3 fingers", image: "https://www.refereevision.com/Signals/3FT_sig.png" },
  ];

  const freeThrowsActive = [
    { label: "1 FREE THROW", sublabel: "1 finger horizontal", image: "https://www.refereevision.com/Signals/1FT_AR_sig.png" },
    { label: "2 FREE THROWS", sublabel: "2 fingers horizontal", image: "https://www.refereevision.com/Signals/2FT_AR_sig.png" },
    { label: "3 FREE THROWS", sublabel: "3 fingers horizontal", image: "https://www.refereevision.com/Signals/3FT_AR_sig.png" },
  ];

  const freeThrowsPassive = [
    { label: "1 FREE THROW", sublabel: "Index finger", image: "https://www.refereevision.com/Signals/1FT_PR_sig.png" },
    { label: "2 FREE THROWS", sublabel: "Fingers together on both hands", image: "https://www.refereevision.com/Signals/2FT_PR_sig.png" },
    { label: "3 FREE THROWS", sublabel: "3 fingers extended on both hands", image: "https://www.refereevision.com/Signals/3FT_PR_sig.png" },
  ];

  return (
    <div>
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}
      <SectionBadge label="SIGNALS" />

      {/* DEMO */}
      <SignalsSectionBadge label="DEMO" />
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
        <SignalsDemoCard
          title="FIBA SIGNALS"
          thumbnail="https://img.youtube.com/vi/k1yNcWsvu84/0.jpg"
          onClick={() => setActiveVideo("https://www.youtube.com/embed/k1yNcWsvu84?autoplay=1")}
        />
        <SignalsDemoCard
          title="REFEREE HAND SIGNALS"
          thumbnail="https://img.youtube.com/vi/CcIVSGmO_24/0.jpg"
          onClick={() => setActiveVideo("https://www.youtube.com/embed/CcIVSGmO_24?autoplay=1")}
        />
      </div>

      {/* GAME CLOCK SIGNALS */}
      <SignalsSectionBadge label="GAME CLOCK SIGNALS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {gameClockSignals.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 1}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 1}.png`)}
          />
        ))}
      </div>

      {/* SCORING */}
      <SignalsSectionBadge label="SCORING" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {scoringSignals.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 4}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 4}.png`)}
          />
        ))}
      </div>

      {/* SUBSTITUTION AND TIME-OUT */}
      <SignalsSectionBadge label="SUBSTITUTION AND TIME-OUT" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {subTimeoutSignals.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 7}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 7}.png`)}
          />
        ))}
      </div>

      {/* INFORMATIVE */}
      <SignalsSectionBadge label="INFORMATIVE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", maxWidth: 800, margin: "0 auto" }}>
        {informativeSignals.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 11}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 11}.png`)}
          />
        ))}
      </div>

      {/* VIOLATIONS */}
      <SignalsSectionBadge label="VIOLATIONS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", maxWidth: 800, margin: "0 auto" }}>
        {violationSignals.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 19}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 19}.png`)}
          />
        ))}
      </div>

      {/* NUMBER OF PLAYERS */}
      <SignalsSectionBadge label="NUMBER OF PLAYERS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", maxWidth: 800, margin: "0 auto" }}>
        {playerNumberSignals.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 29}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 29}.png`)}
          />
        ))}
      </div>

      {/* TYPES OF FOULS */}
      <SignalsSectionBadge label="TYPES OF FOULS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", maxWidth: 800, margin: "0 auto" }}>
        {typesOfFouls.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 38}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 38}.png`)}
          />
        ))}
      </div>

      {/* SPECIAL FOULS */}
      <SignalsSectionBadge label="SPECIAL FOULS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {specialFouls.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 53}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 53}.png`)}
          />
        ))}
      </div>

      {/* FOUL PENALTY ADMINISTRATION - REPORTING TO TABLE */}
      <SignalsSectionBadge label="FOUL PENALTY ADMINISTRATION - REPORTING TO TABLE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {reportingToTable.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 59}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 59}.png`)}
          />
        ))}
      </div>

      {/* ADMINISTERING FREE THROWS - ACTIVE REFEREE (LEAD) */}
      <SignalsSectionBadge label="ADMINISTERING FREE THROWS - ACTIVE REFEREE (LEAD)" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {freeThrowsActive.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 64}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 64}.png`)}
          />
        ))}
      </div>

      {/* ADMINISTERING FREE THROWS - PASSIVE REFEREE (TRAIL IN 2PO & CENTRE IN 3PO) */}
      <SignalsSectionBadge label="ADMINISTERING FREE THROWS - PASSIVE REFEREE (TRAIL IN 2PO & CENTRE IN 3PO)" />
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", paddingBottom: 48 }}>
        {freeThrowsPassive.map((item, i) => (
          <SignalsCard
            key={i}
            {...item}
            index={i + 67}
            onClick={() => setActiveVideo(item.image || `PLACEHOLDER_signal_${i + 67}.png`)}
          />
        ))}
      </div>
    </div>
  );
}
