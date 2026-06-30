import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
const preGameTiming = "https://www.refereevision.com/tbloffl35.png";
const arrivalDoc = "https://www.refereevision.com/common_arrival.jpg";
const arrivalPhotoImg = "https://www.refereevision.com/tbloffl1.png";
const arrivalPhotoLink = "https://library.fibairef.basketball/doc/MU5BSis1ZmNLZHk1alI4dVc5ZG14dz09?autoplay=1";
const preGameDutiesDoc = "https://www.refereevision.com/common_before.jpg";
const preGameDutiesPhoto1Img = "https://www.refereevision.com/tbloffl2.png";
const preGameDutiesPhoto1 = "https://library.fibairef.basketball/doc/OWFXUHZYVmp1SFJYelU2KzRnZStBQT09?autoplay=1";
const preGameDutiesPhoto2Img = "https://www.refereevision.com/tbloffl3.png";
const preGameDutiesPhoto2 = "https://library.fibairef.basketball/doc/VkZudm1VM1ZaWWZiaEluWC9TVHlPdz09?autoplay=1";
const preGameDutiesPhoto3Img = "https://www.refereevision.com/tbloffl4.png";
const preGameDutiesPhoto3 = "https://library.fibairef.basketball/doc/aUMwdkFwRFk0WW5DSVVveFdKOGlKZz09?autoplay=1";
const dutiesDuringGameDoc = "https://www.refereevision.com/common_during.jpg";
const dutiesDuringGamePhotoImg = "https://www.refereevision.com/tbloffl5.png";
const dutiesDuringGamePhoto = "https://library.fibairef.basketball/doc/TFVTOXcxYklvWEdMSU42SldpVUpSQT09?autoplay=1";
const postGameDutiesDoc = "https://www.refereevision.com/common_after.jpg";

// ─── Brand tokens (same as Books/Referees) ────────────────────────────────────
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
  | "TABLE OFFICIALS"
  | "3X3"
  | "TRAVELLING"
  | "CYLINDER PRINCIPLE"
  | "CONTACT"
  | "ACT OF SHOOTING & GOAL: WHEN MADE AND ITS VALUE"
  | "TIME-OUT & SUBSTITUTION"
  | "ALTERNATING POSSESSION"
  | "DRIBBLING"
  | "SCREENING"
  | "UNSPORTSMANLIKE FOUL"
  | "NO-CHARGE SEMICIRCLE"
  | "CHARGE & BLOCK"
  | "BALL RETURNED TO BACKCOURT"
  | "GOALTENDING & INTERFERENCE"
  | "3, 5, 8 & 24 SECONDS"
  | "TECHNICAL FOUL"
  | "FAKING A FOUL"
  | "DISQUALIFYING FOUL & FIGHTHING"
  | "THROW-IN"
  | "GAME CONTROL & MANAGEMENT"
  | "OTHERS";

const TABS: Tab[] = [
  "TABLE OFFICIALS",
  "3X3",
  "TRAVELLING",
  "CYLINDER PRINCIPLE",
  "CONTACT",
  "ACT OF SHOOTING & GOAL: WHEN MADE AND ITS VALUE",
  "TIME-OUT & SUBSTITUTION",
  "ALTERNATING POSSESSION",
  "DRIBBLING",
  "SCREENING",
  "UNSPORTSMANLIKE FOUL",
  "NO-CHARGE SEMICIRCLE",
  "CHARGE & BLOCK",
  "BALL RETURNED TO BACKCOURT",
  "GOALTENDING & INTERFERENCE",
  "3, 5, 8 & 24 SECONDS",
  "TECHNICAL FOUL",
  "FAKING A FOUL",
  "DISQUALIFYING FOUL & FIGHTHING",
  "THROW-IN",
  "GAME CONTROL & MANAGEMENT",
  "OTHERS",
];

type TableOfficialsSubTab =
  | "COMMON DUTIES"
  | "SCORER"
  | "ASSISTANT SCORER"
  | "TIMER"
  | "SHOT CLOCK OPERATOR"
  | "COMMUNICATION PROTOCOLS";

const TABLE_OFFICIALS_SUBTABS: TableOfficialsSubTab[] = [
  "COMMON DUTIES",
  "SCORER",
  "ASSISTANT SCORER",
  "TIMER",
  "SHOT CLOCK OPERATOR",
  "COMMUNICATION PROTOCOLS",
];

// ─── YouTube video data for SCORER tab ───────────────────────────────────────
const SCORER_RUNNING_SCORE_VIDEOS = [
  "https://youtu.be/IA3xtlSfb-g",
  "https://youtu.be/0abCxzDsoxY",
  "https://youtu.be/6_ZfrVAa8q0",
  "https://youtu.be/bYojWYt8rkc",
  "https://youtu.be/1waAdTN7pDs",
];

const SCORER_HOW_TO_RECORD_VIDEOS = [
  "https://youtu.be/U-eZv3iDTnQ",
  "https://youtu.be/IA3xtlSfb-g",
  "https://youtu.be/0abCxzDsoxY",
  "https://youtu.be/6_ZfrVAa8q0",
  "https://youtu.be/bYojWYt8rkc",
];

const SCORER_ALT_POSS_VIDEOS = [
  "https://youtu.be/1waAdTN7pDs",
  "https://youtu.be/U-eZv3iDTnQ",
  "https://youtu.be/IA3xtlSfb-g",
  "https://youtu.be/0abCxzDsoxY",
  "https://youtu.be/6_ZfrVAa8q0",
  "https://youtu.be/bYojWYt8rkc",
  "https://youtu.be/1waAdTN7pDs",
  "https://youtu.be/U-eZv3iDTnQ",
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

// ─── Shared hook: hover state ─────────────────────────────────────────────────
function useHover() {
  const [on, set] = useState(false);
  return { on, onMouseEnter: () => set(true), onMouseLeave: () => set(false) };
}

// ─── YouTube helpers ──────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([\w-]+)/);
  if (longMatch) return longMatch[1];
  return null;
}

