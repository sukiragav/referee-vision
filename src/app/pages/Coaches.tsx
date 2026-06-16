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
    { title: "Match-Up Offense", presenter: "Željko Obradović" },
    { title: "Transition Offense and Early Flow Plays", presenter: "Brian Goorjian" },
    { title: "Special Situations and Out of Bounds Plays", presenter: "Željko Obradović" },
    { title: "Spacing and Different Options in Pn'R Offence", presenter: "Željko Obradović" },
    { title: "Efficiency in Moving", presenter: "Filip Mihajlovic" },
    { title: "Golden State Warriors' Cutting Drills and Transition Defense", presenter: "Ron Adams" },
    { title: "Building an Offense", presenter: "Chus Mateo" },
    { title: "Half-Court Offense with Pick n' Roll", presenter: "Fabrizio Frates" },
    { title: "Attacking the Switching Defense", presenter: "Evangelos \"Vangelis\" Angelou" },
    { title: "Half-Court M2M Sets", presenter: "Gary Waters" },
    { title: "Passing and Catching the Ball", presenter: "Patrick Mutombo" },
    { title: "Zone Offense", presenter: "Patrick Hunt" },
    { title: "Using the Off-Ball Screen", presenter: "Joan Plaza" },
    { title: "Corner Offense", presenter: "Chris Finch" },
    { title: "Fundamental Skills for Offense", presenter: "Don Showalter" },
    { title: "Fundamentals of Zone Offense", presenter: "Ettore Messina" },
    { title: "San Antonio Spurs' Basic Offensive Concepts", presenter: "James Borrego" },
    { title: "Early Offense Flow", presenter: "Mike Brown" },
    { title: "Zone Offense", presenter: "Sergio Scariolo" },
    { title: "Guards Offensive Improvement", presenter: "Kevin Boyle" },
    { title: "Various Set Plays against Zone and M2M Defense", presenter: "Kevin Boyle" },
    { title: "Transition Offense", presenter: "Ibon Navarro" },
    { title: "Transition into Early Offense", presenter: "Scott Brooks" },
    { title: "Early Offense Options", presenter: "Rick Barnes" },
    { title: "Offensive Tendencies in European Basketball", presenter: "Pablo Laso" },
    { title: "Individual Offensive Development", presenter: "Jamahl Mosley and Ryan Saunders" },
    { title: "Fundamentals of Half-Court Offense", presenter: "Don Showalter" },
    { title: "Transition Offense and Secondary Fastbreak", presenter: "Jill Schneider" },
    { title: "Early Offense", presenter: "Aleksandar Dzikic" },
    { title: "Transition Offense", presenter: "Svetislav Pesic" },
    { title: "Individual tactics in close-out situations", presenter: "Ivan Rudez" },
    { title: "Passing Skills Improvements", presenter: "Luca Banchi" },
    { title: "Spacing in set offense and weakside movement", presenter: "Aleksandar Dzikic" },
    { title: "How to create a playmaker", presenter: "Slavko Trninic" },
    { title: "Attacking the switch", presenter: "Ettore Messina" },
    { title: "Spacing & timing", presenter: "Ettore Messina" },
    { title: "Full court man to man press break and set continuation", presenter: "Fotis Katsikaris" },
    { title: "Single tag offense & defense", presenter: "Igor Kokoskov" },
    { title: "Transition offense", presenter: "Igor Kokoskov" },
    { title: "The Position of the post player on offense", presenter: "Ivan Sunara" },
    { title: "Transition offense and defense", presenter: "Kennedy Kereama" },
    { title: "Offense vs. multiple defense", presenter: "Luca Banchi" },
    { title: "Motion offense", presenter: "Matteo Boniciolli" },
    { title: "Special situations", presenter: "Mike Longabardi" },
    { title: "Attacking the zone defense", presenter: "Paco Garcia" },
    { title: "Fundamental individual offensive skills", presenter: "Paul Henare" },
    { title: "Shooting for beginners, mid and high level", presenter: "Richard Billant" },
    { title: "Low post rules", presenter: "Sito Alonso" },
    { title: "Late Game Plays", presenter: "Brian Hill" },
    { title: "Low Post Offense", presenter: "Fotios Katsikaris" },
    { title: "Ball Screen Offense", presenter: "Dino Gaudio" },
    { title: "Read and Respond P&R", presenter: "Michal Jezdik" },
    { title: "Transition Concept", presenter: "Ekrem Memnin" },
    { title: "How to Teach Fast Break", presenter: "Marian Svoboda" },
    { title: "Building the Half-Court Offense", presenter: "Don Showalter" },
    { title: "Receivers Principles from Dribble Penetration", presenter: "Paul Goriss" },
    { title: "Out of Bounds Plays", presenter: "Anne Donovan" },
    { title: "Half-Court Offense: 2 Men & 3 Men Game", presenter: "Rob Beveridge" },
    { title: "Screening The Zone Defense & Motion Offense With No Screens", presenter: "Patrick Hunt" },
    { title: "Early Offenses", presenter: "Bernie Bickerstaff" },
    { title: "Special Situations", presenter: "Fotios Katsikaris" },
    { title: "Set Play Against Zone 2-3", presenter: "Jasmin Repesa" },
    { title: "Offensive Concepts", presenter: "Dean Cooper" },
    { title: "Special Situations in Offense", presenter: "Brian Hill" },
    { title: "Spurs Philosophy System Basics", presenter: "Gregg Popovich" },
    { title: "The Spanish Way Offense", presenter: "Juan Orenga" },
    { title: "Teaching Methods & Techniques for Coaching Offensive Fundamentals", presenter: "Damian Cotter" },
    { title: "Transition In Offense", presenter: "Steve Robinson" },
    { title: "Short Man Game", presenter: "Kevin Boyle" },
    { title: "Lakers Offense", presenter: "Ettore Messina" },
    { title: "Three Point Shot", presenter: "Nelson Isley" },
    { title: "Offensive Principles Of Play", presenter: "Patrick Hunt" },
    { title: "Cooperation With The Low Post", presenter: "Dusko Vujosevic" },
    { title: "Pick and Roll Offense", presenter: "Željko Obradović" },
    { title: "Building An Offense", presenter: "Nenad Vucinic" },
    { title: "The Dribble Penetration Game", presenter: "Guy Molloy" },
    { title: "Offensive Skills", presenter: "Augusto Antonio Pastore" },
    { title: "Corner Offense", presenter: "Terry Porter" },
    { title: "Passing, Shooting and Competition", presenter: "Torsten Loibl" },
    { title: "Dribble Drive Motion Offense", presenter: "Vance Walberg" },
    { title: "Pick 'n' Roll Spacing", presenter: "Andrea Trinchieri" },
    { title: "Pick 'n' Roll Offense", presenter: "Lawrence Frank" },
    { title: "Offensive Plays of a Team with Leading Player", presenter: "Romeo Sacchetti" },
    { title: "Transition Offense", presenter: "Kestutis Kemzura" },
    { title: "Pick 'n' Roll Offense and Defense", presenter: "Alfred Julbe and Ricard Casas" },
    { title: "Are You Sure We Teach the Shooting", presenter: "Holger Geschwindner" },
    { title: "Developing Young Guards", presenter: "Arik Shivek" },
    { title: "Transition Game Collaboration and Spacing", presenter: "Luca Banchi" },
    { title: "Dribble Drive Motion Skills", presenter: "Vance Walberg" },
    { title: "Perimeter Players Improvement", presenter: "Mike Dunlap" },
    { title: "Transition Basketball", presenter: "Nenad Vucinic" },
    { title: "Moves for Centers Following Picks", presenter: "Jasmin Repeša" },
    { title: "Match-Up Offense", presenter: "Željko Obradović" }
  ],
  DEFENSE: [
    { title: "Building a team defense", presenter: "Willie Green" },
    { title: "Defensive principles of play", presenter: "Ronald Nored" },
    { title: "Offensive Rebounding & Transition defense", presenter: "Charles Lee" },
    { title: "Pick & Roll defense, Paint switching", presenter: "Quinton Crawford" },
    { title: "Ball handling and defense", presenter: "Mike Weiner" },
    { title: "Close out", presenter: "Marlon Garnett" },
    { title: "Closing out and defensive footwwork", presenter: "Deanne Butler" },
    { title: "Communication in Half Court Defense", presenter: "Cheryl Chambers" },
    { title: "Models of Aggressive Pn'R Defence", presenter: "Pedro Martinez" },
    { title: "I-3-1 Zone Defense Presentation", presenter: "Konstantinos Keramidas" },
    { title: "Pick and Roll Defense", presenter: "Chus Mateo" },
    { title: "How to Box Out and Rebound", presenter: "Robert Bauer" },
    { title: "Basic Defensive Principles", presenter: "Lloyd Pierce" },
    { title: "Closeout Defense", presenter: "Dan Burke" },
    { title: "Individual Defense", presenter: "Gordon McLeod" },
    { title: "Defending the Pick and Roll", presenter: "Damian Cotter" },
    { title: "M2M Defensive Principles", presenter: "Dennis Felton" },
    { title: "Pick & Roll Defense of the Boston Celtics", presenter: "Jamie Young" },
    { title: "I-3-1 Zone Defense", presenter: "Dennis Felton" },
    { title: "Matchup Defense", presenter: "Arik Shivek" },
    { title: "Transition Defense", presenter: "Don Showalter" },
    { title: "Fundamentals of Half-Court Defense", presenter: "Jim Boylan" },
    { title: "Team M2M Defense", presenter: "Torsten Loibl" },
    { title: "Individual Defensive Improvement", presenter: "John Patrick" },
    { title: "Basic Principles of M2M Defense", presenter: "Evgeniy Pashutin" },
    { title: "I-1-3 Matchup Zone", presenter: "Mike Dunlap" },
    { title: "2-2-1 Zone Press and Half-Court Zone Defense", presenter: "Aleksandar Dzikic Partizan" },
    { title: "Transition Defense", presenter: "Svetislav Pesic" },
    { title: "Pick and Roll Defense", presenter: "Mike Longabardi" },
    { title: "General Rules of Team Defense", presenter: "Aleksandar Dzikic Partizan" },
    { title: "I-3-1 Zone-Defense", presenter: "Lucas Mondelo" },
    { title: "Defensive Concept of Real Madrid", presenter: "Pablo Laso" },
    { title: "Full-Court Man to Man Trapping Defense", presenter: "Dean Demopoulos" },
    { title: "Building team defense", presenter: "George Dikeoulakos" },
    { title: "Off-screen defense", presenter: "Aleksandar Dzikic" },
    { title: "Team defense", presenter: "Donaldas Kairys" },
    { title: "Close-out defense in modern basketball", presenter: "Vangelis Angelou" },
    { title: "Defensive rotation off dribble penetration", presenter: "Aaron Fearne" },
    { title: "Defensive principles", presenter: "Ed Pinckney" },
    { title: "Defense on middle pick and roll", presenter: "Ettore Messina" },
    { title: "Switching defense", presenter: "Fotis Katsikaris" },
    { title: "Half court man to man defense", presenter: "Ivan Sunara" },
    { title: "Defensive principles", presenter: "Kenny Atkinson" },
    { title: "Defending the middle P & R", presenter: "Terry Porter" },
    { title: "Developing Team Man-To-Man Defense", presenter: "Dwayne Casey" },
    { title: "Coordination of Individual and Team Defense", presenter: "Jonas Kazlauskas" },
    { title: "Half Court Man-To-Man Defense", presenter: "Jill Schneider" },
    { title: "Zone Defense 2-2-1", presenter: "Jasmin Repesa" },
    { title: "Building the Defensive Philosophy", presenter: "Jan Stirling" },
    { title: "Full Court Trapping Defense", presenter: "Judd Flavell" },
    { title: "Switching in Pick and Roll Defense", presenter: "Zoran Lukic" },
    { title: "Pick & Roll Defense", presenter: "Ron Adams" },
    { title: "Rebounding", presenter: "Chris Lowery" },
    { title: "Fundamentals for Pressing Defense", presenter: "Deslea Wrathall" },
    { title: "Defense", presenter: "Xavi Pascual" },
    { title: "Transition Defense", presenter: "Tim Floyd" },
    { title: "Man To Man Defense", presenter: "Patrick Hunt" },
    { title: "Match Up Zone", presenter: "Veselin Matic" },
    { title: "Man To Man Defense", presenter: "Mahmuti Oktay" },
    { title: "Aggressive Defense", presenter: "Dejan Radonjic" },
    { title: "Pick And Roll Defense", presenter: "Svetislav Pesic" },
    { title: "Half Court Press", presenter: "Marissa Fillipou" },
    { title: "Defending Screens", presenter: "Patrick Hunt" },
    { title: "Off Ball Screen Defense", presenter: "Zan Tabak" },
    { title: "Pick 'n' Roll Defense", presenter: "Kaleb Canales" },
    { title: "Aggressive Defense", presenter: "Lionel Hollins" },
    { title: "Transition Defense", presenter: "Zmago Sagadin" },
    { title: "Zone Defense", presenter: "Mahmuti Oktay" },
    { title: "How to Build a Defensive System", presenter: "Jim Boylen" },
    { title: "Rebounding and Defensive Footwork", presenter: "Torsten Loibl" },
    { title: "Defending on Ball Screens", presenter: "Pablo Laso" },
    { title: "Defensive Transition", presenter: "Andrej Lemanis" }
  ]
};

