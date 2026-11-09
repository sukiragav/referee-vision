import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";
import { renderWithOrdinals } from "../utils/renderWithOrdinals";
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
  | "DISRUPTIVE FOUL"
  | "FLAGRANT FOUL"  
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
  "DISRUPTIVE FOUL",
  "FLAGRANT FOUL",  
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

// ─── Video data for SCORER tab ───────────────────────────────────────────────
const SCORER_RUNNING_SCORE_VIDEOS = [
  { link: "https://library.fibairef.basketball/cdn/TOM100_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl6.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM101_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl7.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM103_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl7.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM104_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl8.png" },
  { link: "https://library.fibairef.basketball/doc/cndHR0NFSDg2d283cFVDNXNJN0hHZz09?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl8.png" },
];

const SCORER_HOW_TO_RECORD_VIDEOS = [
  { link: "https://library.fibairef.basketball/cdn/TOM200_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl9.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM201_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl9.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM202_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl9.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM203_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl9.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM204_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl9.png" },
];

const SCORER_ALT_POSS_VIDEOS = [
  { link: "https://library.fibairef.basketball/cdn/TOM403_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM404_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM402_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM400_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM405_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM401_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM406_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
  { link: "https://library.fibairef.basketball/cdn/TOM407_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl10.png" },
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
  const embedMatch = url.match(/embed\/([\w-]+)/);
  if (embedMatch && embedMatch[1] !== "videoseries") return embedMatch[1];
  return null;
}

function getYouTubeEmbedUrl(url: string): string {
  // Handle playlist embed URLs (embed/videoseries?list=...)
  if (url.includes("embed/videoseries")) {
    return url.includes("autoplay=1") ? url : url + "&autoplay=1";
  }
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  const longMatch = url.match(/[?&]v=([\w-]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1`;
  const embedMatch = url.match(/embed\/([\w-]+)/);
  if (embedMatch) return url.includes("autoplay=1") ? url : `https://www.youtube.com/embed/${embedMatch[1]}?autoplay=1`;
  return url;
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
  function VideoModal({
    url,
    title,
    onClose,
    startTime = 0,
    endTime,
  }: {
    url: string;
    title?: string;
    onClose: () => void;
    startTime?: number;
    endTime?: number;
  }) {
    const isImage =
      /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) ||
      url.startsWith("data:image");

    const isSignal = isImage && /sig/i.test(url);

    const [zoom, setZoom] = useState(1);
    const [loadError, setLoadError] = useState(false);

    // YouTube
    const youtubeId = getYouTubeId(url);

    // Vimeo
    const getVimeoEmbedUrl = (videoUrl: string) => {
      const match = videoUrl.match(
        /(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/
      );

      if (!match) return null;

      const videoId = match[1];
      const hash = match[2];

      return `https://player.vimeo.com/video/${videoId}${
        hash ? `?h=${hash}&autoplay=1` : "?autoplay=1"
      }`;
    };

    const embedSrc = youtubeId
      ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
      : getVimeoEmbedUrl(url);

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
        padding: isSignal ? "16px 12px" : isImage ? "24px 16px" : "16px",
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
          {!isSignal && (
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

          {/* Close button for signal (standalone window fit card) */}
          {isSignal && (
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

          {/* Image view: scrollable & zoomable for articles/interpretations/presentations; window-fit for signals */}
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
                  alt={title || "Document"}
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
              key={url}
              src={url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = startTime;
              }}
              onTimeUpdate={(e) => {
                const video = e.currentTarget;

                if (endTime !== undefined && video.currentTime >= endTime) {
                  video.pause();
                  video.currentTime = endTime;
                }
              }}
              onError={() => setLoadError(true)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
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
      className="video-thumb-card"
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onPlay}
      title="Credits: FIBA Referee Department"
      style={{
        width: 90,
        aspectRatio: "16 / 9",
        background: THUMB_SHADES[index % THUMB_SHADES.length],
        border: h.on ? `1px solid ${T.orange}` : `1px solid ${T.border}`,
        borderRadius: 10,
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
        className="video-thumb-play-btn"
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
    const drawerContent = (
      <>
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

    return typeof document !== "undefined" ? createPortal(drawerContent, document.body) : drawerContent;
  }

  return (
    <aside
      className="page-desktop-sidebar"
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
      <div className="page-desktop-sidebar-header" style={{ padding: "40px 28px 16px", borderBottom: `1px solid ${T.border}`, marginBottom: 0 }}>
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
      className="page-desktop-sidebar-btn"
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
        className="section-badge-pill"
        style={{
          background: T.orange, color: "var(--off-white)", fontFamily: BARLOW,
          fontWeight: 800, fontSize: 22, letterSpacing: "3px",
          textTransform: "uppercase", padding: "10px 40px", borderRadius: 30,
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
        className="sub-section-badge-pill"
        style={{
          background: "transparent",
          border: `2px solid ${T.orange}`,
          borderRadius: 6,
          padding: "8px 40px",
          margin: "32px 0 24px",
          maxWidth: "100%",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: BARLOW, fontWeight: 800, fontSize: 18,
            color: T.orange, letterSpacing: "2px", textTransform: "uppercase",
            wordBreak: "break-word",
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
function ContentImage({
  src,
  alt,
  openUrl,
  width = 95,
  height = 130,
  imgStyle,
  containerStyle,
  alwaysBorderOrange,
}: {
  src: string;
  alt: string;
  openUrl?: string;
  width?: number | string;
  height?: number | string;
  imgStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  alwaysBorderOrange?: boolean;
}) {
  const h = useHover();
  const [isOpen, setIsOpen] = useState(false);

  const finalWidth = containerStyle?.width ?? width;
  const finalHeight = containerStyle?.height ?? height;

  return (
    <>
      <div
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        onClick={() => setIsOpen(true)}
        style={{
          width: finalWidth,
          height: finalHeight,
          boxSizing: "border-box",
          border: `2px solid ${alwaysBorderOrange || h.on ? T.orange : T.border}`,
          borderRadius: 8,
          overflow: "hidden",
          transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
          transform: h.on ? "scale(1.03)" : "scale(1)",
          boxShadow: h.on ? `0 6px 20px rgba(245, 166, 35, 0.25)` : "none",
          cursor: "pointer",
          flexShrink: 0,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...containerStyle,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            ...imgStyle,
          }}
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
function VideoRow({
  links,
  onPlay,
}: {
  links: (string | { link: string; thumbnail?: string })[];
  onPlay: (url: string) => void;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
      {links.map((item, i) => {
        const link = typeof item === "string" ? item : item.link;
        const thumbnail = typeof item === "string" ? undefined : item.thumbnail;
        return (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={thumbnail}
            onPlay={() => onPlay(link)}
          />
        );
      })}
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
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {activeVideo && (
        <VideoModal
          url={activeVideo.url}
          title="OBR 2026 Webinar"
          startTime={activeVideo.startTime}
          endTime={activeVideo.endTime}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* DUTIES + MECHANICS & PERFORMANCE STANDARDS side by side */}
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
        {/* DUTIES column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>DUTIES</span>
          </div>
          <ContentImage src="https://www.refereevision.com/scr_duties.jpg" alt="Scorer Duties" />
        </div>
        {/* MECHANICS & PERFORMANCE STANDARDS column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>MECHANICS & PERFORMANCE STANDARDS</span>
          </div>
          <ContentImage src="https://www.refereevision.com/scr_mechanics.jpg" alt="Mechanics & Performance Standards" />
        </div>
      </div>

      {/* BEFORE / DURING / AT END OF GAME */}
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
        {/* BEFORE THE GAME */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 24px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>BEFORE THE GAME</span>
          </div>
          <ContentImage src="https://www.refereevision.com/scr_before.jpg" alt="Before the Game" />
        </div>
        {/* DURING THE GAME */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 240px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 24px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>DURING THE GAME</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <ContentImage src="https://www.refereevision.com/scr_during.jpg" alt="During the Game 1" />
            <ContentImage src="https://www.refereevision.com/scr_during2.jpg" alt="During the Game 2" />
            <ContentImage src="https://www.refereevision.com/scr_pen.jpg" alt="During the Game - Pen" />
          </div>
        </div>
        {/* AT THE END OF THE GAME */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 24px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>AT THE END OF THE GAME</span>
          </div>
          <ContentImage src="https://www.refereevision.com/scr_end.jpg" alt="At the End of the Game" />
        </div>
      </div>

      {/* POSSIBLE MISTAKES AND SOLUTIONS */}
      <SubSectionBadge label="POSSIBLE MISTAKES AND SOLUTIONS" />
      <ImageRow>
        <ContentImage src="https://www.refereevision.com/tbloffl39.png" alt="Possible Mistakes 1" />
        <ContentImage src="https://www.refereevision.com/tbloffl40.png" alt="Possible Mistakes 2" />
        <ContentImage src="https://www.refereevision.com/tbloffl41.png" alt="Possible Mistakes 3" />
      </ImageRow>

      {/* EDUCATIONAL VIDEOS - RUNNING SCORE */}
      <SubSectionBadge label="EDUCATIONAL VIDEOS - RUNNING SCORE" />
      <VideoRow links={SCORER_RUNNING_SCORE_VIDEOS} onPlay={(url) => setActiveVideo(url)} />

      {/* GAME LOST BY FORFEIT + GAME LOST BY DEFAULT */}
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
        {/* GAME LOST BY FORFEIT */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>GAME LOST BY FORFEIT</span>
          </div>
          <ContentImage src="https://www.refereevision.com/scr_forfeit.jpg" alt="Game Lost by Forfeit" />
        </div>
        {/* GAME LOST BY DEFAULT */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>GAME LOST BY DEFAULT</span>
          </div>
          <ContentImage src="https://www.refereevision.com/scr_default.jpg" alt="Game Lost by Default" />
        </div>
      </div>

      {/* HOW TO RECORD THE DIFFERENT FOULS */}
      <SubSectionBadge label="HOW TO RECORD THE DIFFERENT FOULS" />
      {/* Row 1: CLASSIFICATION, PLAYER FOULS, SUBSTITUTION & EXCLUDED PLAYER FOULS */}
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
        {/* CLASSIFICATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 24px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>CLASSIFICATION</span>
          </div>
          <ContentImage src="https://www.refereevision.com/fouls_classification.jpg" alt="Classification" />
        </div>
        {/* PLAYER FOULS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 24px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>PLAYER FOULS</span>
          </div>
          <ContentImage src="https://www.refereevision.com/fouls_player.jpg" alt="Player Fouls" />
        </div>
        {/* SUBSTITUTION & EXCLUDED PLAYER FOULS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 24px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>SUBSTITUTION &amp; EXCLUDED PLAYER FOULS</span>
          </div>
          <ContentImage src="https://www.refereevision.com/fouls_sub.jpg" alt="Substitution & Excluded Player Fouls" />
        </div>
      </div>

      {/* Row 2: HEAD COACH..., PLAYER & HEAD COACH FOULS, DISQUALIFYING FOULS - FIGHTS */}
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
        {/* HEAD COACH, FIRST ASSISTANT COACH & ACCOMPANYING DELEGATION MEMBER FOULS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 20px", width: "100%", textAlign: "center", boxSizing: "border-box", minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1.2 }}>HEAD COACH, FIRST ASSISTANT COACH &amp; ACCOMPANYING DELEGATION MEMBER FOULS</span>
          </div>
          <ContentImage src="https://www.refereevision.com/fouls_coach.jpg" alt="Head Coach Fouls" />
        </div>
        {/* PLAYER & HEAD COACH FOULS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 20px", width: "100%", textAlign: "center", boxSizing: "border-box", minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1.2 }}>PLAYER &amp; HEAD COACH FOULS</span>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <ContentImage src="https://www.refereevision.com/fouls_phc.jpg" alt="Player & Head Coach Fouls 1" />
            <ContentImage src="https://www.refereevision.com/fouls_phc1.jpg" alt="Player & Head Coach Fouls 2" />
          </div>
        </div>
        {/* DISQUALIFYING FOULS - FIGHTS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 20px", width: "100%", textAlign: "center", boxSizing: "border-box", minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 14, color: T.orange, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1.2 }}>DISQUALIFYING FOULS - FIGHTS</span>
          </div>
          <ContentImage src="https://www.refereevision.com/fouls_fight.jpg" alt="Disqualifying Fouls - Fights" />
        </div>
      </div>

      {/* EDUCATIONAL VIDEOS */}
      <SubSectionBadge label="EDUCATIONAL VIDEOS" />
      <VideoRow links={SCORER_HOW_TO_RECORD_VIDEOS} onPlay={(url) => setActiveVideo(url)} />

      {/* EXAMPLE SCORESHEETS */}
      <SubSectionBadge label="EXAMPLE SCORESHEETS" />
      <ImageRow>
        {[
          { src: "https://www.refereevision.com/scoresheet_before.jpg", alt: "Scoresheet Before Game" },
          { src: "https://www.refereevision.com/scoresheet_first.jpg", alt: "Scoresheet First Half" },
          { src: "https://www.refereevision.com/scoresheet_second.jpg", alt: "Scoresheet Second Half" },
          { src: "https://www.refereevision.com/scoresheet_third.jpg", alt: "Scoresheet Third Quarter" },
          { src: "https://www.refereevision.com/scoresheet_fourth.jpg", alt: "Scoresheet Fourth Quarter" },
          { src: "https://www.refereevision.com/scoresheet_end.jpg", alt: "Scoresheet End of Game" },
          { src: "https://www.refereevision.com/scoresheet_ot.jpg", alt: "Scoresheet Overtime" },
        ].map((img, i) => (
          <ContentImage key={i} src={img.src} alt={img.alt} />
        ))}
      </ImageRow>

      {/* ALTERNATING POSSESSION ARROW */}
      <SubSectionBadge label="ALTERNATING POSSESSION ARROW" />
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around", flexWrap: "wrap", margin: "32px 0 24px" }}>
        {/* RULE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>RULE</span>
          </div>
          <ContentImage src="https://www.refereevision.com/apa_rule.jpg" alt="Alternating Possession Rule" />
        </div>
        {/* OPERATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flex: "1 1 200px" }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 32px", width: "100%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>OPERATION</span>
          </div>
          <ContentImage src="https://www.refereevision.com/apa_procedure.jpg" alt="Alternating Possession Operation" />
        </div>
      </div>

      <SubSectionBadge label="EDUCATIONAL VIDEOS" />
      <VideoRow links={SCORER_ALT_POSS_VIDEOS} onPlay={(url) => setActiveVideo(url)} />
    </div>
  );
}

function DocCard({
  label,
  cols = 1,
  link,
  thumbnail,
  width,
  height,
  aspectRatio,
  objectFit,
  onClick,
}: {
  label?: string;
  cols?: number;
  link?: string;
  thumbnail?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill";
  onClick?: () => void;
}) {
  const h = useHover();
  const [modalOpen, setModalOpen] = useState(false);

  const isImageUrl = link && (link.endsWith(".jpg") || link.endsWith(".jpeg") || link.endsWith(".png") || link.endsWith(".webp"));
  const displayImage = thumbnail || (isImageUrl ? link : null);
  const isSignal = Boolean(link && /sig/i.test(link));

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (displayImage || link) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        onClick={handleClick}
        style={{
          width: width ?? (cols === 1 ? 110 : 80),
          height: height ?? "auto",
          aspectRatio: aspectRatio ?? (isSignal ? "218 / 330" : (height ? undefined : "218 / 330")),
          background: isSignal ? "transparent" : (h.on ? "#222" : T.charcoal),
          border: `2px solid ${h.on ? T.orange : T.border}`,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: displayImage ? 0 : 6,
          transition: "border-color 0.2s, transform 0.2s",
          transform: h.on ? "scale(1.04)" : "scale(1)",
          cursor: (link || onClick) ? "pointer" : "default",
          flexShrink: 0,
          padding: displayImage ? 0 : "8px 4px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={label || "Doc thumbnail"}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: objectFit ?? "fill",
              transition: "opacity 0.2s",
              opacity: h.on ? 0.95 : 0.85,
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
      {modalOpen && (displayImage || link) && (
        <VideoModal
          url={displayImage || link!}
          title={label || "Document"}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

// Placeholder video card (no actual YouTube)
function VideoCard({ index, activeColor = T.orange }: { index: number; activeColor?: string }) {
  const h = useHover();
  const shades = ["#1A2416", "#16201A", "#1E1A16", "#161E20", "#1A161E", "#1E1E16"];
  return (
    <div
      className="video-thumb-card"
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
        className="video-thumb-play-btn"
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

    type ActiveVideo = {
    url: string;
    startTime?: number;
    endTime?: number;
  };

  const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);
  const sections: { label: string; images: { src: string; alt: string }[]; count: number }[] = [
    { label: "RULE", images: ruleImages, count: 1 },
    { label: "PROCEDURE", images: procedureImages, count: 1 },
    { label: "SUMMARY", images: summaryImages, count: 1 },
  ];
  const totalVideos = videos.length > 0 ? videos.length : videoCount;
  return (
    <div>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
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
      <DocSection
        title="END OF GAME"
        count={1}
        images={[
          { src: "https://www.refereevision.com/as_end.jpg", alt: "Assistant Scorer End of game" }
        ]}
      />
    </div>
  );
}

// ─── TIMER Content ────────────────────────────────────────────────────────────
function TimerContent() {
type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  const clockLinks = [
    "https://library.fibairef.basketball/cdn/TOM500_EN?autoplay=1",
    "https://library.fibairef.basketball/cdn/TOM501_EN?autoplay=1",
    "https://library.fibairef.basketball/cdn/TOM502_EN?autoplay=1",
    "https://library.fibairef.basketball/cdn/TOM408_EN?autoplay=1",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}

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
        <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 6, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
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
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 6, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
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
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 6, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
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

function ShotClockNumCard({ value }: { value: number }) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        width: 74,
        height: 74,
        background: "#0D0D0D",
        border: `2px solid ${h.on ? T.orange : "#3A3A3A"}`,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.2s, transform 0.2s",
        transform: h.on ? "scale(1.06)" : "scale(1)",
        flexShrink: 0,
      }}
    >
      <span style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 30,
        fontWeight: 900,
        color: "#FF3333",
        textShadow: "0 0 10px rgba(255,51,51,0.5)",
        lineHeight: 1,
      }}>
        {value}
      </span>
    </div>
  );
}

function ShotClockSubHeader({ label }: { label: string }) {
  return <SubSectionBadge label={label} />;
}

function ShotClockOperatorContent() {
type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}

      {/* Top row: DUTIES | BEFORE THE GAME | RULE */}
      <div style={{ display: "flex", gap: 24, justifyContent: "space-around", flexWrap: "wrap", margin: "20px 0" }}>
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
            { src: "https://www.refereevision.com/sc_before.jpg", alt: "Shot Clock Operator Before The Game" },
          ]}
        />
        <DocSection
          title="RULE"
          count={1}
          images={[
            { src: "https://www.refereevision.com/sc_rule.jpg", alt: "Shot Clock Operator Rule" },
          ]}
        />
      </div>

      {/* SITUATIONS */}
      <ShotClockSubHeader label="SITUATIONS" />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <ContentImage src="https://www.refereevision.com/sc_situations.jpg" alt="Shot Clock Situations" />
      </div>

      {/* Two situation columns */}
      <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30,
            padding: "8px 24px", textAlign: "center", maxWidth: 320, boxSizing: "border-box", minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              SITUATIONS WHEN THE SHOT CLOCK SIGNAL SOUNDS
            </span>
          </div>
          <ContentImage src="https://www.refereevision.com/sc_sit_shotclocksignal.jpg" alt="Situations when shot clock signal sounds" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30,
            padding: "8px 24px", textAlign: "center", maxWidth: 320, boxSizing: "border-box", minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              SITUATIONS WITH SHOT FOR FIELD GOAL
            </span>
          </div>
          <ContentImage src="https://www.refereevision.com/sc_sit_shotforfieldgoal.jpg" alt="Situations with shot for field goal" />
        </div>
      </div>

      {/* THE SHOT CLOCK SHALL BE STARTED OR RESTARTED WHEN */}
      <ShotClockSubHeader label="THE SHOT CLOCK SHALL BE STARTED OR RESTARTED WHEN" />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        {[
          "https://library.fibairef.basketball/cdn/TOM700_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM701_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM710_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM901_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM702_EN?autoplay=1",
        ].map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail="https://www.refereevision.com/tbloffl16.png"
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* SHALL BE STOPPED AND RESET TO 24 SECONDS WHEN */}
      <ShotClockSubHeader label="SHALL BE STOPPED AND RESET TO 24 SECONDS WHEN" />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        {[
          "https://library.fibairef.basketball/cdn/TOM703_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM707_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM709_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM802_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM805_EN?autoplay=1",
        ].map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail="https://www.refereevision.com/tbloffl17.png"
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* SHALL BE STOPPED AND RESET TO 14 SECONDS WHEN */}
      <ShotClockSubHeader label="SHALL BE STOPPED AND RESET TO 14 SECONDS WHEN" />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        {[
          "https://library.fibairef.basketball/cdn/TOM704_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM705_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM706_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM803_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM708_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM711_EN?autoplay=1",
          "https://library.fibairef.basketball/cdn/TOM902_EN?autoplay=1",
        ].map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail="https://www.refereevision.com/tbloffl18.png"
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* DURING THE GAME */}
      <ShotClockSubHeader label="DURING THE GAME" />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <ContentImage src="https://www.refereevision.com/sc_during.jpg" alt="During the Game" />
        <VideoThumb
          index={0}
          link="https://library.fibairef.basketball/cdn/TOM801_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl19.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM801_EN?autoplay=1")}
        />
        <VideoThumb
          index={1}
          link="https://library.fibairef.basketball/cdn/TOM804_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl19.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM804_EN?autoplay=1")}
        />
      </div>

      {/* MECHANICS SUMMARY */}
      <ShotClockSubHeader label="MECHANICS SUMMARY" />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 16 }}>
        <ContentImage src="https://www.refereevision.com/sc_mechanics.png" alt="Mechanics Summary" />
      </div>

      {/* SHOT CLOCK MISTAKES */}
      <ShotClockSubHeader label="SHOT CLOCK MISTAKES" />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", paddingBottom: 48 }}>
        <ContentImage src="https://www.refereevision.com/sc_mistakes.jpg" alt="Shot Clock Mistakes" />
        <VideoThumb
          index={0}
          link="https://library.fibairef.basketball/cdn/TOM900_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl20.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM900_EN?autoplay=1")}
        />
        <VideoThumb
          index={1}
          link="https://library.fibairef.basketball/cdn/TOM807_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl20.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM807_EN?autoplay=1")}
        />
      </div>
    </div>
  );
}

// ─── COMMUNICATION PROTOCOLS Content ─────────────────────────────────────────
function ProtocolCard({
  title,
  src,
  alt,
  openUrl,
}: {
  title: React.ReactNode;
  src: string;
  alt: string;
  openUrl?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: "100%",
        maxWidth: 380,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "transparent",
          border: `2px solid ${T.orange}`,
          borderRadius: 30,
          padding: "8px 24px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 44,
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 15,
            color: T.orange,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            lineHeight: 1.25,
          }}
        >
          {title}
        </span>
      </div>
      <ContentImage src={src} alt={alt} openUrl={openUrl} />
    </div>
  );
}

function ProtocolRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        gap: 24,
        flexWrap: "wrap",
        width: "100%",
        maxWidth: 860,
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

function CommunicationProtocolsContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center", paddingBottom: 48 }}>
      {/* Top Banner */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ background: T.orange, borderRadius: 0, padding: "10px 40px" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 18, color: T.white, letterSpacing: "2px", textTransform: "uppercase" }}>
            COMMUNICATION PROTOCOLS
          </span>
        </div>
      </div>

      {/* SECTION 1: MEETING WITH THE REFEREES BEFORE THE GAME */}
      <SubSectionBadge label="MEETING WITH THE REFEREES BEFORE THE GAME" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ContentImage
          src="https://www.refereevision.com/tbloffl21.png"
          openUrl="https://library.fibairef.basketball/doc/WktHamdXNUVLWDVzQXpXUUpPMVhNQT09?autoplay=1"
          alt="Meeting with the Referees before the Game"
        />
      </div>

      {/* SECTION 2: COMMUNICATION WITH PARTICIPANTS */}
      <SubSectionBadge label="COMMUNICATION WITH PARTICIPANTS" />
      <ProtocolRow>
        <ProtocolCard
          title="BEFORE THE GAME"
          src="https://www.refereevision.com/tbloffl36.png"
          alt="Before the Game"
        />
        <ProtocolCard
          title={
            <span>
              {renderWithOrdinals("IN THE INTERVAL BETWEEN THE 1ST AND 2ND QUARTER & THE 3RD AND 4TH QUARTER")}
            </span>
          }
          src="https://www.refereevision.com/tbloffl37.png"
          alt="In the interval between quarters"
        />
      </ProtocolRow>
      <ProtocolRow>
        <ProtocolCard
          title={
            <span>
              {renderWithOrdinals("IN THE INTERVAL BETWEEN THE 2ND AND 3RD QUARTER")}
            </span>
          }
          src="https://www.refereevision.com/tbloffl38.png"
          alt="WiO"
        />
      </ProtocolRow>

      {/* SECTION 3: BETWEEN SCORER AND OTHERS */}
      <SubSectionBadge label="BETWEEN SCORER AND OTHERS" />
      <ProtocolRow>
        <ProtocolCard
          title="BEGINNING OF THE GAME"
          src="https://www.refereevision.com/tbloffl22.png"
          alt="Beginning of the Game"
        />
        <ProtocolCard
          title="ALTERNATE POSSESSION SITUATION"
          src="https://www.refereevision.com/tbloffl23.png"
          alt="Alternate Possession Situation"
        />
      </ProtocolRow>
      <ProtocolRow>
        <ProtocolCard
          title="WHEN A FOUL IS CALLED"
          src="https://www.refereevision.com/tbloffl24.png"
          alt="When a Foul is Called"
        />
        <ProtocolCard
          title="WHEN A FOUL DURING A SHOT IS CALLED"
          src="https://www.refereevision.com/tbloffl25.png"
          alt="When a Foul During a Shot is Called"
        />
      </ProtocolRow>
      <ProtocolRow>
        <ProtocolCard
          title="WHEN A BASKET IS SCORED"
          src="https://www.refereevision.com/tbloffl26.png"
          alt="When a Basket is Scored"
        />
        <ProtocolCard
          title="WHEN WE ARE ABOUT TO START LAST 2 MIN (L2M)"
          src="https://www.refereevision.com/tbloffl27.png"
          alt="When We Are About to Start Last 2 Min (L2M)"
        />
      </ProtocolRow>

      {/* SECTION 4: BETWEEN SHOT CLOCK OPERATOR AND OTHERS */}
      <SubSectionBadge label="BETWEEN SHOT CLOCK OPERATOR AND OTHERS" />
      <ProtocolRow>
        <ProtocolCard
          title="WHEN THE SHOT CLOCK NEEDS TO BE CHANGED"
          src="https://www.refereevision.com/tbloffl28.png"
          alt="When the Shot Clock Needs to be Changed"
        />
        <ProtocolCard
          title={'WHEN ENTERING THE LAST 24" OF THE GAME OR END OF THE COUNTDOWN'}
          src="https://www.refereevision.com/tbloffl29.png"
          alt="When Entering the Last 24 Seconds of the Game"
        />
      </ProtocolRow>
      <ProtocolRow>
        <ProtocolCard
          title="WHEN THE SHOT CLOCK IS BELOW 24 SECONDS"
          src="https://www.refereevision.com/tbloffl30.png"
          alt="When the Shot Clock is Below 24 Seconds"
        />
      </ProtocolRow>

      {/* SECTION 5: BETWEEN TIMER AND OTHERS */}
      <SubSectionBadge label="BETWEEN TIMER AND OTHERS" />
      <ProtocolRow>
        <ProtocolCard
          title="WHEN THE GAME BEGINS"
          src="https://www.refereevision.com/tbloffl31.png"
          alt="When the Game Begins"
        />
        <ProtocolCard
          title="WHEN A TIME-OUT IS TAKEN"
          src="https://www.refereevision.com/tbloffl32.png"
          alt="When a Time-Out is Taken"
        />
      </ProtocolRow>
      <ProtocolRow>
        <ProtocolCard
          title="WHEN A SUBSTITUTION IS MADE"
          src="https://www.refereevision.com/tbloffl33.png"
          alt="When a Substitution is Made"
        />
        <ProtocolCard
          title="WHEN WE ENTER L2M"
          src="https://www.refereevision.com/tbloffl34.png"
          alt="When We Enter L2M"
        />
      </ProtocolRow>
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
type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
      <SectionBadge label="CYLINDER PRINCIPLE" />

      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}

      {/* RULE EXPLANATION */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CylinderSectionHeader label="RULE EXPLANATION" />
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <VideoThumb
            index={0}
            link="https://youtu.be/NJdAnBApDgA"
            thumbnail="https://img.youtube.com/vi/NJdAnBApDgA/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/NJdAnBApDgA")}
          />
          <VideoThumb
            index={1}
            link="https://youtu.be/9o3d6Gx_vws"
            thumbnail="https://img.youtube.com/vi/9o3d6Gx_vws/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/9o3d6Gx_vws")}
          />
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
          <DocCard link="https://www.refereevision.com/IllegalCylinder_Sig.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Cylinder_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/Contact_CV_ppt.jpg" />
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
            <VideoThumb
              index={0}
              link="https://youtu.be/qAFf5hlPMmk"
              thumbnail="https://img.youtube.com/vi/qAFf5hlPMmk/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/qAFf5hlPMmk")}
            />
            <VideoThumb
              index={1}
              link="https://youtu.be/gvVag4plVzY"
              thumbnail="https://img.youtube.com/vi/gvVag4plVzY/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/gvVag4plVzY")}
            />
            <VideoThumb
              index={2}
              link="https://youtu.be/PKFGRmg4TfQ"
              thumbnail="https://img.youtube.com/vi/PKFGRmg4TfQ/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/PKFGRmg4TfQ")}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="CYLINDER" />
          <div style={{ display: "flex", gap: 10 }}>
            <VideoThumb index={3}
              link="https://youtu.be/i0Xcutl6Dy0"
              thumbnail="https://img.youtube.com/vi/i0Xcutl6Dy0/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/i0Xcutl6Dy0")} />
            <VideoThumb index={4}
              link="https://youtu.be/AwR2rhPpmG0"
              thumbnail="https://img.youtube.com/vi/AwR2rhPpmG0/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/AwR2rhPpmG0")} />
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
          <VideoThumb
            index={0}
            link="https://youtu.be/AhUnd1ZPpwE"
            thumbnail="https://img.youtube.com/vi/AhUnd1ZPpwE/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/AhUnd1ZPpwE")}
          />
          <VideoThumb
            index={1}
            link="https://youtu.be/feI-Te-ogEY"
            thumbnail="https://img.youtube.com/vi/feI-Te-ogEY/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/feI-Te-ogEY")}
          />
          <VideoThumb
            index={2}
            link="https://youtu.be/eE3y4ol8ukI"
            thumbnail="https://img.youtube.com/vi/eE3y4ol8ukI/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/eE3y4ol8ukI")}
          />
          <VideoThumb
            index={3}
            link="https://youtu.be/iYMYZS8M6lk"
            thumbnail="https://img.youtube.com/vi/iYMYZS8M6lk/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/iYMYZS8M6lk")}
          />
          <VideoThumb
            index={4}
            link="https://youtu.be/YrsQAa2aD7c"
            thumbnail="https://img.youtube.com/vi/YrsQAa2aD7c/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/YrsQAa2aD7c")}
          />
          <VideoThumb
            index={5}
            link="https://youtu.be/DTTN2T3q9nA"
            thumbnail="https://img.youtube.com/vi/DTTN2T3q9nA/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/DTTN2T3q9nA")}
          />
          <VideoThumb
            index={6}
            link="https://youtu.be/iw7liaYecBM"
            thumbnail="https://img.youtube.com/vi/iw7liaYecBM/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/iw7liaYecBM")}
          />
          <VideoThumb
            index={7}
            link="https://youtu.be/FA_CHDS3isI"
            thumbnail="https://img.youtube.com/vi/FA_CHDS3isI/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/FA_CHDS3isI")}
          />
          <VideoThumb
            index={8}
            link="https://youtu.be/DqLMs_ZjJAo"
            thumbnail="https://img.youtube.com/vi/DqLMs_ZjJAo/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/DqLMs_ZjJAo")}
          />
          <VideoThumb
            index={9}
            link="https://youtu.be/yQBTMDJbZqs"
            thumbnail="https://img.youtube.com/vi/yQBTMDJbZqs/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/yQBTMDJbZqs")}
          />
          <VideoThumb
            index={10}
            link="https://youtu.be/35kNeNCsCiE"
            thumbnail="https://img.youtube.com/vi/35kNeNCsCiE/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/35kNeNCsCiE")}
          />
          <VideoThumb
            index={11}
            link="https://youtu.be/SqWbNgk7sts"
            thumbnail="https://img.youtube.com/vi/SqWbNgk7sts/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/SqWbNgk7sts")}
          />
          <VideoThumb
            index={12}
            link="https://youtu.be/NJ8ZWE47AxI"
            thumbnail="https://img.youtube.com/vi/NJ8ZWE47AxI/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/NJ8ZWE47AxI")}
          />
          <VideoThumb
            index={13}
            link="https://youtu.be/pgD-f8LN_RI"
            thumbnail="https://img.youtube.com/vi/pgD-f8LN_RI/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/pgD-f8LN_RI")}
          />
          <VideoThumb
            index={14}
            link="https://youtu.be/7bwDGSyputs"
            thumbnail="https://img.youtube.com/vi/7bwDGSyputs/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/7bwDGSyputs")}
          />
          <VideoThumb
            index={15}
            link="https://youtu.be/3bbeO_Oeuww"
            thumbnail="https://img.youtube.com/vi/3bbeO_Oeuww/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/3bbeO_Oeuww")}
          />
          <VideoThumb
            index={16}
            link="https://youtu.be/2o6psQvjPro"
            thumbnail="https://img.youtube.com/vi/2o6psQvjPro/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/2o6psQvjPro")}
          />
          <VideoThumb
            index={17}
            link="https://youtu.be/l6R0GHiwamg"
            thumbnail="https://img.youtube.com/vi/l6R0GHiwamg/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/l6R0GHiwamg")}
          />
          <VideoThumb
            index={18}
            link="https://youtu.be/nLWVOc5mTss"
            thumbnail="https://img.youtube.com/vi/nLWVOc5mTss/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/nLWVOc5mTss")}
          />
          <VideoThumb
            index={19}
            link="https://youtu.be/yrux75M3ruE"
            thumbnail="https://img.youtube.com/vi/yrux75M3ruE/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/yrux75M3ruE")}
          />
          <VideoThumb
            index={20}
            link="https://youtu.be/3u-EkfELgbQ"
            thumbnail="https://img.youtube.com/vi/3u-EkfELgbQ/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/3u-EkfELgbQ")}
          />
          <VideoThumb
            index={21}
            link="https://youtu.be/lq16eZORYsM"
            thumbnail="https://img.youtube.com/vi/lq16eZORYsM/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/lq16eZORYsM")}
          />
          <VideoThumb
            index={22}
            link="https://youtu.be/5QERR_1NLRg"
            thumbnail="https://img.youtube.com/vi/5QERR_1NLRg/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/5QERR_1NLRg")}
          />
          <VideoThumb
            index={23}
            link="https://youtu.be/f4OObKJ25-w"
            thumbnail="https://img.youtube.com/vi/f4OObKJ25-w/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/f4OObKJ25-w")}
          />
        </div>
      </div>

      {/* ADDITIONAL VIDEOS */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
        <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <VideoThumb index={0}
            link="https://youtu.be/rScv5aHz2xY"
            thumbnail="https://img.youtube.com/vi/rScv5aHz2xY/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/rScv5aHz2xY")} />
          <VideoThumb index={1}
            link="https://youtu.be/OjTLuVt2TMk"
            thumbnail="https://img.youtube.com/vi/OjTLuVt2TMk/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/OjTLuVt2TMk")} />
          <VideoThumb index={2}
            link="https://youtu.be/zjpcrxXfW7o"
            thumbnail="https://img.youtube.com/vi/zjpcrxXfW7o/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/zjpcrxXfW7o")} />
        </div>
      </div>
    </div>
  );
}

