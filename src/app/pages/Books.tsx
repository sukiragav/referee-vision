import { useState, useEffect } from "react";
import coverImage from "../../imports/image.png";
import financePlanningImg from "../../imports/finance_planning.png";
import budgetingImg from "../../imports/budgeting.png";
import gamblingImg from "../../imports/gambling.png";

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
  | "CURRICULUM"
  | "5X5"
  | "3X3"
  | "WHEELCHAIR"
  | "PRESENTATIONS"
  | "SCORESHEET"
  | "EQUIPMENT"
  | "REGULATIONS"
  | "ON-COURT & OFF-COURT GUIDE";

const TABS: Tab[] = [
  "CURRICULUM",
  "5X5",
  "3X3",
  "WHEELCHAIR",
  "PRESENTATIONS",
  "SCORESHEET",
  "EQUIPMENT",
  "REGULATIONS",
  "ON-COURT & OFF-COURT GUIDE",
];

// Document Lists mapped to portal URLs
const CURRICULUM_DOCS = [
  {
    label: "INTRODUCTION TO LEVEL 1",
    version: "Version 2.0, 2021",
    link: "https://www.refereevision.com/2020_FIBA_RefereeCurriculum_L1_Introduction_v2.pdf",
  },
  {
    label: "REFEREE COURSE - LEVEL 1",
    version: "Version 2.0, 2021",
    link: "https://www.refereevision.com/2020_FIBA_RefereeCurriculum_L1_v2.pdf",
  },
  {
    label: "REFEREE COURSE - LEVEL 2",
    version: "Version 2.0, 2021",
    link: "https://www.refereevision.com/2020_FIBA_RefereeCurriculum_L2_v2.pdf",
  },
  {
    label: "REFEREE COURSE - LEVEL 3",
    version: "Version 2.0, 2021",
    link: "https://www.refereevision.com/2020_FIBA_RefereeCurriculum_L3_v2.pdf",
  },
];

const FIVE_ON_FIVE_DOCS = [
  {
    label: "OFFICIAL BASKETBALL RULES",
    version: "Version 1.0 - Valid as of 15 October 2024",
    link: "https://library.fibairef.basketball/images/documents/f667de451e91e3b83f2ab049a34d957b/FIBAOfficialBasketballRules2024_v1_0a.pdf",
  },
  {
    label: "OFFICIAL INTERPRETATIONS",
    version: "Version 1.0 - Valid as of 1 October 2024",
    link: "https://library.fibairef.basketball/images/documents/e2ca4b954785b6723533f88ad6f32bd4/FIBAOfficialInterpretations2024_v1_0a_yellow_.pdf",
  },
  {
    label: "OFFICIAL BASKETBALL RULE CHANGES 2024",
    version: "Version 2.0 - Valid as of 15 October 2024",
    link: "https://library.fibairef.basketball/cdn/OBR_Changes2024",
  },
  {
    label: "FIBA MANUAL FOR TABLE OFFICIALS",
    version: "Version 6.6a - Valid as of January 2026",
    link: "https://library.fibairef.basketball/images/documents/0e57934b6d0acff4759ea0b0503367cd/FIBA_Table_Officials_Manual_v6_6a_2025_en.pdf",
  },
  {
    label: "IRS MANUAL",
    version: "Version 10.1 - Valid as of March 2026",
    link: "https://library.fibairef.basketball/images/documents/f9df19a7c6bb3ebd6c824d019334a3b6/FIBA_IRS_Manual_Mar2026_v10_1.pdf",
  },
  {
    label: "IRS - COMMUNICATION GUIDELINES FOR REFEREES",
    version: "Version 2.0a - Valid as of February 2025",
    link: "https://library.fibairef.basketball/images/documents/ca16079ae324ce0e1ce048992f65f1b5/FIBA_IRS_Communication_Guidelines_FEB2025_v2a.pdf",
  },
  {
    label: "FIBA UNIFORM APPROVAL GUIDELINES",
    version: "January 2021",
    link: "https://drive.google.com/file/d/1f8RdoqDCeDMgqbH0auzqdCQX0Q40c92v/view",
  },
  {
    label: "FIBA UNIFORMS & ACCESSORIES GUIDELINES - MEN",
    version: "Version 2.0 - 2022-23",
    link: "https://www.refereevision.com/Uniform_Guidelines_2022-23_Men_v2.0.pdf",
  },
  {
    label: "FIBA UNIFORMS & ACCESSORIES GUIDELINES - WOMEN",
    version: "Version 2.0 - 2022-23",
    link: "https://www.refereevision.com/Uniform_Guidelines_2022-23_Female_v2.0.pdf",
  },
  {
    label: "JUNIOR & YOUTH BASKETBALL RULES (for TNBA)",
    version: "NBA",
    link: "https://drive.google.com/file/d/1E5YSOcUShnYgSXAgKOPmS2gXu6YlgtsX/view",
  },
  {
    label: "SUB JUNIOR BASKETBALL RULES (for TNBA)",
    version: "TNBA",
    link: "https://drive.google.com/file/d/1nRm109UwXZMc9Cr2sPkomq3zekT9nqzd/view",
  },
  {
    label: "SUB JUNIOR BASKETBALL RULES (for BFI)",
    version: "BFI",
    link: "https://drive.google.com/file/d/1PqDSg5LFsbzehzDKcAYMs7nyXIUN52dC/view",
  },
  {
    label: "FIBA STATISTICIANS' MANUAL 2024",
    version: "Version 1.0",
    link: "https://assets.fiba.basketball/image/upload/documents-corporate-fiba-statisticians-manual-2024.pdf",
  },
  {
    label: "FIBA MANUAL FOR COMMISSIONERS - TABLE OFFICIALS WORK",
    version: "Version 3.0 - Valid as of November 2024",
    link: "https://library.fibairef.basketball/images/documents/e7c564d8b26f6f4b6d4141dc8614431f/FIBA_Commissioners_Manual_v3_0_2024__en.pdf",
  },
];

