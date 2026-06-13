import { useState, useEffect } from "react";
import preGameTiming from "../../imports/pre_game_timing.png";
import arrivalDoc from "../../imports/arrival_doc.png";
import arrivalPhoto from "../../imports/arrival_photo.png";
import preGameDutiesDoc from "../../imports/pre_game_duties_doc.png";
import preGameDutiesPhoto1 from "../../imports/pre_game_duties_photo1.png";
import preGameDutiesPhoto2 from "../../imports/pre_game_duties_photo2.png";
import preGameDutiesPhoto3 from "../../imports/pre_game_duties_photo3.png";
import dutiesDuringGameDoc from "../../imports/duties_during_game_doc.png";
import dutiesDuringGamePhoto from "../../imports/duties_during_game_photo.png";
import postGameDutiesDoc from "../../imports/post_game_duties_doc.png";

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
        padding: "16px",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 20,
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
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 95vw)",
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

// ─── Video Thumb ──────────────────────────────────────────────────────────────
const THUMB_SHADES = ["#1A2416", "#16201A", "#1E1A16", "#161E20", "#1A161E", "#1E1E16"];

function VideoThumb({ index, link, onPlay }: { index: number; link: string; onPlay: () => void }) {
  const h = useHover();
  const ytId = getYouTubeId(link);
  const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

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
            borderLeft: `3px solid ${T.orange}`,
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
        borderLeft: `3px solid ${T.orange}`,
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
function ContentImage({ src, alt }: { src: string; alt: string }) {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
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
        <ContentImage src={arrivalPhoto} alt="Arrival Photo" />
      </ImageRow>

      <SubSectionBadge label="PRE-GAME DUTIES" />
      <ImageRow>
        <ContentImage src={preGameDutiesDoc} alt="Pre-Game Duties Document" />
        <ContentImage src={preGameDutiesPhoto1} alt="Pre-Game Duties Photo 1" />
        <ContentImage src={preGameDutiesPhoto2} alt="Pre-Game Duties Photo 2" />
        <ContentImage src={preGameDutiesPhoto3} alt="Pre-Game Duties Photo 3" />
      </ImageRow>

      <SubSectionBadge label="DUTIES DURING THE GAME" />
      <ImageRow>
        <ContentImage src={dutiesDuringGameDoc} alt="Duties During Game Document" />
        <ContentImage src={dutiesDuringGamePhoto} alt="Duties During Game Photo" />
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
function VideoCard({ index }: { index: number }) {
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
        border: `1px solid ${h.on ? T.orange : T.border}`,
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
      <div style={{ width: 24, height: 24, background: h.on ? T.orange : "rgba(232,101,26,0.7)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", zIndex: 2 }}>
        <svg width="8" height="10" viewBox="0 0 10 12" fill="none"><polygon points="0,0 10,6 0,12" fill="white" /></svg>
      </div>
    </div>
  );
}

// Clock placeholder
function ClockCard() {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        width: 100,
        aspectRatio: "4 / 3",
        background: "#0A0A0A",
        border: `2px solid ${h.on ? T.orange : "#2A2A2A"}`,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 0.2s",
      }}
    >
      <span style={{ fontFamily: "'Courier New', monospace", fontSize: 22, fontWeight: 700, color: h.on ? T.orange : "#CC3399", letterSpacing: "2px", textShadow: h.on ? `0 0 8px ${T.orange}` : "0 0 8px #CC3399" }}>
        00:00
      </span>
    </div>
  );
}

// Sub-section with label + doc cards row
function DocSection({ title, count = 2 }: { title: string; count?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 28px", marginBottom: 20 }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>
          {title}
        </span>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {Array.from({ length: count }).map((_, i) => <DocCard key={i} />)}
      </div>
    </div>
  );
}

// Three-column rule/procedure/summary
function RuleProcedureSummary({ videoCount = 0 }: { videoCount?: number }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 12, justifyContent: "space-around", flexWrap: "wrap", marginBottom: 24 }}>
        {["RULE", "PROCEDURE", "SUMMARY"].map((label) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, flex: "1 1 120px" }}>
            <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "6px 20px" }}>
              <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 13, color: T.orange, letterSpacing: "1px", textTransform: "uppercase" }}>{label}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {Array.from({ length: label === "PROCEDURE" ? 2 : 1 }).map((_, i) => <DocCard key={i} />)}
            </div>
          </div>
        ))}
      </div>
      {videoCount > 0 && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 28px", margin: "24px 0 16px" }}>
              <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: T.orange, letterSpacing: "1.5px", textTransform: "uppercase" }}>EDUCATIONAL VIDEOS</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {Array.from({ length: videoCount }).map((_, i) => <VideoCard key={i} index={i} />)}
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
      <DocSection title="DUTIES" count={2} />
      <DocSection title="BEFORE THE GAME" count={1} />
      <DocSection title="DURING THE GAME" count={1} />
    </div>
  );
}

// ─── TIMER Content ────────────────────────────────────────────────────────────
function TimerContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <div style={{ display: "flex", gap: 36, justifyContent: "space-around", flexWrap: "wrap" }}>
        <DocSection title="DUTIES" count={3} />
        <DocSection title="BEFORE THE GAME" count={1} />
        <DocSection title="DURING THE GAME" count={1} />
      </div>

      {/* Starting & Stopping the Game Clock */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>
            STARTING &amp; STOPPING THE GAME CLOCK
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {Array.from({ length: 4 }).map((_, i) => <ClockCard key={i} />)}
        </div>
      </div>

      {/* Time-Out Request */}
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>TIME-OUT REQUEST</span>
          </div>
        </div>
        <RuleProcedureSummary videoCount={5} />
      </div>

      {/* Substitution Request */}
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ background: "transparent", border: `2px solid ${T.orange}`, borderRadius: 30, padding: "8px 36px", width: "80%", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 16, color: T.orange, letterSpacing: "2px", textTransform: "uppercase" }}>SUBSTITUTION REQUEST</span>
          </div>
        </div>
        <RuleProcedureSummary videoCount={2} />
      </div>
    </div>
  );
}

// ─── SHOT CLOCK OPERATOR Content ──────────────────────────────────────────────
function ShotClockOperatorContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <DocSection title="DUTIES" count={2} />
      <DocSection title="BEFORE THE GAME" count={1} />
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
            ) : (
              <PlaceholderTabContent tab={activeTab} />
            )}
          </div>

          {/* Copyright Footer */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
            <span style={{ fontFamily: DM, fontSize: 13, color: T.mutedText }}>
              Copyrights © 2026 | All rights reserved by Referee Vision
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
