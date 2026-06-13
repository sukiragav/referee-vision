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
  hoverBg: "#1F1F1F",
  mutedText: "#666666",
  placeholderText: "#444444",
} as const;

const BARLOW = "'Barlow Condensed', sans-serif";
const DM = "'DM Sans', sans-serif";

// ─── Tabs ─────────────────────────────────────────────────────────────────────
type Tab =
  | "RULES"
  | "FOULS"
  | "GAME MANAGEMENT"
  | "3X3"
  | "TABLE OFFICIALS"
  | "MECHANICS"
  | "WOMEN IN OFFICIATING"
  | "FIBA MONDAY"
  | "STATISTICS"
  | "MISCELLANEOUS";

const TABS: Tab[] = [
  "RULES",
  "FOULS",
  "GAME MANAGEMENT",
  "3X3",
  "TABLE OFFICIALS",
  "MECHANICS",
  "WOMEN IN OFFICIATING",
  "FIBA MONDAY",
  "STATISTICS",
  "MISCELLANEOUS",
];

// ─── Webinar data ─────────────────────────────────────────────────────────────
type WebinarItem = {
  title: string;
  presenter?: string;
  action?: "watch" | "download";
  link?: string;
};

const WEBINAR_DATA: Record<Tab, WebinarItem[]> = {
  RULES: [
    { title: "RULE CHANGES 2024", presenter: "Mike Thomson" },
    { title: "RULE CHANGES 2022", presenter: "Mike Thomson" },
    { title: "RULE CHANGES 2020", presenter: "Mike Thomson" },
    { title: "RULE CHANGES 2020", presenter: "Roberto Chiari" },
    { title: "RULE CHANGES 2020", presenter: "Roberto Chiari" },
    { title: "TRAVELLING", presenter: "Roberto Chiari" },
    { title: "HANDLING SPECIAL SITUATIONS", presenter: "Michael Weiland" },
    { title: "THE LAST 2 MINUTES", presenter: "George Postalian" },
  ],
  FOULS: [
    { title: "UNSPORTSMANLIKE FOUL", presenter: "Sretan Radovic" },
    { title: "HOW TO CALL CONTACT", presenter: "Chris Delaney" },
    { title: "FAKE A FOUL", presenter: "Roberto Chiari" },
  ],
  "GAME MANAGEMENT": [
    { title: "COMMUNICATION", presenter: "Jilly Harris" },
    { title: "CONFLICT RESOLUTION", presenter: "Albert Joseph" },
    { title: "GAME MANAGEMENT", presenter: "Roberto Chiari" },
    { title: "MANAGING AND DEALING WITH COACHES", presenter: "Oggie Sokolovic" },
    { title: "MANAGING COACHES AND PLAYERS", presenter: "Clifton Grant" },
  ],
  "3X3": [
    { title: "3X3 RULES AND INTERPRETATIONS", presenter: "Vanessa Devlin" },
    { title: "3X3 FOUL SELECTION & PHYSICALITY", presenter: "Vanessa Devlin" },
    { title: "3X3 MECHANICS", presenter: "Vanessa Devlin" },
  ],
  "TABLE OFFICIALS": [
    { title: "HOW TO USE A SCORESHEET", presenter: "Michelle Nicholas" },
    { title: "SCORESHEET (TF, DQF & FIGHTING SITUATIONS)", presenter: "Bernard Vassallo" },
    { title: "DIGITAL SCORESHEET USER MANUAL", action: "download" },
    { title: "DSS (Pre-game Duties)", action: "watch" },
    { title: "DSS (How to record different actions)", action: "watch" },
    { title: "DSS (How to close the game and print DSS)", action: "watch" },
  ],
  MECHANICS: [
    { title: "3PO BASIC MECHANICS", presenter: "John Rearden" },
    { title: "INDIVIDUAL OFFICIATING TECHNIQUES", presenter: "Roberto Chiari" },
    { title: "OABO THREE PERSON CLINIC - SESSION ONE" },
    { title: "OABO THREE PERSON CLINIC - SESSION TWO" },
    { title: "OABO THREE PERSON CLINIC - SESSION THREE" },
    { title: "OABO THREE PERSON CLINIC - SESSION FOUR" },
  ],
  "WOMEN IN OFFICIATING": [
    { title: "GETTING READY! WOMEN'S WORLD CUP QUALIFYNG TOURNAMENTS (Mar 5, 2026)", presenter: "Cisil Gungor (TUR)\nViola Gyorgyi (NOR)\nChantal Julien (FRA)\nMaripier Malo (CAN)", action: "watch" },
    { title: "EFFECTIVE COMMUNICATION UNDER PRESSURE (Jan 29, 2026)", presenter: "Lauren Holtkamp-Sterling (USA)", action: "watch" },
    { title: "REACHING THE TOP (Different paths to the elite level) (Nov 24, 2025)", presenter: "Julirys Guzman (PUR)\nCisil Gungor (TUR)", action: "watch" },
    { title: "BUILDING CONFIDENCE AND AUTHORITY (Apr 17,2025)", presenter: "Amy Bonner (USA)", action: "watch" },
    { title: "REACHING THE NEXT LEVEL (Feb 6, 2025)", presenter: "Lauren Holtkamp-Sterling (USA)", action: "watch" },
    { title: "BREAKING BARRIERS: STRATEGIES FOR ADDRESSING BIASES (Nov 28, 2024)", presenter: "Dubravka Martinovic (CRO)", action: "watch" },
    { title: "BACK TO REFEREEING (Apr 18,2024)", presenter: "Maripier Malo (CAN)\nYasmina Alcaraz (ESP)", action: "watch" },
    { title: "THE WOMEN'S GAME (Feb 29, 2024)", presenter: "Nadine Crowley (CAN)\nChantal Julien (FRA)", action: "watch" },
    { title: "MY JOURNEY (Dec 14, 2023)", presenter: "Cecilia Toth (HUN)", action: "watch" },
    { title: "WOMEN IN BASKETBALL - COACHING WOMEN'S NATIONAL TEAM (Apr 20, 2023)", presenter: "Victor Lapena (CAN)", action: "watch" },
    { title: "WOMEN REFEREEING IN FOOTBALL (Feb 16, 2023)", presenter: "Natalie Qaqaya\nLina Lehtovaara", action: "watch" },
    { title: "REFEREE MATERNITY PLAN (Dec 22, 2022)", presenter: "Fiba Referee Operations", action: "watch" },
    { title: "FIBA MATERNITY PLAN - Handbook for Female Referees (November 2022 Version 1.0)", action: "download" },
    { title: "FIBA MATERNITY PLAN - Guidelines for National Federations (November 2022 Version 1.0)", action: "download" },
    { title: "DOWN UNDER (Sep 29, 2022)", presenter: "Amy Bonner (USA)\nViola Gyorgyi (NOR)\nSara Elsharnouby (EGY)", action: "watch" },
    { title: "WITH MENTAL FLEXIBILITY ON THE WAY TO THE TOP (Aug 18, 2022)", presenter: "Dubravka Martinovic\nJacquiline Dover (AUS)", action: "watch" },
    { title: "WOMEN IN BASKETBALL 2022-23 (Jun 23, 2022)", presenter: "Elisabeth Cebrian Scheurer", action: "watch" },
    { title: "FAMILY AFFAIRS (May 19, 2022)", presenter: "Susana Gomez (ESP)\nLuis Miguel Castillo (ESP)", action: "watch" },
    { title: "IN CHARGE (NBA G-LEAGUE) (Apr 27, 2022)", presenter: "Maripier Malo (CAN)\nHortenica Sanchez (MEX)\nBianca Burns (USA)\nAshley Gloss (USA)", action: "watch" },
    { title: "LEVEL UP (Mar 24, 2022)", presenter: "Yana Nikogossyan (KAZ)\nYasmina Alcaraz (ESP)\nSara Gamal (EGY)\nAriadna Cheuca (FIN)", action: "watch" },
    { title: "MENTORING PROGRAMME - CASE STUDY:EUROPE (Nov 10, 2021)", presenter: "Elisabeth Cebrian-Scheurer (ESP)\nKati Nynas (FIN)\nDubravka Martinovic (CRO)\nLaure Coanus (FRA)\nAriadna Cheuca Moreno (FIN)", action: "watch" },
    { title: "OFFICIATING IN AFRICA (Sep 30, 2021)", presenter: "Mendoza Esperanza (ESP)\nAhmed Aya (EGY)\nZouzou Nadege\nBoussetta Chahinaz\nLea Kane", action: "watch" },
    { title: "DEVELOPMENT AND BEST PRACTICES (Jun 17, 2021)", presenter: "Nadine Crowley (CAN)\nChantal Julien (FRA)\nJasmina Juras (SRB)", action: "watch" },
    { title: "BUILDING CONFIDENCE FOR BETTER PERFORMANCE (May 12, 2021)", presenter: "Dubravka Martinovic", action: "watch" },
    { title: "MOTIVATION AND INSPIRATION (Apr 22, 2021)", presenter: "Lauren Holtkamp-Sterling (USA)\nMaj Forsberg (DEN/USA)\nOzlem Yalman (TUR)", action: "watch" },
    { title: "WOMEN IN OFFICIATING (Mar 8, 2021)", presenter: "Andreas Zagkklis\nAurellie Vidot\nNadine Crowley (CAN)\nAlejandro Vaquera (ESP)\nDubravka Martinovic", action: "watch" }
  ],
  "FIBA MONDAY": [
    { title: "CLEAR AND CONCLUSIVE - UNSPORTSMANLIKE FOUL (Apr 6, 2026)", presenter: "Mike Thomson (CAN)", action: "watch" },
    { title: "HOW TO COVER HELP DEFENDER (Mar 2, 2026)", presenter: "Roberto Chiari (ITA)", action: "watch" },
    { title: "SCOUTING THE TEAMS (Feb 2, 2026)", presenter: "Wojciech Liszka (POL)\nWaseem Husainy (CAN)", action: "watch" },
    { title: "IN-VISIBLE TRAINING (Nov 3, 2025)", presenter: "Dr. Alejandro Vaquera (ESP)", action: "watch" },
    { title: "OFFICIAL RULES: Practical Situations (Part I) (Oct 3, 2025)", presenter: "Mike Thomson (CAN)", action: "watch" },
    { title: "BACK TO BASICS - Next steps for court coverage (Mar 3, 2025)", presenter: "Roberto Chiari (ITA)\nNadine Crowley (CAN)", action: "watch" },
    { title: "ROLE OF AN OFFICIAL - Being a part of something bigger (Feb 3, 2025)", presenter: "Monty McCutchen (USA)", action: "watch" },
    { title: "BACK TO BASICS - Building the foundation for 3PO court coverage (Jan 13, 2025)", presenter: "Nadine Crowley (CAN)", action: "watch" },
    { title: "2024 HIGHLIGHTS - WHAT'S NEXT IN 2025 (Dec 2, 2024)", presenter: "Carl Jungebrand", action: "watch" },
    { title: "OBRI 2024 - Practical Cases (Nov 4, 2024)", presenter: "FIBA Referee Operations", action: "watch" },
    { title: "LISTENING & LEARNING (Mar 4, 2024)", presenter: "Ferdinand Pascual (PHI)\nJose Carrion (PUR)\nAriadna Chueca (ESP)\nYann Davidson (MAD)", action: "watch" },
    { title: "MONEY TIME COMMUNICATION (Dec 4, 2023)", presenter: "Dubravka Martinovic", action: "watch" },
    { title: "BASIC PROTOCOLS - PART I (Nov 6, 2023)", presenter: "Roberto Chiari", action: "watch" },
    { title: "WORLD CUP 2023 - TRAILBLAZING SUCCESS (Oct 2, 2023)", presenter: "Referee Operations", action: "watch" },
    { title: "EXPECTATIONS FROM HIGH LEVEL REFEREES (Apr 3, 2023)", presenter: "Terry Moore (USA)", action: "watch" },
    { title: "SIMPLE STEPS TO BETTER CALLS (Mar 6, 2023)", presenter: "Mike Thomson (CAN)", action: "watch" },
    { title: "INJURY PREVENTION AND RECOVERY (Feb 6, 2023)", presenter: "Crystal Dupuche (AUS)", action: "watch" },
    { title: "BODY LANGUAGE (Jan 9, 2023)", presenter: "Dr. Jose Maria Buceta", action: "watch" },
    { title: "RECAP OF 2022 (Dec 5, 2022)", presenter: "Greydy Diaz\nCarl Jungebrand", action: "watch" },
    { title: "FIBA GOL2023-25 - 4TH EDITION (Nov 7, 2022)", presenter: "Tomas Rimkus (LTU)", action: "watch" },
    { title: "VIVA LAS VEGAS - NBA SUMMER CAMP 2022 (Aug 1, 2022)", presenter: "Manuel Mazzoni (ITA)\nRoberto Vazquez (PUR)\nBoris Krejic (SLO)\nMartins Koslovzkis (LAT)\nYohan Rosso (FRA)\nGrant Todey (USA)", action: "watch" },
    { title: "TALK & WALK - INSIDE OF FIBA U17 WORLD CUP PREPARATION (Jul 4, 2022)", presenter: "Albert Joseph (FIBA)\nMike Thomson (CAN)\nBianca Burns (USA)\nGatis Salins (LAT)\nScott Beker (AUS)\nKyounghwan Lee (KOR)\nJeanna Reneau (USA)", action: "watch" },
    { title: "UNDER THE SURFACE IN FIBA REFEREE OPERATIONS (Jun 6, 2022)", presenter: "FIBA Referee Operations", action: "watch" },
    { title: "SEASON END - A SELF-REFLECTION OF A JOURNEY (May 2, 2022)", presenter: "Dubravka Martinovic", action: "watch" },
    { title: "SEE FAST - DECIDE SLOW (Mar 7, 2022)", presenter: "Matt Kallio (CAN)\nJulio Anaya (PAN)", action: "watch" },
    { title: "BEING A PROFESSIONAL (Apr 4, 2022)", presenter: "France & Japan National Federations", action: "watch" },
    { title: "THEN & NOW (Feb 7, 2022)", presenter: "Chantal Julien (FRA)\nTerry Moore (USA)\nAbreu Muhimua (MOZ)\nCostas Rigas (GRE)", action: "watch" },
    { title: "MODERN BASKETBALL & ITS INTERRELATIONSHIP WITH REFEREEING (Jan 3, 2022)", presenter: "Nelson Isley (USA)", action: "watch" },
    { title: "INVISIBLE TRAINING (Dec 6, 2021)", presenter: "Dr. Chema Buceta", action: "watch" },
    { title: "HEARING AND LISTENING (Nov 8, 2021)", presenter: "FIBA Referee Operations", action: "watch" },
    { title: "RUN & CALL (Oct 4, 2021)", presenter: "Alejandro Vaquera (ESP)\nDavid Suarez (ESP)\nHaris Pojskic (SWE)\nMaria Munoz (GUA)", action: "watch" },
    { title: "\"SO WHAT?\" / SCOUTING THE TEAMS (Sep 6, 2021)", presenter: "Dubravka Martinovic\nAdemir Zurapovic (BIH)", action: "watch" },
    { title: "TOKYO 2020 - BUBBLE LIFE (Aug 2, 2021)", presenter: "Officating Team", action: "watch" },
    { title: "INSIDE THE COMPETITION (Jul 5, 2021)", presenter: "Officating Team", action: "watch" },
    { title: "MENTOR PROGRAMME FOR REFEREES (Jun 7, 2021)", presenter: "Cristiano Maranho (BRA)\nAntonio Conde (ESP)\nImene Tahimi (ALG)\nEdwin Quiles (PUR)", action: "watch" },
    { title: "MY PREPARATION FOR THE COMPETITION (May 3, 2021)", presenter: "Samir Abaakil (MOR)\nAmy Bonner (USA)\nJames Boyer (AUS)\nViola Gyorgyi (NOR)\nTakaki Kato (JPN)", action: "watch" },
    { title: "STEPS TO SUCCESS - CASE STUDY: OFFICIATING PLAN BY TBF (Apr 12, 2021)", presenter: "Rustu Nuran (TUR)\nYener Yilmaz (TUR)\nOzlem Yalman (TUR)\nMehmet Karabilecen (TUR)\nSinem Tetik (TUR)", action: "watch" },
    { title: "COMMON SENSE COMMUNICATION - PART I (Mar 8, 2021)", presenter: "JD Collins (USA)", action: "watch" },
    { title: "COMMON SENSE COMMUNICATION - PART II (Mar 8, 2021)", presenter: "JD Collins (USA)", action: "watch" },
    { title: "FINAL PRE-GAME - WORLD CUP 2019 FINAL CREW (Feb 1, 2021)", presenter: "Cristiano Maranho (BRA)\nYohan Rosso (FRA)\nSteven Anderson (USA)", action: "watch" }
  ],
  STATISTICS: [
    { title: "BASIC STATISTICS DEFINITIONS", presenter: "Trish Nicholl", action: "watch" },
    { title: "FLS - V7 DEMONSTRATION", presenter: "Brett Gallo", action: "watch" },
  ],
  MISCELLANEOUS: [
    { title: "COMMUNICATION & ADVANCED 3PO MECHANICS", presenter: "Yohan Rosso", action: "watch" },
    { title: "REFEREEING CRASH COURSE", action: "watch" },
    { title: "MASTERING THE MENTAL GAME", presenter: "Sara Mansson", action: "watch" },
    { title: "TIPS FOR REFEREES", presenter: "Steffen Hamann", action: "watch" },
    { title: "LEADERSHIP, GAME CONTROL AND TRAITS OF ELITE REFEREES", presenter: "Nadine Crowley", action: "watch" },
    { title: "TIPS FROM THE ARCTIC CIRCLE", presenter: "Karol Kowalski", action: "watch" },
    { title: "REFEREEING MASTERCLASS", presenter: "Manuel Mazzoni", action: "watch" },
    { title: "HOW TO BECOME A TOP BASKETBALL REFEREE", presenter: "Olegs Latisevs", action: "watch" },
    { title: "MENTAL STATE OF AN OFFICIAL", presenter: "Max Audette", action: "watch" },
    { title: "WHAT IS YOUR BRAND ?", presenter: "Perry Stothart", action: "watch" },
    { title: "PREPARATION OF AN OFFICIAL", presenter: "Brent Stocker", action: "watch" },
    { title: "GAME CONTROL", presenter: "Chris Delaney/Ardavan Eizadirad", action: "watch" },
    { title: "GETTING THROUGH THE TOUGH STUFF", presenter: "Karen Lasuik", action: "watch" },
    { title: "I SPY WITH MY LITTLE EYE", presenter: "Jason Steill", action: "watch" },
    { title: "TIPS FOR BASKETBALL REFEREES", presenter: "Ville Selkee", action: "watch" },
  ],
};

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