function getYouTubeEmbedUrl(url: string): string {
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  const longMatch = url.match(/[?&]v=([\w-]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1`;
  return url;
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({ url, title, onClose }: { url: string; title?: string; onClose: () => void }) {
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) || url.startsWith("data:image");
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

      {isImage ? (
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
            alt={title || "Document"}
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
            {url.endsWith(".mp4") || url.includes(".mp4?") ? (
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

// ─── Video Thumb ──────────────────────────────────────────────────────────────
const THUMB_SHADES = ["#1A2416", "#16201A", "#1E1A16", "#161E20", "#1A161E", "#1E1E16"];

function VideoThumb({ index, link, onPlay, thumbnail: customThumbnail }: { index: number; link: string; onPlay: () => void; thumbnail?: string }) {
  const h = useHover();
  const ytId = getYouTubeId(link);
  const thumbnail = customThumbnail ?? (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onPlay}
      style={{
        width: 90,
        aspectRatio: "16 / 9",
        background: THUMB_SHADES[index % THUMB_SHADES.length],
        border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color 0.15s, filter 0.15s",
        filter: h.on ? "brightness(1.2)" : "brightness(1)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
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
            transition: "transform 0.3s ease",
            transform: h.on ? "scale(1.05)" : "scale(1)",
          }}
        />
      )}
      <div
        style={{
          width: 24,
          height: 24,
          background: h.on ? T.orange : "rgba(232,101,26,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <svg width="8" height="10" viewBox="0 0 10 12" fill="none">
          <polygon points="0,0 10,6 0,12" fill="white" />
        </svg>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
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
              VIDEOS
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
      <div style={{ padding: "40px 28px 16px", borderBottom: `1px solid ${T.border}`, marginBottom: 0 }}>
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
          VIDEOS
        </span>
      </div>
      <div style={{ paddingTop: 0 }}>
        {TABS.map((tab) => (
          <SidebarItem key={tab} tab={tab} active={tab === active} onSelect={onSelect} />
        ))}
      </div>
    </aside>
  );
}

function SidebarItem({ tab, active, onSelect }: { tab: Tab; active: boolean; onSelect: (t: Tab) => void }) {
  const h = useHover();
  let bg = "transparent";
  let color = T.inactive;
  let borderLeft = "4px solid transparent";
  if (active) { bg = T.orange; color = T.white; borderLeft = `4px solid ${T.white}`; }
  else if (h.on) { bg = T.hoverBg; color = T.white; borderLeft = `4px solid ${T.orange}`; }

  return (
    <button
      onClick={() => onSelect(tab)}
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        display: "block", width: "100%", textAlign: "left",
        background: bg, color, fontFamily: BARLOW, fontWeight: 600,
        fontSize: 16, letterSpacing: "1.5px", textTransform: "uppercase",
        padding: "14px 28px", border: "none", borderLeft, borderRadius: 0,
        cursor: "pointer", transition: "background 0.12s, color 0.12s, border-left-color 0.12s",
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
          background: T.orange, color: "var(--off-white)", fontFamily: BARLOW,
          fontWeight: 800, fontSize: 22, letterSpacing: "3px",
          textTransform: "uppercase", padding: "10px 40px", borderRadius: 0,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Sub-section badge (outline style) ───────────────────────────────────────
function SubSectionBadge({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: "transparent",
          border: `2px solid ${T.orange}`,
          borderRadius: 30,
          padding: "8px 40px",
          margin: "32px 0 24px",
        }}
      >
        <span
          style={{
            fontFamily: BARLOW, fontWeight: 800, fontSize: 18,
            color: T.orange, letterSpacing: "2px", textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Two-column sub-badge layout ─────────────────────────────────────────────
function TwoColBadges({ left, right }: { left: string; right: string }) {
  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
      {[left, right].map((label) => (
        <div
          key={label}
          style={{
            background: "transparent",
            border: `2px solid ${T.orange}`,
            borderRadius: 30,
            padding: "8px 32px",
            flex: "1 1 200px",
            textAlign: "center",
          }}
        >
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Three-column sub-badge layout ───────────────────────────────────────────
function ThreeColBadges({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
      {items.map((label) => (
        <div
          key={label}
          style={{
            background: "transparent",
            border: `2px solid ${T.orange}`,
            borderRadius: 30,
            padding: "8px 24px",
            flex: "1 1 140px",
            textAlign: "center",
          }}
        >
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Image thumbnail ──────────────────────────────────────────────────────────
function ContentImage({ src, alt, openUrl }: { src: string; alt: string; openUrl?: string }) {
  const h = useHover();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        onClick={() => setIsOpen(true)}
        style={{
          border: `2px solid ${h.on ? T.orange : T.border}`,
          overflow: "hidden",
          transition: "border-color 0.2s ease, transform 0.2s ease",
          transform: h.on ? "scale(1.03)" : "scale(1)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ display: "block", height: 130, width: "auto", maxWidth: 200, objectFit: "cover" }}
        />
      </div>
      {isOpen && <VideoModal url={openUrl || src} title={alt} onClose={() => setIsOpen(false)} />}
    </>
  );
}

// ─── Image row ────────────────────────────────────────────────────────────────
function ImageRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
      {children}
    </div>
  );
}

// ─── Video row ────────────────────────────────────────────────────────────────
function VideoRow({ links, onPlay }: { links: string[]; onPlay: (url: string) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
      {links.map((link, i) => (
        <VideoThumb key={i} index={i} link={link} onPlay={() => onPlay(link)} />
      ))}
    </div>
  );
}

// ─── Common Duties Content ────────────────────────────────────────────────────
function CommonDutiesContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SubSectionBadge label="PRE-GAME TIMING" />
      <ImageRow><ContentImage src={preGameTiming} alt="Pre-Game Timing" /></ImageRow>

      <SubSectionBadge label="ARRIVAL AT THE VENUE" />
      <ImageRow>
        <ContentImage src={arrivalDoc} alt="Arrival Document" />
        <ContentImage src={arrivalPhotoImg} openUrl={arrivalPhotoLink} alt="Arrival Photo" />
      </ImageRow>

      <SubSectionBadge label="PRE-GAME DUTIES" />
      <ImageRow>
        <ContentImage src={preGameDutiesDoc} alt="Pre-Game Duties Document" />
        <ContentImage src={preGameDutiesPhoto1Img} openUrl={preGameDutiesPhoto1} alt="Pre-Game Duties Photo 1" />
        <ContentImage src={preGameDutiesPhoto2Img} openUrl={preGameDutiesPhoto2} alt="Pre-Game Duties Photo 2" />
        <ContentImage src={preGameDutiesPhoto3Img} openUrl={preGameDutiesPhoto3} alt="Pre-Game Duties Photo 3" />
      </ImageRow>

      <SubSectionBadge label="DUTIES DURING THE GAME" />
      <ImageRow>
        <ContentImage src={dutiesDuringGameDoc} alt="Duties During Game Document" />
        <ContentImage src={dutiesDuringGamePhotoImg} openUrl={dutiesDuringGamePhoto} alt="Duties During Game Photo" />
      </ImageRow>

      <SubSectionBadge label="POST-GAME DUTIES" />
      <ImageRow>
        <ContentImage src={postGameDutiesDoc} alt="Post-Game Duties Document" />
      </ImageRow>
    </div>
  );
}

// ─── Scorer Content ───────────────────────────────────────────────────────────
function ScorerContent() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}

      {/* DUTIES + MECHANICS & PERFORMANCE STANDARDS side by side */}
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
        {/* DUTIES column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>DUTIES</span>
          </div>
          <ContentImage src={preGameDutiesDoc} alt="Scorer Duties" />
        </div>
        {/* MECHANICS & PERFORMANCE STANDARDS column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>MECHANICS & PERFORMANCE STANDARDS</span>
          </div>
          <ContentImage src={preGameDutiesDoc} alt="Mechanics & Performance Standards" />
        </div>
      </div>

      {/* BEFORE / DURING / AT END OF GAME */}
      <ThreeColBadges items={["BEFORE THE GAME", "DURING THE GAME", "AT THE END OF THE GAME"]} />
      <div style={{ display: "flex", justifyContent: "space-around", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
        {/* BEFORE THE GAME */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <ContentImage src={arrivalDoc} alt="Before the Game" />
        </div>
        {/* DURING THE GAME */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <ContentImage src={preGameDutiesDoc} alt="During the Game 1" />
          <ContentImage src={dutiesDuringGameDoc} alt="During the Game 2" />
          <ContentImage src={dutiesDuringGamePhoto} alt="During the Game 3" />
        </div>
        {/* AT THE END OF THE GAME */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <ContentImage src={postGameDutiesDoc} alt="At the End of the Game" />
        </div>
      </div>

      {/* POSSIBLE MISTAKES AND SOLUTIONS */}
      <SubSectionBadge label="POSSIBLE MISTAKES AND SOLUTIONS" />
      <ImageRow>
        <ContentImage src={preGameDutiesDoc} alt="Possible Mistakes 1" />
        <ContentImage src={arrivalDoc} alt="Possible Mistakes 2" />
        <ContentImage src={dutiesDuringGameDoc} alt="Possible Mistakes 3" />
      </ImageRow>

      {/* EDUCATIONAL VIDEOS - RUNNING SCORE */}
      <SubSectionBadge label="EDUCATIONAL VIDEOS - RUNNING SCORE" />
      <VideoRow links={SCORER_RUNNING_SCORE_VIDEOS} onPlay={(url) => setActiveVideo(url)} />

      {/* GAME LOST BY FORFEIT + GAME LOST BY DEFAULT */}
      <TwoColBadges left="GAME LOST BY FORFEIT" right="GAME LOST BY DEFAULT" />
      <div style={{ display: "flex", justifyContent: "space-around", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
        <ContentImage src={arrivalDoc} alt="Game Lost by Forfeit" />
        <ContentImage src={postGameDutiesDoc} alt="Game Lost by Default" />
      </div>

      {/* HOW TO RECORD THE DIFFERENT FOULS */}
      <SubSectionBadge label="HOW TO RECORD THE DIFFERENT FOULS" />
      {/* Row 1: CLASSIFICATION, PLAYER FOULS, SUBSTITUTION & EXCLUDED PLAYER FOULS */}
      <ThreeColBadges items={["CLASSIFICATION", "PLAYER FOULS", "SUBSTITUTION & EXCLUDED PLAYER FOULS"]} />
      <div style={{ display: "flex", justifyContent: "space-around", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
        <ContentImage src={preGameDutiesDoc} alt="Classification" />
        <ContentImage src={dutiesDuringGameDoc} alt="Player Fouls" />
        <ContentImage src={arrivalDoc} alt="Substitution & Excluded Player Fouls" />
      </div>

      {/* Row 2: HEAD COACH..., PLAYER & HEAD COACH FOULS, DISQUALIFYING FOULS - FIGHTS */}
      <ThreeColBadges items={["HEAD COACH, FIRST ASSISTANT COACH & ACCOMPANYING DELEGATION MEMBER FOULS", "PLAYER & HEAD COACH FOULS", "DISQUALIFYING FOULS - FIGHTS"]} />
      <div style={{ display: "flex", justifyContent: "space-around", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
        <ContentImage src={arrivalDoc} alt="Head Coach Fouls" />
        <div style={{ display: "flex", gap: 8 }}>
          <ContentImage src={preGameDutiesDoc} alt="Player & Head Coach Fouls 1" />
          <ContentImage src={dutiesDuringGameDoc} alt="Player & Head Coach Fouls 2" />
        </div>
        <ContentImage src={postGameDutiesDoc} alt="Disqualifying Fouls - Fights" />
      </div>

      {/* EDUCATIONAL VIDEOS */}
      <SubSectionBadge label="EDUCATIONAL VIDEOS" />
      <VideoRow links={SCORER_HOW_TO_RECORD_VIDEOS} onPlay={(url) => setActiveVideo(url)} />

      {/* EXAMPLE SCORESHEETS */}
      <SubSectionBadge label="EXAMPLE SCORESHEETS" />
      <ImageRow>
        {[arrivalDoc, preGameDutiesDoc, dutiesDuringGameDoc, postGameDutiesDoc, arrivalDoc, preGameDutiesDoc, dutiesDuringGameDoc].map((img, i) => (
          <ContentImage key={i} src={img} alt={`Example Scoresheet ${i + 1}`} />
        ))}
      </ImageRow>

      {/* ALTERNATING POSSESSION ARROW */}
      <SubSectionBadge label="ALTERNATING POSSESSION ARROW" />
      <TwoColBadges left="RULE" right="OPERATION" />
      <div style={{ display: "flex", justifyContent: "space-around", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
        <ContentImage src={arrivalDoc} alt="Alternating Possession Rule" />
        <ContentImage src={preGameDutiesDoc} alt="Alternating Possession Operation" />
      </div>

      <SubSectionBadge label="EDUCATIONAL VIDEOS" />
      <VideoRow links={SCORER_ALT_POSS_VIDEOS} onPlay={(url) => setActiveVideo(url)} />
    </div>
  );
}

// ─── Shared: doc placeholder card ───────────────────────────────────────────
function DocCard({ label, cols = 1 }: { label?: string; cols?: number }) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        width: cols === 1 ? 110 : 80,
        aspectRatio: "3 / 4",
        background: h.on ? "#222" : T.charcoal,
        border: `2px solid ${h.on ? T.orange : T.border}`,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        transition: "border-color 0.2s, transform 0.2s",
        transform: h.on ? "scale(1.04)" : "scale(1)",
        cursor: "default",
        flexShrink: 0,
        padding: "8px 4px",
        boxSizing: "border-box",
      }}
    >
      {/* Doc lines */}
      <div style={{ width: "60%", display: "flex", flexDirection: "column", gap: 4 }}>
        {[1, 0.7, 0.85, 0.6, 0.75, 0.5].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w * 100}%`, background: h.on ? T.orange : "#3A3A3A", borderRadius: 1, transition: "background 0.2s" }} />
        ))}
      </div>
      {label && (
        <span style={{ fontFamily: BARLOW, fontSize: 8, color: T.grey, letterSpacing: "0.5px", textTransform: "uppercase", textAlign: "center", lineHeight: 1.2, marginTop: 4 }}>
          {label}
        </span>
      )}
    </div>
  );
}