const THREE_ON_THREE_DOCS = [
  {
    label: "OFFICIAL 3x3 BASKETBALL RULES",
    version: "Valid as of 1 January 2026",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "OFFICIAL 3x3 BASKETBALL INTERPRETATIONS",
    version: "Valid as of 1 January 2026",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "OFFICIAL 3x3 BASKETBALL RULES SUMMARY",
    version: "Valid as of November 2021",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "FIBA 3x3 OFFICIATING CLARIFICATION",
    version: "Valid",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "FIBA 3x3 OFFICIATING POINTS OF EMPHASIS",
    version: "Valid",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "3x3 OFFICIATING BASICS - GAME PROCEDURES",
    version: "Valid",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "3x3 OFFICIATING BASICS - RULES AND INTERPRETATIONS",
    version: "Valid",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "FIBA 3x3 EQUIPMENT & SOFTWARE APPENDIX TO OFFICIAL RULES",
    version: "Valid as of August 2022",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "FIBA 3x3 STATISTICIANS' MANUAL",
    version: "Valid as of June 2022",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "FIBA 3x3 REFEREE MANUAL",
    version: "Valid as of 15 February 2025",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "FIBA 3x3 POOL OF REFEREES",
    version: "Valid as of 1 February 2025",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "REFEREE INSTRUCTORS 3x3",
    version: "Valid as of 1 March 2024",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "FIBA 3x3 NATIONAL TEAM HANDBOOK",
    version: "Valid as of 1 January 2025",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "ANNEX I TO FIBA 3x3 HANDBOOKS - FEES, FINES AND SANCTION CATALOGUE",
    version: "Valid as of 1 January 2025",
    link: "https://fiba3x3.com/en/documents.html",
  },
  {
    label: "3X3 CLASSIFICATION - 3-WAY TIE",
    version: "Valid",
    link: "https://fiba3x3.com/en/documents.html",
  },
];