// ─── 3X3 Content ─────────────────────────────────────────────────────────────

function ThreeXThreeContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      <SectionBadge label="3X3" />

      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}

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

function WatchPlaylistButton({ label = "WATCH PLAYLIST", href, onClick }: { label?: string; href?: string; onClick?: () => void }) {
  const h = useHover();
  const handleClick = () => {
    if (onClick) onClick();
    else if (href) window.open(href, "_blank", "noopener,noreferrer");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <button
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        onClick={handleClick}
        style={{
          background: h.on ? T.orange : "transparent",
          border: `2px solid ${T.orange}`,
          borderRadius: 4,
          padding: "8px 28px",
          cursor: (href || onClick) ? "pointer" : "default",
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
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="TRAVELLING" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/Se67lfUH-eg"
          thumbnail="https://img.youtube.com/vi/Se67lfUH-eg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Se67lfUH-eg")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/_bhUBOcD9s4"
          thumbnail="https://img.youtube.com/vi/_bhUBOcD9s4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/_bhUBOcD9s4")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/0lHj820i1tY"
          thumbnail="https://img.youtube.com/vi/0lHj820i1tY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/0lHj820i1tY")}
        />
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
          <DocCard link="https://www.refereevision.com/Travel_Sig.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Travel.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/Travel_int.png" />
        </div>
      </div>

      {/* PLAYER IN PROGRESSION */}
      <SubSectionBadge label="PLAYER IN PROGRESSION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/43GjHG577tU"
          thumbnail="https://img.youtube.com/vi/43GjHG577tU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/43GjHG577tU")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/EUtTUyjgAeI"
          thumbnail="https://img.youtube.com/vi/EUtTUyjgAeI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/EUtTUyjgAeI")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/Z4Dcz8us6_M"
          thumbnail="https://img.youtube.com/vi/Z4Dcz8us6_M/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Z4Dcz8us6_M")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/K9Xj1U4zTAc"
          thumbnail="https://img.youtube.com/vi/K9Xj1U4zTAc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/K9Xj1U4zTAc")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/blTdEP8SKrU"
          thumbnail="https://img.youtube.com/vi/blTdEP8SKrU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/blTdEP8SKrU")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/X0GvuEtXFpM"
          thumbnail="https://img.youtube.com/vi/X0GvuEtXFpM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/X0GvuEtXFpM")}
        />
      </div>

      {/* STATIONARY PLAYER */}
      <SubSectionBadge label="STATIONARY PLAYER" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/vJLA2U0kuaM"
          thumbnail="https://img.youtube.com/vi/vJLA2U0kuaM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/vJLA2U0kuaM")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/TJldIQbBQe0"
          thumbnail="https://img.youtube.com/vi/TJldIQbBQe0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/TJldIQbBQe0")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/Y209oiiDbBI"
          thumbnail="https://img.youtube.com/vi/Y209oiiDbBI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Y209oiiDbBI")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/yzgnwRpVQNY"
          thumbnail="https://img.youtube.com/vi/yzgnwRpVQNY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/yzgnwRpVQNY")}
        />
      </div>

      {/* AIRBORNE PLAYER + PLAYER ON THE FLOOR */}
      <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="AIRBORNE PLAYER" />
          <VideoThumb
            index={8}
            link="https://youtu.be/gsFe5l3ppiQ"
            thumbnail="https://img.youtube.com/vi/gsFe5l3ppiQ/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/gsFe5l3ppiQ")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PLAYER ON THE FLOOR" />
          <VideoThumb
            index={9}
            link="https://youtu.be/1PAc9SZX3BQ"
            thumbnail="https://img.youtube.com/vi/1PAc9SZX3BQ/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/1PAc9SZX3BQ")}
          />
        </div>
      </div>

      {/* HOPPING WITH THE SAME FOOT */}
      <SubSectionBadge label="HOPPING WITH THE SAME FOOT" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/kzUN5seJ_tk"
          thumbnail="https://img.youtube.com/vi/kzUN5seJ_tk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/kzUN5seJ_tk")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/23U1ct0D51Y"
          thumbnail="https://img.youtube.com/vi/23U1ct0D51Y/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/23U1ct0D51Y")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/J1UzDSj6yuE"
          thumbnail="https://img.youtube.com/vi/J1UzDSj6yuE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/J1UzDSj6yuE")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/a_RHaBc1NGM"
          thumbnail="https://img.youtube.com/vi/a_RHaBc1NGM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/a_RHaBc1NGM")}
        />
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/sIIHbBDdlHs"
          thumbnail="https://img.youtube.com/vi/sIIHbBDdlHs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/sIIHbBDdlHs")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/qOCvz4DmTCs"
          thumbnail="https://img.youtube.com/vi/qOCvz4DmTCs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qOCvz4DmTCs")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/jtG1Bkw1Mw0"
          thumbnail="https://img.youtube.com/vi/jtG1Bkw1Mw0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/jtG1Bkw1Mw0")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/AVSUJ9qO-ps"
          thumbnail="https://img.youtube.com/vi/AVSUJ9qO-ps/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/AVSUJ9qO-ps")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/h5b8hzLRVpQ"
          thumbnail="https://img.youtube.com/vi/h5b8hzLRVpQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/h5b8hzLRVpQ")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/Xb9UiLYP6a8"
          thumbnail="https://img.youtube.com/vi/Xb9UiLYP6a8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Xb9UiLYP6a8")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/LR-Z3TxuLjk"
          thumbnail="https://img.youtube.com/vi/LR-Z3TxuLjk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/LR-Z3TxuLjk")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/s6vawwNJmbE"
          thumbnail="https://img.youtube.com/vi/s6vawwNJmbE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/s6vawwNJmbE")}
        />
        <VideoThumb
          index={8}
          link="https://youtu.be/SGHyqHEwTyc"
          thumbnail="https://img.youtube.com/vi/SGHyqHEwTyc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/SGHyqHEwTyc")}
        />
        <VideoThumb
          index={9}
          link="https://youtu.be/xE2Eu197O-4"
          thumbnail="https://img.youtube.com/vi/xE2Eu197O-4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/xE2Eu197O-4")}
        />
        <VideoThumb
          index={10}
          link="https://youtu.be/IrYu8QUJdqo"
          thumbnail="https://img.youtube.com/vi/IrYu8QUJdqo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/IrYu8QUJdqo")}
        />
        <VideoThumb
          index={11}
          link="https://youtu.be/fAoPQxfI9RA"
          thumbnail="https://img.youtube.com/vi/fAoPQxfI9RA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/fAoPQxfI9RA")}
        />
        <VideoThumb
          index={12}
          link="https://youtu.be/1N6TCQ7q8vw"
          thumbnail="https://img.youtube.com/vi/1N6TCQ7q8vw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/1N6TCQ7q8vw")}
        />
        <VideoThumb
          index={13}
          link="https://youtu.be/7w_6ZMYVIqM"
          thumbnail="https://img.youtube.com/vi/7w_6ZMYVIqM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/7w_6ZMYVIqM")}
        />
        <VideoThumb
          index={14}
          link="https://youtu.be/pOg0mbDiSUI"
          thumbnail="https://img.youtube.com/vi/pOg0mbDiSUI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/pOg0mbDiSUI")}
        />
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp2n1_JX1AeNRq2wsPj-N7F&loop=1")} />
    </div>
  );
}