// Placeholder video card (no actual YouTube)
function VideoCard({ index, activeColor = T.orange }: { index: number; activeColor?: string }) {
  const h = useHover();
  const shades = ["#1A2416", "#16201A", "#1E1A16", "#161E20", "#1A161E", "#1E1E16"];
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        width: 90,
        aspectRatio: "16 / 9",
        background: shades[index % shades.length],
        border: `1px solid ${h.on ? activeColor : T.border}`,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color 0.15s",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          background: activeColor,
          opacity: h.on ? 1 : 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, opacity 0.15s",
          zIndex: 2,
        }}
      >
        <svg width="8" height="10" viewBox="0 0 10 12" fill="none">
          <polygon points="0,0 10,6 0,12" fill="white" />
        </svg>
      </div>
    </div>
  );
}

// Clock placeholder
function ClockCard({ onClick, label = "00:00" }: { onClick?: () => void; label?: string }) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onClick}
      style={{
        width: 100,
        aspectRatio: "4 / 3",
        background: "#0A0A0A",
        border: `2px solid ${h.on && onClick ? T.orange : "#2A2A2A"}`,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 0.2s, transform 0.2s",
        transform: h.on && onClick ? "scale(1.05)" : "scale(1)",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <span style={{ fontFamily: "'Courier New', monospace", fontSize: 22, fontWeight: 700, color: h.on && onClick ? T.orange : "#CC3399", letterSpacing: "2px", textShadow: h.on && onClick ? `0 0 8px ${T.orange}` : "0 0 8px #CC3399" }}>
        {label}
      </span>
    </div>
  );
}