function useHover() {
  const [on, set] = useState(false);
  return { on, onMouseEnter: () => set(true), onMouseLeave: () => set(false) };
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
  const items = TABS.map((tab) => {
    const isActive = tab === active;
    return (
      <SidebarItem
        key={tab}
        tab={tab}
        active={isActive}
        onSelect={isMobile ? (t) => { onSelect(t); onClose(); } : onSelect}
      />
    );
  });

  if (isMobile) {
    return (
      <>
        {open && (
          <div
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(2px)" }}
          />
        )}
        <aside
          style={{
            position: "fixed", top: 0, left: 0, width: 260, height: "100vh",
            background: T.charcoal, borderRight: `1px solid ${T.border}`, borderLeft: `3px solid ${T.orange}`,
            zIndex: 300, display: "flex", flexDirection: "column", overflowY: "auto",
            transform: open ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: open ? "4px 0 24px rgba(0,0,0,0.5)" : "none",
          }}
        >
          <div style={{ padding: "28px 20px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 26, color: T.orange, letterSpacing: "3px", textTransform: "uppercase" }}>
              WEBINARS
            </span>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: T.inactive, fontSize: 22, cursor: "pointer", lineHeight: 1, padding: 4 }}>✕</button>
          </div>
          <div style={{ paddingTop: 0 }}>{items}</div>
        </aside>
      </>
    );
  }

  return (
    <aside
      style={{
        width: 240, flexShrink: 0, background: T.charcoal,
        borderRight: `1px solid ${T.border}`, borderLeft: `3px solid ${T.orange}`,
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ padding: "40px 28px 16px", borderBottom: `1px solid ${T.border}` }}>
        <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 30, color: T.orange, letterSpacing: "3px", textTransform: "uppercase" }}>
          WEBINARS
        </span>
      </div>
      <div style={{ paddingTop: 0 }}>{items}</div>
    </aside>
  );
}

