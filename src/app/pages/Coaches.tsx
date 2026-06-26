import { useState, useEffect } from "react";

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
  hoverBg: "#1F1F1F",
  mutedText: "#666666",
  placeholderText: "#444444",
} as const;

const BARLOW = "'Barlow Condensed', sans-serif";
const DM = "'DM Sans', sans-serif";

// ─── Tabs ─────────────────────────────────────────────────────────────────────
type Tab =
  | "CURRICULUM"
  | "BOOKS"
  | "DRILLS FOR YOUNG PLAYERS"
  | "WABC"
  | "FIBA EUROPE";

const TABS: Tab[] = [
  "CURRICULUM",
  "BOOKS",
  "DRILLS FOR YOUNG PLAYERS",
  "WABC",
  "FIBA EUROPE",
];

// ─── Data ────────────────────────────────────────────────────────────────────
const CURRICULUM_DOCS = [
  { label: "WABC COACHES MANUAL - BASKETBALL", link: "https://www.refereevision.com/Basketball_intro.pdf" },
  { label: "WABC COACHES MANUAL - MINI BASKETBALL", link: "https://www.refereevision.com/Mini-basketball.pdf" },
  { label: "WABC COACHES MANUAL - LEVEL I", link: "https://www.refereevision.com/Level%201.pdf" },
  { label: "WABC COACHES MANUAL - LEVEL 2", link: "https://www.refereevision.com/Level%202.pdf" },
  { label: "WABC COACHES MANUAL - LEVEL 3", link: "https://www.refereevision.com/Level%203.pdf" },
  { label: "WABC FACILITATOR HANDBOOK", link: "https://www.refereevision.com/Start-Coaching_Facilitator_Handbook_EN.pdf" },
  { label: "WABC COACH WORKBOOK", link: "https://www.refereevision.com/Start-Coaching_Coach_Workbook_EN.pdf" },
  { label: "WABC ACTIVITIES BOOK", link: "https://www.refereevision.com/Start-Coaching_Activities_Book_EN.pdf" },
  { label: "WABC PRACTICE PLANS", link: "https://www.refereevision.com/Start-Coaching_Practice_Plans_EN.pdf" },
  { label: "WABC 3X3 - PLAYERS GUIDE", link: "https://fiba3x3.com/docs/wabc-3x3-players-guide.pdf" },
];

const BOOKS_DOCS = [
  { label: "BASKETBALL FOR YOUNG PLAYERS - GUIDELINES FOR COACHES", link: "https://www.refereevision.com/00.pdf" },
  { label: "THE ROLE OF BASKETBALL IN THE EDUCATIONAL DEVELOPMENT OF YOUNGSTERS", link: "https://www.refereevision.com/01.pdf" },
  { label: "PLANNING BASKETBALL ACTIVITIES", link: "https://www.refereevision.com/02.pdf" },
  { label: "ORGANISING TRAINING SESSIONS", link: "https://www.refereevision.com/03.pdf" },
  { label: "COACHING STRATEGIES FOR TRAINING SESSIONS", link: "https://www.refereevision.com/04.pdf" },
  { label: "COACHES' BEHAVIOUR AT GAMES", link: "https://www.refereevision.com/05.pdf" },
  { label: "MINI-BASKETBALL", link: "https://www.refereevision.com/06.pdf" },
  { label: "TRAINING SESSIONS WITH 13-14 YEAR-OLD PLAYERS", link: "https://www.refereevision.com/07.pdf" },
  { label: "COACHING 15-18 YEAR OLD PLAYERS", link: "https://www.refereevision.com/08.pdf" },
  { label: "FIBA ASSIST COACHES OFFENSE", link: "https://www.refereevision.com/87019435-Fiba-Assist-Coaches-Offense.pdf" },
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
              COACHES
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
                onSelect={(t) => {
                  onSelect(t);
                  onClose();
                }}
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
          COACHES
        </span>
      </div>

      {/* Nav items */}
      <div style={{ paddingTop: 0 }}>
        {TABS.map((tab) => (
          <SidebarItem
            key={tab}
            tab={tab}
            active={tab === active}
            onSelect={onSelect}
          />
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
  let color = T.orange;
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
function DocRow({
  doc,
  isMobile,
}: {
  doc: { label: string; link: string };
  isMobile: boolean;
}) {
  const h = useHover();

  return (
    <div
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        minHeight: 56,
        padding: isMobile ? "12px 8px" : "0 8px",
        borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
        gap: isMobile ? 8 : 0,
      }}
    >
      {/* Document name */}
      <span
        style={{
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 16,
          color: T.dimText,
          flex: 1,
          minWidth: 0,
        }}
      >
        {doc.label}
      </span>

      {/* Download button */}
      <a
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        href={doc.link}
        target="_blank"
        rel="noopener noreferrer"
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
      </a>
    </div>
  );
}

// ─── Tab Content renderers ────────────────────────────────────────────────────
function CurriculumContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="CURRICULUM" />
      <div style={{ marginTop: 36 }}>
        {CURRICULUM_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

function BooksContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="BOOKS" />
      <div style={{ marginTop: 36 }}>
        {BOOKS_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

// ─── Drills for Young Players ─────────────────────────────────────────────────
type DrillsSubTab = "MINI" | "13-14 YEAR OLDS" | "15-18 YEAR OLDS";
const DRILLS_SUBTABS: DrillsSubTab[] = ["MINI", "13-14 YEAR OLDS", "15-18 YEAR OLDS"];

function DrillBox({
  index,
  youtubeUrl,
  thumbnailUrl,
  title,
  onPlay,
}: {
  index: number;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  onPlay?: (url: string, title: string) => void;
}) {
  const h = useHover();
  const hasVideo = !!youtubeUrl;

  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={hasVideo && onPlay ? () => onPlay(youtubeUrl, title || `Drill ${index}`) : undefined}
      style={{
        aspectRatio: "1 / 1",
        background: T.charcoal,
        border: hasVideo
          ? h.on
            ? `2px solid ${T.white}`
            : `2px solid ${T.orange}`
          : h.on
            ? `2px solid ${T.orange}`
            : `2px solid #8B6914`,
        borderRadius: 8,
        cursor: hasVideo ? "pointer" : "default",
        transition: "border-color 0.2s, transform 0.25s, box-shadow 0.25s",
        transform: h.on && hasVideo ? "scale(1.05)" : "scale(1)",
        boxShadow: h.on && hasVideo ? "0 4px 16px rgba(232,101,26,0.35)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={title || `Drill ${index}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: h.on ? 0.75 : 0.5,
            transition: "transform 0.25s ease, opacity 0.25s ease",
            transform: h.on ? "scale(1.05)" : "scale(1)",
          }}
        />
      )}

      {thumbnailUrl && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
            transition: "background 0.2s",
          }}
        />
      )}

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ position: "relative", zIndex: 2 }}
      >
        <circle cx="12" cy="12" r="10" stroke={T.orange} strokeWidth="1.5" opacity={hasVideo ? 1 : 0.3} />
        <polygon points="10,7 17,12 10,17" fill={T.orange} opacity={hasVideo ? 1 : 0.3} />
      </svg>
      <span
        style={{
          position: "absolute",
          bottom: 4,
          right: 6,
          fontFamily: BARLOW,
          fontSize: 10,
          fontWeight: 700,
          color: hasVideo ? (thumbnailUrl ? T.white : T.orange) : "#8B6914",
          opacity: hasVideo ? 1 : 0.5,
          zIndex: 2,
        }}
      >
        {index}
      </span>
    </div>
  );
}

function DrillSectionBadge({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <div
        style={{
          border: `2px solid ${T.orange}`,
          background: "transparent",
          fontFamily: BARLOW,
          fontWeight: 800,
          fontSize: 15,
          color: T.orange,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          textAlign: "center",
          padding: "8px 32px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function DrillGrid({
  count,
  cols,
  drills = {},
  onPlay,
}: {
  count: number;
  cols: number;
  drills?: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }>;
  onPlay?: (url: string, title: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 12,
        maxWidth: cols * 90 + (cols - 1) * 12,
        margin: "0 auto",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const drill = drills[i];
        return (
          <DrillBox
            key={i}
            index={i + 1}
            youtubeUrl={drill?.youtubeUrl}
            thumbnailUrl={drill?.thumbnailUrl}
            title={drill?.title}
            onPlay={onPlay}
          />
        );
      })}
    </div>
  );
}

function DrillsContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<DrillsSubTab>("MINI");
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string; isMp4: boolean } | null>(null);
  const cols = isMobile ? 4 : isTablet ? 6 : 8;

  const miniDrills: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "7jDI0RhUKFw",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/7jDI0RhUKFw/0.jpg",
    },
    1: {
      youtubeUrl: "n6M2D1v_rvo",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/n6M2D1v_rvo/0.jpg",
    },
    2: {
      youtubeUrl: "62PfwzDH9-Q",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/62PfwzDH9-Q/0.jpg",
    },
    3: {
      youtubeUrl: "Uy-weZEXwQE",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/Uy-weZEXwQE/0.jpg",
    },
    4: {
      youtubeUrl: "wAaPpI4lc3c",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/wAaPpI4lc3c/0.jpg",
    },
    5: {
      youtubeUrl: "wP677WwS_Gg",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/wP677WwS_Gg/0.jpg",
    },
    6: {
      youtubeUrl: "EXxgJjSKyK4",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/EXxgJjSKyK4/0.jpg",
    },
    7: {
      youtubeUrl: "N9JezhYPkEA",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/N9JezhYPkEA/0.jpg",
    },
    8: {
      youtubeUrl: "FYRks9lMICo",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/FYRks9lMICo/0.jpg",
    },
    9: {
      youtubeUrl: "1tRUZiCQxyE",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/1tRUZiCQxyE/0.jpg",
    },
    10: {
      youtubeUrl: "5AO8bejLjro",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/5AO8bejLjro/0.jpg",
    },
    11: {
      youtubeUrl: "KMiHGBQLdIA",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/KMiHGBQLdIA/0.jpg",
    },
    12: {
      youtubeUrl: "CWEabjVJw3Q",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/CWEabjVJw3Q/0.jpg",
    },
    13: {
      youtubeUrl: "eIBkyigsYtk",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/eIBkyigsYtk/0.jpg",
    },
    14: {
      youtubeUrl: "K9usXI0yMow",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/K9usXI0yMow/0.jpg",
    },
    15: {
      youtubeUrl: "k42m3gQjbpg",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/k42m3gQjbpg/0.jpg",
    },
    16: {
      youtubeUrl: "kvkSCEds-0Q",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/kvkSCEds-0Q/0.jpg",
    },
    17: {
      youtubeUrl: "dxgVng0i30o",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/dxgVng0i30o/0.jpg",
    },
    18: {
      youtubeUrl: "TnP-8VAahz0",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/TnP-8VAahz0/0.jpg",
    },
    19: {
      youtubeUrl: "GVmvZ80IsyI",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/GVmvZ80IsyI/0.jpg",
    },
    20: {
      youtubeUrl: "ZzbEUPnaQ6Q",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/ZzbEUPnaQ6Q/0.jpg",
    },
    21: {
      youtubeUrl: "e70qtY8Yqlw",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/e70qtY8Yqlw/0.jpg",
    },
    22: {
      youtubeUrl: "pF-Xp--3gFA",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/pF-Xp--3gFA/0.jpg",
    },
    23: {
      youtubeUrl: "E3cMXEkhik0",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/E3cMXEkhik0/0.jpg",
    },
    24: {
      youtubeUrl: "8gOTHLVuP7o",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/8gOTHLVuP7o/0.jpg",
    },
    25: {
      youtubeUrl: "V5aTR8P2iRE",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/V5aTR8P2iRE/0.jpg",
    },
    26: {
      youtubeUrl: "Dikg7f870iM",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/Dikg7f870iM/0.jpg",
    },
    27: {
      youtubeUrl: "ePX7umliH_s",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/ePX7umliH_s/0.jpg",
    },
    28: {
      youtubeUrl: "qV6hq_IEgGY",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/qV6hq_IEgGY/0.jpg",
    },
    29: {
      youtubeUrl: "UNoBB6xcpmA",
      title: "Drills for Young Players - Mini",
      thumbnailUrl: "https://img.youtube.com/vi/UNoBB6xcpmA/0.jpg",
    },
  };

  const drills1314: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "ibizolSVuTw",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/ibizolSVuTw/0.jpg",
    },
    1: {
      youtubeUrl: "GbewmjhFIAY",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/GbewmjhFIAY/0.jpg",
    },
    2: {
      youtubeUrl: "-lyHYdQ44A0",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/-lyHYdQ44A0/0.jpg",
    },
    3: {
      youtubeUrl: "Ez9tjbsLglc",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/Ez9tjbsLglc/0.jpg",
    },
    4: {
      youtubeUrl: "g47mr40SzMo",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/g47mr40SzMo/0.jpg",
    },
    5: {
      youtubeUrl: "N6IhH16HasQ",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/N6IhH16HasQ/0.jpg",
    },
    6: {
      youtubeUrl: "gWJ-HnlyxxM",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/gWJ-HnlyxxM/0.jpg",
    },
    7: {
      youtubeUrl: "n4rLzvy1Les",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/n4rLzvy1Les/0.jpg",
    },
    8: {
      youtubeUrl: "rc-YPtXdaHM",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/rc-YPtXdaHM/0.jpg",
    },
    9: {
      youtubeUrl: "rVP_a78LoG8",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/rVP_a78LoG8/0.jpg",
    },
    10: {
      youtubeUrl: "_wPl4lTRjQU",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/_wPl4lTRjQU/0.jpg",
    },
    11: {
      youtubeUrl: "mY17_1llei8",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/mY17_1llei8/0.jpg",
    },
    12: {
      youtubeUrl: "q_edt-X9t7s",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/q_edt-X9t7s/0.jpg",
    },
    13: {
      youtubeUrl: "3eOM1luk960",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/3eOM1luk960/0.jpg",
    },
    14: {
      youtubeUrl: "Y9BeNKPh9Fw",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/Y9BeNKPh9Fw/0.jpg",
    },
    15: {
      youtubeUrl: "rJWZrDMijyc",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/rJWZrDMijyc/0.jpg",
    },
    16: {
      youtubeUrl: "fNBd0NGFFmQ",
      title: "Drills for Young Players - 13-14 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/fNBd0NGFFmQ/0.jpg",
    },
  };

  const drills1518Moving: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "T9IT4Q_aMKk",
      title: "Moving Without the Ball - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/T9IT4Q_aMKk/0.jpg",
    },
    1: {
      youtubeUrl: "tT13GRCiwYs",
      title: "Moving Without the Ball - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/tT13GRCiwYs/0.jpg",
    },
    2: {
      youtubeUrl: "ZHsyz6ieGiw",
      title: "Moving Without the Ball - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/ZHsyz6ieGiw/0.jpg",
    },
    3: {
      youtubeUrl: "T__yev41zlg",
      title: "Moving Without the Ball - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/T__yev41zlg/0.jpg",
    },
    4: {
      youtubeUrl: "h8j5KkuXUc0",
      title: "Moving Without the Ball - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/h8j5KkuXUc0/0.jpg",
    },
  };

  const drillsScreening: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "YiUFBTS75WM",
      title: "SCREENING - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/YiUFBTS75WM/0.jpg",
    },
    1: {
      youtubeUrl: "K4Cyhp8wei4",
      title: "SCREENING - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/K4Cyhp8wei4/0.jpg",
    },
  };

  const drillsRebounding: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "mKnNtWs5f4c",
      title: "Rebounding - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/mKnNtWs5f4c/0.jpg",
    },
  };

  const drillsLowPostMoves: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "zG6UjlBDH7s",
      title: "Low Post Moves - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/zG6UjlBDH7s/0.jpg",
    },
    1: {
      youtubeUrl: "XtImE97EE7o",
      title: "Low Post Moves - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/XtImE97EE7o/0.jpg",
    },
    2: {
      youtubeUrl: "B2W0y9fnY8Y",
      title: "Low Post Moves - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/B2W0y9fnY8Y/0.jpg",
    },
    3: {
      youtubeUrl: "nZc91Yk6AZQ",
      title: "Low Post Moves - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/nZc91Yk6AZQ/0.jpg",
    },
    4: {
      youtubeUrl: "mmBLGtfL9hg",
      title: "Low Post Moves - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/mmBLGtfL9hg/0.jpg",
    },
    5: {
      youtubeUrl: "TGx0uZ7tE3U",
      title: "Low Post Moves - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/TGx0uZ7tE3U/0.jpg",
    },
    6: {
      youtubeUrl: "463JibHPK1Q",
      title: "Low Post Moves - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/463JibHPK1Q/0.jpg",
    },
  };

  const drillsLowPostPerimeter: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "_v4PdRQVUu4",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/_v4PdRQVUu4/0.jpg",
    },
    1: {
      youtubeUrl: "oJ2LeCBQ9LE",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/oJ2LeCBQ9LE/0.jpg",
    },
    2: {
      youtubeUrl: "tBB56LekzyU",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/tBB56LekzyU/0.jpg",
    },
    3: {
      youtubeUrl: "7_oCHE4T0tw",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/7_oCHE4T0tw/0.jpg",
    },
    4: {
      youtubeUrl: "vMaI8NlNRBM",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/vMaI8NlNRBM/0.jpg",
    },
    5: {
      youtubeUrl: "d5y3_pqT5Ek",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/d5y3_pqT5Ek/0.jpg",
    },
    6: {
      youtubeUrl: "881d3C7TVP4",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/881d3C7TVP4/0.jpg",
    },
    7: {
      youtubeUrl: "ciUrXPAMX8A",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/ciUrXPAMX8A/0.jpg",
    },
    8: {
      youtubeUrl: "dG46aQxRKeQ",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/dG46aQxRKeQ/0.jpg",
    },
    9: {
      youtubeUrl: "9M4Y_eza-3U",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/9M4Y_eza-3U/0.jpg",
    },
    10: {
      youtubeUrl: "FU_FtWLnd3g",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/FU_FtWLnd3g/0.jpg",
    },
    11: {
      youtubeUrl: "5fzw0gjEEGY",
      title: "Low Post and Perimeter Players' Decisions - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/5fzw0gjEEGY/0.jpg",
    },
  };

  const drillsTeamDefense: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "Rq8agkz6M_A",
      title: "Team Defense - Basic Positioning - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/Rq8agkz6M_A/0.jpg",
    },
    1: {
      youtubeUrl: "L-EV_A4v0tg",
      title: "Team Defense - Basic Positioning - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/L-EV_A4v0tg/0.jpg",
    },
    2: {
      youtubeUrl: "L2Bg2uV9Tt4",
      title: "Team Defense - Basic Positioning - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/L2Bg2uV9Tt4/0.jpg",
    },
    3: {
      youtubeUrl: "OIl51m8on4M",
      title: "Team Defense - Basic Positioning - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/OIl51m8on4M/0.jpg",
    },
    4: {
      youtubeUrl: "ndom4ZbFikI",
      title: "Team Defense - Basic Positioning - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/ndom4ZbFikI/0.jpg",
    },
  };

  const drillsBasicOffense: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "zdCgrfBUZ00",
      title: "Basic Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/zdCgrfBUZ00/0.jpg",
    },
    1: {
      youtubeUrl: "nnd3N9yQVLU",
      title: "Basic Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/nnd3N9yQVLU/0.jpg",
    },
    2: {
      youtubeUrl: "eFr00UIy-cQ",
      title: "Basic Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/eFr00UIy-cQ/0.jpg",
    },
    3: {
      youtubeUrl: "gj3FbAHyN2k",
      title: "Basic Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/gj3FbAHyN2k/0.jpg",
    },
    4: {
      youtubeUrl: "sz99-nLc7Ug",
      title: "Basic Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/sz99-nLc7Ug/0.jpg",
    },
    5: {
      youtubeUrl: "1tu78j3v-B4",
      title: "Basic Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/1tu78j3v-B4/0.jpg",
    },
    6: {
      youtubeUrl: "DreCMRU9Dgo",
      title: "Basic Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/DreCMRU9Dgo/0.jpg",
    },
  };

  const drillsAdvancedOffense: Record<number, { youtubeUrl: string; title: string; thumbnailUrl?: string }> = {
    0: {
      youtubeUrl: "toKoy-9qXCk",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/toKoy-9qXCk/0.jpg",
    },
    1: {
      youtubeUrl: "x92t2BCBkak",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/x92t2BCBkak/0.jpg",
    },
    2: {
      youtubeUrl: "UKPaTcv0vHE",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/UKPaTcv0vHE/0.jpg",
    },
    3: {
      youtubeUrl: "M-JJJTvojvc",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/M-JJJTvojvc/0.jpg",
    },
    4: {
      youtubeUrl: "GaNB9msAtyo",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/GaNB9msAtyo/0.jpg",
    },
    5: {
      youtubeUrl: "vA8pk_NxX48",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/vA8pk_NxX48/0.jpg",
    },
    6: {
      youtubeUrl: "8CJsFKRqLio",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/8CJsFKRqLio/0.jpg",
    },
    7: {
      youtubeUrl: "HRN9K5Svj-g",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/HRN9K5Svj-g/0.jpg",
    },
    8: {
      youtubeUrl: "pR-UBKpivVI",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/pR-UBKpivVI/0.jpg",
    },
    9: {
      youtubeUrl: "ymPeRrnG4TM",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/ymPeRrnG4TM/0.jpg",
    },
    10: {
      youtubeUrl: "Na3OfG545qc",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/Na3OfG545qc/0.jpg",
    },
    11: {
      youtubeUrl: "IpTRQMaGGIs",
      title: "Advanced Offense - 15-18 Year Olds",
      thumbnailUrl: "https://img.youtube.com/vi/IpTRQMaGGIs/0.jpg",
    },
  };

  return (
    <div>
      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          videoSrc={activeVideo.src}
          title={activeVideo.title}
          isMp4={activeVideo.isMp4}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <SectionBadge label="DRILLS FOR YOUNG PLAYERS" />

      {/* Sub-tab bar */}
      <div style={{ display: "flex", marginTop: 24, background: "#555555" }}>
        {DRILLS_SUBTABS.map((tab) => {
          const isActive = tab === activeSubTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              style={{
                flex: 1,
                padding: "10px 16px",
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "1px",
                textTransform: "uppercase",
                background: isActive ? T.orange : "transparent",
                color: isActive ? T.white : "#CCCCCC",
                border: "none",
                cursor: "pointer",
                borderRadius: 0,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Sub-tab content */}
      <div style={{ marginTop: 28 }}>
        {activeSubTab === "MINI" && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div
                style={{
                  background: T.orange,
                  color: T.white,
                  fontFamily: BARLOW,
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "2px",
                  padding: "8px 48px",
                }}
              >
                MINI
              </div>
            </div>
            <DrillGrid
              count={30}
              cols={cols}
              drills={miniDrills}
              onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })}
            />
          </div>
        )}

        {activeSubTab === "13-14 YEAR OLDS" && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div
                style={{
                  background: T.orange,
                  color: T.white,
                  fontFamily: BARLOW,
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "2px",
                  padding: "8px 48px",
                }}
              >
                13-14 YEAR OLDS
              </div>
            </div>
            <DrillGrid count={17} cols={cols} drills={drills1314} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
          </div>
        )}

        {activeSubTab === "15-18 YEAR OLDS" && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div
                style={{
                  background: T.orange,
                  color: T.white,
                  fontFamily: BARLOW,
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "2px",
                  padding: "8px 48px",
                }}
              >
                15-18 YEAR OLDS
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="MOVING WITHOUT THE BALL" />
              <DrillGrid count={5} cols={Math.min(cols, 5)} drills={drills1518Moving} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
            </div>

            <div
              style={{
                display: "flex",
                gap: isMobile ? 24 : 48,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 32,
              }}
            >
              <div>
                <DrillSectionBadge label="SCREENING" />
                <DrillGrid count={2} cols={2} drills={drillsScreening} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
              </div>
              <div>
                <DrillSectionBadge label="REBOUNDING" />
                <DrillGrid count={1} cols={1} drills={drillsRebounding} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="LOW POST MOVES" />
              <DrillGrid count={7} cols={Math.min(cols, 7)} drills={drillsLowPostMoves} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="LOW POST AND PERIMETER PLAYERS' DECISIONS" />
              <DrillGrid count={12} cols={cols} drills={drillsLowPostPerimeter} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="TEAM DEFENSE - BASIC POSITIONING" />
              <DrillGrid count={5} cols={Math.min(cols, 6)} drills={drillsTeamDefense} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="BASIC OFFENSE" />
              <DrillGrid count={7} cols={Math.min(cols, 7)} drills={drillsBasicOffense} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="ADVANCED OFFENSE" />
              <DrillGrid count={12} cols={cols} drills={drillsAdvancedOffense} onPlay={(url, title) => setActiveVideo({ src: url, title, isMp4: false })} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── WABC Content ─────────────────────────────────────────────────────────────
type WabcSubTab = "GENERAL" | "DRILLS" | "OFFENSE" | "DEFENSE";
const WABC_SUBTABS: WabcSubTab[] = ["GENERAL", "DRILLS", "OFFENSE", "DEFENSE"];

const WABC_DATA = {
  GENERAL: [
    { title: "NBA Locker Room", presenter: "Maurizio Gherardini", youtubeUrl: "r7obUgRCXAk" },
    { title: "Young Players' Practice Principles", presenter: "Don Showalter", youtubeUrl: "1jVJ2FClYCM" },
    { title: "Planning in Basketball", presenter: "Fabrizio Frates", youtubeUrl: "VOwekC96MyY" },
    { title: "Communication in Basketball", presenter: "Evangelos \"Vangelis\" Angelou", youtubeUrl: "rE-8e6TnGBk" },
    { title: "Modern Basketball", presenter: "Duško Vujošević", youtubeUrl: "nEf05txsRgE" },
    { title: "Modern Basketball", presenter: "John Calipari", youtubeUrl: "yoQuCQSzc-0" },
    { title: "Young Leader's perspective on the Youth Leadership Seminar", presenter: "Ruby Ang", youtubeUrl: "AVXWTjTBdD0" },
    { title: "Player Coach Relationship On and Off the Court", presenter: "Ademola Okulaja", youtubeUrl: "1ba8mu5m1fo" },
    { title: "NBA Coaching Experiences", presenter: "Jay Larranaga", youtubeUrl: "4uYTb-p5RSM" },
    { title: "Approach to Coaching", presenter: "Boza Maljkovic", youtubeUrl: "SFnp8CeNCpYM" },
    { title: "Game Principles", presenter: "Zach Guthrie", youtubeUrl: "jV5zEAEpJRE" },
    { title: "Physical preparation in the pre-competitive period", presenter: "Toni Caparros", youtubeUrl: "qKE1KaZ5OUo" },
    { title: "The team work", presenter: "Ettore Messina", youtubeUrl: "2WOl54pLX9s" },
    { title: "Coach and player development", presenter: "Patrick Mutombo", youtubeUrl: "NQ_c8OdRTPw" },
    { title: "Developing your club system", presenter: "Rosas Gersson", youtubeUrl: "ZYubzT3OpZI" },
    { title: "Experience in Coaching Top Teams", presenter: "Natalia Hejkova", youtubeUrl: "j5bmsa-y45Y" },
    { title: "Trends of International Basketball", presenter: "Patrick Hunt", youtubeUrl: "92Ke2Fidr6o" },
    { title: "The Importance of Speed And Stance In Basketball", presenter: "Francesco Cuzzolin", youtubeUrl: "Cwrx4B2JUGY" },
    { title: "3X3 BASKETBALL", presenter: "Regan Kama", youtubeUrl: "1BhaCFKtrtU" },
    { title: "3X3 BASKETBALL", presenter: "Anthony Corban", youtubeUrl: "WgT2kkGY5AI" },
    { title: "Building the team", presenter: "Svetislav Pesic", youtubeUrl: "EoS-EdqOs0w" },
    { title: "Develop Players' Decision Making", presenter: "Allison McNeill", youtubeUrl: "wRgl-2YUFFg" },
    { title: "Practice in Competition Period", presenter: "Željko Obradović", youtubeUrl: "EVsxVL9jVzA" }
  ],
  DRILLS: [
    { title: "Various Drills to Improve Offence", presenter: "Brian Goorjian", youtubeUrl: "YZe1-wBCTAA" },
    { title: "Drills for Development and Team Game", presenter: "Andrea Trinchieri", youtubeUrl: "oM1gGXXA_Qs" },
    { title: "Shooting (Technique and Drills)", presenter: "Sandy Brondello", youtubeUrl: "tDEKfvLIJ4Q" },
    { title: "Top Basketball Drills", presenter: "Ettore Messina", youtubeUrl: "YNjOn-Vq9VQ" },
    { title: "BC Red Star Practice During Competition Period", presenter: "Dejan Radonjic", youtubeUrl: "0dApdynkP2U" },
    { title: "Improving the Basic Skills of Inside Players", presenter: "Ganon Baker", youtubeUrl: "twKFHFRWNdI" },
    { title: "Big Men Workout", presenter: "Vlade Djurovic", youtubeUrl: "vPjs9Lg4FWY" },
    { title: "Set of Drills for Individual Development", presenter: "Boza Maljkovic", youtubeUrl: "dQxbgK9WnRE" },
    { title: "Player Development", presenter: "Adam Tatalovich", youtubeUrl: "i6klpW7P0Uo" },
    { title: "Defensive Drills", presenter: "Lionel Hollins", youtubeUrl: "nDdbJeQ1U0g" },
    { title: "Footwork", presenter: "Rick Carlisle", youtubeUrl: "FWc2TFi2a9A" },
    { title: "Shooting", presenter: "Rick Carlisle", youtubeUrl: "kxWNw9YDuW0" },
    { title: "Big man practice", presenter: "Zan Tabak", youtubeUrl: "TFnwZ3O7htU" },
    { title: "Gameday shoot around", presenter: "Sasa Obradovic", youtubeUrl: "WHGJ1J_iODU" },
    { title: "Guards individual practice shooting workout", presenter: "Dimitris Itoudis", youtubeUrl: "F60bfB5AbTE" },
    { title: "Simple drills for developing juniors", presenter: "Brendan Joyce", youtubeUrl: "bctbYf5fvXI" },
    { title: "Drills for guards", presenter: "Igor Kokoskov", youtubeUrl: "0bUl4ZtIPL8" },
    { title: "Drills to develop ball screen offense", presenter: "Paul Henare", youtubeUrl: "47qI0pFGtJE" },
    { title: "Water break drills", presenter: "Scott Brooks", youtubeUrl: "dCdRT9aa12E" },
    { title: "Power exercises for developing power of first step", presenter: "Tomaz Brinec", youtubeUrl: "vLiTu6Z01ZM" },
    { title: "1-1-3 matchup zone as a pressing defense full court", presenter: "Zafer Aktas", youtubeUrl: "1Y9vXvCAuwc" },
    { title: "Small Group Development Drills", presenter: "Patrick Mutombo", youtubeUrl: "hujFjvx7M3s" },
    { title: "Drills to Develop Team Defense", presenter: "Jim Boylen", youtubeUrl: "VQ2AOVpiUJs" },
    { title: "Set of Drills for Defense", presenter: "Igor Kokoskov", youtubeUrl: "wpKJpWbGg1M" },
    { title: "Offense & Warm Up Drills", presenter: "Bryan Gates", youtubeUrl: "E7IkmNRhXJM" },
    { title: "Defensive Drills", presenter: "Joacquin Ruiz Lorente", youtubeUrl: "h-pNbwvJ-eA" },
    { title: "Drills for Shooting, Passing and Spacing", presenter: "Joacquin Ruiz Lorente", youtubeUrl: "Wh9xP3_o83U" },
    { title: "Drills to Teach Players Offense", presenter: "Ettore Messina", youtubeUrl: "L7DI_8BbKg" },
    { title: "Individual Improvement Skills", presenter: "Tara Van der Veer", youtubeUrl: "d9FvCgkisQ" },
    { title: "Big Man Workout", presenter: "Juan Antonio Orenga", youtubeUrl: "RKMCM8GbuKI" },
    { title: "Individual Workout", presenter: "Ganon Baker", youtubeUrl: "x2x7Xs4FXzA" },
    { title: "Individual Development Drills", presenter: "Jama Mahlalela", youtubeUrl: "DgEMApKZK70" },
    { title: "Drills for Transition Defense", presenter: "Andrej Lemanis", youtubeUrl: "l5uZmj_qzXU" },
    { title: "Offensive and Defensive Individual Footwork", presenter: "Brent Matehaere", youtubeUrl: "S29pdlcH0wg" },
    { title: "Various Drills to Improve Basketball Technique", presenter: "Vlade Djurovic", youtubeUrl: "A6mf7VSqHGw" },
    { title: "Shooting for Girls Full Court Transition Shooting Drills", presenter: "Sean Fuller", youtubeUrl: "iqECpdNUlCM" },
    { title: "The Shooting and Drills", presenter: "Juan Orenga", youtubeUrl: "JINF104uYVY" },
    { title: "Transition Drills", presenter: "Jamie Carey", youtubeUrl: "TdHvAyGLpao" },
    { title: "Defensive Drills", presenter: "Elijas Zuros", youtubeUrl: "6BUGwneDxqg" },
    { title: "Pre-session Practice of Panathinaikos", presenter: "Dimitris Itoudis", youtubeUrl: "5BImbAfggKg" },
    { title: "Drills For Improvement Of Play", presenter: "Dusan Ivkovic", youtubeUrl: "iBj6RXHYSkg" },
    { title: "Teaching Fundamental Drills", presenter: "Kennedy Hamilton", youtubeUrl: "Mwla_-Jme0c" },
    { title: "Simplicity and Specificity Drills", presenter: "Carrie Graf", youtubeUrl: "Mj6LBZEtR8" },
    { title: "Cutthroat Defense Drill", presenter: "Brett Brown", youtubeUrl: "RmeRyIL3YAI" },
    { title: "Fundamental Drills", presenter: "Aik Ho", youtubeUrl: "7OBr6B2auX0" },
    { title: "Transition Game Drills", presenter: "Luca Banchi", youtubeUrl: "XFb7lYj1ku4" },
    { title: "Conditioning Drills and Skills", presenter: "Kennedy Hamilton", youtubeUrl: "dW6mtrPcQOs" },
    { title: "Shooting Drills", presenter: "Jim Foster", youtubeUrl: "HYtN9pA85Jc" },
    { title: "Gran Canaria Practice", presenter: "Pedro Martinez", youtubeUrl: "UiRiDUrSzBc" },
    { title: "Shooting and Defensive Drills", presenter: "Brendan Joyce", youtubeUrl: "7AG3rs9lOj8" }
  ],
  OFFENSE: [
    { title: "Match-Up Offense", presenter: "Željko Obradović", youtubeUrl: "Wy9ihi-GhCA" },
    { title: "Transition Offense and Early Flow Plays", presenter: "Brian Goorjian", youtubeUrl: "B4SjtLbAbjs" },
    { title: "Special Situations and Out of Bounds Plays", presenter: "Željko Obradović", youtubeUrl: "ggrXyc9UYE4" },
    { title: "Spacing and Different Options in Pn'R Offence", presenter: "Željko Obradović", youtubeUrl: "oiFc0-72vDA" },
    { title: "Efficiency in Moving", presenter: "Filip Mihajlovic", youtubeUrl: "ykLab_PYoBs" },
    { title: "Golden State Warriors' Cutting Drills and Transition Defense", presenter: "Ron Adams", youtubeUrl: "XAwsIw-p8Bg" },
    { title: "Building an Offense", presenter: "Chus Mateo", youtubeUrl: "pkycZKZvKoc" },
    { title: "Half-Court Offense with Pick n' Roll", presenter: "Fabrizio Frates", youtubeUrl: "VL_zzF21jLw" },
    { title: "Attacking the Switching Defense", presenter: "Evangelos \"Vangelis\" Angelou", youtubeUrl: "InDvE6_gKao" },
    { title: "Half-Court M2M Sets", presenter: "Gary Waters", youtubeUrl: "blbND6XmTvs" },
    { title: "Passing and Catching the Ball", presenter: "Patrick Mutombo", youtubeUrl: "y-f7FQkT4x0" },
    { title: "Zone Offense", presenter: "Patrick Hunt", youtubeUrl: "2kMwc3CxCV8" },
    { title: "Using the Off-Ball Screen", presenter: "Joan Plaza", youtubeUrl: "obv2YyGv9oU" },
    { title: "Corner Offense", presenter: "Chris Finch", youtubeUrl: "KkVPcd13NgQ" },
    { title: "Fundamental Skills for Offense", presenter: "Don Showalter", youtubeUrl: "YTEoYzLVFNU" },
    { title: "Fundamentals of Zone Offense", presenter: "Ettore Messina", youtubeUrl: "G5FacCbOubw" },
    { title: "San Antonio Spurs' Basic Offensive Concepts", presenter: "James Borrego", youtubeUrl: "PkX2CJafDzI" },
    { title: "Early Offense Flow", presenter: "Mike Brown", youtubeUrl: "g2YvIiZ2ufs" },
    { title: "Zone Offense", presenter: "Sergio Scariolo", youtubeUrl: "7wmLf-KsyeQ" },
    { title: "Guards Offensive Improvement", presenter: "Kevin Boyle", youtubeUrl: "jEZ2Gx6nRno" },
    { title: "Various Set Plays against Zone and M2M Defense", presenter: "Kevin Boyle", youtubeUrl: "gzNof7Sq3dY" },
    { title: "Transition Offense", presenter: "Ibon Navarro", youtubeUrl: "lwg8eDupWCE" },
    { title: "Transition into Early Offense", presenter: "Scott Brooks", youtubeUrl: "h2C7hZBh-Ts" },
    { title: "Early Offense Options", presenter: "Rick Barnes", youtubeUrl: "e37mCrj6vFE" },
    { title: "Offensive Tendencies in European Basketball", presenter: "Pablo Laso", youtubeUrl: "KO99qMio5A8" },
    { title: "Individual Offensive Development", presenter: "Jamahl Mosley and Ryan Saunders", youtubeUrl: "Wfu_iy_EzTg" },
    { title: "Fundamentals of Half-Court Offense", presenter: "Don Showalter", youtubeUrl: "dgse1_mCy8U" },
    { title: "Transition Offense and Secondary Fastbreak", presenter: "Jill Schneider", youtubeUrl: "PXf4bHfiOX0" },
    { title: "Early Offense", presenter: "Aleksandar Dzikic", youtubeUrl: "QP4SXCtxvhc" },
    { title: "Transition Offense", presenter: "Svetislav Pesic", youtubeUrl: "rDcurBBFfQM" },
    { title: "Individual tactics in close-out situations", presenter: "Ivan Rudez", youtubeUrl: "zvXhp6YQ_0o" },
    { title: "Passing Skills Improvements", presenter: "Luca Banchi", youtubeUrl: "si05aatjYkI" },
    { title: "Spacing in set offense and weakside movement", presenter: "Aleksandar Dzikic", youtubeUrl: "RISB100q_nU" },
    { title: "How to create a playmaker", presenter: "Slavko Trninic", youtubeUrl: "2Kahm_IHAPM" },
    { title: "Attacking the switch", presenter: "Ettore Messina", youtubeUrl: "AajtaR1iSGY" },
    { title: "Spacing & timing", presenter: "Ettore Messina", youtubeUrl: "XwZriAAESf4" },
    { title: "Full court man to man press break and set continuation", presenter: "Fotis Katsikaris", youtubeUrl: "rMLfVCUXKGw" },
    { title: "Single tag offense & defense", presenter: "Igor Kokoskov", youtubeUrl: "cNbh0IwRL_4" },
    { title: "Transition offense", presenter: "Igor Kokoskov", youtubeUrl: "2h6oXL6u6Xw" },
    { title: "The Position of the post player on offense", presenter: "Ivan Sunara", youtubeUrl: "x63xGLNG3DY" },
    { title: "Transition offense and defense", presenter: "Kennedy Kereama", youtubeUrl: "KL3U7XtLVLM" },
    { title: "Offense vs. multiple defense", presenter: "Luca Banchi", youtubeUrl: "hU03hW3s5dI" },
    { title: "Motion offense", presenter: "Matteo Boniciolli", youtubeUrl: "DmLTQe1qAQ8" },
    { title: "Special situations", presenter: "Mike Longabardi", youtubeUrl: "PhBPj9reGSg" },
    { title: "Attacking the zone defense", presenter: "Paco Garcia", youtubeUrl: "tIrGYspD2Qo" },
    { title: "Fundamental individual offensive skills", presenter: "Paul Henare", youtubeUrl: "DG-F_H5CUyI" },
    { title: "Shooting for beginners, mid and high level", presenter: "Richard Billant", youtubeUrl: "aT9P935_PcA" },
    { title: "Low post rules", presenter: "Sito Alonso", youtubeUrl: "6W3qeYZS-eI" },
    { title: "Late Game Plays", presenter: "Brian Hill", youtubeUrl: "HJ_RGf3uweY" },
    { title: "Low Post Offense", presenter: "Fotios Katsikaris", youtubeUrl: "8MPAOp_3gOk" },
    { title: "Ball Screen Offense", presenter: "Dino Gaudio", youtubeUrl: "_x0yhAgyLec" },
    { title: "Read and Respond P&R", presenter: "Michal Jezdik", youtubeUrl: "5sKKaZDbvd8" },
    { title: "Transition Concept", presenter: "Ekrem Memnin", youtubeUrl: "LXr6UVPcCxk" },
    { title: "How to Teach Fast Break", presenter: "Marian Svoboda", youtubeUrl: "mcWggrneWm4" },
    { title: "Building the Half-Court Offense", presenter: "Don Showalter", youtubeUrl: "ysHfgOS05P4" },
    { title: "Receivers Principles from Dribble Penetration", presenter: "Paul Goriss", youtubeUrl: "YwaRI2Km4Z4" },
    { title: "Out of Bounds Plays", presenter: "Anne Donovan", youtubeUrl: "Xk_LM7ffRcs" },
    { title: "Half-Court Offense: 2 Men & 3 Men Game", presenter: "Rob Beveridge", youtubeUrl: "J1dlH5J08aA" },
    { title: "Screening The Zone Defense & Motion Offense With No Screens", presenter: "Patrick Hunt", youtubeUrl: "XAerQT88-Rw" },
    { title: "Early Offenses", presenter: "Bernie Bickerstaff", youtubeUrl: "J_NrTuY39Yo" },
    { title: "Special Situations", presenter: "Fotios Katsikaris", youtubeUrl: "t5avbXxjzxA" },
    { title: "Set Play Against Zone 2-3", presenter: "Jasmin Repesa", youtubeUrl: "2jS3z4EA9k0" },
    { title: "Offensive Concepts", presenter: "Dean Cooper", youtubeUrl: "8k7i8LGaRBw" },
    { title: "Special Situations in Offense", presenter: "Brian Hill", youtubeUrl: "kOg79W2-SMg" },
    { title: "Spurs Philosophy System Basics", presenter: "Gregg Popovich", youtubeUrl: "XBZTPtENQCY" },
    { title: "The Spanish Way Offense", presenter: "Juan Orenga", youtubeUrl: "XBZTPtENQCY" },
    { title: "Teaching Methods & Techniques for Coaching Offensive Fundamentals", presenter: "Damian Cotter", youtubeUrl: "wcbw_iWTMl8" },
    { title: "Transition In Offense", presenter: "Steve Robinson", youtubeUrl: "Tp1SE77IVjc" },
    { title: "Short Man Game", presenter: "Kevin Boyle", youtubeUrl: "n82JAF56Ppg" },
    { title: "Lakers Offense", presenter: "Ettore Messina", youtubeUrl: "zYGpuqTdD78" },
    { title: "Three Point Shot", presenter: "Nelson Isley", youtubeUrl: "idCBpu1B7tY" },
    { title: "Offensive Principles Of Play", presenter: "Patrick Hunt", youtubeUrl: "xkSkuneKuxI" },
    { title: "Cooperation With The Low Post", presenter: "Dusko Vujosevic", youtubeUrl: "X0d-N38nMTc" },
    { title: "Pick and Roll Offense", presenter: "Željko Obradović", youtubeUrl: "jdqm0ntewFA" },
    { title: "Building An Offense", presenter: "Nenad Vucinic", youtubeUrl: "4UYLP7D4rms" },
    { title: "The Dribble Penetration Game", presenter: "Guy Molloy", youtubeUrl: "-AWZA9vhylw" },
    { title: "Offensive Skills", presenter: "Augusto Antonio Pastore", youtubeUrl: "wuTwOBwHfmA" },
    { title: "Corner Offense", presenter: "Terry Porter", youtubeUrl: "FaJ1zBzEVG8" },
    { title: "Passing, Shooting and Competition", presenter: "Torsten Loibl", youtubeUrl: "rwOSsaOg_IQ" },
    { title: "Dribble Drive Motion Offense", presenter: "Vance Walberg", youtubeUrl: "5uTiBvtPCOw" },
    { title: "Pick 'n' Roll Spacing", presenter: "Andrea Trinchieri", youtubeUrl: "rLbj97tEdHA" },
    { title: "Pick 'n' Roll Offense", presenter: "Lawrence Frank", youtubeUrl: "V398QG_gmoE" },
    { title: "Offensive Plays of a Team with Leading Player", presenter: "Romeo Sacchetti", youtubeUrl: "z31J717qv0w" },
    { title: "Transition Offense", presenter: "Kestutis Kemzura", youtubeUrl: "CiSVco0OvqI" },
    { title: "Pick 'n' Roll Offense and Defense", presenter: "Alfred Julbe and Ricard Casas", youtubeUrl: "r63W2CREUgk" },
    { title: "Are You Sure We Teach the Shooting", presenter: "Holger Geschwindner", youtubeUrl: "3ovdCW6_TQU" },
    { title: "Developing Young Guards", presenter: "Arik Shivek", youtubeUrl: "h9IQ4aGcdZE" },
    { title: "Transition Game Collaboration and Spacing", presenter: "Luca Banchi", youtubeUrl: "y11k1S_EwX4" },
    { title: "Dribble Drive Motion Skills", presenter: "Vance Walberg", youtubeUrl: "5ciZrdy62x4" },
    { title: "Perimeter Players Improvement", presenter: "Mike Dunlap", youtubeUrl: "Ljbq-yeEYFk" },
    { title: "Transition Basketball", presenter: "Nenad Vucinic", youtubeUrl: "rd0y1irHAfk" },
    { title: "A Play in Transition", presenter: "Julio Lamas", youtubeUrl: "4MaC8Epl52c" },
    { title: "Moves for Centers Following Picks", presenter: "Jasmin Repeša", youtubeUrl: "EKNe4eoZ158" },
    { title: "Match-Up Offense", presenter: "Željko Obradović", youtubeUrl: "Wy9ihi-GhCA" }
  ],
  DEFENSE: [
    { title: "Building a team defense", presenter: "Willie Green", youtubeUrl: "As9gj7Ordf0" },
    { title: "Defensive principles of play", presenter: "Ronald Nored", youtubeUrl: "KOKHdC_wirM" },
    { title: "Offensive Rebounding & Transition defense", presenter: "Charles Lee", youtubeUrl: "zkuet3SkUs8" },
    { title: "Pick & Roll defense, Paint switching", presenter: "Quinton Crawford", youtubeUrl: "beyuihjWo7A" },
    { title: "Ball handling and defense", presenter: "Mike Weiner", youtubeUrl: "pqHLh4vY2eE" },
    { title: "Close out", presenter: "Marlon Garnett", youtubeUrl: "mQ25PhKypak" },
    { title: "Closing out and defensive footwwork", presenter: "Deanne Butler", youtubeUrl: "1aIpH0dGjcY" },
    { title: "Communication in Half Court Defense", presenter: "Cheryl Chambers", youtubeUrl: "m1XeJn1zR3I" },
    { title: "Models of Aggressive Pn'R Defence", presenter: "Pedro Martinez", youtubeUrl: "j-sY5I7v3wY" },
    { title: "I-3-1 Zone Defense Presentation", presenter: "Konstantinos Keramidas", youtubeUrl: "veU3mVYthlo" },
    { title: "Pick and Roll Defense", presenter: "Chus Mateo", youtubeUrl: "xRWgqDtv2sE" },
    { title: "How to Box Out and Rebound", presenter: "Robert Bauer", youtubeUrl: "Gwx3qFRgsQo" },
    { title: "Basic Defensive Principles", presenter: "Lloyd Pierce", youtubeUrl: "clUjZjHKT04" },
    { title: "Closeout Defense", presenter: "Dan Burke", youtubeUrl: "4RuYhzwnzDE" },
    { title: "Individual Defense", presenter: "Gordon McLeod", youtubeUrl: "D4TX7F1cnT4" },
    { title: "Defending the Pick and Roll", presenter: "Damian Cotter", youtubeUrl: "WWNq6VmQQ5c" },
    { title: "M2M Defensive Principles", presenter: "Dennis Felton", youtubeUrl: "WJhb-u0RZUQ" },
    { title: "Pick & Roll Defense of the Boston Celtics", presenter: "Jamie Young", youtubeUrl: "zUcahIvCymU" },
    { title: "I-3-1 Zone Defense", presenter: "Dennis Felton", youtubeUrl: "xkk62UK4e9g" },
    { title: "Matchup Defense", presenter: "Arik Shivek", youtubeUrl: "yFYaKlOwszA" },
    { title: "Transition Defense", presenter: "Don Showalter", youtubeUrl: "PuMNDbahwt8" },
    { title: "Fundamentals of Half-Court Defense", presenter: "Jim Boylan", youtubeUrl: "zC82h33ZXMg" },
    { title: "Team M2M Defense", presenter: "Torsten Loibl", youtubeUrl: "olmd0BQba4s" },
    { title: "Individual Defensive Improvement", presenter: "John Patrick", youtubeUrl: "Y4bjiuzrpyg" },
    { title: "Basic Principles of M2M Defense", presenter: "Evgeniy Pashutin", youtubeUrl: "67BgDEFbTRc" },
    { title: "I-1-3 Matchup Zone", presenter: "Mike Dunlap", youtubeUrl: "aZCmwlb7d7M" },
    { title: "2-2-1 Zone Press and Half-Court Zone Defense", presenter: "Aleksandar Dzikic Partizan", youtubeUrl: "nyWY_X51K9o" },
    { title: "Transition Defense", presenter: "Svetislav Pesic", youtubeUrl: "dQxbgK9WnRE" },
    { title: "Pick and Roll Defense", presenter: "Mike Longabardi", youtubeUrl: "22s0n-6BV2A" },
    { title: "General Rules of Team Defense", presenter: "Aleksandar Dzikic Partizan", youtubeUrl: "kTDay-aYero" },
    { title: "I-3-1 Zone-Defense", presenter: "Lucas Mondelo", youtubeUrl: "rTKfKwuD1hY" },
    { title: "Defensive Concept of Real Madrid", presenter: "Pablo Laso", youtubeUrl: "dsQAl_S0Qso" },
    { title: "Full-Court Man to Man Trapping Defense", presenter: "Dean Demopoulos", youtubeUrl: "DKh4t-Z_A24" },
    { title: "Building team defense", presenter: "George Dikeoulakos", youtubeUrl: "XTHBauJtJSc" },
    { title: "Off-screen defense", presenter: "Aleksandar Dzikic", youtubeUrl: "77qs7EYauIY" },
    { title: "Team defense", presenter: "Donaldas Kairys", youtubeUrl: "Mtkuwy5Z_Hk" },
    { title: "Close-out defense in modern basketball", presenter: "Vangelis Angelou", youtubeUrl: "sCDgZKZ_W50" },
    { title: "Defensive rotation off dribble penetration", presenter: "Aaron Fearne", youtubeUrl: "wGQtKri65Zw" },
    { title: "Defensive principles", presenter: "Ed Pinckney", youtubeUrl: "9O02xuBRVUs" },
    { title: "Defense on middle pick and roll", presenter: "Ettore Messina", youtubeUrl: "qssGROBbe68" },
    { title: "Switching defense", presenter: "Fotis Katsikaris", youtubeUrl: "_wz8h9grNbE" },
    { title: "Half court man to man defense", presenter: "Ivan Sunara", youtubeUrl: "ShxfWMzHFNU" },
    { title: "Defensive principles", presenter: "Kenny Atkinson", youtubeUrl: "UVcHLmG6RCQ" },
    { title: "Defending the middle P & R", presenter: "Terry Porter", youtubeUrl: "km5zExq4cn0" },
    { title: "Developing Team Man-To-Man Defense", presenter: "Dwayne Casey", youtubeUrl: "HQKAReXto6U" },
    { title: "Coordination of Individual and Team Defense", presenter: "Jonas Kazlauskas", youtubeUrl: "7R5HcGPM9J8" },
    { title: "Half Court Man-To-Man Defense", presenter: "Jill Schneider", youtubeUrl: "M0R_0Zy7VXU" },
    { title: "Zone Defense 2-2-1", presenter: "Jasmin Repesa", youtubeUrl: "Su1Fjk2CaZo" },
    { title: "Building the Defensive Philosophy", presenter: "Jan Stirling", youtubeUrl: "vOD3NzjmA2Q" },
    { title: "Full Court Trapping Defense", presenter: "Judd Flavell", youtubeUrl: "LfANmR_xUFg" },
    { title: "Switching in Pick and Roll Defense", presenter: "Zoran Lukic", youtubeUrl: "9lhYSMpS0L8" },
    { title: "Pick & Roll Defense", presenter: "Ron Adams", youtubeUrl: "0K_1w7XwMoo" },
    { title: "Rebounding", presenter: "Chris Lowery", youtubeUrl: "jZzEDd1a5BQ" },
    { title: "Fundamentals for Pressing Defense", presenter: "Deslea Wrathall", youtubeUrl: "aJuv7Ss9rlI" },
    { title: "Defense", presenter: "Xavi Pascual", youtubeUrl: "-HJFJY3ZaU4" },
    { title: "Transition Defense", presenter: "Tim Floyd", youtubeUrl: "vperV2rgKbc" },
    { title: "Man To Man Defense", presenter: "Patrick Hunt", youtubeUrl: "eR8Tu88af5k" },
    { title: "Match Up Zone", presenter: "Veselin Matic", youtubeUrl: "WmNPD5Abjyk" },
    { title: "Man To Man Defense", presenter: "Mahmuti Oktay", youtubeUrl: "ZdJoNWlRihI" },
    { title: "Aggressive Defense", presenter: "Dejan Radonjic", youtubeUrl: "qyoThAwxZy0" },
    { title: "Pick And Roll Defense", presenter: "Svetislav Pesic", youtubeUrl: "qkSDdRVq7VE" },
    { title: "Half Court Press", presenter: "Marissa Fillipou", youtubeUrl: "csHILMjjOFk" },
    { title: "Defending Screens", presenter: "Patrick Hunt", youtubeUrl: "0oZowMYj2m0" },
    { title: "Off Ball Screen Defense", presenter: "Zan Tabak", youtubeUrl: "xXItV1m19Lk" },
    { title: "Pick 'n' Roll Defense", presenter: "Kaleb Canales", youtubeUrl: "bsKL-hAlRyY" },
    { title: "Aggressive Defense", presenter: "Lionel Hollins", youtubeUrl: "cShjYFpJWng" },
    { title: "Transition Defense", presenter: "Zmago Sagadin", youtubeUrl: "46T1Xx03J3s" },
    { title: "Zone Defense", presenter: "Mahmuti Oktay", youtubeUrl: "DL3KnZvYwfk" },
    { title: "How to Build a Defensive System", presenter: "Jim Boylen", youtubeUrl: "C0lsxZKGfEQ" },
    { title: "Rebounding and Defensive Footwork", presenter: "Torsten Loibl", youtubeUrl: "7bHbx6qKZlY" },
    { title: "Defending on Ball Screens", presenter: "Pablo Laso", youtubeUrl: "TrUZfCf9O2Y" },
    { title: "Defensive Transition", presenter: "Andrej Lemanis", youtubeUrl: "4D30UxpxEFg" }
  ]
};

// ─── FIBA Europe Content ──────────────────────────────────────────────────────
type FibaEuropeSubTab = "GENERAL" | "DEFENSE" | "OFFENSE" | "MISCELLANEOUS";
const FIBA_EUROPE_SUBTABS: FibaEuropeSubTab[] = ["GENERAL", "DEFENSE", "OFFENSE", "MISCELLANEOUS"];

const FIBA_EUROPE_DATA = {
  GENERAL: [
    { title: "Improvement of Fundamentals in Youth Basketball through Specific Drills", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Nenad_Trunic_HD_Improvement_of_fundamentals_in_youth_basketball_through_specific_drills_2015.mp4" },
    { title: "The Role of Position 4 in Modern Basketball", presenter: "Janez Drvaric", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Drvaric_The_Role_of_Position4_in_modern_Basketball.mp4" },
    { title: "Connecting I on I Game and Specific Physical Preparation", presenter: "Nenad Trunic", videoUrl: 'http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Nenad_Trunic_HD_Connecting_1on1_game_and_specific_physical_preparation_in_basketball_2015.mp4' },
    { title: "Connecting Specific Physical Preparation and Shooting", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Trunic_Connecting specific physical preperation and shooting_2013_s.mp4" },
    { title: "Inside Players", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/12august_Clinic_Inside_players.mp4" },
    { title: "Player Profiles", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Nenad_Trunic_11august_Theory_PlayerProfiles.mp4" },
    { title: "Rhythm of Basketball", presenter: "Svetislav Pesic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Rhythm_of_Basketball_Pesic.mp4" },
    { title: "Big Men", presenter: "Juan Orenga", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Orenga_BigMen_Ger.mp4" },
    { title: "Building a National Team Programme", presenter: "Henrik Dettmann", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Henrik_Dettmann_Building_a_national_team_programm.mp4" },
    { title: "Practice Organisation for U16", presenter: "Veselin Matic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Matic_Practice_Organisation_for_U16_kleiner.mp4" },
    { title: "Developing Game Understanding", presenter: "Damian Cotter", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Cotter_Developing_Game_understanding.mp4" },
    { title: "Guard Development", presenter: "Damian Cotter", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Cotter_Guard_Development.mp4" },
    { title: "Team Management", presenter: "Pablo Laso", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Pablo_Laso_Teammanagement.mp4" }
  ],
  DEFENSE: [
    { title: "Transition Defense", presenter: "Svetislav Pesic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Pesic_TransitionDefense.mp4" },
    { title: "Defensive Fundamentals On and Off the Ball", presenter: "Janez Drvaric", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Drvaric_Defensive_Fundamentals.mp4" },
    { title: "Mutant / Amoeba Defence", presenter: "Juan Orenga", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Orenga_Mutant_Amoebea_defense.mp4" },
    { title: "Methodology of Building Aggressive Half-court Defense", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Nenad_Trunic_HD_Methodology_of_building_aggressive_halfcourt_defense_2015.mp4" },
    { title: "One Pass Away Defense", presenter: "Zan Tabak", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Zan_Tabak_One_pass_away_defense.mp4" },
    { title: "Building Team Defense Through Situation Drills", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Trunic_Building team defense trough situation drills_2013_s.mp4" },
    { title: "Defending On Ball Screens", presenter: "Pablo Laso", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Pablo_Laso_Defending_on-ball_screens.mp4" },
    { title: "Defensive Concept", presenter: "Pablo Laso", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Defensive_concept_Laso.mp4" }
  ],
  OFFENSE: [
    { title: "Secondary Break Options in Youth Programmes with Screens", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Nenad_Trunic_HD_Secondary_break_options_in_youth_program_with_screens_2015.mp4" },
    { title: "Passing and Receiving", presenter: "Janez Drvaric", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Drvaric_Teaching_a_skill_of_passing_and_receiving.mp4" },
    { title: "Spacing & Angles", presenter: "Giannis Sfairopoulos", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Sfairopoulos_Spacing&amp;Angles.mp4" },
    { title: "Developing the European 4", presenter: "Gordon Herbert", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Gordon_Herbert_Developing_the_European_4.mp4" },
    { title: "Transition Offense", presenter: "Svetislav Pesic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Pesic_TransitionOffense.mp4" },
    { title: "Low Post Individual Technique", presenter: "Damian Cotter", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Cotter_Individual_technique_Low_Post.mp4" },
    { title: "3 on 3 Offensive Play Basic and Advanced", presenter: "Janez Drvaric", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Drvaric_3on3_Play_Basic_and_Advanced.mp4" },
    { title: "Motion Offense in Youth Development", presenter: "Trine Tims", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Trine_Tims_Motion_Offense_in_Youth_Development_2015.mp4" },
    { title: "Building an Offence Part I", presenter: "Chus Mateo", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Jesus_Mateo_Building_an_Offence_I_klein.mp4" },
    { title: "Building an Offence Part II", presenter: "Chus Mateo", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Jesus_Mateo_Building_an_Offense_II_klein.mp4" },
    { title: "Zone Offense against 2-3", presenter: "Murat Ozyer", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Ozyer_Zone_Offense_against_2-3_POR_2012.mp4" },
    { title: "Passing", presenter: "Damian Cotter", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Bauer_Passing_2010.mp4" },
    { title: "Point Guard", presenter: "Pablo Laso", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Laso_Point_Guard.mp4" },
    { title: "Transition Offense", presenter: "Pablo Laso", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Pablo_Laso_Transition_offense.mp4" },
    { title: "Fastbreak", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Trunic_Fastbreak_SWE_2014.mp4" },
    { title: "Movement without the ball", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/14august_Clinic_Movement_without_theball.mp4" },
    { title: "Secondary Break", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Trunic_SecondaryBreak_2013.mp4" },
    { title: "Individual Tactics Passing", presenter: "Nenad Trunic", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/14august_Clinic_Individual_tactic_passing.mp4" },
    { title: "Fast Break", presenter: "Juan Orenga", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/JuanOrenga_FastBreak.mp4" },
    { title: "Offensive Concept", presenter: "Zan Tabak", videoUrl: "http://coaching.fibaeurope.com/streamingvideos/coaching/clinics/Zan Tabak - Offensive Concept.mp4" }
  ],
  MISCELLANEOUS: {
    GENERAL: [
      { title: "Improving and maintaining individual techniques before and during a season", presenter: "Aleksandar Trifunovic" },
      { title: "Connecting basketball skills and specific physical preparation in U14", presenter: "Nenad Trunic" }
    ],
    DEVELOPMENT: [
      { title: "A Development Program for Players and Coaches", presenter: "Carlos Frade & Michael Schwarz" },
      { title: "Strength & Conditioning in Youth Basketball", presenter: "Nenad Trunic & Michael Schwarz" },
      { title: "Develop youth players to senior level - A masterplan", presenter: "Nenad Trunic" },
      { title: "How teaching and learning takes place", presenter: "Aysim Altay" }
    ],
    OFFENSE: [
      { title: "Low Post actions", presenter: "Arik Shivek" },
      { title: "Moving without the ball", presenter: "Arik Shivek" },
      { title: "Offensive concept with dominant low post players", presenter: "Zan Tabak" },
      { title: "Offensive Transition", presenter: "Aleksandar Trifunovic" },
      { title: "Motion Offense", presenter: "Neven Spahija" },
      { title: "Pick & Roll Offense and Quick Hitters", presenter: "Björn Harmsen" },
      { title: "Offensive Youth Concept", presenter: "Matthias Zollner" },
      { title: "Penetrate & Pass", presenter: "Nenad Trunic" },
      { title: "Offensive Concept", presenter: "Chris Fleming" },
      { title: "Offensive Youth Concept", presenter: "Matthias Zollner" }
    ],
    DEFENSE: [
      { title: "Defensive strategies on using low post trap situations", presenter: "Arik Shivek" },
      { title: "Methodology of half court defensive principles including specific drills", presenter: "Nenad Trunic" },
      { title: "Switching Defense", presenter: "Arik Shivek" },
      { title: "Defensive principles & adaptations in foul situations", presenter: "Björn Harmsen" },
      { title: "Pick and Roll Defense", presenter: "Chus Mateo" }
    ]
  }
};

function FibaEuropeRow({
  item,
  isMobile,
  showWatch = true,
  onWatch,
}: {
  item: { title: string; presenter: string; videoUrl?: string };
  isMobile: boolean;
  showWatch?: boolean;
  onWatch?: () => void;
}) {
  const h = useHover();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : showWatch ? "5.5fr 4.5fr 120px" : "5.5fr 4.5fr",
        background: "transparent",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      {/* Title */}
      <span
        style={{
          fontFamily: DM,
          fontSize: 16,
          color: T.orange,
          paddingRight: 16,
        }}
      >
        {item.title}
      </span>

      {/* Presenter */}
      <span
        style={{
          fontFamily: DM,
          fontSize: 15,
          color: T.orange,
          paddingRight: 16,
          marginTop: isMobile ? 4 : 0,
        }}
      >
        {item.presenter}
      </span>

      {/* Watch Button */}
      {showWatch && (
        <div style={{ display: "flex", justifyContent: isMobile ? "flex-start" : "flex-end", marginTop: isMobile ? 8 : 0 }}>
          <button
            onMouseEnter={h.onMouseEnter}
            onMouseLeave={h.onMouseLeave}
            onClick={onWatch}
            disabled={!onWatch}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: h.on && onWatch ? T.orange : "transparent",
              border: `1px solid ${onWatch ? T.orange : "#888"}`,
              color: h.on && onWatch ? T.white : onWatch ? T.orange : "#888",
              fontFamily: BARLOW,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "1.5px",
              padding: "6px 18px",
              borderRadius: 0,
              cursor: onWatch ? "pointer" : "default",
              transition: "background 0.15s, color 0.15s",
              gap: 6,
              opacity: onWatch ? 1 : 0.4,
            }}
          >
            <span>WATCH</span>
            <svg width="12" height="10" viewBox="0 0 14 11" fill="none">
              <rect x="0" y="2" width="10" height="7" rx="0" fill={h.on && onWatch ? T.white : onWatch ? T.orange : "#888"} />
              <path d="M10 4.5L14 2.5v5.5L10 6.5V4.5Z" fill={h.on && onWatch ? T.white : onWatch ? T.orange : "#888"} />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function FibaEuropeContent({ isMobile }: { isMobile: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<FibaEuropeSubTab>("GENERAL");
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string; isMp4: boolean } | null>(null);

  return (
    <div>
      {/* Video popup modal */}
      {activeVideo && (
        <VideoModal
          videoSrc={activeVideo.src}
          title={activeVideo.title}
          isMp4={activeVideo.isMp4}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <SectionBadge label="FIBA EUROPE" />

      {/* Sub-tab bar */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 24, background: T.orange }}>
        {FIBA_EUROPE_SUBTABS.map((tab) => {
          const isActive = tab === activeSubTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              style={{
                flex: 1,
                padding: "10px 16px",
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "1px",
                textTransform: "uppercase",
                background: isActive ? "#555555" : "transparent",
                color: isActive ? T.white : "#000000",
                border: "none",
                cursor: "pointer",
                borderRadius: 0,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Sub-tab content */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div
            style={{
              background: T.orange,
              color: T.white,
              fontFamily: BARLOW,
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "2px",
              padding: "8px 48px",
              textTransform: "uppercase",
            }}
          >
            {activeSubTab}
          </div>
        </div>

        {activeSubTab === "MISCELLANEOUS" ? (
          <div>
            {/* Introductory Text Box */}
            <div
              style={{
                background: "rgba(232, 101, 26, 0.08)",
                borderLeft: `4px solid ${T.orange}`,
                padding: "16px 20px",
                marginBottom: 32,
                fontFamily: DM,
                fontSize: 15,
                lineHeight: "1.6",
                color: "#333333",
              }}
            >
              <p style={{ margin: 0, fontWeight: 700, color: T.orange, fontSize: 16 }}>
                The below videos are from FIBA Europe Coaching Website ({" "}
                <a
                  href="http://coaching.fibaeurope.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: T.orange, textDecoration: "underline" }}
                >
                  http://coaching.fibaeurope.com
                </a>
                ).
              </p>
              <p style={{ margin: "8px 0 16px" }}>
                Please register on the site to access these videos. The videos are available under the Coaching Clinics section.
              </p>
              <p style={{ margin: "0 0 6px", fontWeight: 600 }}>
                The Practice Section in the site has the following which are of immense help:
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, listStyleType: "square" }}>
                <li>Fundamentals</li>
                <li>Drills</li>
                <li>Plays</li>
                <li>Playbooks</li>
                <li>Tactics & Execution</li>
              </ul>
            </div>

            {/* Miscellaneous Sub-Sections */}
            {(["GENERAL", "DEVELOPMENT", "OFFENSE", "DEFENSE"] as const).map((subSec) => {
              const list = FIBA_EUROPE_DATA.MISCELLANEOUS[subSec];
              return (
                <div key={subSec} style={{ marginBottom: 36 }}>
                  {/* Subsection Badge */}
                  <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
                    <div
                      style={{
                        border: `2.5px solid ${T.orange}`,
                        background: "transparent",
                        fontFamily: BARLOW,
                        fontWeight: 800,
                        fontSize: 16,
                        color: T.orange,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        padding: "6px 28px",
                        borderRadius: 20,
                      }}
                    >
                      {subSec}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {list.map((item, i) => (
                      <FibaEuropeRow key={i} item={item} isMobile={isMobile} showWatch={false} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(FIBA_EUROPE_DATA[activeSubTab as keyof Omit<typeof FIBA_EUROPE_DATA, "MISCELLANEOUS">] || []).map((item, i) => (
              <FibaEuropeRow
                key={i}
                item={item}
                isMobile={isMobile}
                onWatch={(item as any).videoUrl ? () => setActiveVideo({ src: (item as any).videoUrl, title: item.title, isMp4: true }) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({
  videoSrc,
  title,
  onClose,
  isMp4 = false,
}: {
  videoSrc: string;
  title: string;
  onClose: () => void;
  isMp4?: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backdropFilter: 'blur(5px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 900,
          background: T.charcoal,
          borderTop: `4px solid ${T.orange}`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <span
            style={{
              fontFamily: BARLOW,
              fontWeight: 700,
              fontSize: 18,
              color: T.white,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: T.inactive,
              fontSize: 22,
              cursor: 'pointer',
              lineHeight: 1,
              padding: 4,
            }}
          >
            ✕
          </button>
        </div>
        {/* 16:9 video area */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          {isMp4 ? (
            <video
              src={videoSrc}
              controls
              autoPlay
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#000',
              }}
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function WabcContent({ isMobile }: { isMobile: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<WabcSubTab>("GENERAL");
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string; isMp4: boolean } | null>(null);

  const items = WABC_DATA[activeSubTab as keyof typeof WABC_DATA] || [];

  return (
    <div>
      {/* YouTube popup modal */}
      {activeVideo && (
        <VideoModal
          videoSrc={activeVideo.src}
          title={activeVideo.title}
          isMp4={activeVideo.isMp4}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <SectionBadge label="WABC" />

      {/* Sub-tab bar */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 24, background: T.orange }}>
        {WABC_SUBTABS.map((tab) => {
          const isActive = tab === activeSubTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              style={{
                flex: 1,
                padding: "10px 16px",
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "1px",
                textTransform: "uppercase",
                background: isActive ? "#555555" : "transparent",
                color: isActive ? T.white : "#000000",
                border: "none",
                cursor: "pointer",
                borderRadius: 0,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Sub-tab content */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div
            style={{
              background: T.orange,
              color: T.white,
              fontFamily: BARLOW,
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "2px",
              padding: "8px 48px",
              textTransform: "uppercase",
            }}
          >
            {activeSubTab}
          </div>
        </div>

        {items.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item, i) => {
              const ytId = (item as { title: string; presenter: string; youtubeUrl?: string }).youtubeUrl;
              return (
                <WabcRow
                  key={i}
                  item={item}
                  isMobile={isMobile}
                  onWatch={ytId ? () => setActiveVideo({ src: ytId, title: item.title, isMp4: false }) : undefined}
                />
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 96 }}>
            <span style={{ fontFamily: DM, fontSize: 16, color: T.placeholderText }}>
              Content coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function WabcRow({
  item,
  isMobile,
  onWatch,
}: {
  item: { title: string; presenter: string; youtubeUrl?: string };
  isMobile: boolean;
  onWatch?: () => void;
}) {
  const h = useHover();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "5.5fr 4.5fr 120px",
        background: "transparent",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      {/* Title */}
      <span
        style={{
          fontFamily: DM,
          fontSize: 16,
          color: T.orange,
          paddingRight: 16,
        }}
      >
        {item.title}
      </span>

      {/* Presenter */}
      <span
        style={{
          fontFamily: DM,
          fontSize: 15,
          color: T.orange,
          paddingRight: 16,
          marginTop: isMobile ? 4 : 0,
        }}
      >
        {item.presenter}
      </span>

      {/* Watch Button */}
      <div style={{ display: "flex", justifyContent: isMobile ? "flex-start" : "flex-end", marginTop: isMobile ? 8 : 0 }}>
        <button
          onClick={onWatch}
          onMouseEnter={h.onMouseEnter}
          onMouseLeave={h.onMouseLeave}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: h.on ? T.orange : "transparent",
            border: `1px solid ${T.orange}`,
            color: h.on ? T.white : T.orange,
            fontFamily: BARLOW,
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "1.5px",
            padding: "6px 18px",
            borderRadius: 0,
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
            gap: 6,
          }}
        >
          <span>WATCH</span>
          <svg width="12" height="10" viewBox="0 0 14 11" fill="none">
            <rect x="0" y="2" width="10" height="7" rx="0" fill={h.on ? T.white : T.orange} />
            <path d="M10 4.5L14 2.5v5.5L10 6.5V4.5Z" fill={h.on ? T.white : T.orange} />
          </svg>
        </button>
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
export default function Coaches() {
  const [activeTab, setActiveTab] = useState<Tab>("CURRICULUM");
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
            top: 0, // Sticks to the top of the screen on mobile
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
            COACHES
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
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 2,
                  background: T.orange,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 2,
                  background: T.orange,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 2,
                  background: T.orange,
                }}
              />
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
            padding: isMobile
              ? "24px 16px"
              : isTablet
                ? "32px 28px"
                : "48px 56px",
            minHeight: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowX: "hidden",
          }}
        >
          {/* Main page content area */}
          <div style={{ flex: 1 }}>
            {activeTab === "CURRICULUM" ? (
              <CurriculumContent isMobile={isMobile} />
            ) : activeTab === "BOOKS" ? (
              <BooksContent isMobile={isMobile} />
            ) : activeTab === "DRILLS FOR YOUNG PLAYERS" ? (
              <DrillsContent isMobile={isMobile} isTablet={isTablet} />
            ) : activeTab === "WABC" ? (
              <WabcContent isMobile={isMobile} />
            ) : activeTab === "FIBA EUROPE" ? (
              <FibaEuropeContent isMobile={isMobile} />
            ) : (
              <PlaceholderContent tab={activeTab} />
            )}
          </div>

          {/* Copyright Footer */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: `1px solid ${T.border}`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: DM,
                fontSize: 13,
                color: T.mutedText,
              }}
            >
              Copyrights © 2026 | All rights reserved by Referee Vision
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