// ─── FIBA Europe Content ──────────────────────────────────────────────────────
type FibaEuropeSubTab = "GENERAL" | "DEFENSE" | "OFFENSE" | "MISCELLANEOUS";
const FIBA_EUROPE_SUBTABS: FibaEuropeSubTab[] = ["GENERAL", "DEFENSE", "OFFENSE", "MISCELLANEOUS"];

const FIBA_EUROPE_DATA = {
  GENERAL: [
    { title: "Improvement of Fundamentals in Youth Basketball through Specific Drills", presenter: "Nenad Trunic" },
    { title: "The Role of Position 4 in Modern Basketball", presenter: "Janez Drvaric" },
    { title: "Connecting I on I Game and Specific Physical Preparation", presenter: "Nenad Trunic" },
    { title: "Connecting Specific Physical Preparation and Shooting", presenter: "Nenad Trunic" },
    { title: "Inside Players", presenter: "Nenad Trunic" },
    { title: "Player Profiles", presenter: "Nenad Trunic" },
    { title: "Rhythm of Basketball", presenter: "Svetislav Pesic" },
    { title: "Big Men", presenter: "Juan Orenga" },
    { title: "Building a National Team Programme", presenter: "Henrik Dettmann" },
    { title: "Practice Organisation for U16", presenter: "Veselin Matic" },
    { title: "Developing Game Understanding", presenter: "Damian Cotter" },
    { title: "Guard Development", presenter: "Damian Cotter" },
    { title: "Team Management", presenter: "Pablo Laso" }
  ],
  DEFENSE: [
    { title: "Transition Defense", presenter: "Svetislav Pesic" },
    { title: "Defensive Fundamentals On and Off the Ball", presenter: "Janez Drvaric" },
    { title: "Mutant / Amoeba Defence", presenter: "Juan Orenga" },
    { title: "Methodology of Building Aggressive Half-court Defense", presenter: "Nenad Trunic" },
    { title: "One Pass Away Defense", presenter: "Zan Tabak" },
    { title: "Building Team Defense Through Situation Drills", presenter: "Nenad Trunic" },
    { title: "Defending On Ball Screens", presenter: "Pablo Laso" },
    { title: "Defensive Concept", presenter: "Pablo Laso" }
  ],
  OFFENSE: [
    { title: "Secondary Break Options in Youth Programmes with Screens", presenter: "Nenad Trunic" },
    { title: "Passing and Receiving", presenter: "Janez Drvaric" },
    { title: "Spacing & Angles", presenter: "Giannis Sfairopoulos" },
    { title: "Developing the European 4", presenter: "Gordon Herbert" },
    { title: "Transition Offense", presenter: "Svetislav Pesic" },
    { title: "Low Post Individual Technique", presenter: "Damian Cotter" },
    { title: "3 on 3 Offensive Play Basic and Advanced", presenter: "Janez Drvaric" },
    { title: "Motion Offense in Youth Development", presenter: "Trine Tims" },
    { title: "Building an Offence Part I", presenter: "Chus Mateo" },
    { title: "Building an Offence Part II", presenter: "Chus Mateo" },
    { title: "Zone Offense against 2-3", presenter: "Murat Ozyer" },
    { title: "Passing", presenter: "Damian Cotter" },
    { title: "Point Guard", presenter: "Pablo Laso" },
    { title: "Transition Offense", presenter: "Pablo Laso" },
    { title: "Fastbreak", presenter: "Nenad Trunic" },
    { title: "Movement without the ball", presenter: "Nenad Trunic" },
    { title: "Secondary Break", presenter: "Nenad Trunic" },
    { title: "Individual Tactics Passing", presenter: "Nenad Trunic" },
    { title: "Fast Break", presenter: "Juan Orenga" },
    { title: "Offensive Concept", presenter: "Zan Tabak" }
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
}: {
  item: { title: string; presenter: string };
  isMobile: boolean;
  showWatch?: boolean;
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
      )}
    </div>
  );
}

function FibaEuropeContent({ isMobile }: { isMobile: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<FibaEuropeSubTab>("GENERAL");

  return (
    <div>
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
              <FibaEuropeRow key={i} item={item} isMobile={isMobile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({
  videoId,
  title,
  onClose,
}: {
  videoId: string;
  title: string;
  onClose: () => void;
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
        {/* 16:9 iframe */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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
        </div>
      </div>
    </div>
  );
}

function WabcContent({ isMobile }: { isMobile: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<WabcSubTab>("GENERAL");
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  const items = WABC_DATA[activeSubTab as keyof typeof WABC_DATA] || [];

  return (
    <div>
      {/* YouTube popup modal */}
      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          title={activeVideo.title}
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
                  onWatch={ytId ? () => setActiveVideo({ id: ytId, title: item.title }) : undefined}
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