// Sub-section with label + doc cards row
function DocSection({
  title,
  count = 2,
  images = [],
}: {
  title: string;
  count?: number;
  images?: { src: string; alt: string; openUrl?: string }[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 28px", marginBottom: 20 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
          {title}
        </span>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
        {Array.from({ length: count }).map((_, i) => {
          if (images[i]) {
            return (
              <ContentImage
                key={i}
                src={images[i].src}
                alt={images[i].alt}
                openUrl={images[i].openUrl}
              />
            );
          }
          return <DocCard key={i} />;
        })}
      </div>
    </div>
  );
}

// Three-column rule/procedure/summary
function RuleProcedureSummary({
  videoCount = 0,
  ruleImages = [],
  procedureImages = [],
  summaryImages = [],
  videos = [],
}: {
  videoCount?: number;
  ruleImages?: { src: string; alt: string }[];
  procedureImages?: { src: string; alt: string }[];
  summaryImages?: { src: string; alt: string }[];
  videos?: { link: string; thumbnail?: string }[];
}) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const sections: { label: string; images: { src: string; alt: string }[]; count: number }[] = [
    { label: "RULE", images: ruleImages, count: 1 },
    { label: "PROCEDURE", images: procedureImages, count: 1 },
    { label: "SUMMARY", images: summaryImages, count: 1 },
  ];
  const totalVideos = videos.length > 0 ? videos.length : videoCount;
  return (
    <div>
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}
      <div style={{ display: "flex", gap: 12, justifyContent: "space-around", flexWrap: "wrap", marginBottom: 24 }}>
        {sections.map(({ label, images, count }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, flex: "1 1 120px" }}>
            <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "6px 20px" }}>
              <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 13, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>{label}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {Array.from({ length: count }).map((_, i) => {
                if (images[i]) {
                  return <ContentImage key={i} src={images[i].src} alt={images[i].alt} />;
                }
                return <DocCard key={i} />;
              })}
            </div>
          </div>
        ))}
      </div>
      {totalVideos > 0 && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 28px", margin: "24px 0 16px" }}>
              <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>EDUCATIONAL VIDEOS</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {Array.from({ length: totalVideos }).map((_, i) => {
              const v = videos[i];
              if (v) {
                return (
                  <VideoThumb
                    key={i}
                    index={i}
                    link={v.link}
                    thumbnail={v.thumbnail}
                    onPlay={() => setActiveVideo(v.link)}
                  />
                );
              }
              return <VideoCard key={i} index={i} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── ASSISTANT SCORER Content ─────────────────────────────────────────────────
function AssistantScorerContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <DocSection
        title="DUTIES"
        count={2}
        images={[
          { src: "https://www.refereevision.com/as_duties.jpg", alt: "Assistant Scorer Duties" },
          { src: "https://www.refereevision.com/as_otherduties.jpg", alt: "Assistant Scorer Other Duties" }
        ]}
      />
      <DocSection
        title="BEFORE THE GAME"
        count={1}
        images={[
          { src: "https://www.refereevision.com/as_before.jpg", alt: "Assistant Scorer Before The Game" }
        ]}
      />
      <DocSection
        title="DURING THE GAME"
        count={1}
        images={[
          { src: "https://www.refereevision.com/as_during.jpg", alt: "Assistant Scorer During The Game" }
        ]}
      />
    </div>
  );
}

// ─── TIMER Content ────────────────────────────────────────────────────────────
function TimerContent() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const clockLinks = [
    "https://library.fibairef.basketball/cdn/TOM500_EN?autoplay=1",
    "https://library.fibairef.basketball/cdn/TOM501_EN?autoplay=1",
    "https://library.fibairef.basketball/cdn/TOM502_EN?autoplay=1",
    "https://library.fibairef.basketball/cdn/TOM408_EN?autoplay=1",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}

      <div style={{ display: "flex", gap: 36, justifyContent: "space-around", flexWrap: "wrap" }}>
        <DocSection
          title="DUTIES"
          count={3}
          images={[
            { src: "https://www.refereevision.com/timer_duties.png", alt: "Timer Duties" },
            { src: "https://www.refereevision.com/to_help.jpg", alt: "Table Officials Help" },
            { src: "https://www.refereevision.com/timer_otherduties.png", alt: "Timer Other Duties" }
          ]}
        />
        <DocSection
          title="BEFORE THE GAME"
          count={1}
          images={[
            { src: "https://www.refereevision.com/timer_before.png", alt: "Timer Before the Game" }
          ]}
        />
        <DocSection
          title="DURING THE GAME"
          count={1}
          images={[
            { src: "https://www.refereevision.com/timer_during.jpg", alt: "Timer During the Game" }
          ]}
        />
      </div>

      {/* Starting & Stopping the Game Clock */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
            STARTING &amp; STOPPING THE GAME CLOCK
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {clockLinks.map((link, i) => (
            <ClockCard
              key={i}
              label={`00:0${i + 1}`}
              onClick={() => setActiveVideo(link)}
            />
          ))}
        </div>
      </div>

      {/* Time-Out Request */}
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>TIME-OUT REQUEST</span>
          </div>
        </div>
        <RuleProcedureSummary
          ruleImages={[{ src: "https://www.refereevision.com/to_rule.jpg", alt: "Time-Out Request Rule" }]}
          procedureImages={[
            { src: "https://www.refereevision.com/to_procedure2.jpg", alt: "Time-Out Request Procedure 1" },
            { src: "https://www.refereevision.com/to_procedure1.jpg", alt: "Time-Out Request Procedure 2" },
          ]}
          summaryImages={[{ src: "https://www.refereevision.com/to_summary.jpg", alt: "Time-Out Request Summary" }]}
          videos={[
            { link: "https://library.fibairef.basketball/cdn/TOM303_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl12.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM304_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl12.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM301_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl13.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM302_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl13.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM300_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl13.png" },
          ]}
        />
      </div>

      {/* Substitution Request */}
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>SUBSTITUTION REQUEST</span>
          </div>
        </div>
        <RuleProcedureSummary
          ruleImages={[{ src: "https://www.refereevision.com/sub_rule.jpg", alt: "Substitution Request Rule" }]}
          procedureImages={[{ src: "https://www.refereevision.com/sub_procedure.jpg", alt: "Substitution Request Procedure" }]}
          summaryImages={[{ src: "https://www.refereevision.com/sub_summary.jpg", alt: "Substitution Request Summary" }]}
        />
      </div>
    </div>
  );
}

// ─── SHOT CLOCK OPERATOR Content ──────────────────────────────────────────────
function ShotClockOperatorContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <DocSection
        title="DUTIES"
        count={2}
        images={[
          { src: "https://www.refereevision.com/sc_duties.jpg", alt: "Shot Clock Operator Duties" },
          { src: "https://www.refereevision.com/sc_otherduties.jpg", alt: "Shot Clock Operator Other Duties" },
        ]}
      />
      <DocSection
        title="BEFORE THE GAME"
        count={1}
        images={[
          { src: "https://www.refereevision.com/sc_rule.jpg", alt: "Shot Clock Operator Before The Game" },
        ]}
      />
      <DocSection title="DURING THE GAME" count={2} />

      {/* Shot Clock Reset */}
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>SHOT CLOCK RESET</span>
          </div>
        </div>
        <RuleProcedureSummary videoCount={3} />
      </div>
    </div>
  );
}

// ─── COMMUNICATION PROTOCOLS Content ─────────────────────────────────────────
function CommunicationProtocolsContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <DocSection title="GENERAL PROTOCOLS" count={2} />

      {["REFEREE ↔ SCORER", "REFEREE ↔ TIMER", "REFEREE ↔ SHOT CLOCK"].map((label) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 28px" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>{label}</span>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {Array.from({ length: 2 }).map((_, i) => <DocCard key={i} />)}
          </div>
        </div>
      ))}

      {/* Educational Videos */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 28px" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>EDUCATIONAL VIDEOS</span>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {Array.from({ length: 4 }).map((_, i) => <VideoCard key={i} index={i} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder sub-tab content ──────────────────────────────────────────────
function PlaceholderSubContent({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 96 }}>
      <span style={{ fontFamily: DM, fontSize: 16, color: T.placeholderText }}>
        {label} — Content coming soon
      </span>
    </div>
  );
}