const WHEELCHAIR_DOCS = [
  {
    label: "IWBF STATUTES AND INTERNAL REGULATIONS",
    version: "June 2023",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "OFFICIAL WHEELCHAIR BASKETBALL RULES & EQUIPMENT",
    version: "Version 2 - Valid as of 3rd February 2025",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "OFFICIAL COMMENTS & INTERPRETATIONS",
    version: "Version 2 - Valid as of 3rd February 2025",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "IWBF PLAYER'S COMMISSION POLICY",
    version: "Version 1 - Valid as of October 2021",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "3X3 OFFICIAL WHEELCHAIR BASKETBALL RULES",
    version: "Version 1 - Valid as of 3rd February 2025",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "IWBF PLAYER CLASSIFICATION RULES",
    version: "Version 3 - Valid as of 12 December 2022",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "IWBF PLAYER CLASSIFICATION MANUAL",
    version: "Version 2 - Valid as of 12 December 2022",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "INTERNATIONAL TECHNICAL OFFICIAL GUIDELINES",
    version: "Valid",
    link: "https://iwbf.org/downloads/",
  },
  {
    label: "OFFICIATING MECHANICS: MODIFICATIONS FOR OFFICIATING WHEELCHAIR BASKETBALL",
    version: "Valid",
    link: "https://iwbf.org/downloads/",
  },
];