function SidebarItem({ tab, active, onSelect }: { tab: Tab; active: boolean; onSelect: (t: Tab) => void }) {
  const h = useHover();
  let bg = "transparent";
  let color = T.orange;
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
      <div style={{ background: T.orange, color: "#FFFFFF", fontFamily: BARLOW, fontWeight: 800, fontSize: 22, letterSpacing: "3px", textTransform: "uppercase", padding: "10px 40px" }}>
        {label}
      </div>
    </div>
  );
}

// ─── Webinar Row ──────────────────────────────────────────────────────────────
function WebinarRow({
  item,
  isLast,
  isMobile,
}: {
  item: WebinarItem;
  isLast: boolean;
  isMobile: boolean;
}) {
  const h = useHover();
  const isDownload = item.action === "download";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "5.5fr 4.5fr 150px",
        borderBottom: isLast ? "none" : `1px solid ${T.orange}`,
        background: "transparent",
      }}
    >
      {/* Column 1: Title */}
      <div
        style={{
          padding: "16px 20px",
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 15,
          color: T.orange,
          textTransform: "uppercase",
          borderRight: isMobile ? "none" : `1px solid ${T.orange}`,
          borderBottom: isMobile && !isLast ? `1px solid ${T.orange}` : "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        {item.title}
      </div>

      {/* Column 2: Presenter */}
      <div
        style={{
          padding: "16px 20px",
          fontFamily: DM,
          fontSize: 13,
          color: T.orange,
          borderRight: isMobile ? "none" : `1px solid ${T.orange}`,
          borderBottom: isMobile && !isLast ? `1px solid ${T.orange}` : "none",
          display: "flex",
          alignItems: "center",
          whiteSpace: "pre-line",
        }}
      >
        {item.presenter || ""}
      </div>

      {/* Column 3: Action */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          onMouseEnter={h.onMouseEnter}
          onMouseLeave={h.onMouseLeave}
          href={item.link || "#"}
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
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "1.5px",
            padding: "6px 18px",
            borderRadius: 0,
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
            textDecoration: "none",
            gap: 6,
          }}
        >
          <span style={{ transition: "color 0.15s" }}>
            {isDownload ? "DOWNLOAD" : "WATCH"}
          </span>
          {isDownload ? (
            /* Download arrow icon */
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3 6l3 3 3-3" stroke={h.on ? T.white : T.orange} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 10h10" stroke={h.on ? T.white : T.orange} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            /* Camera icon */
            <svg width="12" height="10" viewBox="0 0 14 11" fill="none">
              <rect x="0" y="2" width="10" height="7" rx="0" fill={h.on ? T.white : T.orange} />
              <path d="M10 4.5L14 2.5v5.5L10 6.5V4.5Z" fill={h.on ? T.white : T.orange} />
            </svg>
          )}
        </a>
      </div>
    </div>
  );
}