// ─── Table Officials Content ──────────────────────────────────────────────────
function TableOfficialsContent({ isMobile }: { isMobile: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<TableOfficialsSubTab>("COMMON DUTIES");

  return (
    <div>
      <SectionBadge label="TABLE OFFICIALS" />

      {/* Sub-tabs bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          background: T.charcoal,
          border: `1px solid ${T.border}`,
          marginTop: 28,
          marginBottom: 36,
        }}
      >
        {TABLE_OFFICIALS_SUBTABS.map((subTab) => {
          const isActive = activeSubTab === subTab;
          return (
            <button
              key={subTab}
              onClick={() => setActiveSubTab(subTab)}
              style={{
                flex: "1 1 auto",
                minWidth: isMobile ? 80 : 110,
                background: isActive ? T.orange : "transparent",
                color: isActive ? T.white : T.inactive,
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: isMobile ? 12 : 14,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: isMobile ? "10px 8px" : "12px 16px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
                textAlign: "center",
              }}
            >
              {subTab}
            </button>
          );
        })}
      </div>

      {/* Sub-tab content */}
      {activeSubTab === "COMMON DUTIES" ? (
        <CommonDutiesContent />
      ) : activeSubTab === "SCORER" ? (
        <ScorerContent />
      ) : activeSubTab === "ASSISTANT SCORER" ? (
        <AssistantScorerContent />
      ) : activeSubTab === "TIMER" ? (
        <TimerContent />
      ) : activeSubTab === "SHOT CLOCK OPERATOR" ? (
        <ShotClockOperatorContent />
      ) : activeSubTab === "COMMUNICATION PROTOCOLS" ? (
        <CommunicationProtocolsContent />
      ) : (
        <PlaceholderSubContent label={activeSubTab} />
      )}
    </div>
  );
}

// ─── Cylinder Principle Content ──────────────────────────────────────────────
function MiniBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        border: `2px solid ${T.orange}`,
        borderRadius: 6,
        padding: "6px 20px",
        display: "inline-block",
        textAlign: "center",
        marginBottom: 16,
      }}
    >
      <span
        style={{
          fontFamily: BARLOW,
          fontWeight: 800,
          fontSize: 14,
          color: T.orange,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function CylinderSectionHeader({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, marginTop: 32 }}>
      <div
        style={{
          border: `2px solid ${T.orange}`,
          borderRadius: 6,
          padding: "8px 48px",
          background: "transparent",
        }}
      >
        <span
          style={{
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 18,
            color: T.orange,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function CylinderPrincipleContent({
  isMobile,
  isTablet,
}: {
  isMobile: boolean;
  isTablet: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
      <SectionBadge label="CYLINDER PRINCIPLE" />

      {/* RULE EXPLANATION */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CylinderSectionHeader label="RULE EXPLANATION" />
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <VideoCard index={0} />
          <VideoCard index={1} />
        </div>
      </div>

      {/* SIGNAL, ARTICLE, INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 32 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard />
        </div>
      </div>

      {/* VERTICALITY & CYLINDER */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 32 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: 900,
          margin: "24px auto 0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="VERTICALITY" />
          <div style={{ display: "flex", gap: 10 }}>
            <VideoCard index={0} />
            <VideoCard index={1} />
            <VideoCard index={2} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="CYLINDER" />
          <div style={{ display: "flex", gap: 10 }}>
            <VideoCard index={3} />
            <VideoCard index={4} />
          </div>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : isTablet
                ? "repeat(4, 1fr)"
                : "repeat(8, 1fr)",
            gap: 12,
            justifyContent: "center",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <VideoCard key={i} index={i} />
          ))}
        </div>
      </div>

      {/* ADDITIONAL VIDEOS */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
        <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <VideoCard index={0} />
          <VideoCard index={1} />
          <VideoCard index={2} />
        </div>
      </div>
    </div>
  );
}

// ─── 3X3 Content ─────────────────────────────────────────────────────────────

function ThreeXThreeContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="3X3" />

      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}

      {/* PLAYER NOT IN POSSESSION OF THE BALL */}
      <SubSectionBadge label="PLAYER NOT IN POSSESSION OF THE BALL" />
      <div style={{ display: "flex", justifyContent: "center", margin: "0 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>HOLDING/GRABBING</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/jalyN4bqQ10" thumbnail="https://img.youtube.com/vi/jalyN4bqQ10/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/jalyN4bqQ10")} />
        <VideoThumb index={1} link="https://youtu.be/aWaF8FRA6Gs" thumbnail="https://img.youtube.com/vi/aWaF8FRA6Gs/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/aWaF8FRA6Gs")} />
        <VideoThumb index={2} link="https://youtu.be/JzFObk1Y3KE" thumbnail="https://img.youtube.com/vi/JzFObk1Y3KE/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/JzFObk1Y3KE")} />
        <VideoThumb index={3} link="https://youtu.be/KncrTXTro0o" thumbnail="https://img.youtube.com/vi/KncrTXTro0o/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/KncrTXTro0o")} />
        <VideoThumb index={4} link="https://youtu.be/L5oia_Yrhz4" thumbnail="https://img.youtube.com/vi/L5oia_Yrhz4/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/L5oia_Yrhz4")} />
        <VideoThumb index={5} link="https://youtu.be/QPYJXqfEtnU" thumbnail="https://img.youtube.com/vi/QPYJXqfEtnU/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/QPYJXqfEtnU")} />
        <VideoThumb index={6} link="https://youtu.be/qyyZ6a5cbc8" thumbnail="https://img.youtube.com/vi/qyyZ6a5cbc8/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/qyyZ6a5cbc8")} />
        <VideoThumb index={7} link="https://youtu.be/2enXtW1mjqs" thumbnail="https://img.youtube.com/vi/2enXtW1mjqs/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/2enXtW1mjqs")} />
        <VideoThumb index={8} link="https://youtu.be/1ULaUfGGjg4" thumbnail="https://img.youtube.com/vi/1ULaUfGGjg4/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/1ULaUfGGjg4")} />
        <VideoThumb index={9} link="https://youtu.be/287biihZSIw" thumbnail="https://img.youtube.com/vi/287biihZSIw/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/287biihZSIw")} />
        <VideoThumb index={10} link="https://youtu.be/dKjjSKKRznU" thumbnail="https://img.youtube.com/vi/dKjjSKKRznU/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/dKjjSKKRznU")} />
        <VideoThumb index={11} link="https://youtu.be/u6RALxAn3NU" thumbnail="https://img.youtube.com/vi/u6RALxAn3NU/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/u6RALxAn3NU")} />
      </div>

      {/* PLAYER IN POSSESSION OF THE BALL (NOT IN THE ACT OF SHOOTING) */}
      <SubSectionBadge label="PLAYER IN POSSESSION OF THE BALL (NOT IN THE ACT OF SHOOTING)" />
      <div style={{ display: "flex", justifyContent: "center", margin: "0 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>HOLDING/GRABBING</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/s0hcAeh6ceg" thumbnail="https://img.youtube.com/vi/s0hcAeh6ceg/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/s0hcAeh6ceg")} />
      </div>

      {/* PLAYER IN POSSESSION OF THE BALL (ACT OF SHOOTING) */}
      <SubSectionBadge label="PLAYER IN POSSESSION OF THE BALL (ACT OF SHOOTING)" />
      <div style={{ display: "flex", justifyContent: "center", margin: "0 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>CONTACT ON A LAY-UP ATTEMPT</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/dMKlHQbAxfo" thumbnail="https://img.youtube.com/vi/dMKlHQbAxfo/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/dMKlHQbAxfo")} />
        <VideoThumb index={1} link="https://youtu.be/PrHxLi1vwTo" thumbnail="https://img.youtube.com/vi/PrHxLi1vwTo/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/PrHxLi1vwTo")} />
        <VideoThumb index={2} link="https://youtu.be/AazEFDb8IcM" thumbnail="https://img.youtube.com/vi/AazEFDb8IcM/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/AazEFDb8IcM")} />
        <VideoThumb index={3} link="https://youtu.be/bT6TUCuDTJo" thumbnail="https://img.youtube.com/vi/bT6TUCuDTJo/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/bT6TUCuDTJo")} />
        <VideoThumb index={4} link="https://youtu.be/kKrC2f-1gus" thumbnail="https://img.youtube.com/vi/kKrC2f-1gus/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/kKrC2f-1gus")} />
        <VideoThumb index={5} link="https://youtu.be/JzFGU5TOzfw" thumbnail="https://img.youtube.com/vi/JzFGU5TOzfw/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/JzFGU5TOzfw")} />
        <VideoThumb index={6} link="https://youtu.be/E35zrt-bPes" thumbnail="https://img.youtube.com/vi/E35zrt-bPes/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/E35zrt-bPes")} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>PROTECTION OF THE SHOOTER - LANDING SPACE</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/nLmo-RLoX1w" thumbnail="https://img.youtube.com/vi/nLmo-RLoX1w/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/nLmo-RLoX1w")} />
        <VideoThumb index={1} link="https://youtu.be/SGBov-uz9tM" thumbnail="https://img.youtube.com/vi/SGBov-uz9tM/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/SGBov-uz9tM")} />
        <VideoThumb index={2} link="https://youtu.be/dPn1fMTXskY" thumbnail="https://img.youtube.com/vi/dPn1fMTXskY/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/dPn1fMTXskY")} />
        <VideoThumb index={3} link="https://youtu.be/d3cLf7L4_o8" thumbnail="https://img.youtube.com/vi/d3cLf7L4_o8/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/d3cLf7L4_o8")} />
        <VideoThumb index={4} link="https://youtu.be/XDvBlxetGHs" thumbnail="https://img.youtube.com/vi/XDvBlxetGHs/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/XDvBlxetGHs")} />
        <VideoThumb index={5} link="https://youtu.be/gf9PXdv5t7M" thumbnail="https://img.youtube.com/vi/gf9PXdv5t7M/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/gf9PXdv5t7M")} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>PROTECTION OF THE SHOOTER - CONTACT ON ARM</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/TyIcbEnyc5Y" thumbnail="https://img.youtube.com/vi/TyIcbEnyc5Y/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/TyIcbEnyc5Y")} />
      </div>

      {/* UNSPORTSMANLIKE & DISQUALIFYING FOULS */}
      <SubSectionBadge label="UNSPORTSMANLIKE & DISQUALIFYING FOULS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/Wa6Pof65xzQ" thumbnail="https://img.youtube.com/vi/Wa6Pof65xzQ/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/Wa6Pof65xzQ")} />
        <VideoThumb index={1} link="https://youtu.be/QEN8jLhsUOI" thumbnail="https://img.youtube.com/vi/QEN8jLhsUOI/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/QEN8jLhsUOI")} />
      </div>

      {/* TECHNICAL FOUL */}
      <SubSectionBadge label="TECHNICAL FOUL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/hwaOsnjYKGs" thumbnail="https://img.youtube.com/vi/hwaOsnjYKGs/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/hwaOsnjYKGs")} />
        <VideoThumb index={1} link="https://youtu.be/F2w0A6Q2n9Y" thumbnail="https://img.youtube.com/vi/F2w0A6Q2n9Y/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/F2w0A6Q2n9Y")} />
        {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={29 + i} />)}
      </div>

      {/* SCREENING */}
      <SubSectionBadge label="SCREENING" />
      <div style={{ display: "flex", justifyContent: "center", margin: "0 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>ON-BALL SCREEN: EXTENDING ARMS</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/9MvBTQkq31A" thumbnail="https://img.youtube.com/vi/9MvBTQkq31A/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/9MvBTQkq31A")} />
        <VideoThumb index={1} link="https://youtu.be/qWkYFbZTesw" thumbnail="https://img.youtube.com/vi/qWkYFbZTesw/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/qWkYFbZTesw")} />
        <VideoThumb index={2} link="https://youtu.be/o4zvH-MW-oo" thumbnail="https://img.youtube.com/vi/o4zvH-MW-oo/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/o4zvH-MW-oo")} />
        <VideoThumb index={3} link="https://youtu.be/um3zPSHYKrY" thumbnail="https://img.youtube.com/vi/um3zPSHYKrY/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/um3zPSHYKrY")} />
        <VideoThumb index={4} link="https://youtu.be/JYHFmFJjUK0" thumbnail="https://img.youtube.com/vi/JYHFmFJjUK0/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/JYHFmFJjUK0")} />
        <VideoThumb index={5} link="https://youtu.be/svv8_XqnX3E" thumbnail="https://img.youtube.com/vi/svv8_XqnX3E/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/svv8_XqnX3E")} />
        <VideoThumb index={6} link="https://youtu.be/kPIBpdoPap8" thumbnail="https://img.youtube.com/vi/kPIBpdoPap8/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/kPIBpdoPap8")} />
        <VideoThumb index={7} link="https://youtu.be/qvmo3QRGrac" thumbnail="https://img.youtube.com/vi/qvmo3QRGrac/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/qvmo3QRGrac")} />
        <VideoThumb index={8} link="https://youtu.be/c26bDR0OshY" thumbnail="https://img.youtube.com/vi/c26bDR0OshY/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/c26bDR0OshY")} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>ON-BALL SCREEN: MOVING SCREEN</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/2IhX1PiH2eg" thumbnail="https://img.youtube.com/vi/2IhX1PiH2eg/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/2IhX1PiH2eg")} />
        <VideoThumb index={1} link="https://youtu.be/fx7TzTC04ns" thumbnail="https://img.youtube.com/vi/fx7TzTC04ns/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/fx7TzTC04ns")} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>ON-BALL SCREEN: HOLDING/GRABBING</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/ENRxKYzQ5IQ" thumbnail="https://img.youtube.com/vi/ENRxKYzQ5IQ/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/ENRxKYzQ5IQ")} />
        <VideoThumb index={1} link="https://youtu.be/ENRxKYzQ5IQ" thumbnail="https://img.youtube.com/vi/l87MNHGtWTE/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/ENRxKYzQ5IQ")} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 12px" }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>OFF-BALL SCREEN: PUSH-OFF</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/Inb-dlIuxyQ" thumbnail="https://img.youtube.com/vi/Inb-dlIuxyQ/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/Inb-dlIuxyQ")} />
      </div>

      {/* NO-CLEAR VIOLATION */}
      <SubSectionBadge label="NO-CLEAR VIOLATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/_Pdz2cSQ-zQ" thumbnail="https://img.youtube.com/vi/_Pdz2cSQ-zQ/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/_Pdz2cSQ-zQ")} />
        <VideoThumb index={1} link="https://youtu.be/1QO8WKwLJCM" thumbnail="https://img.youtube.com/vi/1QO8WKwLJCM/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/1QO8WKwLJCM")} />
      </div>

      {/* DELAY OF THE GAME - WARNING/TECHNICAL FOUL */}
      <SubSectionBadge label="DELAY OF THE GAME - WARNING/TECHNICAL FOUL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/Jfqrs05kKTk" thumbnail="https://img.youtube.com/vi/Jfqrs05kKTk/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/Jfqrs05kKTk")} />
      </div>

      {/* STALLING */}
      <SubSectionBadge label="STALLING" />
      <div style={{ display: "flex", justifyContent: "center", margin: "12px 0 20px", padding: "0 16px" }}>
        <span style={{ fontFamily: DM, fontWeight: 700, fontSize: 15, color: T.orange, textAlign: "center", letterSpacing: "0.5px", textTransform: "uppercase" }}>
          AS PER LATEST RULE, STALLING IS 3 SECONDS AND NOT 5 SECONDS AS SHOWN IN THE VIDEOS BELOW.
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <VideoThumb index={0} link="https://youtu.be/pRrwKPLvIFQ" thumbnail="https://img.youtube.com/vi/pRrwKPLvIFQ/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/pRrwKPLvIFQ")} />
        <VideoThumb index={1} link="https://youtu.be/wAZPjwNZOZs" thumbnail="https://img.youtube.com/vi/wAZPjwNZOZs/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/wAZPjwNZOZs")} />
        <VideoThumb index={2} link="https://youtu.be/8xQghJEGnh8" thumbnail="https://img.youtube.com/vi/8xQghJEGnh8/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/8xQghJEGnh8")} />
      </div>
    </div>
  );
}