const PRESENTATIONS_DOCS = [
  { label: "8 SECONDS", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "BALL RETURNED TO BACKCOURT", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CLASSIFICATION OF TEAMS", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CONTACT: CHARGE & BLOCK", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CONTACT: CYLINDER & VERTICALITY", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CONTACT: LGP & GUARDING A PLAYER", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CONTACT: OTHER CONTACTS", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CONTACT: SCREENING", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CONTROL OF THE BALL", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "CORRECTABLE ERRORS", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "DRIBBLING", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "FREE THROW VIOLATIONS", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "GAME LOST BY DEFAULT", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "GAME LOST BY FORFEIT", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "GOALTENDING AND INTERFERENCE", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "GOAL: WHEN MADE & ITS VALUE", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "JUMP BALL AND ALTERNATING POSSESSION", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "PLAYER IN THE ACT OF SHOOTING", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "SHOT CLOCK", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "STATUS OF THE BALL", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "SPECIAL SITUATIONS", version: "Valid", link: "https://library.fibairef.basketball/" },
  { label: "THROW-IN", version: "Valid", link: "https://library.fibairef.basketball/" },
];

const SCORESHEET_DOCS = [
  { label: "5X5 SCORESHEET", version: "Valid as of 1st October 2022", link: "https://www.fiba.basketball/documents" },
  { label: "3X3 SCORESHEET", version: "Valid as of 29th August 2019", link: "https://fiba3x3.com/en/documents.html" },
  { label: "3X3 SCORESHEET - MODIFIED", version: "Valid", link: "https://fiba3x3.com/en/documents.html" },
  { label: "SUB JUNIOR SCORESHEET (for TNBA)", version: "Valid", link: "https://www.fiba.basketball/documents" },
  { label: "YOUTH & JUNIOR SCORESHEET (for TNBA)", version: "Valid", link: "https://www.fiba.basketball/documents" },
];

const EQUIPMENT_DOCS = [
  { label: "BASKETBALL EQUIPMENT", version: "Valid as of 1st October 2024", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA APPROVED EQUIPMENT GUIDE", version: "Valid", link: "https://www.fiba.basketball/documents" },
];

const REGULATIONS_DOCS = [
  { label: "FIBA GENERAL STATUES", version: "Valid as of 16th May 2025", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA INTERNAL REGULATIONS: BOOK 1 - GENERAL PROVISIONS", version: "Valid as of 15th May 2025", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA INTERNAL REGULATIONS: BOOK 1 - ANNEX (Equipment)", version: "Valid as of 5th December 2024", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA INTERNAL REGULATIONS: BOOK 2 - COMPETITIONS", version: "Valid as of 15th May 2025", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA INTERNAL REGULATIONS: BOOK 3 - PLAYERS AND OFFICIALS", version: "Valid as of 15th May 2025", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA INTERNAL REGULATIONS: BOOK 4 - ANTI-DOPING", version: "Valid as of 30th April 2023", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA INTERNAL REGULATIONS: BOOK 5 - GOVERNINNG THE ZONES", version: "Valid as of 25th April 2024", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA INTERNAL REGULATIONS: BOOK 6 - 3X3", version: "Valid as of 27th Feb 2026", link: "https://fiba3x3.com/en/documents.html" },
  { label: "FIBA VENUE RULES", version: "Valid as of May 2024", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA SAFEGUARDING POLICY", version: "Valid as of 2nd Dec 2022", link: "https://www.fiba.basketball/documents" },
  { label: "FIBA CONCUSSION GUIDELINES 2025", version: "Valid", link: "https://www.fiba.basketball/documents" },
  { label: "MEDICAL RESOURCE FOR BASKETBALL TEAM PHYSICIANS", version: "Valid as of Nov 2017", link: "https://www.fiba.basketball/documents" },
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
              BOOKS
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
          BOOKS
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
function DocRow({
  doc,
  isMobile,
}: {
  doc: { label: string; version: string; link: string };
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
        {doc.label}
        {doc.version && doc.version !== "Valid" && (
          <>
            {"  "}
            <span
              style={{
                color: T.mutedText,
                fontSize: isMobile ? 11 : 13,
                fontWeight: 400,
              }}
            >
              ({doc.version})
            </span>
          </>
        )}
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

// ─── Cover Card for 3x3 Rules ─────────────────────────────────────────────────
function CoverCard({ isMobile }: { isMobile: boolean }) {
  const h = useHover();

  return (
    <div
      style={{
        background: T.white,
        border: `1px solid #E2E2E2`,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: isMobile ? "100%" : 320,
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <h3
          style={{
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: 20,
            color: T.orange,
            letterSpacing: "1px",
            textTransform: "uppercase",
            margin: "0 0 16px 0",
            lineHeight: 1.2,
          }}
        >
          OFFICIAL RULES OF THE GAME - FIBA 3X3
        </h3>

        {/* Cover image or SVG fallback */}
        <div
          style={{
            margin: "0 auto 20px",
            height: 240,
            width: "100%",
            maxWidth: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F5F2EE",
            border: "1px solid #EAE5DF",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt="Official Rules of the Game - FIBA 3x3 Cover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              onError={(e) => {
                // Remove img and let fallback display
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke={T.orange}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
                <path d="M6 14h10" />
              </svg>
              <span
                style={{
                  fontFamily: BARLOW,
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.inactive,
                  marginTop: 8,
                }}
              >
                FIBA 3X3 COVER
              </span>
            </div>
          )}
        </div>
      </div>

      <a
        href="https://fiba3x3.com/en/documents.html"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={h.onMouseEnter}
        onMouseLeave={h.onMouseLeave}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: h.on ? T.orange : "transparent",
          border: `1px solid ${T.orange}`,
          color: h.on ? T.white : T.orange,
          fontFamily: BARLOW,
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "2px",
          padding: "10px 0",
          borderRadius: 0,
          cursor: "pointer",
          transition: "background 0.15s, color 0.15s",
          textTransform: "uppercase",
          textDecoration: "none",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        ↓ DOWNLOAD RULES
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

function FiveOnFiveContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="5X5" />
      <div style={{ marginTop: 36 }}>
        {FIVE_ON_FIVE_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

function ThreeOnThreeContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="3X3" />
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 36,
          marginTop: 36,
          alignItems: "flex-start",
        }}
      >
        {/* Document list takes up main space */}
        <div style={{ flex: 1, width: "100%" }}>
          {THREE_ON_THREE_DOCS.map((doc, i) => (
            <DocRow key={i} doc={doc} isMobile={isMobile} />
          ))}
        </div>

        {/* Side Cover Card */}
        <CoverCard isMobile={isMobile} />
      </div>
    </div>
  );
}

function WheelchairContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="WHEELCHAIR" />
      <div style={{ marginTop: 36 }}>
        {WHEELCHAIR_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

function PresentationsContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="PRESENTATIONS" />
      <div style={{ marginTop: 36 }}>
        {PRESENTATIONS_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

function ScoresheetContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="SCORESHEET" />
      <div style={{ marginTop: 36 }}>
        {SCORESHEET_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

function EquipmentContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="EQUIPMENT" />
      <div style={{ marginTop: 36 }}>
        {EQUIPMENT_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

function RegulationsContent({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <SectionBadge label="REGULATIONS" />
      <div style={{ marginTop: 36 }}>
        {REGULATIONS_DOCS.map((doc, i) => (
          <DocRow key={i} doc={doc} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

type SubTab = "LIFE SKILLS" | "ENTOURAGE" | "CAREER" | "MEDIA" | "INTEGRITY" | "FINANCE";

const SUB_TABS: SubTab[] = [
  "LIFE SKILLS",
  "ENTOURAGE",
  "CAREER",
  "MEDIA",
  "INTEGRITY",
  "FINANCE",
];

const ON_COURT_GUIDE_DATA = {
  "LIFE SKILLS": [
    { title: "CULTURAL AWARENESS", icon: "globe" },
    { title: "PRESENTATION SKILLS", icon: "presentation" },
    { title: "PROFESSIONALISM", icon: "award" },
    { title: "CONFLICT RESOLUTION", icon: "handshake" },
    { title: "COMMUNICATION SKILLS", icon: "message" },
  ],
  "ENTOURAGE": [
    { title: "AGENTS", icon: "users" },
    { title: "SPONSORS", icon: "coins" },
    { title: "PLAYERS' MENTORS", icon: "graduation" },
    { title: "FAMILY", icon: "heart" },
  ],
  "CAREER": [
    { title: "GOAL SETTING", icon: "target" },
    { title: "TIME MANAGEMENT", icon: "clock" },
    { title: "MAKING GOOD CHOICES", icon: "thumbsup" },
    { title: "NETWORKING", icon: "share" },
    { title: "EDUCATION", icon: "book" },
  ],
  "MEDIA": [
    { title: "INTERACTING WITH MEDIA", icon: "tv" },
    { title: "SOCIAL MEDIA", icon: "instagram" },
  ],
  "INTEGRITY": [
    { title: "ANTI-DOPING", icon: "activity" },
    { title: "BETTING AND MATCH FIXING", icon: "alert-triangle" },
    { title: "ABUSIVE BEHAVIOUR", icon: "alert-octagon" },
    { title: "REPORT A BREACH OF INTEGRITY", icon: "megaphone" },
  ],
  "FINANCE": [
    { title: "FINANCE PLANNING", icon: "credit-card", image: financePlanningImg },
    { title: "BUDGETING", icon: "coins", image: budgetingImg },
    { title: "GAMBLING", icon: "alert-triangle", image: gamblingImg },
  ],
};

function GuideIcon({ name }: { name: string }) {
  const color = T.orange;
  switch (name) {
    case "globe":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "presentation":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "award":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        </svg>
      );
    case "handshake":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 14H6.5a2.5 2.5 0 0 1 0-5H18" />
          <path d="M14 10h4.5a2.5 2.5 0 0 1 0 5H10" />
          <path d="M8 14v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4" />
        </svg>
      );
    case "message":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "users":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "coins":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6" />
          <circle cx="18" cy="16" r="6" />
          <line x1="2" y1="8" x2="8" y2="14" />
          <line x1="12" y1="16" x2="18" y2="22" />
        </svg>
      );
    case "graduation":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      );
    case "heart":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "target":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "clock":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "thumbsup":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      );
    case "share":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "book":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "tv":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "activity":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case "alert-triangle":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "alert-octagon":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "megaphone":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.8 6c-.4 0-.8.3-.8.7V17.3c0 .4.4.7.8.7.6 0 1.2-.5 1.2-1.2v-9.6c0-.7-.6-1.2-1.2-1.2z" />
          <path d="M3 8h3l9-6v20l-9-6H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" />
        </svg>
      );
    case "credit-card":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
    case "file-text":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    default:
      return null;
  }
}

function GuideCard({
  title,
  icon,
  image,
  isMobile,
}: {
  title: string;
  icon: string;
  image?: string;
  isMobile: boolean;
}) {
  const h = useHover();

  return (
    <div
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        width: isMobile ? "100%" : "calc(50% - 18px)",
        maxWidth: 500,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        cursor: "pointer",
        transform: h.on ? "translateY(-4px)" : "none",
        transition: "transform 0.2s ease",
      }}
    >
      {/* Title box */}
      <div
        style={{
          background: "black",
          border: `2px solid ${T.orange}`,
          borderRadius: 30,
          padding: "6px 24px",
          width: "80%",
          textAlign: "center",
          boxSizing: "border-box",
          zIndex: 2,
          boxShadow: h.on ? `0 0 15px rgba(232,101,26,0.4)` : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <span
          style={{
            fontFamily: BARLOW,
            fontWeight: 800,
            fontSize: isMobile ? 14 : 16,
            color: T.orange,
            letterSpacing: "1px",
            textTransform: "uppercase",
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
      </div>

      {/* Visual area below */}
      <div
        style={{
          marginTop: -16,
          width: "100%",
          height: 200,
          background: image ? "#000" : T.charcoal,
          border: `2.5px solid ${h.on ? T.orange : T.border}`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: h.on ? `0 8px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(232,101,26,0.15)` : "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: h.on ? 1 : 0.9,
              transform: h.on ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
          />
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle, rgba(232,101,26,0.08) 0%, rgba(0,0,0,0) 70%)",
                opacity: h.on ? 1 : 0.6,
                transition: "opacity 0.2s ease",
              }}
            />
            <div style={{ transform: h.on ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s ease" }}>
              <GuideIcon name={icon} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OnCourtOffCourtGuideContent({ isMobile }: { isMobile: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("LIFE SKILLS");

  return (
    <div>
      <SectionBadge label="ON-COURT & OFF-COURT GUIDE" />

      {/* Sub tabs nav bar */}
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
        {SUB_TABS.map((subTab) => {
          const isActive = activeSubTab === subTab;
          return (
            <button
              key={subTab}
              onClick={() => setActiveSubTab(subTab)}
              style={{
                flex: "1 1 auto",
                minWidth: 120,
                background: isActive ? T.orange : "transparent",
                color: isActive ? T.white : T.inactive,
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "12px 16px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {subTab}
            </button>
          );
        })}
      </div>

      {/* Cards list */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 36,
          justifyContent: "center",
        }}
      >
        {ON_COURT_GUIDE_DATA[activeSubTab].map((card, i) => {
          return (
            <GuideCard
              key={i}
              title={card.title}
              icon={card.icon}
              image={(card as { title: string; icon: string; image?: string }).image}
              isMobile={isMobile}
            />
          );
        })}
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
export default function Books() {
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
            top: 52, // Below the SiteHeader navigation which is sticky
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
            BOOKS
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
            ) : activeTab === "5X5" ? (
              <FiveOnFiveContent isMobile={isMobile} />
            ) : activeTab === "3X3" ? (
              <ThreeOnThreeContent isMobile={isMobile} />
            ) : activeTab === "WHEELCHAIR" ? (
              <WheelchairContent isMobile={isMobile} />
            ) : activeTab === "PRESENTATIONS" ? (
              <PresentationsContent isMobile={isMobile} />
            ) : activeTab === "SCORESHEET" ? (
              <ScoresheetContent isMobile={isMobile} />
            ) : activeTab === "EQUIPMENT" ? (
              <EquipmentContent isMobile={isMobile} />
            ) : activeTab === "REGULATIONS" ? (
              <RegulationsContent isMobile={isMobile} />
            ) : activeTab === "ON-COURT & OFF-COURT GUIDE" ? (
              <OnCourtOffCourtGuideContent isMobile={isMobile} />
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