// ─── ACT OF SHOOTING Content ──────────────────────────────────────────────────

function ActOfShootingContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="ACT OF SHOOTING & GOAL: WHEN MADE AND ITS VALUE" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/KNAeDkqbX5o"
          thumbnail="https://img.youtube.com/vi/KNAeDkqbX5o/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/KNAeDkqbX5o")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/uJfohyL35gI"
          thumbnail="https://img.youtube.com/vi/uJfohyL35gI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/uJfohyL35gI")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/4Tbqxo5koLo"
          thumbnail="https://img.youtube.com/vi/4Tbqxo5koLo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/4Tbqxo5koLo")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/AAEgC0QfmlY"
          thumbnail="https://img.youtube.com/vi/AAEgC0QfmlY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/AAEgC0QfmlY")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/d4DtXy0JieI"
          thumbnail="https://img.youtube.com/vi/d4DtXy0JieI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/d4DtXy0JieI")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/EN3VZ4pxhJs"
          thumbnail="https://img.youtube.com/vi/EN3VZ4pxhJs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/EN3VZ4pxhJs")}
        />
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
            <DocCard link="https://www.refereevision.com/faos_Sig.png" />
            <DocCard link="https://www.refereevision.com/notfaos_Sig.png" />
            <DocCard link="https://www.refereevision.com/Signals/passoff_sig.png" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/AOS_Goal_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/Aos_goal_int.jpg" />
        </div>
      </div>

      {/* PRESENTATION */}
      <SubSectionBadge label="PRESENTATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 28 }}>
        <DocCard link="https://www.refereevision.com/PAOS_ppt.jpg" />
        <DocCard link="https://www.refereevision.com/Goal_ppt.jpg" />
      </div>

      {/* COVERING A SHOT */}
      <SubSectionBadge label="COVERING A SHOT (1 - 2 - 3 TECHNIQUE)" />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div
          onClick={() => setActiveVideo("https://www.refereevision.com/coveringashot.png")}
          style={{
            width: isMobile ? 180 : 220,
            aspectRatio: "4 / 3",
            background: T.charcoal,
            border: `2px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <img
            src="https://www.refereevision.com/coveringashot.png"
            alt="Covering a shot technique diagram"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
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
        <VideoThumb
          index={0}
          link="https://youtu.be/sczWpL0H0Tc"
          thumbnail="https://img.youtube.com/vi/sczWpL0H0Tc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/sczWpL0H0Tc")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/PDC0WfLsZZw"
          thumbnail="https://img.youtube.com/vi/PDC0WfLsZZw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/PDC0WfLsZZw")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/OXsueJ5yvpM"
          thumbnail="https://img.youtube.com/vi/OXsueJ5yvpM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/OXsueJ5yvpM")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/7sZdvH81jGM"
          thumbnail="https://img.youtube.com/vi/7sZdvH81jGM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/7sZdvH81jGM")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/6D_XuyoDba8"
          thumbnail="https://img.youtube.com/vi/6D_XuyoDba8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/6D_XuyoDba8")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/f3fpwuKx9gY"
          thumbnail="https://img.youtube.com/vi/f3fpwuKx9gY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/f3fpwuKx9gY")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/hL-JyBsJuSY"
          thumbnail="https://img.youtube.com/vi/hL-JyBsJuSY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/hL-JyBsJuSY")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/ArtWET26h1k"
          thumbnail="https://img.youtube.com/vi/ArtWET26h1k/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/ArtWET26h1k")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhq3ceh6FqY0CZxtlZfs6bJb")} />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp3iUKl_2IrXHQF34fXxedR")} />
    </div>
  );
}

// ─── CONTACT Content ─────────────────────────────────────────────────────────

const CONTACT_SIGNALS_ROW1 = [
  { label: "HOLDING", link: "https://www.refereevision.com/Hold_Sig.png" },
  { label: "BLOCKING / DEFENSE / ILLEGAL SCREEN (OFFENSE)", link: "https://www.refereevision.com/screen_Sig.png" },
  { label: "PUSHING OR CHARGING WITHOUT THE BALL", link: "https://www.refereevision.com/Push_Sig.png" },
  { label: "HANDCHECKING", link: "https://www.refereevision.com/handcheck_Sig.png" },
  { label: "ILLEGAL USE OF HANDS", link: "https://www.refereevision.com/Illegaluseofhands_Sig.png" },
  { label: "ILLEGAL CYLINDER", link: "https://www.refereevision.com/IllegalCylinder_Sig.png" },
  { label: "ILLEGAL CONTACT TO THE HAND", link: "https://www.refereevision.com/strike_Sig.png" },
  { label: "EXCESSIVE SWINGING OF ELBOW", link: "https://www.refereevision.com/elbow_Sig.png" },
];

const CONTACT_SIGNALS_ROW2 = [
  { label: "FOUL BY TEAM IN CONTROL OF THE BALL", link: "https://www.refereevision.com/Offensive_Sig.png" },
  { label: "HIT TO THE HEAD", link: "https://www.refereevision.com/HittoHead_sig.png" },
  { label: "HOOKING", link: "https://www.refereevision.com/hook_Sig.png" },
  { label: "CHARGING WITH THE BALL", link: "https://www.refereevision.com/Charge_Sig.png" },
];

function ContactContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="CONTACT" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/M3Gn314_dQ8"
          thumbnail="https://img.youtube.com/vi/M3Gn314_dQ8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/M3Gn314_dQ8")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/y6UH5SAULLs"
          thumbnail="https://img.youtube.com/vi/y6UH5SAULLs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/y6UH5SAULLs")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/qKrBKTJiqt8"
          thumbnail="https://img.youtube.com/vi/qKrBKTJiqt8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qKrBKTJiqt8")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/QSAyxApc_Ww"
          thumbnail="https://img.youtube.com/vi/QSAyxApc_Ww/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QSAyxApc_Ww")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/pviT88qnbsY"
          thumbnail="https://img.youtube.com/vi/HUQLOIEKMTA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/pviT88qnbsY")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/3FkO06fOaGo"
          thumbnail="https://img.youtube.com/vi/3FkO06fOaGo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/3FkO06fOaGo")}
        />
      </div>

      {/* SIGNALS */}
      <CylinderSectionHeader label="SIGNALS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        {CONTACT_SIGNALS_ROW1.map((item, i) => <DocCard key={i} label={item.label} link={item.link} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
        {CONTACT_SIGNALS_ROW2.map((item, i) => <DocCard key={i} label={item.label} link={item.link} />)}
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
          <DocCard link="https://www.refereevision.com/contact_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/contact_int.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard link="https://www.refereevision.com/Contact_LGP_ppt.jpg" />
            <DocCard link="https://www.refereevision.com/contact_other_ppt.jpg" />
          </div>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* THROW-IN FOUL */}
      <SubSectionBadge label="THROW-IN FOUL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/q6PF-h0Dy70"
          thumbnail="https://img.youtube.com/vi/q6PF-h0Dy70/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/q6PF-h0Dy70")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/G2khP2VcYTY"
          thumbnail="https://img.youtube.com/vi/G2khP2VcYTY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/G2khP2VcYTY")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/8KamOhjTkwY"
          thumbnail="https://img.youtube.com/vi/8KamOhjTkwY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/8KamOhjTkwY")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/ngG11lXLFC0"
          thumbnail="https://img.youtube.com/vi/ngG11lXLFC0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/ngG11lXLFC0")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/kZVkwHmgZ5o"
          thumbnail="https://img.youtube.com/vi/kZVkwHmgZ5o/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/kZVkwHmgZ5o")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/48aib5KrGZo"
          thumbnail="https://img.youtube.com/vi/48aib5KrGZo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/48aib5KrGZo")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/8HgVqwADCMk"
          thumbnail="https://img.youtube.com/vi/8HgVqwADCMk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/8HgVqwADCMk")}
        />
      </div>

      {/* HANDCHECK */}
      <SubSectionBadge label="HANDCHECK" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/NVRfrVVrKQY"
          thumbnail="https://img.youtube.com/vi/NVRfrVVrKQY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/NVRfrVVrKQY")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/Up73v1dPF74"
          thumbnail="https://img.youtube.com/vi/Up73v1dPF74/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Up73v1dPF74")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/rI33vyiqqRI"
          thumbnail="https://img.youtube.com/vi/rI33vyiqqRI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rI33vyiqqRI")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/Mn-k5qsOgz4"
          thumbnail="https://img.youtube.com/vi/Mn-k5qsOgz4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Mn-k5qsOgz4")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/3ITzQQo27lo"
          thumbnail="https://img.youtube.com/vi/3ITzQQo27lo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/3ITzQQo27lo")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/HUQLOIEKMTA"
          thumbnail="https://img.youtube.com/vi/HUQLOIEKMTA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/HUQLOIEKMTA")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/qTwBTCOLwrw"
          thumbnail="https://img.youtube.com/vi/qTwBTCOLwrw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qTwBTCOLwrw")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/_VgGT_w9RQU"
          thumbnail="https://img.youtube.com/vi/_VgGT_w9RQU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/_VgGT_w9RQU")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhrP_8-3WpGv6nxGj2cED5Z1")} />

      {/* HOLDING/PUSHING */}
      <SubSectionBadge label="HOLDING/PUSHING" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/GHjEf4iQxfE"
          thumbnail="https://img.youtube.com/vi/GHjEf4iQxfE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/GHjEf4iQxfE")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/x-x9reaDL30"
          thumbnail="https://img.youtube.com/vi/x-x9reaDL30/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/x-x9reaDL30")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/eWmRYr5udxw"
          thumbnail="https://img.youtube.com/vi/eWmRYr5udxw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/eWmRYr5udxw")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/pMUKlxS_cpI"
          thumbnail="https://img.youtube.com/vi/pMUKlxS_cpI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/pMUKlxS_cpI")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/yEhfAnX4INU"
          thumbnail="https://img.youtube.com/vi/yEhfAnX4INU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/yEhfAnX4INU")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/6wO7DYX5DW0"
          thumbnail="https://img.youtube.com/vi/6wO7DYX5DW0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/6wO7DYX5DW0")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/qTwBTCOLwrw"
          thumbnail="https://img.youtube.com/vi/7LOGCcNkL1w/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qTwBTCOLwrw")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/GviWbteuYyk"
          thumbnail="https://img.youtube.com/vi/GviWbteuYyk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/GviWbteuYyk")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhrTuxjJjM_SSSZvRXJ5b5rZ")} />

      {/* OFF THE BALL */}
      <SubSectionBadge label="OFF THE BALL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/BdtxdXAd-JA"
          thumbnail="https://img.youtube.com/vi/BdtxdXAd-JA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/BdtxdXAd-JA")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/UGCjImzBCOg"
          thumbnail="https://img.youtube.com/vi/UGCjImzBCOg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/UGCjImzBCOg")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/CkACrJfdcsc"
          thumbnail="https://img.youtube.com/vi/CkACrJfdcsc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/CkACrJfdcsc")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/SAO3nRc5STs"
          thumbnail="https://img.youtube.com/vi/SAO3nRc5STs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/SAO3nRc5STs")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/_A5SyPSakNo"
          thumbnail="https://img.youtube.com/vi/_A5SyPSakNo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/_A5SyPSakNo")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/T4cJTV4hqb0"
          thumbnail="https://img.youtube.com/vi/T4cJTV4hqb0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/T4cJTV4hqb0")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/EuYe2Okq6xo"
          thumbnail="https://img.youtube.com/vi/EuYe2Okq6xo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/EuYe2Okq6xo")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/-AMO1Mt2hwI"
          thumbnail="https://img.youtube.com/vi/-AMO1Mt2hwI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/-AMO1Mt2hwI")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkho5t6PS2qlVh2qdfLiLpnvb")} />

      {/* OFFENSIVE FOUL */}
      <SubSectionBadge label="OFFENSIVE FOUL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/0-a75CaZDXQ"
          thumbnail="https://img.youtube.com/vi/0-a75CaZDXQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/0-a75CaZDXQ")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/KxXb9RFfEXE"
          thumbnail="https://img.youtube.com/vi/KxXb9RFfEXE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/KxXb9RFfEXE")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/GmvnuzgPHfU"
          thumbnail="https://img.youtube.com/vi/GmvnuzgPHfU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/GmvnuzgPHfU")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/o3k_mFdRBVE"
          thumbnail="https://img.youtube.com/vi/o3k_mFdRBVE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/o3k_mFdRBVE")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/9G2fgRbmdd0"
          thumbnail="https://img.youtube.com/vi/9G2fgRbmdd0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/9G2fgRbmdd0")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/8kowY80qzYM"
          thumbnail="https://img.youtube.com/vi/8kowY80qzYM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/8kowY80qzYM")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/Aa-lTJ8T7Mw"
          thumbnail="https://img.youtube.com/vi/Aa-lTJ8T7Mw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Aa-lTJ8T7Mw")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/vblwobps0kM"
          thumbnail="https://img.youtube.com/vi/vblwobps0kM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/vblwobps0kM")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkho1lIBgM6Ruioa0N79p86kY")} />

      {/* HOOKING */}
      <SubSectionBadge label="HOOKING" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/0QTW2cltlWA"
          thumbnail="https://img.youtube.com/vi/0QTW2cltlWA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/0QTW2cltlWA")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/rE0IcGOypNQ"
          thumbnail="https://img.youtube.com/vi/rE0IcGOypNQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rE0IcGOypNQ")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/_To1wGYxX1w"
          thumbnail="https://img.youtube.com/vi/_To1wGYxX1w/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/_To1wGYxX1w")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/0hWE1-OGoQY"
          thumbnail="https://img.youtube.com/vi/0hWE1-OGoQY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/0hWE1-OGoQY")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/vPzt5BxMYDI"
          thumbnail="https://img.youtube.com/vi/vPzt5BxMYDI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/vPzt5BxMYDI")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/rqfRxG5J1oA"
          thumbnail="https://img.youtube.com/vi/rqfRxG5J1oA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rqfRxG5J1oA")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/ttCHuesMCkY"
          thumbnail="https://img.youtube.com/vi/ttCHuesMCkY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/ttCHuesMCkY")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/dQCqq3Rmg00"
          thumbnail="https://img.youtube.com/vi/dQCqq3Rmg00/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/dQCqq3Rmg00")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhqm3iPjCuimHudHyH6gOtvQ")} />

      {/* POSTPLAY */}
      <SubSectionBadge label="POSTPLAY" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/fplsW-eSlT0"
          thumbnail="https://img.youtube.com/vi/fplsW-eSlT0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/fplsW-eSlT0")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/DTiT45rLPq4"
          thumbnail="https://img.youtube.com/vi/DTiT45rLPq4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/DTiT45rLPq4")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/fcSk8e_Jyu8"
          thumbnail="https://img.youtube.com/vi/fcSk8e_Jyu8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/fcSk8e_Jyu8")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/wjjsXxxHlKQ"
          thumbnail="https://img.youtube.com/vi/wjjsXxxHlKQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/wjjsXxxHlKQ")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/wEGTeiRyAU4"
          thumbnail="https://img.youtube.com/vi/wEGTeiRyAU4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/wEGTeiRyAU4")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/n07iWdOnng8"
          thumbnail="https://img.youtube.com/vi/n07iWdOnng8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/n07iWdOnng8")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/k6zYkI0wAN8"
          thumbnail="https://img.youtube.com/vi/k6zYkI0wAN8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/k6zYkI0wAN8")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhpu2zMbplx9LjfD7fFosA-j")} />

      {/* REBOUNDS */}
      <SubSectionBadge label="REBOUNDS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/6LtMr-k43e0"
          thumbnail="https://img.youtube.com/vi/6LtMr-k43e0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/6LtMr-k43e0")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/l1N_cCYdtiM"
          thumbnail="https://img.youtube.com/vi/l1N_cCYdtiM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/l1N_cCYdtiM")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/NbZLoflKpYE"
          thumbnail="https://img.youtube.com/vi/NbZLoflKpYE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/NbZLoflKpYE")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/QoFbusebJRk"
          thumbnail="https://img.youtube.com/vi/QoFbusebJRk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QoFbusebJRk")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/1RUknISIsu0"
          thumbnail="https://img.youtube.com/vi/1RUknISIsu0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/1RUknISIsu0")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/Xex8lqqnJKs"
          thumbnail="https://img.youtube.com/vi/Xex8lqqnJKs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Xex8lqqnJKs")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/qeflx9_v-dQ"
          thumbnail="https://img.youtube.com/vi/qeflx9_v-dQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qeflx9_v-dQ")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/MTOND4EYXUQ"
          thumbnail="https://img.youtube.com/vi/MTOND4EYXUQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/MTOND4EYXUQ")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhoym9GbAXlvAkke1hHBMCbv")} />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <WatchPlaylistButton label="WATCH OFFENSIVE FOUL PLAYLIST" onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhpc1ucq2afBY5xRQv9esTXJ")} />
        <WatchPlaylistButton label="WATCH DEFENSIVE FOUL PLAYLIST" onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhr0RCQArhOIG7NgBIMH-zNd")} />
        <WatchPlaylistButton label="WATCH REBOUNDING FOUL PLAYLIST" onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhonVyC4wv9f_It5j49Yz5gS")} />
      </div>
    </div>
  );
}

// ─── TIME-OUT & SUBSTITUTION Content ────────────────────────────────────────

function TimeoutSubSection({
  title,
  procedureCount = 1,
  videoCount,
  signalLink,
  articleLink,
  interpretationLink,
  ruleLink,
  procedureLinks,
  summaryLink,
  videos,
  onPlay,
}: {
  title: string;
  procedureCount?: number;
  videoCount: number;
  signalLink?: string;
  articleLink?: string;
  interpretationLink?: string;
  ruleLink?: string;
  procedureLinks?: string[];
  summaryLink?: string;
  videos?: { link: string; thumbnail: string }[];
  onPlay?: (url: string) => void;
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard link={signalLink} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link={articleLink} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link={interpretationLink} />
        </div>
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
          <DocCard link={ruleLink} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PROCEDURE" />
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: procedureCount }).map((_, i) => <DocCard key={i} link={procedureLinks?.[i]} />)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SUMMARY" />
          <DocCard link={summaryLink} />
        </div>
      </div>

      {/* FIBA Educational Videos */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {Array.from({ length: videoCount }).map((_, i) => {
          const vid = videos?.[i];
          if (vid && onPlay) {
            return (
              <VideoThumb
                key={i}
                index={i}
                link={vid.link}
                thumbnail={vid.thumbnail}
                onPlay={() => onPlay(vid.link)}
              />
            );
          }
          return <VideoCard key={i} index={i} />;
        })}
      </div>
    </div>
  );
}

function TimeoutSubstitutionContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="TIME-OUT & SUBSTITUTION" />
      <div style={{ marginTop: 32 }}>
        <TimeoutSubSection
          title="TIME-OUT"
          procedureCount={2}
          videoCount={5}
          signalLink="https://www.refereevision.com/Signals/Timeout_sig.png"
          articleLink="https://www.refereevision.com/timeout_art.png"
          interpretationLink="https://www.refereevision.com/to_int.jpg"
          ruleLink="https://www.refereevision.com/to_rule.jpg"
          procedureLinks={["https://www.refereevision.com/to_procedure1.jpg", "https://www.refereevision.com/to_procedure2.jpg"]}
          summaryLink="https://www.refereevision.com/to_summary.jpg"
          onPlay={setActiveVideo}
          videos={[
            { link: "https://library.fibairef.basketball/cdn/TOM303_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl12.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM304_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl12.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM301_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl13.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM302_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl13.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM300_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl13.png" },
          ]}
        />
        <TimeoutSubSection
          title="SUBSTITUTION"
          procedureCount={1}
          videoCount={2}
          signalLink="https://www.refereevision.com/Signals/Sub_sig.png"
          onPlay={setActiveVideo}
          articleLink="https://www.refereevision.com/sub_art.jpg"
          interpretationLink="https://www.refereevision.com/to_int.jpg"
          ruleLink="https://www.refereevision.com/sub_rule.jpg"
          procedureLinks={["https://www.refereevision.com/sub_procedure.jpg"]}
          summaryLink="https://www.refereevision.com/sub_summary.jpg"
          videos={[
            { link: "https://library.fibairef.basketball/cdn/TOM600_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl15.png" },
            { link: "https://library.fibairef.basketball/cdn/TOM601_EN?autoplay=1", thumbnail: "https://www.refereevision.com/tbloffl15.png" }
          ]}
        />
      </div>
    </div>
  );
}

// ─── ALTERNATING POSSESSION Content ──────────────────────────────────────────

function AlternatingPossessionContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
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
            <DocCard link="https://www.refereevision.com/apa_rule.jpg" />
            <DocCard link="https://www.refereevision.com/apa_specs.jpg" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/apa_art.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/jumpball_int.jpg" />
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
          <DocCard link="https://www.refereevision.com/apa_rule.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/jumpball_ppt.jpg" />
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
          <DocCard link="https://www.refereevision.com/apa_change.jpg" />
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
          <DocCard link="https://www.refereevision.com/apa_nochange.jpg" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 12,
          margin: "0 auto",
        }}
      >
        <VideoThumb
          index={0}
          link="https://library.fibairef.basketball/cdn/TOM403_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM403_EN?autoplay=1")}
        />
        <VideoThumb
          index={1}
          link="https://library.fibairef.basketball/cdn/TOM404_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM404_EN?autoplay=1")}
        />
        <VideoThumb
          index={2}
          link="https://library.fibairef.basketball/cdn/TOM402_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM402_EN?autoplay=1")}
        />
        <VideoThumb
          index={3}
          link="https://library.fibairef.basketball/cdn/TOM400_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM400_EN?autoplay=1")}
        />
        <VideoThumb
          index={4}
          link="https://library.fibairef.basketball/cdn/TOM405_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM405_EN?autoplay=1")}
        />
        <VideoThumb
          index={5}
          link="https://library.fibairef.basketball/cdn/TOM401_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM401_EN?autoplay=1")}
        />
        <VideoThumb
          index={6}
          link="https://library.fibairef.basketball/cdn/TOM406_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM406_EN?autoplay=1")}
        />
        <VideoThumb
          index={7}
          link="https://library.fibairef.basketball/cdn/TOM407_EN?autoplay=1"
          thumbnail="https://www.refereevision.com/tbloffl10.png"
          onPlay={() => setActiveVideo("https://library.fibairef.basketball/cdn/TOM407_EN?autoplay=1")}
        />
      </div>
    </div>
  );
}

// ─── DRIBBLING Content ───────────────────────────────────────────────────────

function DribblingContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
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
          <VideoThumb
            index={0}
            link="https://youtu.be/gCQ5BqrA638"
            thumbnail="https://img.youtube.com/vi/gCQ5BqrA638/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/gCQ5BqrA638")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNALS" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard cols={2} link="https://www.refereevision.com/Carry_Sig.png" />
            <DocCard cols={2} link="https://www.refereevision.com/DoubleDribble_Sig.png" />
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Dribble_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/Dribble_int.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/Dribble_ppt.jpg" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* CARRYING THE BALL */}
      <SubSectionBadge label="CARRYING THE BALL" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/PQM5LNNcWGk"
          thumbnail="https://img.youtube.com/vi/PQM5LNNcWGk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/PQM5LNNcWGk")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/_i3fkM0lZFQ"
          thumbnail="https://img.youtube.com/vi/_i3fkM0lZFQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/_i3fkM0lZFQ")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/CvZ2-eljIPU"
          thumbnail="https://img.youtube.com/vi/CvZ2-eljIPU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/CvZ2-eljIPU")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/W0sAsp3L5eg"
          thumbnail="https://img.youtube.com/vi/W0sAsp3L5eg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/W0sAsp3L5eg")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/ToRqc1hans0"
          thumbnail="https://img.youtube.com/vi/ToRqc1hans0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/ToRqc1hans0")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/TcG8h1hZeTQ"
          thumbnail="https://img.youtube.com/vi/TcG8h1hZeTQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/TcG8h1hZeTQ")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/ZRQktHjSKlQ"
          thumbnail="https://img.youtube.com/vi/ZRQktHjSKlQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/ZRQktHjSKlQ")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/waR_1GlN44M"
          thumbnail="https://img.youtube.com/vi/waR_1GlN44M/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/waR_1GlN44M")}
        />
      </div>

      {/* DOUBLE DRIBBLE */}
      <SubSectionBadge label="DOUBLE DRIBBLE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/EWwrOyKMK3o"
          thumbnail="https://img.youtube.com/vi/EWwrOyKMK3o/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/EWwrOyKMK3o")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/21yzPenKjz0"
          thumbnail="https://img.youtube.com/vi/21yzPenKjz0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/21yzPenKjz0")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/NQV7HdT0o6s"
          thumbnail="https://img.youtube.com/vi/NQV7HdT0o6s/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/NQV7HdT0o6s")}
        />
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhqxv_gJTL6XyQmw2OJ3ZDeC")} />
    </div>
  );
}

// ─── DISRUPTIVE FOUL Content ─────────────────────────────────────────────

function DisruptiveFoulContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="DISRUPTIVE FOUL" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://library.fibairef.basketball/cdn/OBR2026_Webinar_Recording"
          thumbnail="https://www.refereevision.com/thumbnail_di1.jpg"
          onPlay={() =>
            setActiveVideo({
              url: "https://library.fibairef.basketball/cdn/OBR2026_Webinar_Recording",
              startTime: 1872,
              endTime: 2236,
            })
          }
        />
        <VideoThumb
          index={1}
          link="https://library.fibairef.basketball/images/documents/e5e9cbc651060ac5ecc6d6366ecd5736/Rec_MS2026_27_S1_OBR_2026_Practical_Cases.mp4"
          thumbnail="https://www.refereevision.com/thumbnail_di2.jpg"
          onPlay={() =>
            setActiveVideo({
              url: "https://library.fibairef.basketball/images/documents/e5e9cbc651060ac5ecc6d6366ecd5736/Rec_MS2026_27_S1_OBR_2026_Practical_Cases.mp4",
              startTime: 1150,
              endTime: 1670,
            })
          }
        />        
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard link="https://www.refereevision.com/Signals/disruptive_Sig.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/DI_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/DI_int.jpg" />
        </div>
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
          onClick={() => setActiveVideo("https://www.refereevision.com/difoul_protocol.jpg")}
          style={{
            width: isMobile ? 180 : 240,
            aspectRatio: "16 / 9",
            background: T.charcoal,
            border: `2px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <img
            src="https://www.refereevision.com/difoul_protocol.jpg"
            alt="0 - 1 - 2 Technique Diagram"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* CRITERIA 1 */}
      <SubSectionBadge label="CRITERIA 1" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          An unnecessary contact caused by the defensive player, not legitimately attempting to directly play the ball, to stop the progress of the offensive team in transition. This applies until the offensive player starts the act of shooting
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/dtSE7fwAF-M"
          thumbnail="https://img.youtube.com/vi/dtSE7fwAF-M/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/dtSE7fwAF-M")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/QGmRbRgztN8"
          thumbnail="https://img.youtube.com/vi/QGmRbRgztN8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QGmRbRgztN8")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/aqQ574sbejc"
          thumbnail="https://img.youtube.com/vi/aqQ574sbejc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/aqQ574sbejc")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/JY32dKYDmZ4"
          thumbnail="https://img.youtube.com/vi/JY32dKYDmZ4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/JY32dKYDmZ4")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/_oBqupqxcqg"
          thumbnail="https://img.youtube.com/vi/_oBqupqxcqg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/_oBqupqxcqg")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/rNmorkKtmZQ"
          thumbnail="https://img.youtube.com/vi/rNmorkKtmZQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rNmorkKtmZQ")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/SEvW7x4DZh4"
          thumbnail="https://img.youtube.com/vi/SEvW7x4DZh4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/SEvW7x4DZh4")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/rhbe_-fMkxY"
          thumbnail="https://img.youtube.com/vi/rhbe_-fMkxY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rhbe_-fMkxY")}
        />
      </div>

      {/* CRITERIA2 */}
      <SubSectionBadge label="CRITERIA 2" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          An unnecessary contact caused by the defensive player anywhere on the court, not legitimately attempting to directly play the ball, to stop the game clock and/or shot clock, at the end of a quarter or overtime
        </span>
      </div>
      

      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/M-tG3tdtcjM"
          thumbnail="https://img.youtube.com/vi/M-tG3tdtcjM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/M-tG3tdtcjM")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/aZByfO9iHl4"
          thumbnail="https://img.youtube.com/vi/aZByfO9iHl4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/aZByfO9iHl4")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/M_Kcfn3b47M"
          thumbnail="https://img.youtube.com/vi/M_Kcfn3b47M/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/M_Kcfn3b47M")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/kQw0KLGiac0"
          thumbnail="https://img.youtube.com/vi/kQw0KLGiac0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/kQw0KLGiac0")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/cTBHqCcC9ws"
          thumbnail="https://img.youtube.com/vi/cTBHqCcC9ws/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/cTBHqCcC9ws")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/k8ahz-lxgQE"
          thumbnail="https://img.youtube.com/vi/k8ahz-lxgQE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/k8ahz-lxgQE")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/DT0MG87rz-4"
          thumbnail="https://img.youtube.com/vi/DT0MG87rz-4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/DT0MG87rz-4")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/GIIhLTBA15Y"
          thumbnail="https://img.youtube.com/vi/GIIhLTBA15Y/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/GIIhLTBA15Y")}
        />
      </div>

      {/* CRITERIA 3 */}
      <SubSectionBadge label="CRITERIA 3" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          An illegal contact caused by a player from behind or laterally on an opponent, who is progressing towards the opponent’s basket and with no opponents between the progressing player and the basket, and:
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "left", marginBottom: 5 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          –	The progressing player is in control of the ball, or
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "left", marginBottom: 5 }}>      
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          –	The progressing player is attempting to gain control of the ball, or
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "left", marginBottom: 15 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          –	The ball has been released on a pass to the progressing player. This applies until the offensive player starts the act of shooting
        </span>  
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/oxKbVLYWeOM"
          thumbnail="https://img.youtube.com/vi/oxKbVLYWeOM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/oxKbVLYWeOM")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/uMV7qsGl-I0"
          thumbnail="https://img.youtube.com/vi/uMV7qsGl-I0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/uMV7qsGl-I0")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/Hu6emwArPtg"
          thumbnail="https://img.youtube.com/vi/Hu6emwArPtg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Hu6emwArPtg")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/k8ahz-lxgQE"
          thumbnail="https://img.youtube.com/vi/k8ahz-lxgQE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/k8ahz-lxgQE")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/f0XA0wM6ohE"
          thumbnail="https://img.youtube.com/vi/f0XA0wM6ohE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/f0XA0wM6ohE")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/60BV2Mq7x6g"
          thumbnail="https://img.youtube.com/vi/60BV2Mq7x6g/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/60BV2Mq7x6g")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/d8wUMArTNow"
          thumbnail="https://img.youtube.com/vi/d8wUMArTNow/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/d8wUMArTNow")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/u0I8oi2F3G4"
          thumbnail="https://img.youtube.com/vi/u0I8oi2F3G4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/u0I8oi2F3G4")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhonpS-wdc1xNPfD-peHds-Z")} />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/R2omwSU7ZQ8"
          thumbnail="https://img.youtube.com/vi/R2omwSU7ZQ8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/R2omwSU7ZQ8")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/6w9SufPot_g"
          thumbnail="https://img.youtube.com/vi/6w9SufPot_g/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/6w9SufPot_g")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/GnzA1IT9xo8"
          thumbnail="https://img.youtube.com/vi/GnzA1IT9xo8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/GnzA1IT9xo8")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/sqV61aTcPc8"
          thumbnail="https://img.youtube.com/vi/sqV61aTcPc8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/sqV61aTcPc8")}
        />
        <VideoThumb
          index={4}
          link=""
          thumbnail="https://img.youtube.com/vi/PcZig1RHLc8/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={5}
          link=""
          thumbnail="https://img.youtube.com/vi/la3bRSXEGbI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={6}
          link=""
          thumbnail="https://img.youtube.com/vi/oNNWWXxJQhM/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={7}
          link=""
          thumbnail="https://img.youtube.com/vi/k9b8NQC2wbI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={8}
          link=""
          thumbnail="https://img.youtube.com/vi/alD4OsGN_nE/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={9}
          link=""
          thumbnail="https://img.youtube.com/vi/mMAJzD7vNYI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={10}
          link=""
          thumbnail="https://img.youtube.com/vi/F58kDJswUBI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={11}
          link=""
          thumbnail="https://img.youtube.com/vi/HdRz1tddafA/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={12}
          link="https://youtu.be/xpIHJ9gOR64"
          thumbnail="https://img.youtube.com/vi/xpIHJ9gOR64/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/xpIHJ9gOR64")}
        />
        <VideoThumb
          index={13}
          link="https://youtu.be/kuGQj8t0goc"
          thumbnail="https://img.youtube.com/vi/kuGQj8t0goc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/kuGQj8t0goc")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp7WUnx9O_1gB5nzeERoxsz")} />
    </div>
  );
}