// ─── TRAVELLING Content ───────────────────────────────────────────────────────

function WatchPlaylistButton({ label = "WATCH PLAYLIST" }: { label?: string }) {
  const h = useHover();
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <button
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        style={{
          background: h.on ? T.orange : "transparent",
          border: `2px solid ${T.orange}`,
          borderRadius: 4,
          padding: "8px 28px",
          cursor: "pointer",
          transition: "background 0.2s",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 13, color: h.on ? T.white : T.orange, letterSpacing: "1.5px", textTransform: "uppercase", transition: "color 0.2s" }}>
          {label}
        </span>
        <span style={{ fontSize: 13 }}>▶</span>
      </button>
    </div>
  );
}

function TravellingContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="TRAVELLING" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {Array.from({ length: 3 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* SIGNAL / ARTICLE / INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 32 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto 36px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard />
        </div>
      </div>

      {/* PLAYER IN PROGRESSION */}
      <SubSectionBadge label="PLAYER IN PROGRESSION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 6 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* STATIONARY PLAYER */}
      <SubSectionBadge label="STATIONARY PLAYER" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {Array.from({ length: 4 }).map((_, i) => <VideoCard key={i} index={4 + i} />)}
      </div>

      {/* AIRBORNE PLAYER + PLAYER ON THE FLOOR */}
      <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="AIRBORNE PLAYER" />
          <VideoCard index={8} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PLAYER ON THE FLOOR" />
          <VideoCard index={9} />
        </div>
      </div>

      {/* HOPPING WITH THE SAME FOOT */}
      <SubSectionBadge label="HOPPING WITH THE SAME FOOT" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 4 }).map((_, i) => <VideoCard key={i} index={10 + i} />)}
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : isTablet
              ? "repeat(4, 1fr)"
              : "repeat(8, 1fr)",
          gap: 12,
          justifyContent: "center",
          maxWidth: 800,
          margin: "0 auto 8px",
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton />
    </div>
  );
}

// ─── ACT OF SHOOTING Content ──────────────────────────────────────────────────

function ActOfShootingContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="ACT OF SHOOTING & GOAL: WHEN MADE AND ITS VALUE" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {Array.from({ length: 6 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* SIGNAL / ARTICLE / INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 32 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto 36px",
        }}
      >
        {/* SIGNAL — 3 doc cards */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard cols={2} />
            <DocCard cols={2} />
            <DocCard cols={2} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard />
        </div>
      </div>

      {/* PRESENTATION */}
      <SubSectionBadge label="PRESENTATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 28 }}>
        <DocCard />
        <DocCard />
      </div>

      {/* COVERING A SHOT */}
      <SubSectionBadge label="COVERING A SHOT (1 - 2 - 3 TECHNIQUE)" />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div
          style={{
            width: isMobile ? 180 : 220,
            aspectRatio: "4 / 3",
            background: T.charcoal,
            border: `2px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          <span style={{ fontFamily: BARLOW, fontSize: 11, color: T.grey, textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", padding: "0 8px" }}>
            Technique Diagram
          </span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <span style={{ fontFamily: DM, fontSize: 14, color: T.orange, fontStyle: "italic", letterSpacing: "0.5px" }}>
          1. hands &nbsp; 2. body &nbsp; 3. feet (landing)
        </span>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : isTablet
              ? "repeat(4, 1fr)"
              : "repeat(8, 1fr)",
          gap: 12,
          justifyContent: "center",
          maxWidth: 800,
          margin: "0 auto 8px",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton />
    </div>
  );
}

// ─── CONTACT Content ─────────────────────────────────────────────────────────

const CONTACT_SIGNALS_ROW1 = [
  "HOLDING",
  "BLOCKING / DEFENSE / ILLEGAL SCREEN (OFFENSE)",
  "PUSHING OR CHARGING WITHOUT THE BALL",
  "HANDCHECKING",
  "ILLEGAL USE OF HANDS",
  "ILLEGAL CYLINDER",
  "ILLEGAL CONTACT TO THE HAND",
  "EXCESSIVE SWINGING OF ELBOW",
];

const CONTACT_SIGNALS_ROW2 = [
  "FOUL BY TEAM IN CONTROL OF THE BALL",
  "HIT TO THE HEAD",
  "HOOKING",
  "CHARGING WITH THE BALL",
];

function ContactContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="CONTACT" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {Array.from({ length: 6 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* SIGNALS */}
      <CylinderSectionHeader label="SIGNALS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        {CONTACT_SIGNALS_ROW1.map((label, i) => <DocCard key={i} label={label} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
        {CONTACT_SIGNALS_ROW2.map((label, i) => <DocCard key={i} label={label} />)}
      </div>

      {/* ARTICLE / INTERPRETATION / PRESENTATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard />
            <DocCard />
          </div>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* THROW-IN FOUL */}
      <SubSectionBadge label="THROW-IN FOUL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 7 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* HANDCHECK */}
      <SubSectionBadge label="HANDCHECK" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* HOLDING/PUSHING */}
      <SubSectionBadge label="HOLDING/PUSHING" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* OFF THE BALL */}
      <SubSectionBadge label="OFF THE BALL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* OFFENSIVE FOUL */}
      <SubSectionBadge label="OFFENSIVE FOUL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* HOOKING */}
      <SubSectionBadge label="HOOKING" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* POSTPLAY */}
      <SubSectionBadge label="POSTPLAY" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 7 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* REBOUNDS */}
      <SubSectionBadge label="REBOUNDS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <WatchPlaylistButton label="WATCH OFFENSIVE FOUL PLAYLIST" />
        <WatchPlaylistButton label="WATCH DEFENSIVE FOUL PLAYLIST" />
        <WatchPlaylistButton label="WATCH REBOUNDING FOUL PLAYLIST" />
      </div>
    </div>
  );
}

// ─── TIME-OUT & SUBSTITUTION Content ────────────────────────────────────────

function TimeoutSubSection({
  title,
  procedureCount = 1,
  videoCount,
}: {
  title: string;
  procedureCount?: number;
  videoCount: number;
}) {
  return (
    <div style={{ marginBottom: 48 }}>
      {/* Sub-title badge */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
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
          {title}
        </div>
      </div>

      {/* Row 1: SIGNAL / ARTICLE / INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: 48,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        {["SIGNAL", "ARTICLE", "INTERPRETATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* Row 2: RULE / PROCEDURE / SUMMARY */}
      <div
        style={{
          display: "flex",
          gap: 48,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PROCEDURE" />
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: procedureCount }).map((_, i) => <DocCard key={i} cols={2} />)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SUMMARY" />
          <DocCard />
        </div>
      </div>

      {/* FIBA Educational Videos */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {Array.from({ length: videoCount }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
    </div>
  );
}

function TimeoutSubstitutionContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="TIME-OUT & SUBSTITUTION" />
      <div style={{ marginTop: 32 }}>
        <TimeoutSubSection title="TIME-OUT" procedureCount={2} videoCount={5} />
        <TimeoutSubSection title="SUBSTITUTION" procedureCount={1} videoCount={2} />
      </div>
    </div>
  );
}

// ─── ALTERNATING POSSESSION Content ──────────────────────────────────────────

function AlternatingPossessionContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="ALTERNATING POSSESSION" />

      {/* RULE / ARTICLE / INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "36px auto 28px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard />
            <DocCard />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard />
        </div>
      </div>

      {/* OPERATION / PRESENTATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="OPERATION" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard />
        </div>
      </div>

      {/* CHANGE ARROW DIRECTION / DO NOT CHANGE ARROW DIRECTION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              border: `2px solid ${T.orange}`,
              borderRadius: 30,
              padding: "8px 28px",
              marginBottom: 16,
            }}
          >
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              CHANGE ARROW DIRECTION
            </span>
          </div>
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              border: `2px solid ${T.orange}`,
              borderRadius: 30,
              padding: "8px 28px",
              marginBottom: 16,
            }}
          >
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              DO NOT CHANGE ARROW DIRECTION
            </span>
          </div>
          <DocCard />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(4,1fr)" : "repeat(8,1fr)",
          gap: 12,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
    </div>
  );
}

// ─── DRIBBLING Content ───────────────────────────────────────────────────────

function DribblingContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="DRIBBLING" />

      {/* Top two-column: RULE EXPLANATION | SIGNALS */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 64,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "36px auto 28px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE EXPLANATION" />
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNALS" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard cols={2} />
            <DocCard cols={2} />
          </div>
        </div>
      </div>

      {/* ARTICLE / INTERPRETATION / PRESENTATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 40px",
        }}
      >
        {["ARTICLE", "INTERPRETATION", "PRESENTATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* CARRYING THE BALL */}
      <SubSectionBadge label="CARRYING THE BALL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* DOUBLE DRIBBLE */}
      <SubSectionBadge label="DOUBLE DRIBBLE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 3 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton />
    </div>
  );
}

// ─── UNSPORTSMANLIKE FOUL Content ─────────────────────────────────────────────

function UnsportsmanlikeFoulContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="UNSPORTSMANLIKE FOUL" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {Array.from({ length: 4 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* SIGNAL / ARTICLE / INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 32px",
        }}
      >
        {["SIGNAL", "ARTICLE", "INTERPRETATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* PROTOCOL */}
      <SubSectionBadge label="PROTOCOL" />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          0 - 1 - 2 TECHNIQUE
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <div
          style={{
            width: isMobile ? 180 : 240,
            aspectRatio: "16 / 9",
            background: T.charcoal,
            border: `2px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          <span style={{ fontFamily: BARLOW, fontSize: 11, color: T.grey, textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", padding: "0 8px" }}>
            Technique Diagram
          </span>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {["CRITERIA 1", "CRITERIA 2", "CRITERIA 3", "CRITERIA 4"].map((criteria, ci) => (
        <div key={criteria}>
          <SubSectionBadge label={criteria} />
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={ci * 8 + i} />)}
          </div>
        </div>
      ))}
      <WatchPlaylistButton />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 5 }).map((_, i) => <VideoCard key={i} index={8 + i} />)}
      </div>
      <WatchPlaylistButton />
    </div>
  );
}

// ─── SCREENING Content ────────────────────────────────────────────────────────

function ScreeningContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="SCREENING" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* SIGNAL / ARTICLE / PRESENTATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 32px",
        }}
      >
        {["SIGNAL", "ARTICLE", "PRESENTATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton />
    </div>
  );
}

// ─── CHARGE & BLOCK Content ───────────────────────────────────────────────────

function ChargeBlockContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="CHARGE & BLOCK" />

      {/* Top row: RULE EXPLANATION & SIGNALS side-by-side */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 64,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "36px auto 28px",
        }}
      >
        {/* RULE EXPLANATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE EXPLANATION" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: 4 }).map((_, i) => <DocCard key={i} />)}
          </div>
        </div>

        {/* SIGNALS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNALS" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: 2 }).map((_, i) => <DocCard key={i} cols={2} />)}
          </div>
        </div>
      </div>

      {/* Middle row: ARTICLE / INTERPRETATION / PRESENTATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 40px",
        }}
      >
        {/* ARTICLE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard />
        </div>

        {/* INTERPRETATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard />
        </div>

        {/* PRESENTATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard />
            <DocCard />
          </div>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* BLOCK */}
      <SubSectionBadge label="BLOCK" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* CHARGE */}
      <SubSectionBadge label="CHARGE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* PASS AND CRASH */}
      <SubSectionBadge label="PASS AND CRASH" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton />
    </div>
  );
}

// ─── NO-CHARGE SEMICIRCLE Content ──────────────────────────────────────────────

function NoChargeSemicircleContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="NO-CHARGE SEMICIRCLE" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* ARTICLE / INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 32px",
        }}
      >
        {["ARTICLE", "INTERPRETATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={8 + i} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={16 + i} />)}
      </div>
    </div>
  );
}

// ─── FAKING A FOUL Content ───────────────────────────────────────────────────

function FakingFoulContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="FAKING A FOUL" />

      {/* Top row: RULE EXPLANATION & SIGNAL side-by-side */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 64,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "36px auto 28px",
        }}
      >
        {/* RULE EXPLANATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE EXPLANATION" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={i} />)}
          </div>
        </div>

        {/* SIGNAL */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <DocCard />
          </div>
        </div>
      </div>

      {/* Row 2: ARTICLE / INTERPRETATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 32px",
        }}
      >
        {["ARTICLE", "INTERPRETATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* PROTOCOL */}
      <CylinderSectionHeader label="PROTOCOL" />

      {/* DURING GAME / DURING NEXT GAME STOPPAGE */}
      <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>DURING GAME</span>
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>DURING NEXT GAME STOPPAGE</span>
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard />
            <DocCard />
          </div>
        </div>
      </div>

      {/* REPETITIVE OR EXCESSIVE FAKE */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>REPETITIVE OR EXCESSIVE FAKE</span>
        <div style={{ display: "flex", gap: 8 }}>
          <DocCard />
          <DocCard />
          <DocCard />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={8 + i} />)}
      </div>
      <WatchPlaylistButton />
    </div>
  );
}

// ─── BALL RETURNED TO BACKCOURT Content ───────────────────────────────────────

function BallReturnedToBackcourtContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="BALL RETURNED TO BACKCOURT" />

      {/* Top row: RULE EXPLANATION & SIGNAL side-by-side */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 64,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "36px auto 28px",
        }}
      >
        {/* RULE EXPLANATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE EXPLANATION" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={i} />)}
          </div>
        </div>

        {/* SIGNAL */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <DocCard />
          </div>
        </div>
      </div>

      {/* Middle row: ARTICLE / INTERPRETATION / PRESENTATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 32px",
        }}
      >
        {["ARTICLE", "INTERPRETATION", "PRESENTATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 7 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>
      <WatchPlaylistButton />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 4 }).map((_, i) => <VideoCard key={i} index={7 + i} />)}
      </div>
      <WatchPlaylistButton />
    </div>
  );
}

// ─── THROW-IN Content ─────────────────────────────────────────────────────────

function ThrowInContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="THROW-IN" />

      {/* Top row: RULE EXPLANATION & SIGNAL side-by-side */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 64,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "36px auto 28px",
        }}
      >
        {/* RULE EXPLANATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE EXPLANATION" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <VideoCard index={0} />
          </div>
        </div>

        {/* SIGNAL */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <DocCard />
          </div>
        </div>
      </div>

      {/* Row 2: ARTICLE / INTERPRETATION / PRESENTATION */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 28 : 48,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto 32px",
        }}
      >
        {["ARTICLE", "INTERPRETATION", "PRESENTATION"].map((lbl) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label={lbl} />
            <DocCard />
          </div>
        ))}
      </div>

      {/* PROCEDURE */}
      <CylinderSectionHeader label="PROCEDURE" />

      {/* GENERAL / L2M */}
      <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>GENERAL</span>
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>L2M</span>
          <DocCard />
        </div>
      </div>

      {/* GENERAL - WITH WARNING WHISTLE / L2M - WITH WARNING WHISTLE */}
      <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>GENERAL - WITH WARNING WHISTLE</span>
          <DocCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>L2M - WITH WARNING WHISTLE</span>
          <DocCard />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 2 }).map((_, i) => <VideoCard key={i} index={i} />)}
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Array.from({ length: 3 }).map((_, i) => <VideoCard key={i} index={2 + i} />)}
      </div>
    </div>
  );
}

// ─── Generic placeholder tab content ─────────────────────────────────────────

function PlaceholderTabContent({ tab }: { tab: Tab }) {
  return (
    <div>
      <SectionBadge label={tab} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 96 }}>
        <span style={{ fontFamily: DM, fontSize: 16, color: T.placeholderText }}>
          Content coming soon
        </span>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Videos() {
  const [activeTab, setActiveTab] = useState<Tab>("TABLE OFFICIALS");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const width = useWindowWidth();

  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    if (!isMobile && sidebarOpen) setSidebarOpen(false);
  }, [isMobile, sidebarOpen]);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: DM }}>
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
            top: 52,
            zIndex: 100,
          }}
        >
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 22, color: T.orange, letterSpacing: "3px", textTransform: "uppercase" }}>
            VIDEOS
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: BARLOW, fontSize: 13, color: T.inactive, letterSpacing: "1px", textTransform: "uppercase", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {activeTab}
            </span>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ background: "transparent", border: `1px solid ${T.border}`, color: T.white, cursor: "pointer", padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4, borderRadius: 2 }}
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
        <Sidebar active={activeTab} onSelect={setActiveTab} open={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            background: "var(--off-white)",
            padding: isMobile ? "24px 16px" : isTablet ? "32px 28px" : "48px 56px",
            minHeight: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowX: "hidden",
          }}
        >
          <div style={{ flex: 1 }}>
            {activeTab === "TABLE OFFICIALS" ? (
              <TableOfficialsContent isMobile={isMobile} />
            ) : activeTab === "CYLINDER PRINCIPLE" ? (
              <CylinderPrincipleContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "3X3" ? (
              <ThreeXThreeContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "TRAVELLING" ? (
              <TravellingContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "ACT OF SHOOTING & GOAL: WHEN MADE AND ITS VALUE" ? (
              <ActOfShootingContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "CONTACT" ? (
              <ContactContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "TIME-OUT & SUBSTITUTION" ? (
              <TimeoutSubstitutionContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "ALTERNATING POSSESSION" ? (
              <AlternatingPossessionContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "DRIBBLING" ? (
              <DribblingContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "UNSPORTSMANLIKE FOUL" ? (
              <UnsportsmanlikeFoulContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "SCREENING" ? (
              <ScreeningContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "CHARGE & BLOCK" ? (
              <ChargeBlockContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "NO-CHARGE SEMICIRCLE" ? (
              <NoChargeSemicircleContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "FAKING A FOUL" ? (
              <FakingFoulContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "BALL RETURNED TO BACKCOURT" ? (
              <BallReturnedToBackcourtContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "THROW-IN" ? (
              <ThrowInContent isMobile={isMobile} isTablet={isTablet} />
            ) : (
              <PlaceholderTabContent tab={activeTab} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
