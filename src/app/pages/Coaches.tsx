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
  { label: "WABC COACHES MANUAL - BASKETBALL", link: "https://wabc.fiba.basketball/" },
  { label: "WABC COACHES MANUAL - MINI BASKETBALL", link: "https://wabc.fiba.basketball/" },
  { label: "WABC COACHES MANUAL - LEVEL I", link: "https://wabc.fiba.basketball/" },
  { label: "WABC COACHES MANUAL - LEVEL 2", link: "https://wabc.fiba.basketball/" },
  { label: "WABC COACHES MANUAL - LEVEL 3", link: "https://wabc.fiba.basketball/" },
  { label: "WABC FACILITATOR HANDBOOK", link: "https://wabc.fiba.basketball/" },
  { label: "WABC COACH WORKBOOK", link: "https://wabc.fiba.basketball/" },
  { label: "WABC ACTIVITIES BOOK", link: "https://wabc.fiba.basketball/" },
  { label: "WABC PRACTICE PLANS", link: "https://wabc.fiba.basketball/" },
  { label: "WABC 3X3 - PLAYERS GUIDE", link: "https://wabc.fiba.basketball/" },
];

const BOOKS_DOCS = [
  { label: "BASKETBALL FOR YOUNG PLAYERS - GUIDELINES FOR COACHES", link: "https://wabc.fiba.basketball/" },
  { label: "THE ROLE OF BASKETBALL IN THE EDUCATIONAL DEVELOPMENT OF YOUNGSTERS", link: "https://wabc.fiba.basketball/" },
  { label: "PLANNING BASKETBALL ACTIVITIES", link: "https://wabc.fiba.basketball/" },
  { label: "ORGANISING TRAINING SESSIONS", link: "https://wabc.fiba.basketball/" },
  { label: "COACHING STRATEGIES FOR TRAINING SESSIONS", link: "https://wabc.fiba.basketball/" },
  { label: "COACHES' BEHAVIOUR AT GAMES", link: "https://wabc.fiba.basketball/" },
  { label: "MINI-BASKETBALL", link: "https://wabc.fiba.basketball/" },
  { label: "TRAINING SESSIONS WITH 13-14 YEAR-OLD PLAYERS", link: "https://wabc.fiba.basketball/" },
  { label: "COACHING 15-18 YEAR OLD PLAYERS", link: "https://wabc.fiba.basketball/" },
  { label: "FIBA ASSIST COACHES OFFENSE", link: "https://wabc.fiba.basketball/" },
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

function DrillPlaceholder() {
  const h = useHover();
  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        aspectRatio: "1 / 1",
        background: T.charcoal,
        border: h.on ? `2px solid ${T.orange}` : `2px solid #8B6914`,
        borderRadius: 8,
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.25s, box-shadow 0.25s",
        transform: h.on ? "scale(1.05)" : "scale(1)",
        boxShadow: h.on ? "0 4px 16px rgba(232,101,26,0.25)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={T.orange} strokeWidth="1.5" opacity={0.3} />
        <polygon points="10,7 17,12 10,17" fill={T.orange} opacity={0.3} />
      </svg>
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

function DrillGrid({ count, cols }: { count: number; cols: number }) {
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
      {Array.from({ length: count }).map((_, i) => (
        <DrillPlaceholder key={i} />
      ))}
    </div>
  );
}

function DrillsContent({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<DrillsSubTab>("MINI");
  const cols = isMobile ? 4 : isTablet ? 6 : 8;

  return (
    <div>
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
            <DrillGrid count={32} cols={cols} />
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
            <DrillGrid count={17} cols={cols} />
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
              <DrillGrid count={5} cols={Math.min(cols, 5)} />
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
                <DrillGrid count={2} cols={2} />
              </div>
              <div>
                <DrillSectionBadge label="REBOUNDING" />
                <DrillGrid count={1} cols={1} />
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="LOW POST MOVES" />
              <DrillGrid count={7} cols={Math.min(cols, 7)} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="LOW POST AND PERIMETER PLAYERS' DECISIONS" />
              <DrillGrid count={12} cols={cols} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="TEAM DEFENSE - BASIC POSITIONING" />
              <DrillGrid count={6} cols={Math.min(cols, 6)} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="BASIC OFFENSE" />
              <DrillGrid count={7} cols={Math.min(cols, 7)} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <DrillSectionBadge label="ADVANCED OFFENSE" />
              <DrillGrid count={12} cols={cols} />
            </div>
          </div>
        )}
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
            top: 52, // Below sticky header
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
            background: activeTab === "DRILLS FOR YOUNG PLAYERS" ? T.bg : "var(--off-white)",
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