// ─── Tab Content ──────────────────────────────────────────────────────────────
function WebinarTabContent({ tab, isMobile }: { tab: Tab; isMobile: boolean }) {
  const items = WEBINAR_DATA[tab] || [];

  return (
    <div>
      <SectionBadge label={tab} />
      <div style={{ marginTop: 36, border: items.length > 0 ? `1px solid ${T.orange}` : "none" }}>
        {items.length > 0 ? (
          items.map((item, i) => (
            <WebinarRow
              key={i}
              item={item}
              isLast={i === items.length - 1}
              isMobile={isMobile}
            />
          ))
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 96 }}>
            <span style={{ fontFamily: DM, fontSize: 16, color: T.placeholderText }}>Content coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Webinars() {
  const [activeTab, setActiveTab] = useState<Tab>("RULES");
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
            background: T.charcoal, borderBottom: `1px solid ${T.border}`, borderTop: `3px solid ${T.orange}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px", position: "sticky", top: 52, zIndex: 100,
          }}
        >
          <span style={{ fontFamily: BARLOW, fontWeight: 800, fontSize: 22, color: T.orange, letterSpacing: "3px", textTransform: "uppercase" }}>WEBINARS</span>
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
            minHeight: "100%", boxSizing: "border-box",
            display: "flex", flexDirection: "column", justifyContent: "space-between", overflowX: "hidden",
          }}
        >
          <div style={{ flex: 1 }}>
            <WebinarTabContent tab={activeTab} isMobile={isMobile} />
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