// ─── FLAGRANT FOUL Content ─────────────────────────────────────────────

function FlagrantFoulContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="FLAGRANT FOUL" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://library.fibairef.basketball/cdn/OBR2026_Webinar_Recording"
          thumbnail="https://www.refereevision.com/thumbnail_di1.jpg"
          onPlay={() =>
            setActiveVideo({
              url: "https://library.fibairef.basketball/cdn/OBR2026_Webinar_Recording",
              startTime: 2236,
              endTime: 2700,
            })
          }
        />
        <VideoThumb
          index={1}
          link="https://library.fibairef.basketball/images/documents/e5e9cbc651060ac5ecc6d6366ecd5736/Rec_MS2026_27_S1_OBR_2026_Practical_Cases.mp4"
          thumbnail="https://www.refereevision.com/thumbnail_di2.jpg"
          onPlay={() =>
            setActiveVideo({
              url: "https://library.fibairef.basketball/images/documents/e5e9cbc651060ac5ecc6d6366ecd5736/Rec_MS2026_27_S1_OBR_2026_Practical_Cases.mp4",
              startTime: 1670,
              endTime: 2195,
            })
          }
        /> 
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard link="https://www.refereevision.com/usf_Sig.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/FL_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/FL_int.jpg" />
        </div>
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
          onClick={() => setActiveVideo("https://www.refereevision.com/ufoul_protocol.jpg")}
          style={{
            width: isMobile ? 180 : 240,
            aspectRatio: "16 / 9",
            background: T.charcoal,
            border: `2px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <img
            src="https://www.refereevision.com/ufoul_protocol.jpg"
            alt="0 - 1 - 2 Technique Diagram"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* CRITERIA 1 */}
      <SubSectionBadge label="CRITERIA 1" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          Not a legitimate basketball play against an opponent, with or without a ball
        </span>
      </div>
      

      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/dtSE7fwAF-M"
          thumbnail="https://img.youtube.com/vi/dtSE7fwAF-M/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/dtSE7fwAF-M")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/QGmRbRgztN8"
          thumbnail="https://img.youtube.com/vi/QGmRbRgztN8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QGmRbRgztN8")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/aqQ574sbejc"
          thumbnail="https://img.youtube.com/vi/aqQ574sbejc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/aqQ574sbejc")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/JY32dKYDmZ4"
          thumbnail="https://img.youtube.com/vi/JY32dKYDmZ4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/JY32dKYDmZ4")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/_oBqupqxcqg"
          thumbnail="https://img.youtube.com/vi/_oBqupqxcqg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/_oBqupqxcqg")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/rNmorkKtmZQ"
          thumbnail="https://img.youtube.com/vi/rNmorkKtmZQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rNmorkKtmZQ")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/SEvW7x4DZh4"
          thumbnail="https://img.youtube.com/vi/SEvW7x4DZh4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/SEvW7x4DZh4")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/rhbe_-fMkxY"
          thumbnail="https://img.youtube.com/vi/rhbe_-fMkxY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rhbe_-fMkxY")}
        />
      </div>

      {/* CRITERIA 2 */}
      <SubSectionBadge label="CRITERIA 2" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          Reckless, violent or dangerous act, which causes or may cause injury to an opponent
        </span>
      </div>


      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/rj3jBtxyioU"
          thumbnail="https://img.youtube.com/vi/rj3jBtxyioU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rj3jBtxyioU")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/9_5do6CblUo"
          thumbnail="https://img.youtube.com/vi/9_5do6CblUo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/9_5do6CblUo")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/agfa0JtlAUg"
          thumbnail="https://img.youtube.com/vi/agfa0JtlAUg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/agfa0JtlAUg")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/oe_sx4ONpHY"
          thumbnail="https://img.youtube.com/vi/oe_sx4ONpHY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/oe_sx4ONpHY")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/XUWXYVi6OJg"
          thumbnail="https://img.youtube.com/vi/XUWXYVi6OJg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/XUWXYVi6OJg")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/by-6hyJAqFk"
          thumbnail="https://img.youtube.com/vi/by-6hyJAqFk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/by-6hyJAqFk")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/QFfFrr8ub18"
          thumbnail="https://img.youtube.com/vi/QFfFrr8ub18/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QFfFrr8ub18")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/Xs_WanyUFME"
          thumbnail="https://img.youtube.com/vi/Xs_WanyUFME/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Xs_WanyUFME")}
        />
      </div>

      {/* CRITERIA 3 */}
      <SubSectionBadge label="CRITERIA 3" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
          Excessive, hard contact in an effort to play the ball or an opponent
        </span>
      </div>

      
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/rj3jBtxyioU"
          thumbnail="https://img.youtube.com/vi/rj3jBtxyioU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rj3jBtxyioU")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/9_5do6CblUo"
          thumbnail="https://img.youtube.com/vi/9_5do6CblUo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/9_5do6CblUo")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/agfa0JtlAUg"
          thumbnail="https://img.youtube.com/vi/agfa0JtlAUg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/agfa0JtlAUg")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/oe_sx4ONpHY"
          thumbnail="https://img.youtube.com/vi/oe_sx4ONpHY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/oe_sx4ONpHY")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/XUWXYVi6OJg"
          thumbnail="https://img.youtube.com/vi/XUWXYVi6OJg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/XUWXYVi6OJg")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/by-6hyJAqFk"
          thumbnail="https://img.youtube.com/vi/by-6hyJAqFk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/by-6hyJAqFk")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/QFfFrr8ub18"
          thumbnail="https://img.youtube.com/vi/QFfFrr8ub18/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QFfFrr8ub18")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/Xs_WanyUFME"
          thumbnail="https://img.youtube.com/vi/Xs_WanyUFME/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Xs_WanyUFME")}
        />
      </div>


      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhonpS-wdc1xNPfD-peHds-Z")} />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/R2omwSU7ZQ8"
          thumbnail="https://img.youtube.com/vi/R2omwSU7ZQ8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/R2omwSU7ZQ8")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/6w9SufPot_g"
          thumbnail="https://img.youtube.com/vi/6w9SufPot_g/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/6w9SufPot_g")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/GnzA1IT9xo8"
          thumbnail="https://img.youtube.com/vi/GnzA1IT9xo8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/GnzA1IT9xo8")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/sqV61aTcPc8"
          thumbnail="https://img.youtube.com/vi/sqV61aTcPc8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/sqV61aTcPc8")}
        />
        <VideoThumb
          index={4}
          link=""
          thumbnail="https://img.youtube.com/vi/PcZig1RHLc8/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={5}
          link=""
          thumbnail="https://img.youtube.com/vi/la3bRSXEGbI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={6}
          link=""
          thumbnail="https://img.youtube.com/vi/oNNWWXxJQhM/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={7}
          link=""
          thumbnail="https://img.youtube.com/vi/k9b8NQC2wbI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={8}
          link=""
          thumbnail="https://img.youtube.com/vi/alD4OsGN_nE/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={9}
          link=""
          thumbnail="https://img.youtube.com/vi/mMAJzD7vNYI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={10}
          link=""
          thumbnail="https://img.youtube.com/vi/F58kDJswUBI/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={11}
          link=""
          thumbnail="https://img.youtube.com/vi/HdRz1tddafA/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={12}
          link="https://youtu.be/xpIHJ9gOR64"
          thumbnail="https://img.youtube.com/vi/xpIHJ9gOR64/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/xpIHJ9gOR64")}
        />
        <VideoThumb
          index={13}
          link="https://youtu.be/kuGQj8t0goc"
          thumbnail="https://img.youtube.com/vi/kuGQj8t0goc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/kuGQj8t0goc")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp7WUnx9O_1gB5nzeERoxsz")} />
    </div>
  );
}


// ─── SCREENING Content ────────────────────────────────────────────────────────

function ScreeningContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="SCREENING" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/H8bbQZCHSF8"
          thumbnail="https://img.youtube.com/vi/H8bbQZCHSF8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/H8bbQZCHSF8")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/3tDw8GJ50HQ"
          thumbnail="https://img.youtube.com/vi/3tDw8GJ50HQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/3tDw8GJ50HQ")}
        />
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard link="https://www.refereevision.com/screen_Sig.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Scr.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/Screen_ppt.jpg" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/uIjQ79n4dgI"
          thumbnail="https://img.youtube.com/vi/uIjQ79n4dgI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/uIjQ79n4dgI")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/Ak5rwEJbGZU"
          thumbnail="https://img.youtube.com/vi/Ak5rwEJbGZU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Ak5rwEJbGZU")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/kG-_jALi2zI"
          thumbnail="https://img.youtube.com/vi/kG-_jALi2zI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/kG-_jALi2zI")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/8m3njOKQnbw"
          thumbnail="https://img.youtube.com/vi/8m3njOKQnbw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/8m3njOKQnbw")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/FaculEWfWS4"
          thumbnail="https://img.youtube.com/vi/FaculEWfWS4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/FaculEWfWS4")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/kno4-CGLUV4"
          thumbnail="https://img.youtube.com/vi/kno4-CGLUV4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/kno4-CGLUV4")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/Dm0yfez_jbE"
          thumbnail="https://img.youtube.com/vi/Dm0yfez_jbE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Dm0yfez_jbE")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/5osVMl2toAs"
          thumbnail="https://img.youtube.com/vi/5osVMl2toAs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/5osVMl2toAs")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhpOd89By2pV2zkDq_w4JCi2")} />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhpQ2lSAB7i_OGb1d0clLx9g")} />
    </div>
  );
}

// ─── CHARGE & BLOCK Content ───────────────────────────────────────────────────

function ChargeBlockContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
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
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <VideoThumb
              index={0}
              link="https://youtu.be/NJdAnBApDgA"
              thumbnail="https://img.youtube.com/vi/NJdAnBApDgA/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/NJdAnBApDgA")}
            />
            <VideoThumb index={1} link="https://youtu.be/9o3d6Gx_vws" thumbnail="https://img.youtube.com/vi/9o3d6Gx_vws/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/9o3d6Gx_vws")} />
            <VideoThumb index={2} link="https://youtu.be/t_4-9VaXmPI" thumbnail="https://img.youtube.com/vi/t_4-9VaXmPI/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/t_4-9VaXmPI")} />
            <VideoThumb index={3} link="https://youtu.be/ISTCyzF88X8" thumbnail="https://img.youtube.com/vi/ISTCyzF88X8/0.jpg" onPlay={() => setActiveVideo("https://youtu.be/ISTCyzF88X8")} />
          </div>
        </div>

        {/* SIGNALS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNALS" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <DocCard cols={2} link="https://www.refereevision.com/screen_Sig.png" />
            <DocCard cols={2} link="https://www.refereevision.com/Charge_Sig.png" />
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
          <DocCard link="https://www.refereevision.com/block_charge.jpg" />
        </div>

        {/* INTERPRETATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/contact_int.jpg" />
        </div>

        {/* PRESENTATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard link="https://www.refereevision.com/Contact_LGP_ppt.jpg" />
            <DocCard link="https://www.refereevision.com/Contact_ChargeBlock_ppt.jpg" />
          </div>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* BLOCK */}
      <SubSectionBadge label="BLOCK" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/fj9ZI-GEhU4"
          thumbnail="https://img.youtube.com/vi/fj9ZI-GEhU4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/fj9ZI-GEhU4")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/f3PQ-6bdIsQ"
          thumbnail="https://img.youtube.com/vi/f3PQ-6bdIsQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/f3PQ-6bdIsQ")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/3lbSbClOunA"
          thumbnail="https://img.youtube.com/vi/3lbSbClOunA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/3lbSbClOunA")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/f5EfxqOaW_I"
          thumbnail="https://img.youtube.com/vi/f5EfxqOaW_I/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/f5EfxqOaW_I")}
        />
        <VideoThumb
          index={4}
          link=""
          thumbnail="https://img.youtube.com/vi/YMpJrM3SzcU/0.jpg"
          onPlay={() => setActiveVideo("")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/zfNiuTKkU8A"
          thumbnail="https://img.youtube.com/vi/zfNiuTKkU8A/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/zfNiuTKkU8A")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/EySvurQk0D8"
          thumbnail="https://img.youtube.com/vi/EySvurQk0D8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/EySvurQk0D8")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/qQ-rsABrQhY"
          thumbnail="https://img.youtube.com/vi/qQ-rsABrQhY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qQ-rsABrQhY")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhq6btKmGY-fvTQ-ZDuauGK-")} />

      {/* CHARGE */}
      <SubSectionBadge label="CHARGE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/0d6c3_oXfxk"
          thumbnail="https://img.youtube.com/vi/0d6c3_oXfxk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/0d6c3_oXfxk")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/UvXzkF8LzUg"
          thumbnail="https://img.youtube.com/vi/UvXzkF8LzUg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/UvXzkF8LzUg")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/9e9T1zTu1wU"
          thumbnail="https://img.youtube.com/vi/9e9T1zTu1wU/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/9e9T1zTu1wU")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/2a342GsWBTQ"
          thumbnail="https://img.youtube.com/vi/2a342GsWBTQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/2a342GsWBTQ")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/Vg7ywIXV-o0"
          thumbnail="https://img.youtube.com/vi/Vg7ywIXV-o0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Vg7ywIXV-o0")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/JOfPPgOhPaE"
          thumbnail="https://img.youtube.com/vi/JOfPPgOhPaE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/JOfPPgOhPaE")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/HWRIaGc2La0"
          thumbnail="https://img.youtube.com/vi/HWRIaGc2La0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/HWRIaGc2La0")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/VjnbMSHofng"
          thumbnail="https://img.youtube.com/vi/VjnbMSHofng/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/VjnbMSHofng")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhqNgMC8U9X8oBKGHoWXgB02")} />

      {/* PASS AND CRASH */}
      <SubSectionBadge label="PASS AND CRASH" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/Ud1xUkbPFc0"
          thumbnail="https://img.youtube.com/vi/Ud1xUkbPFc0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Ud1xUkbPFc0")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/TR51tcqH6zA"
          thumbnail="https://img.youtube.com/vi/TR51tcqH6zA/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/TR51tcqH6zA")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/ac7R6Dz47TI"
          thumbnail="https://img.youtube.com/vi/ac7R6Dz47TI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/ac7R6Dz47TI")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/GrsJ2SFuiLI"
          thumbnail="https://img.youtube.com/vi/GrsJ2SFuiLI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/GrsJ2SFuiLI")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/bAZmMY9YGh8"
          thumbnail="https://img.youtube.com/vi/bAZmMY9YGh8/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/bAZmMY9YGh8")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/qDnXUGZNDVs"
          thumbnail="https://img.youtube.com/vi/qDnXUGZNDVs/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qDnXUGZNDVs")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/5czhR1szMpo"
          thumbnail="https://img.youtube.com/vi/5czhR1szMpo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/5czhR1szMpo")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/QtS3PrC5Ybo"
          thumbnail="https://img.youtube.com/vi/QtS3PrC5Ybo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QtS3PrC5Ybo")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhrcuPnh-Lp0NxxSNQYphqbc")} />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhoR1LfQdbpijGiKiuypXWdd")} />
    </div>
  );
}

// ─── NO-CHARGE SEMICIRCLE Content ──────────────────────────────────────────────

function NoChargeSemicircleContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="NO-CHARGE SEMICIRCLE" />

      {/* RULE EXPLANATION */}
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/l4Ojjp5W0Xc"
          thumbnail="https://img.youtube.com/vi/l4Ojjp5W0Xc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/l4Ojjp5W0Xc")}
        />
        <VideoCard
          index={1}
          link="https://img.youtube.com/vi/wfov5Mco8pY/0.jpg"
          thumbnail="https://youtu.be/wfov5Mco8pY"
          onPlay={() => setActiveVideo("https://img.youtube.com/vi/wfov5Mco8pY/0.jpg")}
        />
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://refereevision.com/NC_art.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://refereevision.com/NC_Int.png" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/QGclW689z5A"
          thumbnail="https://img.youtube.com/vi/QGclW689z5A/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QGclW689z5A")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/71JE9wIgcEc"
          thumbnail="https://img.youtube.com/vi/71JE9wIgcEc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/71JE9wIgcEc")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/v69Sn7d7kFI"
          thumbnail="https://img.youtube.com/vi/v69Sn7d7kFI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/v69Sn7d7kFI")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/DaDI7jcdv2o"
          thumbnail="https://img.youtube.com/vi/DaDI7jcdv2o/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/DaDI7jcdv2o")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/QwHwGpdxrT4"
          thumbnail="https://img.youtube.com/vi/QwHwGpdxrT4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QwHwGpdxrT4")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/ESiyTV3y88g"
          thumbnail="https://img.youtube.com/vi/ESiyTV3y88g/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/ESiyTV3y88g")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/bKKvrWHBqlc"
          thumbnail="https://img.youtube.com/vi/bKKvrWHBqlc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/bKKvrWHBqlc")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/k6RW9tsjozY"
          thumbnail="https://img.youtube.com/vi/k6RW9tsjozY/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/k6RW9tsjozY")}
        />
        <VideoThumb
          index={8}
          link="https://youtu.be/n6AITdqQfkk"
          thumbnail="https://img.youtube.com/vi/n6AITdqQfkk/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/n6AITdqQfkk")}
        />
        <VideoThumb
          index={9}
          link="https://youtu.be/wCNkmpV0Hjc"
          thumbnail="https://img.youtube.com/vi/wCNkmpV0Hjc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/wCNkmpV0Hjc")}
        />
        <VideoThumb
          index={10}
          link="https://youtu.be/wSDS_tAByLI"
          thumbnail="https://img.youtube.com/vi/wSDS_tAByLI/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/wSDS_tAByLI")}
        />
        <VideoThumb
          index={11}
          link="https://youtu.be/SuLJvSSIK5o"
          thumbnail="https://img.youtube.com/vi/SuLJvSSIK5o/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/SuLJvSSIK5o")}
        />
        <VideoThumb
          index={12}
          link="https://youtu.be/WwLjzCzoHlg"
          thumbnail="https://img.youtube.com/vi/WwLjzCzoHlg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/WwLjzCzoHlg")}
        />
        <VideoThumb
          index={13}
          link="https://youtu.be/FjbtLyprR2A"
          thumbnail="https://img.youtube.com/vi/FjbtLyprR2A/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/FjbtLyprR2A")}
        />
        <VideoThumb
          index={14}
          link="https://youtu.be/hr0xMctng1Y"
          thumbnail="https://img.youtube.com/vi/hr0xMctng1Y/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/hr0xMctng1Y")}
        />
        <VideoThumb
          index={15}
          link="https://youtu.be/rPIza17Nd8A"
          thumbnail="https://img.youtube.com/vi/rPIza17Nd8A/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/rPIza17Nd8A")}
        />
        <VideoThumb
          index={16}
          link="https://youtu.be/-tK4C2utHK0"
          thumbnail="https://img.youtube.com/vi/-tK4C2utHK0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/-tK4C2utHK0")}
        />
        <VideoThumb
          index={17}
          link="https://youtu.be/CniXqqEsDss"
          thumbnail="https://img.youtube.com/vi/CniXqqEsDss/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/CniXqqEsDss")}
        />
      </div>
    </div>
  );
}

// ─── FAKING A FOUL Content ───────────────────────────────────────────────────

function FakingFoulContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
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
            <VideoThumb
              index={0}
              link="https://youtu.be/dzhwIc9bhuA"
              thumbnail="https://img.youtube.com/vi/dzhwIc9bhuA/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/dzhwIc9bhuA")}
            />
            <VideoThumb
              index={1}
              link="https://youtu.be/B0BNiNZtvCE"
              thumbnail="https://img.youtube.com/vi/B0BNiNZtvCE/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/B0BNiNZtvCE")}
            />
          </div>
        </div>

        {/* SIGNAL */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <DocCard link="https://www.refereevision.com/fake_Sig.png" />
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Fake_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/fake_int.jpg" />
        </div>
      </div>

      {/* PROTOCOL */}
      <CylinderSectionHeader label="PROTOCOL" />

      {/* DURING GAME / DURING NEXT GAME STOPPAGE */}
      <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>DURING GAME</span>
          <DocCard link="https://www.refereevision.com/fake_during.png" width={isMobile ? 130 : 170} height={isMobile ? 180 : 230} objectFit="cover" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>DURING NEXT GAME STOPPAGE</span>
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard link="https://www.refereevision.com/fake_nextgamestoppage.png" width={isMobile ? 260 : 340} height={isMobile ? 180 : 230} objectFit="cover" />
          </div>
        </div>
      </div>

      {/* REPETITIVE OR EXCESSIVE FAKE */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>REPETITIVE OR EXCESSIVE FAKE</span>
        <div style={{ display: "flex", gap: 8 }}>
          <DocCard link="https://www.refereevision.com/fake_excessive.png" width={isMobile ? 390 : 510} height={isMobile ? 180 : 230} objectFit="cover" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/5uvgeMD3jII"
          thumbnail="https://img.youtube.com/vi/5uvgeMD3jII/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/5uvgeMD3jII")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/Ms8bIK2Dywg"
          thumbnail="https://img.youtube.com/vi/Ms8bIK2Dywg/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Ms8bIK2Dywg")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/4T2AYMOkQxQ"
          thumbnail="https://img.youtube.com/vi/4T2AYMOkQxQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/4T2AYMOkQxQ")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/k5Yawb8e76A"
          thumbnail="https://img.youtube.com/vi/k5Yawb8e76A/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/k5Yawb8e76A")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/Bao4oFQbIm4"
          thumbnail="https://img.youtube.com/vi/Bao4oFQbIm4/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Bao4oFQbIm4")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/AdKYS8si71c"
          thumbnail="https://img.youtube.com/vi/AdKYS8si71c/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/AdKYS8si71c")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/AA9VQQM_npM"
          thumbnail="https://img.youtube.com/vi/AA9VQQM_npM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/AA9VQQM_npM")}
        />
        <VideoThumb
          index={7}
          link="https://youtu.be/bCBAsM2ShOQ"
          thumbnail="https://img.youtube.com/vi/bCBAsM2ShOQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/bCBAsM2ShOQ")}
        />
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/QBcTsu3ffCE"
          thumbnail="https://img.youtube.com/vi/QBcTsu3ffCE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/QBcTsu3ffCE")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/IpTKBxnKccM?si=dyIkMqHe3yV2RJjg"
          thumbnail="https://img.youtube.com/vi/IpTKBxnKccM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/IpTKBxnKccM?si=dyIkMqHe3yV2RJjg")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhoQngu_ylnCUaJ61z7HyzlF")} />
    </div>
  );
}

// ─── BALL RETURNED TO BACKCOURT Content ───────────────────────────────────────

function BallReturnedToBackcourtContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
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
            <VideoThumb
              index={0}
              link="https://youtu.be/HIWn3uM0mQ4"
              thumbnail="https://img.youtube.com/vi/HIWn3uM0mQ4/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/HIWn3uM0mQ4")}
            />
            <VideoThumb
              index={1}
              link="https://youtu.be/l7DkpTvR1Ms"
              thumbnail="https://img.youtube.com/vi/l7DkpTvR1Ms/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/l7DkpTvR1Ms")}
            />
          </div>
        </div>

        {/* SIGNAL */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <DocCard link="https://www.refereevision.com/brtbc_Sig.png" />
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
        {/* ARTICLE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/brtbc_art.jpg" />
        </div>

        {/* INTERPRETATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/brtbc_int.jpg" />
        </div>

        {/* PRESENTATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/brtbc_ppt.jpg" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/OpYtpdHrz9M"
          thumbnail="https://img.youtube.com/vi/OpYtpdHrz9M/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/OpYtpdHrz9M")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/aXC-P-EgI8M"
          thumbnail="https://img.youtube.com/vi/aXC-P-EgI8M/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/aXC-P-EgI8M")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/p-3PEzo-q1Y"
          thumbnail="https://img.youtube.com/vi/p-3PEzo-q1Y/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/p-3PEzo-q1Y")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/knQqqRW-cIo"
          thumbnail="https://img.youtube.com/vi/knQqqRW-cIo/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/knQqqRW-cIo")}
        />
        <VideoThumb
          index={4}
          link="https://youtu.be/5s01qZV_Muc"
          thumbnail="https://img.youtube.com/vi/5s01qZV_Muc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/5s01qZV_Muc")}
        />
        <VideoThumb
          index={5}
          link="https://youtu.be/FLPDBo0NjQ0"
          thumbnail="https://img.youtube.com/vi/FLPDBo0NjQ0/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/FLPDBo0NjQ0")}
        />
        <VideoThumb
          index={6}
          link="https://youtu.be/qv_8RmytI3c"
          thumbnail="https://img.youtube.com/vi/qv_8RmytI3c/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/qv_8RmytI3c")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkho35A2lU_EBS2Cee0la1tqt")} />

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/MDLYxEUMEfc"
          thumbnail="https://img.youtube.com/vi/MDLYxEUMEfc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/MDLYxEUMEfc")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/oWRmmuxN6ok"
          thumbnail="https://img.youtube.com/vi/oWRmmuxN6ok/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/oWRmmuxN6ok")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/Rvs584U67Yw"
          thumbnail="https://img.youtube.com/vi/Rvs584U67Yw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/Rvs584U67Yw")}
        />
        <VideoThumb
          index={3}
          link="https://youtu.be/VifubbcFxKQ"
          thumbnail="https://img.youtube.com/vi/VifubbcFxKQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/VifubbcFxKQ")}
        />
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp9mFEAj79coq3fnyxrge_l")} />
    </div>
  );
}

// ─── GOALTENDING & INTERFERENCE Content ──────────────────────────────────────

function GoaltendingInterferenceContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  const goaltendingFibaVideos = [
    "https://youtu.be/ChPAOPwdXSc",
    "https://youtu.be/VD1V03PCaVY",
    "https://youtu.be/zjvxfX8fr94",
    "https://youtu.be/t2dSjlh8guQ",
    "https://youtu.be/ttGDJEgdjRg",
    "https://youtu.be/ki9yOzMkwio",
    "https://youtu.be/LrLFnVDyagU",
    "https://youtu.be/BXMSTHEw2C8",
  ];

  const interferenceFibaVideos = [
    "https://youtu.be/UNZhKRxBcNI",
    "https://youtu.be/4YuuBHzfDrI",
    "https://youtu.be/1QxFRh_z92I",
    "https://youtu.be/anmCUwWDBMU",
    "https://youtu.be/oKI9Z2DM4I4",
    "https://youtu.be/BvVqPSrX5O0",
    "https://youtu.be/g7EMbq8D8z4",
    "https://youtu.be/cLjfqSPty0s",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="GOALTENDING & INTERFERENCE" />

      {/* Top row: RULE EXPLANATION videos & SIGNAL doc */}
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
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <VideoThumb
              index={0}
              link="https://youtu.be/K-t_8zVt5rA"
              thumbnail="https://img.youtube.com/vi/K-t_8zVt5rA/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/K-t_8zVt5rA")}
            />
            <VideoThumb
              index={1}
              link="https://youtu.be/MvAL7AWVv_8"
              thumbnail="https://img.youtube.com/vi/MvAL7AWVv_8/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/MvAL7AWVv_8")}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard link="https://www.refereevision.com/GI_Sig.png" />
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Gi_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="http://www.refereevision.com/GI_int.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/GI_ppt.jpg" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* GOALTENDING */}
      <SubSectionBadge label="GOALTENDING" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {goaltendingFibaVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhpxg25IWGTk_AGxK7HkW7Ak")} />

      {/* INTERFERENCE */}
      <SubSectionBadge label="INTERFERENCE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {interferenceFibaVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhr3JMu78TkxwkG1xciLt1pG")} />
    </div>
  );
}

// ─── 3, 5, 8 & 24 SECONDS Content ────────────────────────────────────────────

type SecondsSubTab = "3 SECONDS" | "5 SECONDS" | "8 SECONDS" | "SHOT CLOCK";
const SECONDS_SUBTABS: SecondsSubTab[] = ["3 SECONDS", "5 SECONDS", "8 SECONDS", "SHOT CLOCK"];

// ─── 3 SECONDS ───────────────────────────────────────────────────────────────────────────
function ThreeSecondsContent({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const ruleVideos = ["https://youtu.be/5XPPFb-KysM", "https://youtu.be/xMzc1xEAj0Q"];
  const fibaVideos = [
    "https://youtu.be/tDuiUD54KN4", "https://youtu.be/gyA8s1W6GYE",
    "https://youtu.be/dqyez0sGiJ8", "https://youtu.be/iPax7PNbVPI",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 32 }}>
      <SectionBadge label="3 SECONDS" />
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {ruleVideos.map((link, i) => (
          <VideoThumb key={i} index={i} link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)} />
        ))}
      </div>
      <div style={{ display: "flex", gap: isMobile ? 32 : 48, justifyContent: "center", flexWrap: "wrap", maxWidth: 900, margin: "0 auto 36px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" /><DocCard link="https://www.refereevision.com/3Sec_Sig.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" /><DocCard link="https://www.refereevision.com/3sec_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" /><DocCard link="https://www.refereevision.com/3sec_int.jpg" />
        </div>
      </div>
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {fibaVideos.map((link, i) => (
          <VideoThumb key={i} index={i} link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)} />
        ))}
      </div>
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp_y7CWsKjrFQW0ylKhNZXl")} />
    </div>
  );
}

// ─── 5 SECONDS ───────────────────────────────────────────────────────────────────────────
function FiveSecondsContent({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const ruleVideos = ["https://youtu.be/lh9vaE0MmCQ"];
  const educationalVideos = [
    "https://youtu.be/EoTtfZiSNt8",
    "https://youtu.be/Gaxlz8Ko6j0",
    "https://youtu.be/M69s1QqjbmY",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 32 }}>
      <SectionBadge label="5 SECONDS" />
      <CylinderSectionHeader label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {ruleVideos.map((link, i) => (
          <VideoThumb key={i} index={i} link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)} />
        ))}
      </div>
      <div style={{ display: "flex", gap: isMobile ? 32 : 48, justifyContent: "center", flexWrap: "wrap", maxWidth: 900, margin: "0 auto 36px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" /><DocCard link="https://www.refereevision.com/Signals/5Sec_Sig.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" /><DocCard link="https://www.refereevision.com/closely_art.png" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" /><DocCard link="https://www.refereevision.com/closely_int.jpg" />
        </div>
      </div>
      <CylinderSectionHeader label="EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {educationalVideos.map((link, i) => (
          <VideoThumb key={i} index={i} link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)} />
        ))}
      </div>
    </div>
  );
}

// ─── 8 SECONDS ───────────────────────────────────────────────────────────────────────────
function EightSecondsContent({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const educationalVideos = [
    "https://youtu.be/5r16sVGPNf4",
    "https://youtu.be/WEuBqEamV78",
    "https://youtu.be/0J4pRVdOxCM",
    "https://youtu.be/75RbQmny92c",
    "https://youtu.be/s5-wRV2KME8",
    "https://youtu.be/bc9l9UJFkDA",
    "https://youtu.be/zM4R8VQajOQ",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 32 }}>
      <SectionBadge label="8 SECONDS" />
      {/* 2x2 grid: Signal+Article | Interpretation+Presentation */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 680, margin: "36px auto 36px", width: "100%" }}>
        <div style={{ display: "flex", gap: isMobile ? 24 : 48, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 200px" }}>
            <MiniBadge label="SIGNAL" /><DocCard link="https://www.refereevision.com/Signals/8Sec_Sig.png" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 200px" }}>
            <MiniBadge label="ARTICLE" /><DocCard link="https://www.refereevision.com/8sec_art.jpg" />
          </div>
        </div>
        <div style={{ display: "flex", gap: isMobile ? 24 : 48, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 200px" }}>
            <MiniBadge label="INTERPRETATION" /><DocCard link="https://www.refereevision.com/8sec_int.jpg" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 200px" }}>
            <MiniBadge label="PRESENTATION" /><DocCard link="https://www.refereevision.com/8sec_ppt.jpg" />
          </div>
        </div>
      </div>
      <CylinderSectionHeader label="EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {educationalVideos.map((link, i) => (
          <VideoThumb key={i} index={i} link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)} />
        ))}
      </div>
    </div>
  );
}

// ─── SHOT CLOCK ─────────────────────────────────────────────────────────────────────────
function ShotClockContent({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const fibaVideos = [
    "https://youtu.be/xlEUVmTiBRo",
    "https://youtu.be/O9tNEtfK64E",
    "https://youtu.be/3NYsMG0s9wU",
    "https://youtu.be/4jJ7h8S_Hi4",
    "https://youtu.be/TYo3C-a0LiU",
    "https://youtu.be/oxVV7EaG138",
    "https://youtu.be/8ixuLvdRYPw",
    "https://youtu.be/ZvK_CWfEM94",
  ];
  const violationDiagrams = [
    "https://www.refereevision.com/scprocedure1.png",
    "https://www.refereevision.com/scprocedure2.png",
    "https://www.refereevision.com/scprocedure3.png",
    "https://www.refereevision.com/scprocedure4.png",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 32 }}>
      <SectionBadge label="SHOT CLOCK" />
      {/* Rule Explanation video + 2 Signal cards */}
      <div style={{ display: "flex", gap: isMobile ? 28 : 64, justifyContent: "center", flexWrap: "wrap", margin: "36px auto 28px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE EXPLANATION" />
          <div style={{ display: "flex", gap: 8 }}>
            <VideoThumb index={0} link="https://youtu.be/6yXzFHD1IhU"
              thumbnail="https://img.youtube.com/vi/6yXzFHD1IhU/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/6yXzFHD1IhU")} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNALS" />
          <div style={{ display: "flex", gap: 8 }}>
            <DocCard link="https://www.refereevision.com/24sec_Sig.png" />
            <DocCard link="https://www.refereevision.com/24secreset_Sig.png" />
          </div>
        </div>
      </div>
      {/* Article / Interpretation / Presentation */}
      <div style={{ display: "flex", gap: isMobile ? 28 : 48, justifyContent: "center", flexWrap: "wrap", margin: "0 auto 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" /><DocCard link="https://www.refereevision.com/24sec_art.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" /><DocCard link="https://www.refereevision.com/24sec_int.jpg" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" /><DocCard link="https://www.refereevision.com/shotclock_ppt.jpg" />
        </div>
      </div>
      {/* Shot Clock Violation Procedure — 4 landscape diagrams */}
      <CylinderSectionHeader label="SHOT CLOCK VIOLATION PROCEDURE" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", marginBottom: 32 }}>
        {violationDiagrams.map((img, i) => (
          <DocCard key={i} link={img} width={isMobile ? 300 : 280} aspectRatio="4 / 3" objectFit="contain" />
        ))}
      </div>
      {/* FIBA Educational Videos */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {fibaVideos.map((link, i) => (
          <VideoThumb key={i} index={i} link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)} />
        ))}
      </div>
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhq4dibC990uTNDv3FsD3OIq")} />
      {/* Additional Videos */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton onClick={() => setActiveVideo("https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhr_9pX_nMtlropUZ32LWn-f")} />
    </div>
  );
}



function Seconds358Content({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<SecondsSubTab>("3 SECONDS");
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="3, 5, 8 & 24 SECONDS" />

      {/* Inner sub-tabs bar */}
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
        {SECONDS_SUBTABS.map((subTab) => {
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

      {/* Per-tab dedicated content */}
      {activeSubTab === "3 SECONDS" ? (
        <ThreeSecondsContent isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : activeSubTab === "5 SECONDS" ? (
        <FiveSecondsContent isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : activeSubTab === "8 SECONDS" ? (
        <EightSecondsContent isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : (
        <ShotClockContent isMobile={isMobile} setActiveVideo={setActiveVideo} />
      )}
    </div>
  );
}

// ─── THROW-IN Content ─────────────────────────────────────────────────────────

function ThrowInContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
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
            <VideoThumb
              index={0}
              link="https://youtu.be/dEOKzsFfei8"
              thumbnail="https://img.youtube.com/vi/dEOKzsFfei8/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/dEOKzsFfei8")}
            />
          </div>
        </div>

        {/* SIGNAL */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <DocCard link="https://www.refereevision.com/boundary_Sig.png" />
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
        {/* ARTICLE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Throwin_art_new.jpg" />
        </div>

        {/* INTERPRETATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/Throwin_int.jpg" />
        </div>

        {/* PRESENTATION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/Throwin_ppt.jpg" />
        </div>
      </div>

      {/* PROCEDURE */}
      <CylinderSectionHeader label="PROCEDURE" />

      {/* GENERAL / L2M */}
      <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 20 : 48, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>GENERAL</span>
          <DocCard link="https://www.refereevision.com/Throw-in_Gen.png" width={isMobile ? 300 : 380} aspectRatio="16 / 9" objectFit="contain" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>L2M</span>
          <DocCard link="https://www.refereevision.com/Throw-in_Gen_L2M.png" width={isMobile ? 300 : 380} aspectRatio="16 / 9" objectFit="contain" />
        </div>
      </div>

      {/* GENERAL - WITH WARNING WHISTLE / L2M - WITH WARNING WHISTLE */}
      <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 20 : 48, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>GENERAL - WITH WARNING WHISTLE</span>
          <DocCard link="https://www.refereevision.com/Throw-in_Warning.png" width={isMobile ? 300 : 380} aspectRatio="16 / 9" objectFit="contain" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: T.orange, letterSpacing: "1px", marginBottom: 12 }}>L2M - WITH WARNING WHISTLE</span>
          <DocCard link="https://www.refereevision.com/Throw-in_Warning_L2M.png" width={isMobile ? 300 : 380} aspectRatio="16 / 9" objectFit="contain" />
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/r7DMSIJco70"
          thumbnail="https://img.youtube.com/vi/r7DMSIJco70/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/r7DMSIJco70")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/8Ftr_XCWvPw"
          thumbnail="https://img.youtube.com/vi/8Ftr_XCWvPw/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/8Ftr_XCWvPw")}
        />
      </div>
      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/PJneV0Wb6Fc"
          thumbnail="https://img.youtube.com/vi/PJneV0Wb6Fc/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/PJneV0Wb6Fc")}
        />
        <VideoThumb
          index={1}
          link="https://youtu.be/eYihhw5KrYQ"
          thumbnail="https://img.youtube.com/vi/eYihhw5KrYQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/eYihhw5KrYQ")}
        />
        <VideoThumb
          index={2}
          link="https://youtu.be/-7zVb7mGWZM"
          thumbnail="https://img.youtube.com/vi/-7zVb7mGWZM/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/-7zVb7mGWZM")}
        />
      </div>
    </div>
  );
}

// ─── TECHNICAL FOUL Content ───────────────────────────────────────────────

function TechnicalFoulContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  const fibaVideos = [
    "https://youtu.be/85V8oIpieD8",
    "https://youtu.be/Q3vvlBwrQEM",
    "https://youtu.be/WUShT2EL1qU",
    "https://youtu.be/UkyA7IPlcSQ",
    "https://youtu.be/o9QJUSfqHtg",
    "https://youtu.be/tqBFCxa1aL4",
    "https://youtu.be/3oqzbIhyZUw",
    "https://youtu.be/OnhZoT1M8k0",
  ];

  const additionalVideos = [
    "https://youtu.be/GxP775RwakM",
    "https://youtu.be/IF_MRiugJBg",
    "https://youtu.be/ybhTeG0ctjs",
    "https://youtu.be/8310kCsMW5k",
    "https://youtu.be/IpTKBxnKccM",
    "https://youtu.be/VfH56dUDfEs",
    "https://youtu.be/N2lHfvAl1d8",
    "https://youtu.be/m5t6XXlV3ME",
    "https://youtu.be/ky1SAyfNclI",
    "https://youtu.be/ICC9ZqeUlFs",
    "https://youtu.be/UJxy4PZx54s",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="TECHNICAL FOUL" />

      {/* 2-column top grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 900,
          margin: "32px auto 36px",
          width: "100%",
        }}
      >
        {/* Row 1: Rule Explanation & Signal */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 28 : 48,
            justifyContent: "space-around",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          {/* Rule Explanation */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="RULE EXPLANATION" />
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <VideoThumb
                index={0}
                link="https://youtu.be/M9W45TByZE0"
                thumbnail="https://img.youtube.com/vi/M9W45TByZE0/0.jpg"
                onPlay={() => setActiveVideo("https://youtu.be/M9W45TByZE0")}
              />
              <VideoThumb
                index={1}
                link="https://youtu.be/dzhwIc9bhuA"
                thumbnail="https://img.youtube.com/vi/dzhwIc9bhuA/0.jpg"
                onPlay={() => setActiveVideo("https://www.youtube.com/embed/dzhwIc9bhuA?start=372&autoplay=1")}
              />
            </div>
          </div>

          {/* Signal */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="SIGNAL" />
            <DocCard
              link="https://www.refereevision.com/Signals/tech_Sig.png"
              onClick={() => setActiveVideo("https://www.refereevision.com/Signals/tech_Sig.png")}
            />
          </div>
        </div>

        {/* Row 2: Article & Interpretation */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 28 : 48,
            justifyContent: "space-around",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          {/* Article */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="ARTICLE" />
            <DocCard
              link="https://www.refereevision.com/TF_art.jpg"
              onClick={() => setActiveVideo("https://www.refereevision.com/TF_art.jpg")}
            />
          </div>

          {/* Interpretation */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="INTERPRETATION" />
            <DocCard
              link="https://www.refereevision.com/TF_int.jpg"
              onClick={() => setActiveVideo("https://www.refereevision.com/TF_int.jpg")}
            />
          </div>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {fibaVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {additionalVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* WATCH PLAYLIST */}
      <WatchPlaylistButton
        onClick={() =>
          setActiveVideo(
            "https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhqbopUbcUttTHi232z0DlYZ&loop=1"
          )
        }
      />
    </div>
  );
}

// ─── DISQUALIFYING FOUL & FIGHTING Content ──────────────────────────────────

function DisqualifyingFoulContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  const fibaVideos = [
    "https://youtu.be/mNgMLYMxALE",
    "https://youtu.be/tz9_5ykREo4",
  ];

  const additionalVideos = [
    "https://youtu.be/nVUth1m5Dvs",
    "https://youtu.be/TGVxJcj9FJk",
    "https://youtu.be/xbG_9FnFJCQ",
    "https://youtu.be/OBAx0OdgvU4",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="DISQUALIFYING FOUL & FIGHTING" />

      {/* 2-column top grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 900,
          margin: "32px auto 36px",
          width: "100%",
        }}
      >
        {/* Row 1: Rule Explanation & Signal */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 28 : 48,
            justifyContent: "space-around",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          {/* Rule Explanation */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="RULE EXPLANATION" />
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <VideoThumb
                index={0}
                link="https://youtu.be/NqdNrMmrHBE"
                thumbnail="https://img.youtube.com/vi/NqdNrMmrHBE/0.jpg"
                onPlay={() => setActiveVideo("https://youtu.be/NqdNrMmrHBE")}
              />
            </div>
          </div>

          {/* Signal */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="SIGNAL" />
            <DocCard
              link="https://www.refereevision.com/Signals/dqf_Sig.png"
              onClick={() => setActiveVideo("https://www.refereevision.com/Signals/dqf_Sig.png")}
            />
          </div>
        </div>

        {/* Row 2: Article & Interpretation */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 28 : 48,
            justifyContent: "space-around",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          {/* Article */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="ARTICLE" />
            <DocCard
              link="https://www.refereevision.com/DQF_art.jpg"
              onClick={() => setActiveVideo("https://www.refereevision.com/DQF_art.jpg")}
            />
          </div>

          {/* Interpretation */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MiniBadge label="INTERPRETATION" />
            <DocCard
              link="https://www.refereevision.com/DQF_int.jpg"
              onClick={() => setActiveVideo("https://www.refereevision.com/DQF_int.jpg")}
            />
          </div>
        </div>
      </div>

      {/* FIBA EDUCATIONAL VIDEOS */}
      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {fibaVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {additionalVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* WATCH PLAYLIST */}
      <WatchPlaylistButton
        onClick={() =>
          setActiveVideo(
            "https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhqQweELuL37xPfn7AO_c53w&loop=1"
          )
        }
      />
    </div>
  );
}

// ─── GAME CONTROL & MANAGEMENT Content ──────────────────────────────────────

function GameControlManagementContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  const gameControlVideos = [
    "https://youtu.be/TVokLEG12e8",
    "https://youtu.be/Fsxr4uWVQIo",
    "https://youtu.be/wJf9M0K9qUQ",
    "https://youtu.be/6VXbIDjF39g",
    "https://youtu.be/3ABnJdkPQEE",
    "https://youtu.be/JcSNH60PEuU",
    "https://youtu.be/aSeeu_9GLEA",
    "https://youtu.be/MtJK7Js0wKI",
  ];

  const gameManagementVideos = [
    "https://youtu.be/yJYuTYWOSMA",
    "https://youtu.be/GbZ5_ZpXxrY",
    "https://youtu.be/MVp_-c7SaSg",
    "https://youtu.be/0a1N0br6yco",
    "https://youtu.be/TXF17-SmKHM",
    "https://youtu.be/432bAXSFejI",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="GAME CONTROL & MANAGEMENT" />

      {/* GAME CONTROL */}
      <CylinderSectionHeader label="GAME CONTROL" />
      <SubSectionBadge label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {gameControlVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>
      <SubSectionBadge label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton
        label="WATCH GAME CONTROL PLAYLIST"
        onClick={() =>
          setActiveVideo(
            "https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp_y7CWsKjrFQW0ylKhNZXl&loop=1"
          )
        }
      />

      {/* GAME MANAGEMENT */}
      <CylinderSectionHeader label="GAME MANAGEMENT" />
      <SubSectionBadge label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {gameManagementVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>
      <SubSectionBadge label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton
        label="WATCH GAME MANAGEMENT PLAYLIST"
        onClick={() =>
          setActiveVideo(
            "https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhp_y7CWsKjrFQW0ylKhNZXl&loop=1"
          )
        }
      />
    </div>
  );
}

// ─── OTHERS Content ──────────────────────────────────────────────────────────

type OthersSubTab =
  | "FREE THROWS"
  | "JUMP BALL/ HELD BALL"
  | "SPECIAL SITUATIONS"
  | "CORRECTABLE ERRORS"
  | "IRS"
  | "MISCELLANEOUS";

const OTHERS_SUBTABS: OthersSubTab[] = [
  "FREE THROWS",
  "JUMP BALL/ HELD BALL",
  "SPECIAL SITUATIONS",
  "CORRECTABLE ERRORS",
  "IRS",
  "MISCELLANEOUS",
];

function FreeThrowsSubTab({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const ruleVideos = ["https://youtu.be/lp4E_YYlZ8I", "https://youtu.be/U8Pr-JiZ924"];
  const signalCards = [
    "https://www.refereevision.com/ft1_Sig.png",
    "https://www.refereevision.com/ft2_Sig.png",
    "https://www.refereevision.com/ft3_Sig.png",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CylinderSectionHeader label="FREE-THROWS" />
      <SubSectionBadge label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        {ruleVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* Signal cards under rule explanation */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        {signalCards.map((src, i) => (
          <DocCard key={i} link={src} width={130} onClick={() => setActiveVideo(src)} />
        ))}
      </div>

      {/* 3 columns: Article, Interpretation, Presentation */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 40,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "0 auto 36px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/ft_art.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/ft_art.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/ft_int.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/ft_int.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/ft_violations_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/ft_violations_ppt.jpg")} />
        </div>
      </div>

      <CylinderSectionHeader label="SIGNALS" />
    </div>
  );
}

function JumpBallSubTab({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const fibaVideos = [
    "https://youtu.be/cyIb9n7hEEA",
    "https://youtu.be/FQ9YWk4w0bY",
    "https://youtu.be/hco9ORCHfm0",
    "https://youtu.be/Mr1makpiTzc",
    "https://youtu.be/NpN5dXzhWBA",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CylinderSectionHeader label="JUMP BALL / HELD BALL" />

      {/* Row 1: Rule explanation & Signal */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 28 : 48,
          justifyContent: "space-around",
          alignItems: "center",
          maxWidth: 900,
          margin: "0 auto 32px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE EXPLANATION" />
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <VideoThumb
              index={0}
              link="https://youtu.be/W-4ANNKeOPU"
              thumbnail="https://img.youtube.com/vi/W-4ANNKeOPU/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/W-4ANNKeOPU")}
            />
            <VideoThumb
              index={1}
              link="https://youtu.be/-Ek3zEq4Lns"
              thumbnail="https://img.youtube.com/vi/-Ek3zEq4Lns/0.jpg"
              onPlay={() => setActiveVideo("https://youtu.be/-Ek3zEq4Lns")}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard
            link="https://www.refereevision.com/jumpball_Sig.png"
            onClick={() => setActiveVideo("https://www.refereevision.com/jumpball_Sig.png")}
          />
        </div>
      </div>

      {/* Row 2: 3 columns: Article, Interpretation, Presentation */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 40,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "0 auto 36px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/jumpball_art.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/jumpball_art.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/jumpball_int.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/jumpball_int.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/jumpball_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/jumpball_ppt.jpg")} />
        </div>
      </div>

      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {fibaVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton
        onClick={() =>
          setActiveVideo(
            "https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhrf7X2r1QXaOaOo01WST0-T&loop=1"
          )
        }
      />
    </div>
  );
}

function SpecialSituationsSubTab({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const educationalVideos = [
    "https://youtu.be/j9JqAKYjKuM",
    "https://youtu.be/E0CqB61y9UI",
    "https://youtu.be/CgNqWDRoWiY",
    "https://youtu.be/QLhpPb1xJMo",
    "https://youtu.be/pGn-AmMw8EU",
    "https://youtu.be/4zUXjN4gXy0",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CylinderSectionHeader label="SPECIAL SITUATIONS" />

      <SubSectionBadge label="RULE EXPLANATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <VideoThumb
          index={0}
          link="https://youtu.be/8el77upM-QQ"
          thumbnail="https://img.youtube.com/vi/8el77upM-QQ/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/8el77upM-QQ")}
        />
      </div>

      {/* Row: Article, Interpretation, Presentation */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 40,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "0 auto 36px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/Splsit_art.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Splsit_art.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/Splsit_int.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Splsit_int.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/Spl_situations_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Spl_situations_ppt.jpg")} />
        </div>
      </div>

      <CylinderSectionHeader label="EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {educationalVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>
    </div>
  );
}

function CorrectableErrorsSubTab({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const educationalVideos = [
    "https://youtu.be/7EDOn1k5-Bc",
    "https://youtu.be/RAILmQTZg_U",
    "https://youtu.be/7E4uFCkzcj4",
    "https://youtu.be/5UPGMe92lLI",
    "https://youtu.be/NZvFfRdsw0k",
    "https://youtu.be/QssK087ISAw",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CylinderSectionHeader label="CORRECTABLE ERRORS" />

      {/* Row: Article, Interpretation, Presentation */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 40,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "24px auto 36px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/cerr_art_new.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/cerr_art_new.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/cerr_int.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/cerr_int.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="PRESENTATION" />
          <DocCard link="https://www.refereevision.com/CorrectableErrors_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/CorrectableErrors_ppt.jpg")} />
        </div>
      </div>

      <CylinderSectionHeader label="EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {educationalVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>
    </div>
  );
}

function IRSSubTab({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const irsInterpretations = [
    "https://www.refereevision.com/irs_int_1.jpg",
    "https://www.refereevision.com/irs_int_2.jpg",
    "https://www.refereevision.com/irs_int_3.jpg",
    "https://www.refereevision.com/irs_int_4.jpg",
  ];

  const atEndOfQuarterVideos = [
    "https://youtu.be/XJGXAKR3JIA",
    "https://youtu.be/Xie47Q35v4k",
    "https://youtu.be/5yY1nF3y08o",
    "https://youtu.be/qIo5HFxO8qk",
    "https://youtu.be/TyftNMBG2Aw",
    "https://youtu.be/1DyIjis_OuE",
    "https://youtu.be/gMcjhTrgC7k",
    "https://youtu.be/q_a3vCApX5s",
  ];

  const last2MinutesVideos = [
    "https://youtu.be/D2wcGqon1p0",
    "https://youtu.be/cv_7d1EHZ8M",
    "https://youtu.be/VpcC_Q8SrV0",
    "https://youtu.be/IvnAAY6-Zko",
    "https://youtu.be/9UBc227uxkE",
    "https://youtu.be/NMLBRooysfQ",
    "https://youtu.be/EN8f2HnMGv0",
    "https://youtu.be/NNykpj3CtBY",
  ];

  const duringAnyTimeVideos = [
    "https://youtu.be/eaiTSIfYw18",
    "https://youtu.be/y16JOKuzgL4",
    "https://youtu.be/q6PF-h0Dy70",
    "https://youtu.be/0Pd3ujzFHbA",
    "https://youtu.be/HnZy0ni7pOs",
    "https://youtu.be/mXVxdjaIbPk",
    "https://youtu.be/UetDtqsEqcA",
    "https://youtu.be/3dV4rRsBdi4",
  ];

  const headCoachChallengeVideos = [
    "https://youtu.be/qQjr090GT78",
    "https://youtu.be/VwlLfJguulc",
    "https://youtu.be/Pe1UNzOI82g",
    "https://youtu.be/a1RCAxG8YIc",
    "https://youtu.be/t-P_yJVEJws",
    "https://youtu.be/rL3FT7vba14",
    "https://youtu.be/qz42qeVh2sk",
    "https://youtu.be/gxtOM04niEI",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CylinderSectionHeader label="INSTANT REPLAY SYSTEM" />

      {/* Row: Rule Changes, Signal, Article */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 40,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "24px auto 36px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="RULE CHANGES 2020" />
          <VideoThumb
            index={0}
            link="https://youtu.be/hJ_tV2IkMhQ"
            thumbnail="https://img.youtube.com/vi/hJ_tV2IkMhQ/0.jpg"
            onPlay={() => setActiveVideo("https://youtu.be/hJ_tV2IkMhQ")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard link="https://www.refereevision.com/irs_Sig.png" onClick={() => setActiveVideo("https://www.refereevision.com/irs_Sig.png")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/irs_art.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/irs_art.jpg")} />
        </div>
      </div>

      {/* Interpretation documents */}
      <CylinderSectionHeader label="INTERPRETATION" />
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        {irsInterpretations.map((src, i) => (
          <DocCard key={i} link={src} width={120} onClick={() => setActiveVideo(src)} />
        ))}
      </div>

      <CylinderSectionHeader label="FIBA EDUCATIONAL VIDEOS" />

      {/* Section 1 */}
      <SubSectionBadge label="AT THE END OF QUARTER OR OVERTIME" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        {atEndOfQuarterVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* Section 2 */}
      <SubSectionBadge label="LAST 2 MINUTES OF 4TH QUARTER OR OVERTIME" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        {last2MinutesVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* Section 3 */}
      <SubSectionBadge label="DURING ANY TIME OF THE GAME" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        {duringAnyTimeVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* Section 4 */}
      <SubSectionBadge label="HEAD COACH CHALLENGE" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        {headCoachChallengeVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* ADDITIONAL VIDEOS */}
      <CylinderSectionHeader label="ADDITIONAL VIDEOS" />
      <WatchPlaylistButton
        onClick={() =>
          setActiveVideo(
            "https://www.youtube.com/embed/videoseries?list=PLOnrMq_sQkhpPUkdfHhhg5tn0zCNJOrrX&loop=1"
          )
        }
      />
    </div>
  );
}

function MiscSubTab({ isMobile, setActiveVideo }: { isMobile: boolean; setActiveVideo: (u: string) => void }) {
  const advantageVideos = [
    "https://youtu.be/KdNWxidy4_g",
    "https://youtu.be/51L1_Ev4H5g",
    "https://youtu.be/Yjv3CS5QBUo",
    "https://youtu.be/WK63VL3xsN4",
    "https://youtu.be/h60loH8_Q9c",
    "https://youtu.be/3DoLjiZ4oP8",
    "https://youtu.be/0tDvIGEz0AE",
    "https://youtu.be/DkXzl074lXg",
  ];

  const lastSecondShotVideos = [
    "https://youtu.be/RfWPnsgQuzY",
    "https://youtu.be/zwkyZgyf0_0",
    "https://youtu.be/uj98kqB1agg",
    "https://youtu.be/t9Rk9_tayxg",
    "https://youtu.be/tueCsxPq_ho",
    "https://youtu.be/uSEldaapnwQ",
    "https://youtu.be/eqiVDK8pe8U",
    "https://youtu.be/-B341KypXh8",
  ];

  const doubleWhistleVideos = [
    "https://youtu.be/7nz8kAFxP70",
    "https://youtu.be/umfO_FrGiHE",
    "https://youtu.be/2tK3MNiMoNk",
    "https://youtu.be/2ztaEstPTKk",
    "https://youtu.be/y8YfQjS3PXY",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CylinderSectionHeader label="MISCELLANEOUS" />

      {/* Row 1: Status of the Ball & Control of the Ball */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 36,
          justifyContent: "space-around",
          maxWidth: 900,
          margin: "16px auto 32px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SubSectionBadge label="STATUS OF THE BALL" />
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <DocCard link="https://www.refereevision.com/Status_art.png" onClick={() => setActiveVideo("https://www.refereevision.com/Status_art.png")} />
            <DocCard link="https://www.refereevision.com/Status_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Status_ppt.jpg")} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SubSectionBadge label="CONTROL OF THE BALL" />
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <DocCard link="https://www.refereevision.com/Control_art.png" onClick={() => setActiveVideo("https://www.refereevision.com/Control_art.png")} />
            <DocCard link="https://www.refereevision.com/Control_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Control_ppt.jpg")} />
          </div>
        </div>
      </div>

      {/* Row 2: Game Lost by Forfeit & Game Lost by Default */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 36,
          justifyContent: "space-around",
          maxWidth: 900,
          margin: "0 auto 32px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SubSectionBadge label="GAME LOST BY FORFEIT" />
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <DocCard link="https://www.refereevision.com/forfeit_art.png" onClick={() => setActiveVideo("https://www.refereevision.com/forfeit_art.png")} />
            <DocCard link="https://www.refereevision.com/Forfeit_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Forfeit_ppt.jpg")} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SubSectionBadge label="GAME LOST BY DEFAULT" />
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <DocCard link="https://www.refereevision.com/default_art.png" onClick={() => setActiveVideo("https://www.refereevision.com/default_art.png")} />
            <DocCard link="https://www.refereevision.com/Default_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Default_ppt.jpg")} />
          </div>
        </div>
      </div>

      {/* Classification of Teams */}
      <CylinderSectionHeader label="CLASSIFICATION OF TEAMS" />
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
        <DocCard link="https://www.refereevision.com/class_art_new.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/class_art_new.jpg")} />
        <DocCard link="https://www.refereevision.com/Classification_ppt.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/Classification_ppt.jpg")} />
      </div>

      {/* Advantage / Disadvantage */}
      <CylinderSectionHeader label="ADVANTAGE / DISADVANTAGE" />
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 32,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 960,
          margin: "0 auto 36px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/adv_art.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/adv_art.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <MiniBadge label="FIBA EDUCATIONAL VIDEOS" />
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {advantageVideos.map((link, i) => (
              <VideoThumb
                key={i}
                index={i}
                link={link}
                thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
                onPlay={() => setActiveVideo(link)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Double Foul */}
      <CylinderSectionHeader label="DOUBLE FOUL" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
        <MiniBadge label="FIBA EDUCATIONAL VIDEO" />
        <VideoThumb
          index={0}
          link="https://youtu.be/pHiG75UXGPE"
          thumbnail="https://img.youtube.com/vi/pHiG75UXGPE/0.jpg"
          onPlay={() => setActiveVideo("https://youtu.be/pHiG75UXGPE")}
        />
      </div>

      {/* Double Foul: Signal, Article, Interpretation */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 24 : 40,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 900,
          margin: "0 auto 28px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="SIGNAL" />
          <DocCard link="https://www.refereevision.com/doublefoul_Sig.png" onClick={() => setActiveVideo("https://www.refereevision.com/doublefoul_Sig.png")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="ARTICLE" />
          <DocCard link="https://www.refereevision.com/double_art.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/double_art.jpg")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MiniBadge label="INTERPRETATION" />
          <DocCard link="https://www.refereevision.com/double_int.jpg" onClick={() => setActiveVideo("https://www.refereevision.com/double_int.jpg")} />
        </div>
      </div>

      {/* Foul Reporting */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
        <MiniBadge label="FOUL REPORTING" />
        <DocCard
          link="https://www.refereevision.com/doublefoul_reporting.png"
          width={isMobile ? 240 : 320}
          aspectRatio="16 / 9"
          onClick={() => setActiveVideo("https://www.refereevision.com/doublefoul_reporting.png")}
        />
      </div>

      {/* Last Second Shots */}
      <CylinderSectionHeader label="LAST SECOND SHOTS" />
      <SubSectionBadge label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
        {lastSecondShotVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>

      {/* Double Whistle */}
      <CylinderSectionHeader label="DOUBLE WHISTLE" />
      <SubSectionBadge label="FIBA EDUCATIONAL VIDEOS" />
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {doubleWhistleVideos.map((link, i) => (
          <VideoThumb
            key={i}
            index={i}
            link={link}
            thumbnail={`https://img.youtube.com/vi/${link.split("/").pop()}/0.jpg`}
            onPlay={() => setActiveVideo(link)}
          />
        ))}
      </div>
    </div>
  );
}

function OthersContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<OthersSubTab>("FREE THROWS");
  type ActiveVideo = {
  url: string;
  startTime?: number;
  endTime?: number;
};

const [activeVideo, setActiveVideo] = useState<string | ActiveVideo | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 48 }}>
      {activeVideo && (
  <VideoModal
    url={typeof activeVideo === "string" ? activeVideo : activeVideo.url}
    title="OBR 2026 Webinar"
    startTime={
      typeof activeVideo === "string" ? 0 : activeVideo.startTime
    }
    endTime={
      typeof activeVideo === "string" ? undefined : activeVideo.endTime
    }
    onClose={() => setActiveVideo(null)}
  />
)}
      <SectionBadge label="OTHERS" />

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
        {OTHERS_SUBTABS.map((subTab) => {
          const isActive = activeSubTab === subTab;
          return (
            <button
              key={subTab}
              onClick={() => setActiveSubTab(subTab)}
              style={{
                flex: "1 1 auto",
                minWidth: isMobile ? 80 : 120,
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

      {activeSubTab === "FREE THROWS" ? (
        <FreeThrowsSubTab isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : activeSubTab === "JUMP BALL/ HELD BALL" ? (
        <JumpBallSubTab isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : activeSubTab === "SPECIAL SITUATIONS" ? (
        <SpecialSituationsSubTab isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : activeSubTab === "CORRECTABLE ERRORS" ? (
        <CorrectableErrorsSubTab isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : activeSubTab === "IRS" ? (
        <IRSSubTab isMobile={isMobile} setActiveVideo={setActiveVideo} />
      ) : (
        <MiscSubTab isMobile={isMobile} setActiveVideo={setActiveVideo} />
      )}
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
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (tabParam && TABS.includes(tabParam as Tab)) {
      return tabParam as Tab;
    }
    return "TABLE OFFICIALS";
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
            top: 68,
            zIndex: 40,
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
        <Sidebar active={activeTab} onSelect={handleTabSelect} open={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />

        {/* Main content */}
        <main
          className="page-main-content"
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
            ) : activeTab === "DISRUPTIVE FOUL" ? (
              <DisruptiveFoulContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "FLAGRANT FOUL" ? (
              <FlagrantFoulContent isMobile={isMobile} isTablet={isTablet} />
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
            ) : activeTab === "GOALTENDING & INTERFERENCE" ? (
              <GoaltendingInterferenceContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "3, 5, 8 & 24 SECONDS" ? (
              <Seconds358Content isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "TECHNICAL FOUL" ? (
              <TechnicalFoulContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "DISQUALIFYING FOUL & FIGHTHING" ? (
              <DisqualifyingFoulContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "GAME CONTROL & MANAGEMENT" ? (
              <GameControlManagementContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "OTHERS" ? (
              <OthersContent isMobile={isMobile} isTablet={isTablet} />
            ) : (
              <PlaceholderTabContent tab={activeTab} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
