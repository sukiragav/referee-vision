import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";
import { renderWithOrdinals } from "../utils/renderWithOrdinals";

// ─── Design tokens (matches Videos.tsx T object) ────────────────────────────
const TV = {
  bg: "var(--black)",
  orange: "#E8651A",
  black: "#000000",
  white: "#FFFFFF",
  offWhite: "var(--off-white)",
  charcoal: "#1C1C1C",
  border: "#2A2A2A",
  inactive: "#888888",
  hoverBg: "rgba(232,101,26,0.12)",
};
const BARLOW = "'Barlow Condensed', sans-serif";

// ─── Types ────────────────────────────────────────────────────────────────────
type VaultTab =
  | "ASSIST MAGAZINE"
  | "MIC'D UP"
  | "TOUGH CALLS"
  | "QUIZ"
  | "RULEBOOKS"
  | "BOOKS"
  | "DOCUMENTARIES"
  | "ARTICLES"
  | "TOOLS";

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

const VAULT_TABS: VaultTab[] = [
  "ASSIST MAGAZINE",
  "MIC'D UP",
  "TOUGH CALLS",
  "QUIZ",
  "RULEBOOKS",
  "BOOKS",
  "DOCUMENTARIES",
  "ARTICLES",
  "TOOLS",
];

// ─── Mic'd Up data ────────────────────────────────────────────────────────────
const MIC_D_UP_ITEMS = [
  { title: "BCL REFEREE - ANTONIO CONDE", link: "https://youtu.be/Qe48PW6cOiM" },
  { title: "BCL REFEREE - ARIADNA CHUECA", link: "https://youtu.be/_WfLDvGJIO0" },
  { title: "BCL REFEREE - ANTONIO CONDE", link: "https://youtu.be/tseTb84ec7E" },
  { title: "BCL REFEREE - WOJCIECH LISZKA", link: "https://youtu.be/VefiqIBS8v4" },
  { title: "BCL REFEREE - YOHAN ROSSO", link: "https://youtu.be/XTToEcM1Up0" },
  { title: "BCL REFEREE - MANUEL MAZZONI", link: "https://youtu.be/I1pgGj9Tads" },
  { title: "BCL REFEREE - PAULO MARQUES", link: "https://youtu.be/Yx3TFV-lnYw" },
  { title: "REFEREES COMMUNICATION WITH COACHES - WORLD CUP 2023", link: "https://youtu.be/Itf5DT-IoOo" },
  { title: "REFEREES COMMUNICATION WITH PLAYERS - WORLD CUP 2023", link: "https://youtu.be/HLShPNUdgKc" },
  { title: "REFEREE COMMUNICATION: EUROBASKET 2022", link: "https://youtu.be/hTpb57GbLGE" },
  { title: "BCL REFEREE - YOHAN ROSSO", link: "https://youtu.be/qBm47-Dz91s" },
  { title: "BCL REFEREE - MANUEL MAZZONI", link: "https://youtu.be/YtgFhed5sDA" },
  { title: "EUROLEAGUE FINAL FOUR", link: "https://youtu.be/EBUwNXkdtxw" },
  { title: "EUROLEAGUE WOMEN", link: "https://youtu.be/TZuiWH1EvrY" },
  { title: "EUROLEAGUE: INSIDE THE GREEK DERBY", link: "https://youtu.be/aPApi1b4SB0" },
  { title: "COLLEEN THOMPSON (MEC Women's Basketball Official)", link: "https://youtu.be/vz9f1L-oSdA" },
  { title: "EUROLEAGUE: GO ON COURT WITH THE WHISTLE-BLOWERS", link: "https://youtu.be/fZh21NEu7Dw" },
  { title: "CALLING THE SHOTS: THE ANNE PANTHER STORY", link: "https://youtu.be/cmiFlkJBTtQ" },
  { title: "LIFE OF A NBA REFEREE - MIKE CALLAHAN", link: "https://youtu.be/lM4N_km9S4k" },
  { title: "NBA REFEREES WIRED PLAYLIST", link: "https://youtu.be/lM4N_km9S4k" },
  { title: "WHAT IT TAKES TO BE A NBA REFEREE - ZACH ZARBA", link: "https://youtu.be/pb0h8H-xtYg" },
  { title: "BEHIND THE SCENES - ZACH ZARBA", link: "https://youtu.be/_Vf1whV6xE0" },
  { title: "GAME DAY WITH NBA REFEREES", link: "https://youtu.be/JJ_41atzdPM" },
];

// ─── Tough Calls data ─────────────────────────────────────────────────────────
const TOUGH_CALLS_SEASONS = [
  "2016-17", "2017-18", "2018-19", "2019-20", "2020-21",
  "2021-22", "2022-23", "2023-24", "2024-25", "2025-26",
  "2026-27"
];

type MatchdayEntry = { label: string; link: string };
const TOUGH_CALLS_DATA: Record<string, MatchdayEntry[]> = {
  "2016-17": [
    { label: "MATCHDAY 6", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls-gameday-6" },
    { label: "MATCHDAY 7", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-call-week-7" },
    { label: "MATCHDAY 8", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls-gameday-8" },
    { label: "MATCHDAY 12", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls" },
    { label: "MATCHDAY 13", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls1" },
    { label: "MATCHDAY 14", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls2" },
    { label: "PLAY-OFFS QUALIFIERS", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls3" },
    { label: "PLAY-OFFS QUALIFIERS", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls4" },
    { label: "ROUND OF 16", link: "https://www.fiba.basketball/en/news/bcl-16-17-news-tough-calls5" },
  ],
  "2017-18": [
    { label: "WEEK 1", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls" },
    { label: "WEEK 2", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls1" },
    { label: "WEEK 3", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-3" },
    { label: "WEEK 4", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-4" },
    { label: "WEEK 6", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-6" },
    { label: "WEEK 7", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-7" },
    { label: "WEEK 8", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-8" },
    { label: "WEEK 9", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-9" },
    { label: "WEEK 10", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-10" },
    { label: "WEEK 11", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-11" },
    { label: "WEEK 12", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-12" },
    { label: "WEEK 13", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-13" },
    { label: "WEEK 14", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-week-14" },
    { label: "ROUND OF 16 LEG 1", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-round-of-16-leg-1" },
    { label: "ROUND OF 16 LEG 2", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-round-of-16-leg-2" },
    { label: "QUARTER FINAL LEG 1", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-quarter-finals-leg-1" },
    { label: "QUARTER FINAL LEG 2", link: "https://www.fiba.basketball/en/news/bcl-17-18-news-tough-calls-quarter-finals-leg-2-part-1" },
  ],
  "2018-19": [
    { label: "WEEK 2", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls" },
    { label: "WEEK 3", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-3" },
    { label: "WEEK 4", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-4" },
    { label: "WEEK 5", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-5" },
    { label: "WEEK 6", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-6" },
    { label: "WEEK 7", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-7" },
    { label: "WEEK 8", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-8" },
    { label: "WEEK 9", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-9" },
    { label: "WEEK 10", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-10" },
    { label: "WEEK 11", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-11" },
    { label: "WEEK 12", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-12" },
    { label: "WEEK 13", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-week-13" },
    { label: "ROUND OF 16 LEG 1", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-round-of-16-leg-1" },
    { label: "ROUND OF 16 LEG 2", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-round-of-16-leg-2" },
    { label: "QUARTER FINAL LEG 1", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-quarter-finals-leg-1" },
    { label: "QUARTER FINAL LEG 2", link: "https://www.fiba.basketball/en/news/bcl-18-19-news-tough-calls-quarter-finals-leg-2" },
  ],
  "2019-20": [
    { label: "MATCHDAY 1", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-1" },
    { label: "MATCHDAY 2", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-2" },
    { label: "MATCHDAY 3", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-3" },
    { label: "MATCHDAY 4", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-4" },
    { label: "MATCHDAY 5", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-5" },
    { label: "MATCHDAY 6", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-6" },
    { label: "MATCHDAY 7", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-7" },
    { label: "MATCHDAY 8", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-8" },
    { label: "MATCHDAY 9", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-9" },
    { label: "MATCHDAY 10", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-10" },
    { label: "MATCHDAY 11", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-11" },
    { label: "MATCHDAY 12", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-12" },
    { label: "MATCHDAY 13", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-13" },
    { label: "MATCHDAY 14", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-gameday-14" },
    { label: "ROUND OF 16 GAME 1", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-round-of-16-game-1" },
    { label: "ROUND OF 16 GAME 2", link: "https://www.fiba.basketball/en/news/bcl-19-20-news-tough-calls-round-of-16-game-2" },
  ],
  "2020-21": [
    { label: "MATCHDAY 1", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-1" },
    { label: "MATCHDAY 2", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-2" },
    { label: "MATCHDAY 3", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-3" },
    { label: "MATCHDAY 4", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-4" },
    { label: "MATCHDAY 5", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-5_link" },
    { label: "MATCHDAY 6", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-6" },
    { label: "MATCHDAY 7", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-7" },
    { label: "MATCHDAY 8", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-8" },
    { label: "MATCHDAY 9", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-9" },
    { label: "MATCHDAY 10", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-10" },
    { label: "MATCHDAY 11", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-11" },
    { label: "MATCHDAY 12", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-gameday-12" },
    { label: "PLAY-OFF GAMEDAY 1", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-play-offs-gameday-1" },
    { label: "PLAY-OFF GAMEDAY 2", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-play-offs-gameday-2" },
    { label: "PLAY-OFF GAMEDAY 3", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-play-offs-gameday-3" },
    { label: "PLAY-OFF GAMEDAY 4", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-play-offs-gameday-4" },
    { label: "PLAY-OFF GAMEDAY 5", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-play-offs-gameday-5" },
    { label: "PLAY-OFF GAMEDAY 6", link: "https://www.fiba.basketball/en/news/bcl-20-21-news-tough-calls-play-offs-gameday-6" },
  ],
  "2021-22": [
    { label: "MATCHDAY 1", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-1" },
    { label: "MATCHDAY 2", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-2" },
    { label: "MATCHDAY 3", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-3" },
    { label: "MATCHDAY 4", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-4" },
    { label: "MATCHDAY 5", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-5" },
    { label: "MATCHDAY 6", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-6" },
    { label: "MATCHDAY 7", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-7" },
    { label: "MATCHDAY 8", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-8" },
    { label: "MATCHDAY 9", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-9" },
    { label: "MATCHDAY 10", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-gameday-10" },
    { label: "PLAY-INS WEEK 1", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-play-ins-week-1" },
    { label: "PLAY-INS WEEK 2", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-play-ins-week-2" },
    { label: "PLAY-INS WEEK 3", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-play-ins-week-3" },
    { label: "ROUND OF 16 WEEK 1", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-round-of-16-week-1" },
    { label: "ROUND OF 16 WEEK 2", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-round-of-16-week-2" },
    { label: "ROUND OF 16 WEEK 3", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-round-of-16-week-3" },
    { label: "ROUND OF 16 WEEK 4", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-round-of-16-week-4" },
    { label: "ROUND OF 16 WEEK 5", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-round-of-16-week-5" },
    { label: "ROUND OF 16 WEEK 6", link: "https://www.fiba.basketball/en/news/bcl-21-22-news-tough-calls-round-of-16-week-6" },
  ],
  "2022-23": [
    { label: "WEEK 1", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-gameday-11" },
    { label: "WEEK 2", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-gameday-2" },
    { label: "WEEK 3", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-week-3" },
    { label: "WEEK 5", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-week-5" },
    { label: "WEEK 7", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-week-7" },
    { label: "WEEK 9", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-week-9" },
    { label: "PLAY-INS WEEK 1", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-play-ins-week-1" },
    { label: "PLAY-INS WEEK 3", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-play-ins-week-3" },
    { label: "ROUND OF 16 WEEK 1", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-round-of-16-%7C-week-1" },
    { label: "ROUND OF 16 WEEK 2", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-round-of-16-week-2" },
    { label: "ROUND OF 16 WEEK 3 - PART 1", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-round-of-16-week-3" },
    { label: "ROUND OF 16 WEEK 3 - PART 2", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-round-of-16-week-3-rescheduled-games" },
    { label: "ROUND OF 16 WEEK 4", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-round-of-16-week-4" },
    { label: "ROUND OF 16 WEEK 5", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-round-of-16-week-5" },
    { label: "ROUND OF 16 WEEK 6", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-round-of-16-week-6" },
    { label: "QUARTERFINAL", link: "https://www.fiba.basketball/en/news/bcl-22-23-news-tough-calls-quarterfinals" },
  ],
  "2023-24": [
    { label: "WEEK 1", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-1" },
    { label: "WEEK 2", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-2" },
    { label: "WEEK 3", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-3" },
    { label: "WEEK 4", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-4" },
    { label: "WEEK 5", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-5" },
    { label: "WEEK 6", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-6" },
    { label: "WEEK 7", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-7" },
    { label: "WEEK 9", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-9" },
    { label: "WEEK 10", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-10" },
    { label: "PLAY-INS GAME 1", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-play-ins-game-1" },
    { label: "PLAY-INS GAME 2", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-play-ins-game-2" },
    { label: "PLAY-INS GAME 3", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-play-ins-game-3" },
    { label: "ROUND OF 16 WEEK 1", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-1" },
    { label: "ROUND OF 16 WEEK 2", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-2" },
    { label: "ROUND OF 16 WEEK 3", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-3" },
    { label: "ROUND OF 16 WEEK 4", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-4" },
    { label: "ROUND OF 16 WEEK 5", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-5" },
    { label: "ROUND OF 16 WEEK 6", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-6" },
    { label: "ROUND OF 16 WEEK 8", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-regular-season-week-8" },
    { label: "QUARTERFINAL", link: "https://www.fiba.basketball/en/news/23-24-news-tough-calls-quarter-finals" },
  ],
  "2024-25": [
    { label: "WEEK 1", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-1" },
    { label: "WEEK 2", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-2" },
    { label: "WEEK 3", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-3" },
    { label: "WEEK 5", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-5" },
    { label: "WEEK 6", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-6" },
    { label: "WEEK 7", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-7" },
    { label: "WEEK 8", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-8" },
    { label: "WEEK 9", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-9" },
    { label: "WEEK 10", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-10" },
    { label: "PLAY-INS WEEK 1", link: "https://www.fiba.basketball/en/news/tough-calls-play-ins-week-1" },
    { label: "PLAY-INS WEEK 2", link: "https://www.fiba.basketball/en/news/tough-calls-play-ins-week-2" },
    { label: "PLAY-INS WEEK 3", link: "https://www.fiba.basketball/en/news/tough-calls-play-ins-week-3" },
    { label: "ROUND OF 16 WEEK 1", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-1" },
    { label: "ROUND OF 16 WEEK 2", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-2" },
    { label: "ROUND OF 16 WEEK 3", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-3" },
    { label: "ROUND OF 16 WEEK 4", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-4" },
    { label: "ROUND OF 16 WEEK 5", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-5" },
    { label: "ROUND OF 16 WEEK 6", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-6" },
    { label: "QUARTERFINAL GAME 1", link: "https://www.fiba.basketball/en/news/tough-calls-quarter-finals-game-1" },
    { label: "QUARTERFINAL GAME 2", link: "https://www.fiba.basketball/en/news/tough-calls-quarter-finals-game-2" },
    { label: "FINAL FOUR", link: "https://www.fiba.basketball/en/news/tough-calls-final-four-powered-by-sunel" },
  ],
  "2025-26": [
    { label: "WEEK 1", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-1-october-13" },
    { label: "WEEK 2", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-2-october-18" },
    { label: "WEEK 3", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-3-october-24" },
    { label: "WEEK 4", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-4-november-2" },
    { label: "WEEK 5", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-5-november-9" },
    { label: "WEEK 6", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-6-november-14" },
    { label: "WEEK 7", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-7-november-21" },
    { label: "WEEK 8", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-8-december-12" },
    { label: "WEEK 9", link: "https://www.fiba.basketball/en/news/tough-calls-regular-season-week-9-december-20" },
    { label: "PLAY-INS GAMES 1 & 2", link: "https://www.fiba.basketball/en/news/tough-calls-play-ins-games-1-and-2" },
    { label: "ROUND OF 16 WEEK 1", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-1-january-24" },
    { label: "ROUND OF 16 WEEK 2", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-2-january-30" },
    { label: "ROUND OF 16 WEEK 3", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-3-february-6" },
    { label: "ROUND OF 16 WEEK 4", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-4-february-13" },
    { label: "ROUND OF 16 WEEK 5", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-5-march-15" },
    { label: "ROUND OF 16 WEEK 6", link: "https://www.fiba.basketball/en/news/tough-calls-round-of-16-week-6-march-22" },
  ],
  "2026-27": [
    { label: "GAMEDAY 1", link: "https://www.fiba.basketball/en/events/euroleague-women-26-27/news/euroleague-women-tough-calls-gameday-1" },
    { label: "GAMEDAY 2", link: "https://www.fiba.basketball/en/events/euroleague-women-26-27/news/euroleague-women-tough-calls-gameday-2" },
    { label: "WEEK 1", link: "https://www.championsleague.basketball/en/news/tough-calls-season-11-week-1" },
    { label: "WEEK 2", link: "https://www.championsleague.basketball/en/news/tough-calls-season-11-week-2" },
    { label: "WEEK 3", link: "https://www.championsleague.basketball/en/news/tough-calls-season-11-week-3" }
  ]
};

// ─── Stripe colours cycling per issue ─────────────────────────────────────────
const STRIPE_COLORS = ["#0056B3", "#FFC107", "#DC3545", "#28A745", "#6C757D", "#E8651A", "#9B59B6", "#1ABC9C"];

// ─── Shared hover hook ────────────────────────────────────────────────────────
function useHover() {
  const [on, set] = useState(false);
  return { on, onMouseEnter: () => set(true), onMouseLeave: () => set(false) };
}

// ─── Video & Document modal ───────────────────────────────────────────────────
function VaultModal({ url, title, onClose }: { url: string; title?: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const isPdf = /\.pdf(\?.*)?$/i.test(url);

  const toEmbed = (u: string) => {
    const m1 = u.match(/youtu\.be\/([\w-]+)/);
    if (m1) return `https://www.youtube.com/embed/${m1[1]}?autoplay=1`;
    const m2 = u.match(/[?&]v=([\w-]+)/);
    if (m2) return `https://www.youtube.com/embed/${m2[1]}?autoplay=1`;
    return u;
  };

  return createPortal(
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {isPdf ? (
        <div
          onClick={e => e.stopPropagation()}
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
            border: `1px solid ${TV.border}`,
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
              borderBottom: `2px solid ${TV.orange}`,
              zIndex: 20,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: BARLOW,
                fontWeight: 800,
                fontSize: 15,
                color: TV.white,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {title || "Assist Magazine"}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: TV.orange,
                  fontFamily: BARLOW,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "1px",
                  textDecoration: "none",
                  border: `1px solid ${TV.orange}`,
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
                  background: TV.orange,
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
        <div onClick={e => e.stopPropagation()} style={{ width: "min(860px,90vw)", background: "#000", borderRadius: 4, overflow: "hidden" }}>
          <iframe
            src={toEmbed(url)}
            width="100%"
            style={{ aspectRatio: "16/9", display: "block", border: "none" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>,
    document.body
  );
}

// ─── Section badge (matches Videos SectionBadge) ─────────────────────────────
function VaultBadge({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
      <div className="section-badge-pill" style={{ background: TV.orange, color: TV.offWhite, fontFamily: BARLOW, fontWeight: 800, fontSize: 22, letterSpacing: "3px", textTransform: "uppercase", padding: "10px 40px", borderRadius: 30 }}>
        {label}
      </div>
    </div>
  );
}

// ─── Assist card ──────────────────────────────────────────────────────────────
function AssistCard({
  issueNumber,
  onOpen,
}: {
  issueNumber: number;
  onOpen: (pdfUrl: string, title: string) => void;
}) {
  const h = useHover();
  const fmt = String(issueNumber).padStart(2, "0");
  const thumb = `https://www.refereevision.com/Referees/${fmt}.jpg`;
  const pdf = `https://www.refereevision.com/Referees/${fmt}_${issueNumber === 1 ? "Ref" : "ref"}.pdf`;
  const stripe = STRIPE_COLORS[(issueNumber - 1) % STRIPE_COLORS.length];
  const title = `ASSIST MAGAZINE #${fmt}`;

  return (
    <div
      onClick={() => onOpen(pdf, title)}
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        aspectRatio: "3 / 4",
        background: TV.charcoal,
        border: h.on ? `2px solid ${TV.orange}` : `1.5px solid ${TV.border}`,
        display: "flex",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.22s, box-shadow 0.22s",
        transform: h.on ? "scale(1.09)" : "scale(1)",
        boxShadow: h.on ? "0 8px 28px rgba(232,101,26,0.25)" : "none",
        textDecoration: "none",
        zIndex: h.on ? 10 : 1,
        position: "relative",
      }}
    >
      <div style={{ width: 20, background: stripe, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ transform: "rotate(-90deg)", fontFamily: BARLOW, fontWeight: 800, fontSize: 8, color: TV.white, letterSpacing: "1.5px", whiteSpace: "nowrap" }}>
          ASSIST{fmt}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <img
          src={thumb}
          alt={`Assist ${issueNumber}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: h.on ? 1 : 0.82, transition: "opacity 0.2s", display: "block" }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
    </div>
  );
}

function WorldCongressCard() {
  const h = useHover();
  return (
    <a
      href="PLACEHOLDER_wc2010_pdf"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      style={{
        aspectRatio: "3 / 4",
        background: "#1A1A1A",
        border: h.on ? `2px solid ${TV.orange}` : `1.5px solid ${TV.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.22s",
        transform: h.on ? "scale(1.09)" : "scale(1)",
        textDecoration: "none",
        position: "relative",
        zIndex: h.on ? 10 : 1,
      }}
    >
      <img
        src="PLACEHOLDER_wc2010_thumb.jpg"
        alt="World Congress 2010"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={e => {
          const el = e.target as HTMLImageElement;
          el.style.display = "none";
          const parent = el.parentElement;
          if (parent && !parent.querySelector(".wc-label")) {
            const div = document.createElement("div");
            div.className = "wc-label";
            div.style.cssText = "display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:8px;text-align:center;";
            div.innerHTML = '<span style="font-family:\'Barlow Condensed\';font-size:10px;font-weight:800;color:#FFE600;letter-spacing:1px;text-transform:uppercase;line-height:1.4">ASSIST<br>MAGAZINE<br>WORLD<br>CONGRESS<br>2010</span>';
            parent.appendChild(div);
          }
        }}
      />
    </a>
  );
}

// ─── ASSIST MAGAZINE ──────────────────────────────────────────────────────────
function AssistMagazineContent({ isMobile, isTablet }: { isMobile?: boolean; isTablet?: boolean }) {
  const [activeDoc, setActiveDoc] = useState<{ url: string; title: string } | null>(null);
  const issues = [...Array.from({ length: 32 }, (_, i) => i + 1), 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
  const cols = isMobile ? 2 : isTablet ? 3 : 5;
  return (
    <div>
      {activeDoc && (
        <VaultModal
          url={activeDoc.url}
          title={activeDoc.title}
          onClose={() => setActiveDoc(null)}
        />
      )}
      <VaultBadge label="ASSIST MAGAZINE" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: isMobile ? 10 : 16,
          padding: "0 8px 48px",
          marginTop: 28,
        }}
      >
        {issues.map(n => (
          <AssistCard
            key={n}
            issueNumber={n}
            onOpen={(url, title) => setActiveDoc({ url, title })}
          />
        ))}
      </div>
    </div>
  );
}

// ─── WATCH button ─────────────────────────────────────────────────────────────
function WatchBtn({ onClick }: { onClick: () => void }) {
  const h = useHover();
  return (
    <button
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onClick}
      style={{
        background: h.on ? "#C5561A" : TV.orange,
        color: TV.white,
        fontFamily: BARLOW,
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: "1.5px",
        border: "none",
        borderRadius: 3,
        padding: "6px 14px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        whiteSpace: "nowrap",
        transition: "background 0.15s, transform 0.15s",
        transform: h.on ? "scale(1.04)" : "scale(1)",
        flexShrink: 0,
      }}
    >
      WATCH 📹
    </button>
  );
}

// ─── MIC'D UP ─────────────────────────────────────────────────────────────────
function MicDUpContent() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  return (
    <div>
      {activeVideo && <VaultModal url={activeVideo} onClose={() => setActiveVideo(null)} />}
      <VaultBadge label="MIC'D UP" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {MIC_D_UP_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              borderBottom: `1px solid rgba(0,0,0,0.1)`,
              background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.03)",
              gap: 16,
            }}
          >
            <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: TV.orange, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              {item.title}
            </span>
            <WatchBtn onClick={() => {
              if (!item.link.startsWith("PLACEHOLDER")) setActiveVideo(item.link);
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Matchday button ──────────────────────────────────────────────────────────
function MatchdayBtn({ label, onClick }: { label: string; onClick: () => void }) {
  const h = useHover();
  return (
    <button
      onMouseEnter={h.onMouseEnter}
      onMouseLeave={h.onMouseLeave}
      onClick={onClick}
      style={{
        background: h.on ? "#C5561A" : TV.orange,
        color: TV.white,
        fontFamily: BARLOW,
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: "1.5px",
        border: "none",
        borderRadius: 3,
        padding: "10px 22px",
        cursor: "pointer",
        textTransform: "uppercase",
        transition: "background 0.15s, transform 0.15s",
        transform: h.on ? "scale(1.04)" : "scale(1)",
      }}
    >
      {label}
    </button>
  );
}

// ─── TOUGH CALLS ──────────────────────────────────────────────────────────────
function ToughCallsContent() {
  const [season, setSeason] = useState("2016-17");
  const matchdays = TOUGH_CALLS_DATA[season] ?? [];

  return (
    <div>
      <VaultBadge label={`${season} SEASON`} />
      <div style={{ display: "flex", minHeight: 320 }}>
        {/* Season list */}
        <div style={{ width: 140, flexShrink: 0, background: TV.charcoal, borderRight: `1px solid rgba(0,0,0,0.12)` }}>
          {TOUGH_CALLS_SEASONS.map(s => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "11px 16px",
                background: s === season ? TV.orange : "transparent",
                color: s === season ? TV.white : TV.inactive,
                fontFamily: BARLOW,
                fontWeight: s === season ? 800 : 600,
                fontSize: 14,
                letterSpacing: "0.5px",
                border: "none",
                borderBottom: `1px solid rgba(255,255,255,0.06)`,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {/* Matchday grid */}
        <div style={{ flex: 1, padding: "28px 36px" }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {matchdays.map((m, i) => (
              <MatchdayBtn
                key={i}
                label={m.label}
                onClick={() => {
                  if (!m.link.startsWith("PLACEHOLDER")) {
                    window.open(m.link, "_blank", "noopener,noreferrer");
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── QUIZ DATA & CONTENT ──────────────────────────────────────────────────────
const QUIZ_ITEMS = [
  { title: "ARTICLE 1: Definitions", link: "https://docs.google.com/forms/d/e/1FAIpQLSeD4wVbF1GSQ1tMFpMgmsPU3urMubiYulaXABs8YxEF-qQsXQ/viewform?usp=share_link" },
  { title: "ARTICLE 2: Playing Court - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSfbhtTwj1jSgkJvrTcr_hlZ7gzNc2ptTUOiMJDB7WQRh3m-cg/viewform?usp=share_link" },
  { title: "ARTICLE 2: Playing Court - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSe7iMODTFnxlXNRCYgNna9-8NL3DI3MvYyxER3GQa6v_rE7sg/viewform?usp=share_link" },
  { title: "ARTICLE 3: Equipment - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSdbZ-Shf8HwT9hmhaBx5oUNPIxGc_Q5R8JxYnA7T6tZFRugvw/viewform?usp=share_link" },
  { title: "ARTICLE 3: Equipment - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLScN9L73hRpaf6Dgw-psoCAyVvcitneN5WXFox5KcU3qbcWCZA/viewform?usp=share_link" },
  { title: "ARTICLE 4: Teams - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSfv5XuVqGfsE-SSGD2wKH50qXtUxTZRHmWtIDxVvLuWMjzzGQ/viewform?usp=share_link" },
  { title: "ARTICLE 4: Teams - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSdUoKDIWUue2AFZJk_jSx_IMvipMTnCmctsPGRIXa6e--lm8w/viewform?usp=share_link" },
  { title: "ARTICLE 5: Players:Injury and assistance", link: "https://docs.google.com/forms/d/e/1FAIpQLSfD7vyi3zvKJSOqQSchbuao3h5enzNl0kJA_37R8VfvsvtCFg/viewform?usp=share_link" },
  { title: "ARTICLE 6 & 7: Captain, Head Coach and First Assistant Coach: Duties and Powers - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSd4XH32AtLWRSQ2U39eqHeY5KvZIq-bb0O_rm2jRu9JVmrcDA/viewform?usp=share_link" },
  { title: "ARTICLE 6 & 7: Captain, Head Coach and First Assistant Coach: Duties and Powers - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSe3wfQYQooimxudjKfeV_5cj6qPqizRDwq2r_OJDtskkAAMYw/viewform?usp=share_link" },
  { title: "ARTICLE 8: Playing time, tied score and overtime - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSdoD6TTFTzYXdBOe10-TnvE4X-22RCbtIwdzdeCoXqQWa51Sg/viewform?usp=share_link" },
  { title: "ARTICLE 8: Playing time, tied score and overtime - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSd9ByEvD7HzJUuAj4h25_O2j9iq6kXfjKoucrhEyuGdDWzNJw/viewform?usp=share_link" },
  { title: "ARTICLE 9: Beginning and end of a quarter, overtime or the game", link: "https://docs.google.com/forms/d/e/1FAIpQLSdvyqaUCO95qoGmJGJjMQhR8nPoIcjK2pHkYmO_DXwfVm-cgQ/viewform?usp=share_link" },
  { title: "ARTICLE 10 & 11: Status of the ball & Location of a player and a referee - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSeHtvbUHkhCy9B0m3tszAVt2Ah0KPWFLqmfOPH243AEZ7ZBLw/viewform?usp=share_link" },
  { title: "ARTICLE 10 & 11: Status of the ball & Location of a player and a referee - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSfZQfvVP0rs9pz98Zu18cicG1y1KRXBMAQY99mWYLQpxw1o0A/viewform?usp=share_link" },
  { title: "ARTICLE 12: Jump ball and Alternating Possession - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLScsRtvZM1uCys1l8ibtiXhEi5AR0wVFtZA2AkRQFbJ1oKYZ4w/viewform?usp=share_link" },
  { title: "ARTICLE 12: Jump ball and Alternating Possession - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSctyzhUQ-dhDBTtTIpQblm_BLZZMyYOHHt4IeomSEID8H4GoQ/viewform?usp=share_link" },
  { title: "ARTICLE 13 & 14: How the ball is played and Control of the ball", link: "https://docs.google.com/forms/d/e/1FAIpQLSeLSFc_LTMHQUjE5Wva_6M6v1rmwYpPt-NIjLbJAyEniFXKIw/viewform?usp=share_link" },
  { title: "ARTICLE 15 & 16: Player in the act of shooting & Goal:When made and its value - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSdsmvCtmqv7oIQSSWeamipDpSDe1pcC85b04H6tkpQ4UMAiqQ/viewform?usp=share_link" },
  { title: "ARTICLE 15 & 16: Player in the act of shooting & Goal:When made and its value - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSdaohN7DpJTCpsqMuQ-Z52NltiJDd-ERyDXKzypGxjgmXkFMA/viewform?usp=share_link" },
  { title: "ARTICLE 17: Throw-in - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSecMZ4CHb8sVv7yKkLC1ZlAs7bXEuKpuOIYdIf_kmHCsaXD5Q/viewform?usp=share_link" },
  { title: "ARTICLE 17: Throw-in - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSdkJzWjCrCCrdiJja3iR8rr6vCGfghcXXLYDiOLiHgLKDRY8w/viewform?usp=share_link" },
  { title: "ARTICLE 17: Throw-in - Part III", link: "https://docs.google.com/forms/d/e/1FAIpQLSeGtDQvQlFQtZHrX1LD0pVNlBCWAK7kJAG4vlITGBDO5h8Yig/viewform?usp=share_link" },
  { title: "ARTICLE 18: Time-out - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSeNZm3ECV6y-nrqvWVoye0dwuoowSPHpX75yKI7agSVaxIRGg/viewform?usp=share_link" },
  { title: "ARTICLE 18: Time-out - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSePPZHcQ2yymeBsH2Xzrzq0bfxCTiUdGsYyj0LmeoW6HQJJWg/viewform?usp=share_link" },
  { title: "ARTICLE 19: Substitution - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSeXi5YJ1g-sSxpHMLizLwaRK6Ksw8ltCm6lUexSJ0xpTWydTQ/viewform?usp=share_link" },
  { title: "ARTICLE 19: Substitution - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSdwvqyy7C56aysPH3XEuEVc5_DKetJuPAMLe1BYyBXw3GFCDw/viewform?usp=share_link" },
  { title: "ARTICLE 20 & 21: Game lost by forfeit & Game lost by default", link: "https://docs.google.com/forms/d/e/1FAIpQLSfIVLS9ARYWMwVoHNpk7GTh0Rfmv0_2pS-u3Xm2Y_bWBFyqkQ/viewform?usp=share_link" },
  { title: "ARTICLE 22 & 23: Violations & Players out-of-boundsa and ball out-of-bounds", link: "https://docs.google.com/forms/d/e/1FAIpQLSdtBsS_f-cD1wa40BF5TcM4QAKJAA3Li7lw_eM-7i1cggRLDg/viewform?usp=share_link" },
  { title: "ARTICLE 24: Dribbling - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSf8G29OCUsh7Eh2NwHhhPPtHcGDl86x6KTT_J0eWLQB-dKBIw/viewform?usp=share_link" },
  { title: "ARTICLE 24: Dribbling - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSelF-rHtHEHYqfH2GmVvuYTWwGAdzb1X6ZTRXTWYFmsNgsTeg/viewform?usp=share_link" },
  { title: "ARTICLE 25: Travelling - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSeDCa8AZLw5_F8JMD2LnfPIcG3FKPcDzDEcbM9aF-0SwiziaA/viewform?usp=share_link" },
  { title: "ARTICLE 25: Travelling - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLScI5u3UWCbkbLJiGauluIUY7kqAoY18Sg44lZeP764POGz93A/viewform?usp=share_link" },
  { title: "ARTICLE 26 & 27: 3 seconds & Closely guarded player - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSfITMHyJJhfg3RycfqUiwFwNBYs-r3mZ5oKDAxv9EcKx0wpfw/viewform?usp=share_link" },
  { title: "ARTICLE 26 & 27: 3 seconds & Closely guarded player - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSe7MPiTQyCNun4vH5X_OXgMl_SrP-F-rUyFfPINPbY-u06dhw/viewform?usp=share_link" },
  { title: "ARTICLE 28: 8 Seconds - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSdrgp5V57AQJsMe6e8jHANSWJOba9UbzuXPSeyruVwYOG-P4w/viewform?usp=share_link" },
  { title: "ARTICLE 28: 8 Seconds - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSeVcpDPD7Hq6dY61AlFUlyFOauXUV3AewOjIflFUMPL1LuJTA/viewform?usp=share_link" },
  { title: "ARTICLE 29: 24 Seconds - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSdNth_AhwRFIra5ktSGq0TDQjkOLpPZXGl2-mgTozcYcuNqpg/viewform?usp=share_link" },
  { title: "ARTICLE 29: 24 Seconds - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSfuBv5nszWDgq3c3hr_1Goiaj_UWe9zc5xsevfIbqyoLhwqoA/viewform?usp=share_link" },
  { title: "ARTICLE 29: 24 Seconds - Part III", link: "https://docs.google.com/forms/d/e/1FAIpQLSecn0vUDjyhfO1cy3F9JLSn8o0NKYK1Wz7FQJDMjjFzPtHATA/viewform?usp=share_link" },
  { title: "ARTICLE 30: Ball returned to backcourt - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSeuCMwnSdMwdaUzbbajpBPCKqayOp8midRFLT3buZKs_qY0pg/viewform?usp=share_link" },
  { title: "ARTICLE 30: Ball returned to backcourt - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSeRbCe2FJ51oNL114UeLaAOCvAZ232XEEXcasMiIemwVK3Jsw/viewform?usp=share_link" },
  { title: "ARTICLE 31: Goaltending and Interference - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSeSPebhlhr932xM50Rn_ypU3BfBtAvG1LGuQEVVjLUlW2jsTg/viewform?usp=share_link" },
  { title: "ARTICLE 31: Goaltending and Interference - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSd6ixZasCNT_48pjA92KJnffeJeP_Oib0Gi67E06JoVtIgSmg/viewform?usp=share_link" },
  { title: "ARTICLE 32 & 33: Fouls & Contact:General Principles - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSfyCLujXTcc_HcsQ1NrGzZ1Cnl_Jge5_57VCEq7btK7Nc-h4A/viewform?usp=share_link" },
  { title: "ARTICLE 32 & 33: Fouls & Contact:General Principles - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLScTBVCGkZ6dl5lta02ZXPBzVOuh11EiwHcjE_ezUbtCotEF7Q/viewform?usp=share_link" },
  { title: "ARTICLE 32 & 33: Fouls & Contact:General Principles - Part III", link: "https://docs.google.com/forms/d/e/1FAIpQLSfqFU5_iLUDJExOm2nzEdDkm-pxILTTlb-wEk5bGdFE-sfkgA/viewform?usp=share_link" },
  { title: "ARTICLE 34: Personal Foul", link: "https://docs.google.com/forms/d/e/1FAIpQLSeXMWsSvayVyttz8vP62RbcwlMWCaSLEilznNO6jUuJBU7oig/viewform?usp=share_link" },
  { title: "ARTICLE 35: Double Foul", link: "https://docs.google.com/forms/d/e/1FAIpQLSemDRVnoPS7tfqBriaY_J0uam_vflCCUG9-Wz03InreTT9zug/viewform?usp=share_link" },
  { title: "ARTICLE 36: Technical Foul - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLScFN4_3DwAORE2dZhsGVGNRqxBVOd6O6OGjActyDuoCG0QiLQ/viewform?usp=share_link" },
  { title: "ARTICLE 36: Technical Foul - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSe3Rsi1482nfacEVFc4zashaAbxX0OuXQeWE54tmfAK08ZPVQ/viewform?usp=share_link" },
  { title: "ARTICLE 36: Technical Foul - Part III", link: "https://docs.google.com/forms/d/e/1FAIpQLSfQT4ADSDvjnVIF5jSiGs1MK94VWJoPw9u6RN80zRhJd6WbGQ/viewform?usp=share_link" },
  { title: "ARTICLE 37: Unsportsmanlike Foul", link: "https://docs.google.com/forms/d/e/1FAIpQLScKx0G-Wl-lfW71q25RNaKXveS5K--CcMq_dSuYI-lNyVzIDg/viewform?usp=share_link" },
  { title: "ARTICLE 38: Disqualifying Foul", link: "https://docs.google.com/forms/d/e/1FAIpQLSesDl4OGVWUjeWQ8GNCtokJj1VZLi8ZLoAOEzE3PchVIcvGHA/viewform?usp=share_link" },
  { title: "ARTICLE 39: Fighting - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSdN4cv4EUQcJEGZgg-C2dGKB2zr9-6FbZ_BXjRHm1GuWnHSfg/viewform?usp=share_link" },
  { title: "ARTICLE 39: Fighting - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSeJaeZVPCYHXOP4sFwyY6yG366VWH5Oy4np0o8G01gw7M_jXw/viewform?usp=share_link" },
  { title: "ARTICLE 40 & 41: Five fouls by a player & Team Fouls:Penalty", link: "https://docs.google.com/forms/d/e/1FAIpQLScCfWSe9cCNaekJxLlk2ISoe0jIxL2QI4u46HzmBVkuGUlaVg/viewform?usp=share_link" },
  { title: "ARTICLE 42: Special Situations", link: "https://docs.google.com/forms/d/e/1FAIpQLScnmvITuX0ltvDPPx80_XMO5AhQqHLIqp0Skss3at3Gr45zOw/viewform?usp=share_link" },
  { title: "ARTICLE 43: Free Throws", link: "https://docs.google.com/forms/d/e/1FAIpQLSeECOhWMNkMYbB3Q7k75f76br_GWXR4QDjYVWoV-g2rIF4KLA/viewform?usp=share_link" },
  { title: "ARTICLE 44: Correctable Errors - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSenK-ynmURj-GRO_Liil4E1pVhaIaNcz_hFR1AcEYDYO6Qpiw/viewform?usp=share_link" },
  { title: "ARTICLE 44: Correctable Errors - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSc25pUHUHoAvKF7iiDHalvfZdYVlP96oYrCdg1pZukvXdOyYQ/viewform?usp=share_link" },
  { title: "ARTICLE 45: Referees,Table Officials and Commissioner", link: "https://docs.google.com/forms/d/e/1FAIpQLSdIvzJ9X3T1e-xMHp7ISJU_XVZdSvWHhOOG4nDOLZm71oQPTg/viewform?usp=share_link" },
  { title: "ARTICLE 46: Crew Chief: Duties and Powers", link: "https://docs.google.com/forms/d/e/1FAIpQLSfybvbrlwWeuhDRB6qG8Jnfnt8D0u76b2lgTShhV1rjvC_aXw/viewform?usp=share_link" },
  { title: "ARTICLE 47: Referees: Duties and Powers", link: "https://docs.google.com/forms/d/e/1FAIpQLSdlc6LFri8C1uJ96EnJrqUXbe3ucLKPOtKHe4kmUX3oy9VSSw/viewform?usp=share_link" },
  { title: "ARTICLE 48: Scorer and Assistant Scorer: Duties", link: "https://docs.google.com/forms/d/e/1FAIpQLSdRGWywb2ikusPeZxH1rrezFHCq56RU2M4lnAOsQcd-Dg4Yrg/viewform?usp=share_link" },
  { title: "ARTICLE 49: Timer: Duties", link: "https://docs.google.com/forms/d/e/1FAIpQLSf1Z8m46c0eE2UTy6RmuB-LEmsG4MrzMkTrLInVDuvBM5bqxA/viewform?usp=share_link" },
  { title: "ARTICLE 50: Shot Clock Operator: Duties", link: "https://docs.google.com/forms/d/e/1FAIpQLSfWV1Imv1bb9gjFPdAU9RJGGfv6cJKB23_SntYcUl3GvEfPmA/viewform?usp=share_link" },
  { title: "B: The Scoresheet - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLScIXXPSs02g-vp-d6EzDsYlvYwVc2uWpS7q49UAW1kS_vj4Sg/viewform?usp=share_link" },
  { title: "B: The Scoresheet - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLSfiKHyxwDDoUZbgrwVLPv5ZFvGf3k9esZH6D-83uoXUQrD7fQ/viewform?usp=share_link" },
  { title: "C: Protest procedure", link: "https://docs.google.com/forms/d/e/1FAIpQLSfzeDWfjRxuyDcXdAwRc63FLsQGUUvReL2anGMCGaQ8ysqhIg/viewform?usp=share_link" },
  { title: "D: Classification of Teams", link: "https://docs.google.com/forms/d/e/1FAIpQLSf51QfppNJ5_JuzasTXEjny5HvPJJ8CqcRUQ28pVBUHHubgjw/viewform?usp=share_link" },
  { title: "E: Media time-outs", link: "https://docs.google.com/forms/d/e/1FAIpQLSe5kSk2zzNMJ60bwpPpx21VVuSvFAV7Vv8BvC2nz-OwvyKh3A/viewform?usp=share_link" },
  { title: "F: Instant Replay System - Part I", link: "https://docs.google.com/forms/d/e/1FAIpQLSf0MoW2lgch2hRRG0MazEPv3uNiCMAkOiW4jk0LgBL4RCmD9g/viewform?usp=share_link" },
  { title: "F: Instant Replay System - Part II", link: "https://docs.google.com/forms/d/e/1FAIpQLScLnCMw3bJr8TvC-Zpxhr8gPyTOlHC73LSU01MbzBGoHG07ww/viewform?usp=share_link" },
  { title: "F: Instant Replay System - Part III", link: "https://docs.google.com/forms/d/e/1FAIpQLSdJEkjKraSMoiRff9c0sF0GWeaV7KKDbPFB5ft3ftQyDQgSLA/viewform?usp=share_link" },
];

function QuizContent() {
  return (
    <div>
      <VaultBadge label="QUIZ" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {QUIZ_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              borderBottom: `1px solid rgba(0,0,0,0.1)`,
              background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.03)",
              gap: 16,
            }}
          >
            <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: TV.orange, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              {item.title}
            </span>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: TV.orange,
                color: TV.white,
                fontFamily: BARLOW,
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "1.5px",
                border: "none",
                borderRadius: 3,
                padding: "6px 14px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              TAKE QUIZ
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RULEBOOKS DATA & CONTENT ──────────────────────────────────────────────────
type RulebookSubTab = "RULES" | "INTERPRETATIONS" | "TABLE OFFICIALS" | "EQUIPMENT" | "3X3" | "MECHANICS" | "MISCELLANEOUS";
const RULEBOOK_SUBTABS: RulebookSubTab[] = ["RULES", "INTERPRETATIONS", "TABLE OFFICIALS", "EQUIPMENT", "3X3", "MECHANICS", "MISCELLANEOUS"];

const RULEBOOKS_DATA: Record<RulebookSubTab, { title: string; link: string }[]> = {
  "RULES": [
    { title: "1ST OCTOBER 2024 (Version 1.0a)", link: "https://library.fibairef.basketball/images/documents/f667de451e91e3b83f2ab049a34d957b/FIBAOfficialBasketballRules2024_v1_0a.pdf" },
    { title: "1ST SUMMARY OF RULE CHANGES - OCTOBER 2024 (Version 2.0)", link: "https://library.fibairef.basketball/cdn/OBR_Changes2024" },
    { title: "IRS MANUAL - FEBRUARY 2026 (Version 10.0)", link: "https://library.fibairef.basketball/images/documents/d470af399c53551d6676afb311f9f67f/FIBA_IRS_Manual_Feb2026_v10_0_.pdf" },
    { title: "IRS MANUAL - FEBRUARY 2025 (Version 9.0)", link: "https://library.fibairef.basketball/images/documents/c8091f6db2985e2c3d83421c773ed46c/FIBA_IRS_Manual_Feb2025_v9_0__.pdf" },
    { title: "IRS MANUAL - SEPTEMBER 2022 (Version 7.1)", link: "https://drive.google.com/file/d/1BUZ1F-RnuYXyR3tPARqLCOJAsAOUFD81/view" },
    { title: "1ST JULY 2023 (Version 1.2)", link: "https://library.fibairef.basketball/images/documents/fd70f16fd2aa4aea4eb47749ef5503ce/FIBAOfficialBasketballRules2022_v1_2_.pdf" },
    { title: "1ST OCTOBER 2022 (Version 1.1)", link: "https://drive.google.com/file/d/1AyxMPkPYTpr9W_fXL9KqSOqqYS1y0H6X/view?usp=share_link" },
    { title: "1ST OCTOBER 2022 (Version 1.0)", link: "https://drive.google.com/file/d/1SxfqWNg52r_2MEyGpbedq0KarnOhv0kp/view" },
    { title: "SUMMARY OF CHANGES - OCTOBER 2022 (Version 1.0)", link: "https://drive.google.com/file/d/1SxfqWNg52r_2MEyGpbedq0KarnOhv0kp/view" },
    { title: "IRS MANUAL - JUNE 2021 (Version 7.0)", link: "https://drive.google.com/file/d/1hKw9KkymCnifvmLpQWCd3MoBgmFQogQU/view?usp=share_link" },
    { title: "1ST OCTOBER 2020 (Version 1.0a)", link: "https://drive.google.com/file/d/1sZtFDWBX98TFWoJiABze8jecQIRy4C-G/view?usp=sharing" },
    { title: "SUMMARY OF CHANGES - OCTOBER 2020 (Version 3.0)", link: "https://drive.google.com/file/d/1wRIRH4hmivlU9ysEGaGRBfUAWRxUSZEN/view?usp=sharing" },
    { title: "IRS MANUAL - AUGUST 2018 (Version 3.0)", link: "https://drive.google.com/file/d/17ED54TM7NjThobVbPyXko8Cbn3lVX51H/view?usp=sharing" },
    { title: "1ST OCTOBER 2018", link: "https://drive.google.com/file/d/1UpfelQ6kDWoIrvNwxoN8OAzCZF0d81WO/view?usp=sharing" },
    { title: "SUMMARY OF CHANGES (OCTOBER 2018)", link: "https://drive.google.com/file/d/18geZISKCZoNprnVwx90HlpvLrKlTbw8M/view?usp=sharing" },
    { title: "1ST OCTOBER 2017", link: "https://drive.google.com/file/d/1xJIWm83whh6WSOC0CA2gibtSb2_2wKQU/view?usp=sharing" },
    { title: "SUMMARY OF CHANGES (OCTOBER 2017)", link: "https://drive.google.com/file/d/1FBLMLljUl-k3SVVHZy5pi7Bksj5Vu5mG/view?usp=sharing" },
    { title: "SUMMARY OF CHANGES 2014", link: "https://drive.google.com/file/d/1en-vcmeip4oVceF4z7A_LLwaSO1twhrX/view?usp=sharing" },
    { title: "1ST OCTOBER 2014", link: "https://drive.google.com/file/d/17bf0izOZ6xBBIBE-T4Lz_p-El4u9CkR6/view?usp=sharing" },
    { title: "1ST OCTOBER 2012", link: "https://drive.google.com/file/d/1SLhwkrGVDDQ5gYcZX-Fp0yl7OLIl5osC/view?usp=share_link" },
    { title: "1ST OCTOBER 2010", link: "https://drive.google.com/file/d/17lPVbNRA3VWrgOxqqEU9pwxpHJpPbyOM/view?usp=share_link" },
    { title: "1ST OCTOBER 2008", link: "https://drive.google.com/file/d/1DkbBodD8C0em-vU5xdEF3csKoHitLaEq/view?usp=share_link" },
    { title: "1ST OCTOBER 2006", link: "https://drive.google.com/file/d/1rpVlk_3Cv9Sg0GufLoonGDaFD18Ohbad/view?usp=share_link" },
    { title: "1ST SEPTEMBER 2004", link: "https://drive.google.com/file/d/1C8t6DQn39pwYT5YNdOPLTzgrrzlrQWPC/view?usp=share_link" },
    { title: "2005 - MINI BASKETBALL RULES", link: "https://drive.google.com/file/d/18sFsZXVQAu_0Z46LTW-mlv8kUVbAhsjs/view?usp=sharing" },
  ],
  "INTERPRETATIONS": [
    { title: "1ST JULY 2024 (Version 4.1)", link: "https://library.fibairef.basketball/images/documents/e2ca4b954785b6723533f88ad6f32bd4/FIBAOfficialInterpretations2024_v1_0a_yellow_.pdf" },
    { title: "1ST MAY 2024 (Version 4.0)", link: "https://library.fibairef.basketball/images/documents/4b4ad23d90f1cb28191a2e140db47c44/FIBAOfficialInterpretations_v4_1_yellow.pdf" },
    { title: "1ST JUNE 2023 (Version 3.0)", link: "https://library.fibairef.basketball/images/documents/837a7d1198854a20649db671fcf680ba/FIBAOfficialInterpretations_v4_0a_yellow.pdf" },
    { title: "1ST DECEMBER 2022 (Version 2.0a)", link: "https://library.fibairef.basketball/images/documents/15bc6a77541d6bd81c8d886a412fe6c7/FIBAOfficialInterpretations_v3_0a_yellow.pdf" },
    { title: "1ST NOVEMBER 2022 (Version 2.0)", link: "https://drive.google.com/file/d/1bGqUjBjechWfmXPxjwomaL1LGNt8eS3w/view?usp=share_link" },
    { title: "1ST JANUARY 2022 (Version 4.1)", link: "https://drive.google.com/file/d/1RlBWeQpgBrcnrDPmxWGJTWQmsO9AClWc/view?usp=share_link" },
    { title: "1ST JANUARY 2022 (Version 4.0)", link: "https://drive.google.com/file/d/1FTGDA0DQ9Rv7aYOKV1NoFEScSZnxyfmB/view?usp=share_link" },
    { title: "1ST JUNE 2021 (Version 3.0)", link: "https://drive.google.com/file/d/1e9MQW-n1hLmxnmLNEa_adMOWMjcgHZdM/view?usp=sharing" },
    { title: "1ST JANUARY 2021 (Version 2.0)", link: "https://drive.google.com/file/d/15sjQBGSr-nF3kal0OCG6r9FqqDSjw_l_/view?usp=sharing" },
    { title: "1ST OCTOBER 2020 (Version 1.0)", link: "https://drive.google.com/file/d/1Ky0KDufUnMjbAdtxyD17p0af4nk04nL4/view?usp=sharing" },
    { title: "31ST JANUARY 2019 (Version 1.1)", link: "https://drive.google.com/file/d/1MXJHB7UsZCIa7NRzPzJnWM3fpZJQuYar/view?usp=sharing" },
    { title: "1ST OCTOBER 2018 (Version 1.0)", link: "https://drive.google.com/file/d/1hjQczaaQwVfrlwki4aQdq0ZntuDxHMpw/view?usp=sharing" },
    { title: "1ST FEBRUARY 2018 (Version 2.0)", link: "https://drive.google.com/file/d/189bVbNkajJDN3Vf9GBiAr1wxojfF3mn9/view?usp=sharing" },
    { title: "1ST OCTOBER 2017 (Version 1.0)", link: "https://drive.google.com/file/d/1IP6pQJJS8b2P4VBiBdUo-gg5KFuYsTy-/view?usp=sharing" },
    { title: "1ST MARCH 2017", link: "https://drive.google.com/file/d/1B8a4X3PfIJ8pDRMIc7zX0upuFycVY78h/view?usp=sharing" },
    { title: "1ST NOVEMBER 2015", link: "https://drive.google.com/file/d/1X19dSNsWbLoba-ETa-bG-VQiapQIYccD/view?usp=share_link" },
    { title: "1ST FEBRUARY 2015", link: "https://drive.google.com/file/d/122yTu9HhI5T3Ei-ARv3cJ41eg7XuVLS4/view?usp=sharing" },
    { title: "1ST OCTOBER 2012", link: "https://drive.google.com/file/d/1sK4qSq4cQOKLwEhEQiMrSk6J3-noe0Sr/view?usp=share_link" },
    { title: "1ST OCTOBER 2010", link: "https://drive.google.com/file/d/19ogg4tIwENYfQAbOKCBVluoS4zoByBvq/view?usp=share_link" },
    { title: "1ST OCTOBER 2008", link: "https://drive.google.com/file/d/1u_erRO7CBj-Q2AZlir1T0klbp4Szx-QM/view?usp=share_link" },
    { title: "1ST OCTOBER 2006", link: "https://drive.google.com/file/d/1s_p5nTo105davMu71iJ2P84UkwcRD8qi/view?usp=share_link" },
    { title: "1ST OCTOBER 2004", link: "https://drive.google.com/file/d/19UAVbsCOwMXcChU_tiqqXipXjP1A9oGp/view?usp=share_link" },
  ],
  "TABLE OFFICIALS": [
    { title: "FEBRUARY 2024 (Version 6.0a)", link: "https://library.fibairef.basketball/images/documents/5fefccbcf69ff5313552a43e21b3ac32/FIBA_Table_Officials_Manual_v6_0a_2024_en.pdf" },
    { title: "FEBRUARY 2024 (Version 6.0)", link: "https://library.fibairef.basketball/images/documents/c829e9848744ac644c5c63feb45f3115/FIBA_TableOfficialsManual_v6_0_2024_en.pdf" },
    { title: "OCTOBER 2022 (Version 5.0)", link: "https://drive.google.com/file/d/1RQ1yKZctQKmuoDeZ_66z9KlugUE4u4DB/view?usp=share_link" },
    { title: "AUGUST 2021 (Version 4.2)", link: "https://drive.google.com/file/d/1uTWP0nbBb9eYntJSAnojucWmOJqjD2BM/view?usp=share_link" },
    { title: "JUNE 2021 (Version 3.2)", link: "https://drive.google.com/file/d/14gXsuxGILdLA4VqwM0nS_byvdc7Qxr1y/view?usp=share_link" },
    { title: "AUGUST 2020 (Version 3.0)", link: "https://drive.google.com/file/d/1wqyb5wuUzulol_0YiBNpIVgtN2Le5mE1/view?usp=sharing" },
    { title: "MAY 2020 (Version 3.2)", link: "https://drive.google.com/file/d/14gXsuxGILdLA4VqwM0nS_byvdc7Qxr1y/view?usp=sharing" },
    { title: "FEBRUARY 2020 (Version 3.1)", link: "https://drive.google.com/file/d/1UPdkFOnMFfeICaj42A0s_ABMoc9r5kPP/view?usp=sharing" },
    { title: "1ST FEBRUARY 2019 (Version 3.0)", link: "https://drive.google.com/file/d/1ImJrhi2nh2eyH6hExNvIFYeyfaNQ6J4S/view?usp=sharing" },
    { title: "1ST FEBRUARY 2018 (Version 2.0)", link: "https://drive.google.com/file/d/1HzNYxpLKPt87nSdtqibesV5BTzzP5NoR/view?usp=sharing" },
    { title: "1ST JUNE 2017", link: "https://drive.google.com/file/d/1mNPeUM_BhnMnlBlqcHthPblez-uhXbHW/view?usp=share_link" },
    { title: "FIBA TABLE OFFICIALS CERTIFICATION PROGRAMME MANUAL", link: "https://drive.google.com/file/d/1NAdn2dNBpdA9xEKB6YQXkLWDqoqllmDN/view?usp=sharing" },
  ],
  "EQUIPMENT": [
    { title: "1ST OCTOBER 2024", link: "https://library.fibairef.basketball/cdn/OBR2024_Equipment" },
    { title: "1ST OCTOBER 2022", link: "https://library.fibairef.basketball/images/documents/b7ebd90428df0a44c95e6b6e4cf611d7/FIBAOfficialBasketballRules2022_Equipment_v1_0.pdf" },
    { title: "1ST OCTOBER 2020", link: "https://drive.google.com/file/d/1JzmpV0ic5CJfkSiMPh4YQeccK7XPuruf/view?usp=sharing" },
    { title: "1ST OCTOBER 2018", link: "https://drive.google.com/file/d/11zoFwT1VlmXKFML85-U3l6XSzssTX22l/view?usp=sharing" },
    { title: "1ST OCTOBER 2017", link: "https://drive.google.com/file/d/1yEyYenWesL0V7fP0yqh3OnZt6-On3Y0c/view?usp=sharing" },
    { title: "1ST OCTOBER 2014", link: "https://drive.google.com/file/d/1i0CQRx-skR5mTTDMj_rLssQ8bGMQD15Z/view?usp=sharing" },
    { title: "1ST OCTOBER 2012", link: "https://drive.google.com/file/d/1alOqqHjp2ogLoI88hbHZhaGqBxuoRnmf/view?usp=share_link" },
    { title: "1ST OCTOBER 2010", link: "https://drive.google.com/file/d/1wy8bMWRpuqbcicO4ircVOGKmXXklUBwf/view?usp=share_link" },
    { title: "1ST OCTOBER 2008", link: "https://drive.google.com/file/d/1M4USGH2geNSQrUV0bDLthdjgl1wnuRIK/view?usp=share_link" },
    { title: "1ST OCTOBER 2006", link: "https://drive.google.com/file/d/1ajCdygNTNqontqdvNGJSdidaGwvhW9eu/view?usp=share_link" },
    { title: "1ST SEPTEMBER 2004", link: "https://drive.google.com/file/d/1wytI8pb_1hwPdAEhNYRqM0p6gcPQPgvr/view?usp=share_link" },
  ],
  "3X3": [
    { title: "2025 - INTERPRETATIONS", link: "https://drive.google.com/file/d/14Yu00ZRzQB0a6cLiyEPvdPCs9Xx9u7-o/view?usp=drive_link" },
    { title: "2024 - RULES", link: "https://drive.google.com/file/d/1TwfIGIFBksT8gaX-60VzOT_xNidrvGHJ/view?usp=drive_link" },
    { title: "2024 - INTERPRETATIONS", link: "https://drive.google.com/file/d/1Z0aEKlHGodwEzgmMH_A2mP_2_hl3RFcl/view?usp=drive_link" },
    { title: "2023 - INTERPRETATIONS", link: "https://drive.google.com/file/d/1NUL5HwN_8cqIO1meGYeB5OS8E6XRIdYn/view?usp=sharing" },
    { title: "2021 - RULES", link: "https://drive.google.com/file/d/1AmGQqI6xBh4wN1i77PpjKn6YfuLhwwRh/view?usp=sharing" },
    { title: "2020 - INTERPRETATIONS", link: "https://drive.google.com/file/d/1_w79vTjlEQ6yWmowZI1Saejk6ldEj7Jt/view?usp=sharing" },
    { title: "AUGUST 2019 - RULES", link: "https://drive.google.com/file/d/1CwLUZgILBeJnhIUHXSopgWdlgDci-b3c/view?usp=sharing" },
    { title: "2019 - RULES SUMMARY", link: "https://drive.google.com/file/d/1C7YQTb3-mqirYka7XEAtbAneeBg89O54/view?usp=sharing" },
    { title: "2019 - STATISTICIAN'S MANUAL", link: "https://drive.google.com/file/d/1BrG4lnwkt4u_Sw1uP-WjWlzj6z8zAO2o/view?usp=sharing" },
    { title: "2019 - RULES", link: "https://drive.google.com/file/d/1t1CQWpry5tK5rrjGgOs5IaZmtZoB19xi/view?usp=sharing" },
    { title: "2018 - INTERPRETATIONS", link: "https://drive.google.com/file/d/19bT4tQfDncPx-mNxGxirPoavfxS-wsdd/view?usp=sharing" },
    { title: "2017 - INTERPRETATIONS", link: "https://drive.google.com/file/d/1jTGDOktL2dRtVMRfETuQRKNXoo1xNENr/view?usp=sharing" },
    { title: "2016 - RULES", link: "https://drive.google.com/file/d/1j3MpgoTTxb7CMtDJmkHEp8LbS5HZD3Di/view?usp=sharing" },
    { title: "2016 - SCORESHEET", link: "https://drive.google.com/file/d/1IBvbxZ6urzVxVq7Mci0Dh4K9EnSS8M-_/view?usp=sharing" },
  ],
  "MECHANICS": [
    { title: "2024 - 3PO BASIC Version 2.5", link: "https://library.fibairef.basketball/images/documents/cbde37864ccb7e20599fe7a6b63df25f/FIBA_Referee_Manual_Basic_3PO_v2_5_Dec2024_en.pdf" },
    { title: "2024 - INDIVIDUAL OFFICIATING TECHNIQUES Version 2.5", link: "https://library.fibairef.basketball/images/documents/94e19c5823bd011e94ddf74fff3b9ccf/FIBA_Referee_Manual_IOT_v2_5_Dec2024_en.pdf" },
    { title: "2023 - 3PO ADVANCED Version 2.0", link: "https://library.fibairef.basketball/images/documents/f3a38bbb2971eeee81d535bce21bec94/FIBA_Ref_Manual_Advanced_3PO_v2_0_Mar2023_en.pdf" },
    { title: "2023 - BASIC OFFICIATING TERMINOLOGY Version 2.1", link: "https://library.fibairef.basketball/images/documents/9b7fddf61a2dd90f7fca2f1f93fc2456/FIBA_Glossary_v2_1_May2023_en.pdf" },
    { title: "2022 - 3PO BASIC Version 2.0", link: "https://library.fibairef.basketball/images/documents/49c51ffe47ab95788e0bdfcdd1b87863/FIBA_Referee_Manual_Basic3PO_v2_0_Dec2022_en__.pdf" },
    { title: "2022 - INDIVIDUAL OFFICIATING TECHNIQUES Version 2.0", link: "https://drive.google.com/file/d/14NxrCq3mUEpR92_yx7eXuRqFkbtJugx_/view" },
    { title: "2022 - 3PO ADVANCED Version 1.2", link: "https://drive.google.com/file/d/10zLdm8P1R3Pph69SyCpPeALgY2WFo4zX/view?usp=sharing" },
    { title: "2022 - BASIC OFFICIATING TERMINOLOGY Version 2.0", link: "https://drive.google.com/file/d/1UlfSr5trLg8YMWtzaCHFuuuu21ia-FQJ/view?usp=share_link" },
    { title: "2022 - INDIVIDUAL OFFICIATING TECHNIQUES Version 1.2", link: "https://drive.google.com/file/d/1c7twLCEMYC6zCjlAypU_f0Gx4U0gU4Ob/view?usp=sharing" },
    { title: "2020 - BASIC OFFICIATING TERMINOLOGY Version 1.0", link: "https://drive.google.com/file/d/1fOVqBYxMLW5V0UGmUxomYv6uZGNwpBgO/view?usp=sharing" },
    { title: "2020 - 3PO BASIC Version 1.0", link: "https://drive.google.com/file/d/1Q3TWf4Eo9szePGJ-cNzImrSyf0zdDbtO/view?usp=sharing" },
    { title: "2020 - 3PO ADVANCED Version 1.1", link: "https://drive.google.com/file/d/1c8JRF7S_rgd-3kacs6BMb-6t9iXpPrIV/view?usp=sharing" },
    { title: "2020 - IOT", link: "https://drive.google.com/file/d/1CAviRscUWSZAo4J3y5XTN3yauz_4V0Z6/view?usp=sharing" },
    { title: "2020 - 3PO ADVANCED Version 1.0", link: "https://drive.google.com/file/d/1_x_leHBMGmTDFy8t8tP9_49M_JrAfYfD/view?usp=sharing" },
    { title: "2018 - 3PO BASICS", link: "https://drive.google.com/file/d/1joobkKHt84SXYvIQ7f_o41AVCelEh6eM/view?usp=sharing" },
    { title: "2018 - IOT BASICS", link: "https://drive.google.com/file/d/1ISWHcnoG0IqgHbl47-0Y3dCOvQ_GEUKg/view?usp=sharing" },
    { title: "2010 - TWO PERSON OFFICIATING", link: "https://drive.google.com/file/d/1DP5ygKP1JTMvxznrtvay1cRyRX7od6wO/view?usp=sharing" },
    { title: "2010 - THREE PERSON OFFICIATING", link: "https://drive.google.com/file/d/1giftTxhc04iE8oLxs8zyeBiHoTL4jGgP/view?usp=sharing" },
    { title: "2008 - TWO PERSON OFFICIATING", link: "https://drive.google.com/file/d/1YdhAnJnG-SHPmRE8bngi_g4HaeNpe0dc/view?usp=share_link" },
    { title: "2008 - THREE PERSON OFFICIATING", link: "https://drive.google.com/file/d/1_2f38ljr3IAPobhFvYcUb219DP1XfEt9/view?usp=drive_link" },
    { title: "2006 - TWO PERSON OFFICIATING", link: "https://drive.google.com/file/d/1d7w0rcF1FxzTL5K7PCzM1GWc1gLLAIAH/view?usp=share_link" },
    { title: "2006 - THREE PERSON OFFICIATING", link: "https://drive.google.com/file/d/1T8dOSZXK-xULgcqf6gLTbSFfpZqlE4yR/view?usp=share_link" },
  ],
  "MISCELLANEOUS": [
    { title: "FIBA MANUAL FOR COMMISSIONERS - TABLE OFFICIALS WORK - V2.0 (November 2022)", link: "https://drive.google.com/file/d/1ajS5l6p9GZE4Jcy7FgU8Dd08ciBp8jxp/view?usp=share_link" },
    { title: "FIBA UNIFORMS & ACCESSORIES GUIDELINES (January 2021)", link: "https://drive.google.com/file/d/1AiUu73sxDnrF8MzqWKYE5zMBSEEGy8e6/view?usp=sharing" },
    { title: "MINI BASKETBALL SCORESHEET (Valid till 1st October 2022)", link: "https://drive.google.com/file/d/1IbXoMWWRTseTH3ynDtarnHiTsJF8MLTw/view?usp=sharing" },
    { title: "5X5 SCORESHEET (Valid as of 1st October 2020)", link: "https://drive.google.com/file/d/1KoCIO9u-X5ZVqVDJYqkYKbZPmkpNa47I/view?usp=sharing" },
    { title: "FIBA BASIC FITNESS TEST (Version 3.0)", link: "https://drive.google.com/file/d/1B_JECrXS0HuZRHyG62SvzxQLoBi8sAuY/view?usp=sharing" },
    { title: "DIGITAL SCORESHEET USER MANUAL", link: "https://drive.google.com/file/d/1A4ThJZepDiYRONdU5fVOZANNYB6PpwQa/view?usp=sharing" },
    { title: "2018 - FIBA STATISTICIAN'S MANUAL", link: "https://drive.google.com/file/d/1_bE2MAXNivT-PfTPRcrSAoxAgiCh804v/view?usp=sharing" },
    { title: "2016 - FIBA STATISTICIAN'S MANUAL", link: "https://drive.google.com/file/d/1QCBx78AzNZ7unTX_rCcx_rjn7FjU8lgb/view?usp=sharing" },
    { title: "2010 - FIBA COURT DIAGRAM", link: "https://drive.google.com/file/d/1V7Y_UExElUWY34cBbOKRJk7i0tEksczf/view?usp=sharing" },
  ],
};

function RulebooksContent({ isMobile }: { isMobile?: boolean }) {
  const [subTab, setSubTab] = useState<RulebookSubTab>("RULES");
  const items = RULEBOOKS_DATA[subTab] ?? [];

  return (
    <div>
      <VaultBadge label="RULEBOOKS" />

      {/* Subtabs horizontal bar - flex-wrap and responsive minWidth */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          borderBottom: `2px solid ${TV.orange}`,
          marginBottom: 32,
          background: TV.charcoal,
          border: `1px solid ${TV.border}`,
        }}
      >
        {RULEBOOK_SUBTABS.map(tab => {
          const active = tab === subTab;
          return (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              style={{
                flex: "1 1 auto",
                minWidth: isMobile ? 80 : 120,
                padding: isMobile ? "10px 8px" : "12px 14px",
                background: active ? TV.orange : "transparent",
                color: active ? TV.white : TV.inactive,
                fontFamily: BARLOW,
                fontWeight: 700,
                fontSize: isMobile ? 12 : 14,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Item list */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: TV.inactive, fontFamily: BARLOW, fontSize: 16 }}>
            NO RULEBOOKS AVAILABLE IN THIS CATEGORY YET
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 24px",
                borderBottom: `1px solid rgba(0,0,0,0.1)`,
                background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.03)",
                gap: 16,
              }}
            >
              <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: TV.orange, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                {renderWithOrdinals(item.title)}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: TV.orange,
                  color: TV.white,
                  fontFamily: BARLOW,
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: "1.5px",
                  border: "none",
                  borderRadius: 3,
                  padding: "6px 14px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  whiteSpace: "nowrap",
                }}
              >
                📥 DOWNLOAD
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── BOOKS DATA & CONTENT ──────────────────────────────────────────────────────
const BOOKS_ITEMS = [
  { title: "SOCIAL MEDIA GUIDELINES FOR BASKETBALL REFEREES", link: "https://drive.google.com/file/d/1G_euzdWHeB36BRjZguHYudG34x_n3-3c/view?usp=sharing" },
  { title: "FIBA RECRUITMENT, RETENTION AND EDUCATION OF REFEREES", link: "https://drive.google.com/file/d/1NXXaG0yNeFXEnW9InakjqDxK83dLiTI8/view?usp=sharing" },
  { title: "EXERCISES TO KNOW THE BASIC COURT POSITIONS", link: "https://drive.google.com/file/d/1NISeF_hARRCA9doa11ktKT_Hui5MI78u/view?usp=sharing" },
  { title: "COACH - REFEREE RELATIONSHIPS", link: "https://drive.google.com/file/d/1SdK3bRQsaWXcAd6QHvZwlhrfGEzoMRPU/view?usp=sharing" },
  { title: "CHECK-IN CHECK-OUT", link: "https://drive.google.com/file/d/1Ya0KlQjofNHSVJs9gYWC61k-WsyhfjL8/view?usp=sharing" },
  { title: "2019 - REPORTING SWITCHES", link: "https://drive.google.com/file/d/1THHN4HcBbJLhZs7_6BfHeNdkbI1CaKlo/view?usp=sharing" },
  { title: "2018 - FRIP LEVEL 1 REFEREEING", link: "https://drive.google.com/file/d/1S1K8pOm8ry9a9gZgfkFcpITwHgdDTPcE/view?usp=sharing" },
  { title: "2017 - FAKE A FOUL", link: "https://docs.google.com/presentation/d/18TQi6YjnbbL2db8EEMwAznr-9PjUrsUJ/edit?usp=sharing&ouid=106415374042397575591&rtpof=true&sd=true" },
  { title: "2017 - TRAVELLING", link: "https://docs.google.com/presentation/d/1XraTMdNAsP1WkZXIqS4oMhWGucBU33zn/edit?usp=sharing&ouid=106415374042397575591&rtpof=true&sd=true" },
  { title: "2017 - UNSPORTSMANLIKE FOUL", link: "https://docs.google.com/presentation/d/1mVS4GoM8WFJlbMdlsM59JHrHsPxq3nqD/edit?usp=sharing&ouid=106415374042397575591&rtpof=true&sd=true" },
  { title: "2017 - FRIP LEVEL 1 GENERAL", link: "https://drive.google.com/file/d/126zIKcKhh1RFFGigqF_6PoT-WIQmLCr2/view?usp=sharing" },
  { title: "2017 - FRIP LEVEL 1 TEACHING AND LEARNING", link: "https://drive.google.com/file/d/1LuPV9DEALw6rPbAvIiFv9h2DAXgMUjaW/view?usp=sharing" },
  { title: "2017 - FRIP LEVEL 1 BASKETBALL KNOWLEDGE", link: "https://drive.google.com/file/d/1cxOfJGgB4LpwVVaiW3WPF8nwPpV5MgvQ/view?usp=sharing" },
  { title: "2017 - FRIP LEVEL 1 REFEREEING", link: "https://drive.google.com/file/d/1Ye6QMxtefBCeiKNl0LRf52dsf62k_CRk/view?usp=sharing" },
  { title: "2016 - 3PO BASIC PART I", link: "https://drive.google.com/file/d/1cVTdp6meeAZKhemGMPPIRAyR7LxCIwG1/view?usp=sharing" },
  { title: "2016 - 3PO BASIC PART II", link: "https://drive.google.com/file/d/1QS0joI7oZQ6VY8lNuonO2TOwWdiarI1c/view?usp=sharing" },
  { title: "2016 - 3PO BASIC PART III", link: "https://drive.google.com/file/d/1Q7XGtjz3Taf7bzbovKxWUmq6xUMao9qm/view?usp=sharing" },
  { title: "ONE FIBA GLOBAL REFEREEING STRUCTURE - PROMOTING EXCELLENCE", link: "https://drive.google.com/file/d/1KCnu4VWFqJr3HUwpaSQ5SDXbpEqmk6a3/view?usp=sharing" },
  { title: "2015 - PHYSICAL PERFORMANCE AND TRAINING OF BASKETBALL REFEREES", link: "https://drive.google.com/file/d/1W9TdWrTu8eLrmr65v09-8OupyynCfoW9/view?usp=sharing" },
  { title: "2015 - INDIVIDUAL OFFICIATING TECHNIQUES", link: "https://drive.google.com/file/d/10oAf2bPvy1hW93i2EooHI5H2tSpmArJV/view?usp=sharing" },
  { title: "2015 - DEVELOPING A LEARNING ENVIRONMENT", link: "https://drive.google.com/file/d/1FdNrm2UBEpcDOWEPi101lNxmApHIwrDd/view?usp=sharing" },
  { title: "2015 - TUTOR CONTINUOUS PROFESSIONAL DEVELOPMENT", link: "https://drive.google.com/file/d/1q7Yws04S-XXWQUiL1RbSh-elcmOqf1GX/view?usp=sharing" },
  { title: "MANUAL FOR BASKETBALL REFEREES' PHYSICAL TRAINING", link: "https://drive.google.com/file/d/1nyxbgoHk5G1mMZQAljAAJNWL-WzAeAA4/view?usp=sharing" },
  { title: "2015 - 3PO BASIC PART I", link: "https://drive.google.com/file/d/1UgKDXUYxyOZhv7_AofYLfNSS32xVAqRZ/view?usp=sharing" },
  { title: "2015 - 3PO BASIC PART II", link: "https://drive.google.com/file/d/15HVoSokN2T7T0u7XqDJDG2jp_LLADhRY/view?usp=sharing" },
  { title: "2015 - 3PO BASIC PART III", link: "https://drive.google.com/file/d/1027dSbNs5IQAqQzLuUaDCrpFhAjwDiXj/view?usp=sharing" },
  { title: "2015 - 3PO ADVANCED", link: "https://drive.google.com/file/d/1jx8MnoP6ZaT16XCKnB_U310mlllPejnL/view?usp=sharing" },
  { title: "2015 - ERIC FIBA SCOUTING CONCEPT", link: "https://drive.google.com/file/d/1FTzw69S9xX3CfqDkilhTFG7l0-EdjAg-/view?usp=sharing" },
  { title: "2015 - COMMUNICATION PART I", link: "https://drive.google.com/file/d/1wHyx6DdGQSXvmgxbrJZ5neTz1Nb0nfum/view?usp=sharing" },
  { title: "2015 - COMMUNICATION PART II", link: "https://drive.google.com/file/d/1sCthNzDxCu3JpvWIwg1ILiezFfz9G74d/view?usp=sharing" },
  { title: "2015 - STRESS MANAGEMENT PART I", link: "https://drive.google.com/file/d/19dFfeDPbfVkW2w6KCLikNVjfWpg7GiUf/view?usp=sharing" },
  { title: "2015 - STRESS MANAGEMENT PART II", link: "https://drive.google.com/file/d/14qvDN6jGcnbOEs6V4yt9qk-IIZZygjmQ/view?usp=sharing" },
  { title: "2015 - GAME KNOWLEDGE (PICK N ROLL)", link: "https://drive.google.com/file/d/1yAbVaK_PVx9o0jKkyKua-8_Vv4l2dn_F/view?usp=sharing" },
  { title: "2014 - LEAD REFEREE", link: "https://drive.google.com/file/d/18KyrJ5yOfJrNoZg285krWchmvuTNIj28/view?usp=sharing" },
  { title: "2014 - LOW POST PLAY", link: "https://drive.google.com/file/d/10kY6BBdWsTPNVYQQqrD80Lu2DWKRyWnn/view?usp=sharing" },
];

function BooksContent() {
  return (
    <div>
      <VaultBadge label="BOOKS" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {BOOKS_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              borderBottom: `1px solid rgba(0,0,0,0.1)`,
              background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.03)",
              gap: 16,
            }}
          >
            <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 15, color: TV.orange, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              {typeof item === "string" ? item : item.title}
            </span>
            <a
              href={typeof item === "string" ? "PLACEHOLDER_link" : item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: TV.orange,
                color: TV.white,
                fontFamily: BARLOW,
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "1.5px",
                border: "none",
                borderRadius: 3,
                padding: "6px 14px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                whiteSpace: "nowrap",
              }}
            >
              📥 DOWNLOAD
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DOCUMENTARIES CONTENT ────────────────────────────────────────────────────
const DOCUMENTARIES_ITEMS = [
  { link: "https://youtu.be/Wsk_Xmu5FYk", thumbnail: "https://img.youtube.com/vi/Wsk_Xmu5FYk/0.jpg" },
  { link: "https://youtu.be/8j0c1Xb0eFI", thumbnail: "https://img.youtube.com/vi/8j0c1Xb0eFI/0.jpg" },
  { link: "https://youtu.be/qZL69uidwI4", thumbnail: "https://img.youtube.com/vi/qZL69uidwI4/0.jpg" },
  { link: "https://youtu.be/g4ybtESQwOA", thumbnail: "https://img.youtube.com/vi/g4ybtESQwOA/0.jpg" },
  { link: "https://youtu.be/wLT6diLsBp4", thumbnail: "https://img.youtube.com/vi/wLT6diLsBp4/0.jpg" },
  { link: "https://youtu.be/nFK_q4swYNs", thumbnail: "https://img.youtube.com/vi/nFK_q4swYNs/0.jpg" },
  { link: "https://youtu.be/c4JLeILISyk", thumbnail: "https://img.youtube.com/vi/c4JLeILISyk/0.jpg" },
  { link: "https://youtu.be/hyG57KmAsWQ", thumbnail: "https://img.youtube.com/vi/hyG57KmAsWQ/0.jpg" },
  { link: "https://youtu.be/DiTT070LTAg", thumbnail: "https://img.youtube.com/vi/DiTT070LTAg/0.jpg" },
  { link: "https://youtu.be/zcHuzAk7zJA", thumbnail: "https://img.youtube.com/vi/zcHuzAk7zJA/0.jpg" },
  { link: "https://youtu.be/qcXfK6fo7sE", thumbnail: "https://img.youtube.com/vi/qcXfK6fo7sE/0.jpg" },
  { link: "https://youtu.be/oSgj0USo-vM", thumbnail: "https://img.youtube.com/vi/oSgj0USo-vM/0.jpg" },
  { link: "https://youtu.be/lP9rsz6HK2Q", thumbnail: "https://img.youtube.com/vi/lP9rsz6HK2Q/0.jpg" },
  { link: "https://youtu.be/P4nj6i6blU0", thumbnail: "https://img.youtube.com/vi/P4nj6i6blU0/0.jpg" },
  { link: "https://youtu.be/LInxFvY-8CY", thumbnail: "https://img.youtube.com/vi/LInxFvY-8CY/0.jpg" },
  { link: "https://youtu.be/N5ow_krd1G0", thumbnail: "https://img.youtube.com/vi/N5ow_krd1G0/0.jpg" },
  { link: "https://youtu.be/FcJAz30kA9E", thumbnail: "https://img.youtube.com/vi/FcJAz30kA9E/0.jpg" },
  { link: "https://youtu.be/dlhTJ2L4W0w", thumbnail: "https://img.youtube.com/vi/dlhTJ2L4W0w/0.jpg" },
  { link: "https://youtu.be/oIg_517czyU", thumbnail: "https://img.youtube.com/vi/oIg_517czyU/0.jpg" },
  { link: "https://youtu.be/-uswBAVOs7g", thumbnail: "https://img.youtube.com/vi/-uswBAVOs7g/0.jpg" },
  { link: "https://youtu.be/MydkZvBWSo8", thumbnail: "https://img.youtube.com/vi/MydkZvBWSo8/0.jpg" },
  { link: "https://youtu.be/-y2GRN9ozHg", thumbnail: "https://img.youtube.com/vi/-y2GRN9ozHg/0.jpg" },
  { link: "https://youtu.be/Zdlw_oC9yg0", thumbnail: "https://img.youtube.com/vi/Zdlw_oC9yg0/0.jpg" },
  { link: "https://youtu.be/FcSaIpM-wVE", thumbnail: "https://img.youtube.com/vi/FcSaIpM-wVE/0.jpg" },
  { link: "https://youtu.be/OAznxyTFEUs", thumbnail: "https://img.youtube.com/vi/OAznxyTFEUs/0.jpg" },
  { link: "https://youtu.be/gRthIo4XJGA", thumbnail: "https://img.youtube.com/vi/gRthIo4XJGA/0.jpg" },
  { link: "https://youtu.be/EVNQU-7Q3G4", thumbnail: "https://img.youtube.com/vi/EVNQU-7Q3G4/0.jpg" },
  { link: "https://youtu.be/7BiKWBYCcj0", thumbnail: "https://img.youtube.com/vi/7BiKWBYCcj0/0.jpg" },
  { link: "https://youtu.be/2TCjK4jRDfw", thumbnail: "https://img.youtube.com/vi/2TCjK4jRDfw/0.jpg" },
  { link: "https://youtu.be/zVWyPXzSGnE", thumbnail: "https://img.youtube.com/vi/zVWyPXzSGnE/0.jpg" },
  { link: "https://youtu.be/L0ciIFZk5cw", thumbnail: "https://img.youtube.com/vi/L0ciIFZk5cw/0.jpg" },
  { link: "https://youtu.be/XuTU6ek76hU", thumbnail: "https://img.youtube.com/vi/XuTU6ek76hU/0.jpg" },
  { link: "https://youtu.be/sEwNsy-u1hE", thumbnail: "https://img.youtube.com/vi/sEwNsy-u1hE/0.jpg" },
  { link: "https://youtu.be/IsGtgYkGS7w", thumbnail: "https://img.youtube.com/vi/IsGtgYkGS7w/0.jpg" },
  { link: "https://youtu.be/KBDOu0lyfp0", thumbnail: "https://img.youtube.com/vi/KBDOu0lyfp0/0.jpg" },
  { link: "https://youtu.be/8lob_Tvg7LY", thumbnail: "https://img.youtube.com/vi/8lob_Tvg7LY/0.jpg" },
  { link: "https://youtu.be/AKwXf0EQLhU", thumbnail: "https://img.youtube.com/vi/AKwXf0EQLhU/0.jpg" },
  { link: "https://youtu.be/WqmerwsDyP0", thumbnail: "https://img.youtube.com/vi/WqmerwsDyP0/0.jpg" },
  { link: "https://youtu.be/-tnY_x90WQ4", thumbnail: "https://img.youtube.com/vi/-tnY_x90WQ4/0.jpg" },
  { link: "https://youtu.be/UrI-wtErkeg", thumbnail: "https://img.youtube.com/vi/UrI-wtErkeg/0.jpg" },
  { link: "https://youtu.be/ZOKyIupBHMI", thumbnail: "https://img.youtube.com/vi/ZOKyIupBHMI/0.jpg" },
  { link: "https://youtu.be/OcSL88yTk4A", thumbnail: "https://img.youtube.com/vi/OcSL88yTk4A/0.jpg" },
  { link: "https://youtu.be/jUvWXS8v7iw", thumbnail: "https://img.youtube.com/vi/jUvWXS8v7iw/0.jpg" },
  { link: "https://youtu.be/VO5v3-JJwVQ", thumbnail: "https://img.youtube.com/vi/VO5v3-JJwVQ/0.jpg" },
  { link: "https://youtu.be/gOxjNzUzu9k", thumbnail: "https://img.youtube.com/vi/gOxjNzUzu9k/0.jpg" },
  { link: "https://youtu.be/OBYHY3BgYsc", thumbnail: "https://img.youtube.com/vi/OBYHY3BgYsc/0.jpg" },
  { link: "https://youtu.be/_SPId0jKex4", thumbnail: "https://img.youtube.com/vi/_SPId0jKex4/0.jpg" },
  { link: "https://youtu.be/Ig8QvVDvESU", thumbnail: "https://img.youtube.com/vi/Ig8QvVDvESU/0.jpg" },
  { link: "https://youtu.be/-tjC7j7QTyA", thumbnail: "https://img.youtube.com/vi/-tjC7j7QTyA/0.jpg" },
  { link: "https://youtu.be/JKFXoF4Cwl8", thumbnail: "https://img.youtube.com/vi/JKFXoF4Cwl8/0.jpg" },
  { link: "https://youtu.be/B8C6DXRcvjM", thumbnail: "https://img.youtube.com/vi/B8C6DXRcvjM/0.jpg" },
  { link: "https://youtu.be/5De8l8ZNtS4", thumbnail: "https://img.youtube.com/vi/5De8l8ZNtS4/0.jpg" }
];

function DocumentariesContent() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div>
      {activeVideo && <VaultModal url={activeVideo} onClose={() => setActiveVideo(null)} />}
      <VaultBadge label="DOCUMENTARIES" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 16, paddingBottom: 48 }}>
        {DOCUMENTARIES_ITEMS.map((item, i) => {
          const h = useHover();
          return (
            <div
              key={i}
              onMouseEnter={h.onMouseEnter}
              onMouseLeave={h.onMouseLeave}
              onClick={() => item.link && setActiveVideo(item.link)}
              style={{
                aspectRatio: "16 / 10",
                background: TV.charcoal,
                border: h.on ? `2px solid ${TV.orange}` : `1.5px solid ${TV.border}`,
                borderRadius: 4,
                overflow: "hidden",
                cursor: item.link ? "pointer" : "default",
                position: "relative",
                transition: "transform 0.2s, border-color 0.2s",
                transform: h.on ? "scale(1.05)" : "scale(1)",
              }}
            >
              <img
                src={item.thumbnail || `PLACEHOLDER_doc_thumb_${i + 1}.jpg`}
                alt={`Documentary ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent && !parent.querySelector(".doc-placeholder")) {
                    const div = document.createElement("div");
                    div.className = "doc-placeholder";
                    div.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;color:#888888;font-size:24px;";
                    div.innerHTML = "🎬";
                    parent.appendChild(div);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ARTICLES DATA & CONTENT ──────────────────────────────────────────────────
const ARTICLES_ITEMS = [
  { title: "PRASANNA JAYASANAKAR - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/09/prasanna-jayasanakar-hoopistani-indian.html" },
  { title: "SAJJAN SINGH CHEEMA: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/09/sajjan-singh-cheema-hoopistani-indian.html" },
  { title: "PARVEZ IRANI: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/09/parvez-irani-hoopistani-indian.html" },
  { title: "RADHEY SHYAM: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/09/radhey-shyam-hoopistani-indian.html" },
  { title: "SNEHEL BENDKE: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/09/snehel-bendke-hoopistani-indian.html" },
  { title: "INDIAN BASKETBALL PROSPECT KHUSHI DONGRE SIGNED TO ASA COLLEGE-MIAMI OF THE NJCAA", link: "http://hoopistani.blogspot.com/2019/08/indian-basketball-prospect-khushi.html" },
  { title: "OM PRAKASH SR.: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/08/om-prakash-sr-hoopistani-indian.html" },
  { title: "SHAHID QURESHI - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/08/shahid-qureshi-hoopistani-indian.html" },
  { title: "SHIBA MAGGON - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/07/shiba-maggon-hoopistani-indian.html" },
  { title: "ANIL KUMAR PUNJ - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/07/anil-kumar-punj-hoopistani-indian.html" },
  { title: "APARNA GHOSH - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/07/aparna-ghosh-hoopistani-indian.html" },
  { title: "INDIA'S SRISHTI SUREN WILL BE TAKING HER TALENTS TO CANADA TO PLAY FOR THE UNIVERSITY OF WINNIPEG", link: "http://hoopistani.blogspot.com/2019/07/indias-srishti-suren-will-be-taking-her.html" },
  { title: "RAM KUMAR: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/06/ram-kumar-hoopistani-indian-basketball.html" },
  { title: "MANMOHAN SINGH: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/06/manmohan-singh-hoopistani-indian.html" },
  { title: "PRASHANTI SINGH: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/06/prashanti-singh-hoopistani-indian.html" },
  { title: "HARI DUTT KAPRI: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/06/hari-dutt-kapri-hoopistani-indian.html" },
  { title: "INDIA'S JUNIOR GUARD VAISHNAVI YADAV COMMITS TO PENSACOLA STATE COLLEGE OF NJCAA DIVISION 1", link: "http://hoopistani.blogspot.com/2019/05/indias-junior-guard-vaishnavi-yadav.html" },
  { title: "GURDIAL SINGH: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/05/gurdial-singh-hoopistani-indian.html" },
  { title: "SUMAN SHARMA: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/05/suman-sharma-hoopistani-indian.html" },
  { title: "KHUSHI RAM: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/05/khushi-ram-hoopistani-indian-basketball.html" },
  { title: "RAJESH PATEL: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/05/rajesh-patel-hoopistani-indian.html" },
  { title: "SANKARAN SUBRAMANIAN - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/04/sankaran-subramanian-hoopistani-indian.html" },
  { title: "GEETHU ANNA RAHUL - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/04/geethu-anna-rahul-hoopistani-indian.html" },
  { title: "SARBJIT SINGH - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/04/sarbjit-singh-hoopistani-indian.html" },
  { title: "ABBAS MOONTASIR: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/04/abbas-moontasir-hoopistani-indian.html" },
  { title: "PRESENTING... THE HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/04/presenting-hoopistani-indian-basketball.html" },
  { title: "VETERAN COACH VESELIN MATIC NAMED HEAD COACH OF INDIA'S MEN'S BASKETBALL TEAM", link: "http://hoopistani.blogspot.com/2019/03/veteran-coach-veselin-matic-named-head.html" },
  { title: "PRASHANTI SINGH BECOMES THE FIRST BASKETBALL PLAYER TO RECEIVE THE PRESTIGIOUS PADMA SHRI AWARD", link: "http://hoopistani.blogspot.com/2019/01/prashanti-singh-becomes-first.html" },
  { title: "INDIA'S BASKETBALL CAPTAIN JEENA SKARIA SIGNS WITH RINGWOOD HAWKS OF AUSTRALIA'S \"BIG V\" LEAGUE", link: "http://hoopistani.blogspot.com/2019/01/indias-basketball-captain-jeena-skaria.html" },
  { title: "SANJANA RAMESH JOINS NORTHERN ARIZONA UNIVERSITY TO BECOME ONLY THE SECOND INDIAN WOMAN IN NCAA D1 BASKETBALL", link: "http://hoopistani.blogspot.com/2018/11/sanjana-ramesh-joins-northern-arizona.html" },
  { title: "KHELO INDIA SELECTS 40 YOUNG BASKETBALL PLAYERS FOR TALENT DEVELOPMENT SCHOLARSHIP", link: "http://hoopistani.blogspot.com/2018/07/khelo-india-selects-40-young-basketball.html" },
  { title: "3BL TEAM DELHI HOOPERS TO REPRESENT INDIA AT FIBA 3X3 WORLD TOUR MASTERS IN JAPAN", link: "http://hoopistani.blogspot.com/2018/07/3bl-team-delhi-hoopers-to-represent.html" },
  { title: "INDIAN PROSPECTS PRINCEPAL SINGH, AMAAN SANDHU, AND AASHAY VERMA ATTENDED NBA GLOBAL CAMP IN ITALY", link: "http://hoopistani.blogspot.com/2018/06/indian-prospects-princepal-singh-amaan.html" },
  { title: "AMJYOT SINGH AND JEENA SCARIA HONOURED AT #TOISA2018 BASKETBALL AWARDS", link: "http://hoopistani.blogspot.com/2018/03/amjyot-singh-and-jeena-scaria-honoured.html" },
  { title: "8 WINNERS OF ACG-NBA JUMP PROGRAMME SET TO JOIN NBA ACADEMY INDIA", link: "http://hoopistani.blogspot.com/2018/05/nba-chooses-8-acg-jump-programme.html" },
  { title: "BFI PLANS A 3X3 BASKETBALL INDIA TOUR; BANS 3X3 PLAYERS OF OPPOSING LEAGUE IN 5X5 EVENTS AND VICE VERSA", link: "http://hoopistani.blogspot.com/2018/05/bfi-plans-3x3-basketball-india-tour.html" },
  { title: "NBA, FIBA, AND THE BFI TO HOST SECOND-EVER BASKETBALL WITHOUT BORDERS ASIA CAMP IN INDIA", link: "http://hoopistani.blogspot.com/2018/05/nba-fiba-and-bfi-to-host-second-ever.html" },
  { title: "RAJESH PATEL, THE MOST-DECORATED BASKETBALL COACH IN INDIA, PASSES AWAY AT 62", link: "http://hoopistani.blogspot.com/2018/05/rajesh-patel-most-decorated-basketball.html" },
  { title: "3BL - FIRST-EVER INDIAN PRO 3X3 BASKETBALL LEAGUE TO BEGIN IN JUNE", link: "http://hoopistani.blogspot.com/2018/04/3bl-first-ever-indian-pro-3x3.html" },
  { title: "HOUSE OF HOOPS: HOW FIVE SISTERS FROM VARANASI MADE INDIAN BASKETBALL A FAMILY BUSINESS", link: "http://hoopistani.blogspot.com/2018/04/house-of-hoops-how-five-sisters-from.html" },
  { title: "NATIONAL KHELO INDIA SCHOOL GAMES (KISG) -- INCLUDING BASKETBALL -- TO BEGIN IN NEW DELHI ON WEDNESDAY", link: "http://hoopistani.blogspot.com/2018/01/national-khelo-india-school-games-kisg.html" },
  { title: "UNIVERSITY OF CALICUT COMPLETE THREE-PEAT AT 2018 ALL INDIA INTER UNIVERSITY WOMEN'S BASKETBALL CHAMPIONSHIP IN CHENNAI", link: "http://hoopistani.blogspot.com/2018/01/university-of-calicut-complete-three.html" },
  { title: "BASKETBALL FEDERATION OF INDIA PRESIDENT K. GOVINDRAJ APPOINTED AS MEMBER OF FIBA COMPETITIONS COMMISSION", link: "http://hoopistani.blogspot.com/2017/12/basketball-federation-of-india.html" },
  { title: "BASKETBALL FEDERATION OF INDIA K. GOVINDRAJ ELECTED AS INDIAN OLYMPIC ASSOCIATION'S VICE PRESIDENT", link: "http://hoopistani.blogspot.com/2017/12/basketball-federation-of-india-k.html" },
  { title: "INDIAN BASKETBALL STRUGGLES TO RISE IN FIBA RANKINGS IN 2017", link: "http://hoopistani.blogspot.com/2017/12/indian-basketball-struggles-to-rise-in.html" },
  { title: "NBA AND DREAM11 LAUNCH DAILY FANTASY BASKETBALL GAME IN INDIA", link: "http://hoopistani.blogspot.com/2017/11/nba-and-dream11-launch-daily-fantasy.html" },
  { title: "ZORAN VISIC ASSIGNED AS COACH OF INDIA'S MEN'S BASKETBALL TEAM FOR FIBA WORLD CUP QUALIFIERS - PROBABLES AND SCHEDULE", link: "http://hoopistani.blogspot.com/2017/11/zoran-visic-assigned-as-coach-of-indias.html" },
  { title: "12 BASKETBALL STARS FROM UBA LEAGUE IN INDIA HEAD TO USA FOR 3RD ANNUAL PRO CAMP", link: "http://hoopistani.blogspot.com/2017/11/12-basketball-stars-from-uba-league-in.html" },
  { title: "SHORT OF NBA OPPORTUNITIES, BASKETBALL TRAIL-BLAZER SATNAM SINGH RETURNS TO INDIA", link: "http://hoopistani.blogspot.com/2017/10/short-of-nba-opportunities-basketball.html" },
  { title: "INDIA'S AMJYOT SINGH AND INDIAN-AMERICAN GOKUL NATESAN BOTH SELECTED LATE IN 2017 NBA G-LEAGUE DRAFT", link: "http://hoopistani.blogspot.com/2017/10/indias-amjyot-singh-and-indian-american.html" },
  { title: "LT. COL. MAKKOLATH RAJAN, LEGENDARY FORMER INDIAN BASKETBALL COACH, PASSES AWAY AT 83", link: "http://hoopistani.blogspot.com/2017/10/lt-col-makkolath-rajan-legendary-former.html" },
  { title: "PRASHANTI SINGH JOINS THE VERY SHORT LIST OF WOMEN'S BASKETBALL PLAYERS WITH AN ARJUNA AWARD", link: "http://hoopistani.blogspot.com/2017/09/prashanti-singh-joins-very-short-list.html" },
  { title: "THE SUBRAMANIAN SCHOOL OF PUNJABI BASKETBALL EXCELLENCE: AN UPDATE", link: "http://hoopistani.blogspot.com/2017/09/the-subramanian-school-of-punjabi.html" },
  { title: "INDIAN BASKETBALL ROLE MODELS SATNAM SINGH AND TJ SAHI TOLD THE YOUTH THERE IS NO HOPE IN THE COUNTRY. WERE THEY WRONG?", link: "http://hoopistani.blogspot.com/2017/09/indian-basketball-role-models-satnam.html" },
  { title: "PRASHANTI SINGH RECEIVES THE PRESTIGIOUS ARJUNA AWARD FOR BASKETBALL", link: "http://hoopistani.blogspot.com/2017/08/prashanti-singh-receives-prestigious.html" },
  { title: "INDIAN BASKETBALL STAR AMRITPAL SINGH HAS BEEN SIGNED BY NBL'S SYDNEY KINGS", link: "http://hoopistani.blogspot.com/2017/08/indian-basketball-star-amritpal-singh.html" },
  { title: "INDIAN BASKETBALL LEGENDS UNITE TO LAUNCH BASKETBALL INDIA PLAYERS ASSOCIATION; ANNOUNCE NATIONWIDE INTER-SCHOOL LEAGUE", link: "http://hoopistani.blogspot.com/2017/07/indian-basketball-legends-unite-to.html" },
  { title: "VISHESH BHRIGUVANSHI BECOMES FIRST INDIAN SIGNED TO AUSTRALIAN BASKETBALL LEAGUE NBL", link: "http://hoopistani.blogspot.com/2017/07/vishesh-bhriguvanshi-becomes-first.html" },
  { title: "IOA FINALLY GRANTS AFFILIATION TO THE \"NEW\" BASKETBALL FEDERATION OF INDIA", link: "http://hoopistani.blogspot.com/2017/07/ioa-finally-grants-affiliation-to-new.html" },
  { title: "SPORTS MINISTRY GRANTS RECOGNITION FOR BASKETBALL AMONG INDIA'S NATIONAL SPORTS FEDERATIONS", link: "http://hoopistani.blogspot.com/2017/07/sports-ministry-grants-recognition-for.html" },
  { title: "INDIA NEEDS TO MAKE HOME SUPPORT COUNT FOR THE FIBA ASIA WOMEN'S CUP 2017", link: "http://hoopistani.blogspot.com/2017/07/india-needs-to-make-home-support-count.html" },
  { title: "BASKETBALL AND 'HALF GIRLFRIEND': AN UNNECESSARILY IN-DEPTH ANALYSIS", link: "http://hoopistani.blogspot.com/2017/06/basketball-and-half-girlfriend.html" },
  { title: "SERBIAN ZORAN VISIC APPOINTED HEAD COACH OF INDIA'S WOMEN'S BASKETBALL TEAM", link: "http://hoopistani.blogspot.com/2017/06/serbian-zoran-visic-appointed-head.html" },
  { title: "INDIAN STAR KAVITA AKULA GETS FULL COLLEGE SCHOLARSHIP TO PLAY D1 BASKETBALL FOR GRAND CANYON UNIVERSITY", link: "http://hoopistani.blogspot.com/2017/05/indian-star-kavita-akula-gets-full-d1.html" },
  { title: "INDIA COULD BE A BIG BENEFICIARY OF 3x3 BASKETBALL IN THE OLYMPICS", link: "http://hoopistani.blogspot.com/2017/06/india-could-be-big-beneficiary-of-33.html" },
  { title: "THE COMPANY OF GIANTS", link: "http://hoopistani.blogspot.com/2017/05/the-company-of-giants.html" },
  { title: "BASKETBALL WITHOUT BARRIERS — FIBA TO FINALLY ALLOW HEADGEAR LIKE TURBAN AND HIJAB IN THE INTERNATIONAL GAME", link: "http://hoopistani.blogspot.com/2017/05/hoopistani-basketball-without-barriers.html" },
  { title: "FOUR INDIAN BASKETBALL SUPERSTARS INVITED TO AUSTRALIAN NBL DRAFT COMBINE IN MELBOURNE", link: "http://hoopistani.blogspot.com/2017/04/four-indian-basketball-superstars.html" },
  { title: "DIARY ALLEGEDLY BELONGING TO BFI PRESIDENT K GOVINDRAJ DETAILS PAYOFFS OF HUNDREDS OF CRORES", link: "http://hoopistani.blogspot.com/2017/02/diary-allegedly-belonging-to-bfi.html" },
  { title: "TWO INDIAN YOUNGSTERS IN NBA ALL STAR WEEKEND'S BASKETBALL WITHOUT BORDERS GLOBAL CAMP ROSTERS", link: "http://hoopistani.blogspot.com/2017/02/two-indian-youngsters-in-nba-all-star.html" },
  { title: "FIBA BOARD RECOMMENDS CHANGE IN \"NO HEADGEAR\" POLICY WHICH AFFECTED INDIAN BASKETBALL PLAYERS", link: "http://hoopistani.blogspot.com/2017/02/fiba-board-recommends-change-in-no.html" },
  { title: "INDIA INTERNATIONALS AMRITPAL SINGH, YADWINDER SINGH, AND AMJYOT SINGH TO PLAY IN MIZORAM SUPER LEAGUE THIS SEASON", link: "http://hoopistani.blogspot.com/2017/02/india-internationals-amritpal-singh-and.html" },
  { title: "INDIAN BASKETBALL'S SINGH SISTERS HONOURED WITH RANI LAKSHMI BAI AWARD IN LUCKNOW", link: "http://hoopistani.blogspot.com/2016/12/indian-basketballs-singh-sisters.html" },
  { title: "BILLION TO ONE", link: "http://hoopistani.blogspot.com/2016/12/billion-to-one.html" },
  { title: "PAATHSHALA ON THE COURT", link: "http://hoopistani.blogspot.com/2016/12/paathshala-on-court.html" },
  { title: "LET HER PLAY", link: "http://hoopistani.blogspot.com/2016/10/let-her-play.html" },
  { title: "SATNAM SINGH DOCUMENTARY SERIES \"#THEGRIND\" TO BE LAUNCHED BY BALL DON'T STOP TODAY", link: "http://hoopistani.blogspot.com/2016/08/satnam-singh-documentary-series.html" },
  { title: "INDIAN BASKETBALL PLAYER PALPREET SINGH (22) DRAFTED TO THE NBA D-LEAGUE BY THE LONG ISLAND NETS", link: "http://hoopistani.blogspot.com/2016/10/indian-basketball-player-palpreet-singh.html" },
  { title: "INDIA INTERNATIONALS VISHESH BHRIGUVANSHI AND RIKIN PETHANI ARE PLAYING PROFESSIONAL BASKETBALL IN MALDIVES", link: "http://hoopistani.blogspot.com/2016/09/india-internationals-vishesh.html" },
  { title: "OLYMPIC DREAMS", link: "http://hoopistani.blogspot.com/2016/07/olympic-dreams.html" },
  { title: "FIVE DECADES OF KERALA BASKETBALL VETERANS COME TOGETHER FOR REBOUND 2016 IN KOCHI", link: "http://hoopistani.blogspot.com/2016/07/five-decades-of-kerala-basketball.html" },
  { title: "INDIAN OFFICIAL NARESH ANEJA NOMINATED BY FIBA FOR RIO OLYMPICS BASKETBALL EVENT", link: "http://hoopistani.blogspot.com/2016/07/indian-official-naresh-aneja-nominated.html" },
  { title: "VASU KULKARNI, INDIA-RAISED SOFTWARE ENTREPRENEUR BRINGING A CHANGE TO BASKETBALL ANALYTICS", link: "" },
  { title: "DANAPAL VEERASAMY PONNIAH SUCCESSFULLY QUALIFIES TO BECOME INDIA'S 3RD FIBA COMMISSIONER", link: "" },
  { title: "TJ SAHI: 'AIR INDIA' STILL TAKING FLIGHT", link: "http://hoopistani.blogspot.com/2011/05/tj-sahi-air-india-still-taking-flight.html" },
  { title: "VIDEO: TJ SAHI DUNKS OVER A MUMBAI TAXI", link: "http://hoopistani.blogspot.com/2011/04/video-tj-sahi-dunks-over-mumbai-taxi.html" },
  { title: "JAYASANKAR MENON: A HOOPS ODYSSEY", link: "http://hoopistani.blogspot.com/2011/03/jayasankar-menon-hoops-odyssey.html" },
  { title: "AKANKSHA SINGH: SMALL WONDER", link: "http://hoopistani.blogspot.com/2011/03/akanksha-singh-small-wonder.html" },
  { title: "YADWINDER SINGH: INDIAN BASKETBALL'S ENERGY BAR", link: "http://hoopistani.blogspot.com/2011/02/yadwinder-singh-indian-basketballs.html" },
  { title: "SOZHASINGARAYER ROBINSON — THE FORGOTTEN GOAT OF INDIAN BASKETBALL", link: "https://thebridge.in/basketball/sozhasingarayer-robinson-the-forgotten-goat-indian-basketball/" },
  { title: "TO HELL AND BACK FOR CAGER ROBINSON", link: "https://mumbaimirror.indiatimes.com/sport/others/to-hell-and-back-for-cager-robinson/articleshow/15902869.cms" },
  { title: "SOZHASINGARAYER ROBINSON - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/07/sozhasingarayer-robinson-hoopistani.html" },
  { title: "A CV SUNNY TAKE ON INDIAN BASKETBALL", link: "http://ekalavyas.com/2015/04/20/cv-sunny-indian-basketball/" },
  { title: "CV SUNNY - FORMER INDIA NATIONAL CAPTAIN - LAUNCHES BASKETBALL ACADEMY IN CHENNAI", link: "http://hoopistani.blogspot.com/2015/04/cv-sunny-former-india-national-captain.html" },
  { title: "PRASANNA KUMARI AND JAYASANKAR MENON: INDIAN BASKETBALL'S FIRST COUPLE", link: "https://www.sidbreakball.com/prasanna-kumari-and-jayasankar-menon-indian-basketballs-first-couple/" },
  { title: "JAYASANKAR MENON: HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/05/jayasankar-menon-hoopistani-indian.html" },
  { title: "HANUMAN SINGH RATHORE - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/07/hanuman-singh-rathore-hoopistani-indian.html" },
  { title: "AJMER SINGH CHOPRA - HOOPISTANI INDIAN BASKETBALL HALL OF FAME", link: "http://hoopistani.blogspot.com/2019/04/ajmer-singh-chopra-hoopistani-indian.html" },
  { title: "TRIDEEP RAI: A DISCOURSE IN DISILLUSION", link: "http://hoopistani.blogspot.com/2009/12/trideep-rai-discourse-in-disillusion.html" },
  { title: "VISHESH BHRIGUVANSHI: STRIVING FOR SUCCESS", link: "http://hoopistani.blogspot.com/2010/12/vishesh-bhriguvanshi-striving-for.html" },
  { title: "FIBA 3X3: A BOON OR A CURSE FOR HOOPS?", link: "http://hoopistani.blogspot.com/2010/12/fiba-33-boon-or-curse-for-hoops.html" },
  { title: "FARCEKETBALL - INDIAN BASKETBALL'S ROTTEN CORE", link: "http://hoopistani.blogspot.com/2010/02/farceketball-indian-basketballs-rotten.html" },
  { title: "HOW TO SUPPRESS YOUR SUPERSTARS - 101", link: "http://hoopistani.blogspot.com/2010/02/how-to-suppress-your-superstars-101.html" },
  { title: "BFI: IT WASN'T ME", link: "http://hoopistani.blogspot.com/2010/02/bfi-it-wasnt-me_16.html" },
  { title: "DIVYA SINGH: GOOD GIRL GONE BASKETBALL", link: "http://hoopistani.blogspot.com/2010/01/divya-singh-good-girl-gone-basketball.html" },
  { title: "BASKETBALL AT GUNPOINT: THE HARSH REALITIES OF CORRUPTION IN INDIAN BASKETBALL", link: "http://hoopistani.blogspot.com/2010/03/basketball-at-gunpoint-harsh-realities.html" },
  { title: "INDIAN BASKETBALL: THE CORPORATE TAKEOVER", link: "http://hoopistani.blogspot.com/2010/05/indian-basketball-corporate-takeover.html" },
  { title: "MASTAN LEAGUE: INDIA'S FIRST PROFESSIONAL BASKETBALL LEAGUE", link: "http://hoopistani.blogspot.com/2010/05/mastan-league-indias-first-professional.html" },
  { title: "ATANU BANERJEE - THE FIRST INDIAN REFEREE TO OFFICIATE THE FINAL OF A WORLD CHAMPIONSHIP", link: "http://hoopistani.blogspot.com/2010/07/atanu-banerjee-first-indian-referee-to.html" },
  { title: "ADDICTED TO THE GAME: VISHESH BHRIGUVANSHI", link: "http://hoopistani.blogspot.com/2010/08/addicted-to-game-vishesh-bhriguvanshi.html" },
  { title: "SATNAM SINGH: LARGER THAN LIFE", link: "http://hoopistani.blogspot.com/2010/08/satnam-singh-larger-than-life.html" },
  { title: "AFTER OFFICIATING THE ASIAN GAMES FINAL, REFEREE RAMESH DURAIRAJU SETS HIS SIGHTS ON THE OLYMPICS", link: "http://hoopistani.blogspot.com/2010/11/after-officiating-asian-games-final.html" },
  { title: "INDIA'S FIRST BASKETBALL MOVIE TO STAR PRASHANTI AND AKANKSHA SINGH", link: "http://hoopistani.blogspot.com/2010/11/indias-first-basketball-movie-to-star.html" },
  { title: "ANITHA P. WON'T BACK DOWN", link: "http://hoopistani.blogspot.com/2010/11/anitha-p-wont-back-down.html" },
  { title: "17 INDIAN REFEREES CURRENTLY HOLD THE FIBA LICENSE", link: "http://hoopistani.blogspot.com/2011/01/17-indian-referees-currently-hold-fiba.html" },
  { title: "INDIAN WOMEN'S BASKETBALL: DREAM TEAM", link: "http://hoopistani.blogspot.com/2011/01/indian-womens-basketball-dream-team.html" },
  { title: "INDIAN MEN'S BASKETBALL: DREAM TEAM", link: "http://hoopistani.blogspot.com/2011/01/indian-mens-basketball-dream-team.html" },
  { title: "GIANT EXPECTATIONS: SATNAM SINGH BHAMARA", link: "http://hoopistani.blogspot.com/2011/01/giant-expectations-satnam-singh-bhamara.html" },
  { title: "ARJUN SINGH: POINT PERFECT", link: "http://hoopistani.blogspot.com/2011/01/arjun-singh-point-perfect.html" },
  { title: "FIBA RULES LEANING THE NBA WAY", link: "http://hoopistani.blogspot.com/2011/01/fiba-rules-leaning-nba-way.html" },
  { title: "GEETHU ANNA JOSE - \"EVERY TIME I ENTER THE COURT, I WANT TO PLAY THE BEST GAME OF MY LIFE\"", link: "http://hoopistani.blogspot.com/2011/01/geethu-anna-jose-every-time-i-enter.html" },
  { title: "FEDERATION-LEAGUE BASKETBALL DRAMA: BFI WON'T ALLOW UBA PARTICIPANTS TO REPRESENT INDIA IN NATIONAL / INTERNATIONAL TEAMS", link: "http://hoopistani.blogspot.com/2016/07/federation-league-basketball-drama-bfi.html" },
  { title: "BASKETBALL TAKES PUNJABI YOUNGSTER PRINCE PAL SINGH FROM HUMBLE BEGINNINGS TO A $75,000 SCHOLARSHIP TO TRAIN IN USA", link: "http://hoopistani.blogspot.com/2016/06/basketball-takes-punjabi-youngster.html" },
  { title: "JEPPIAAR INSTITUTE OF TECHNOLOGY (CHENNAI) TO SEND BASKETBALL CONTINGENT TO USA FOR IMG ACADEMY CAMP", link: "http://hoopistani.blogspot.com/2016/06/jeppiaar-institute-of-technology.html" },
  { title: "DRIBBLE ACADEMY HELPS VILLAGE GIRL EARN SCHOLARSHIP IN NOIDA'S SHIV NADAR SCHOOL THROUGH BASKETBALL", link: "http://hoopistani.blogspot.com/2016/05/dribble-academy-helps-village-girl-earn.html" },
  { title: "SUPREME COURTS: GANGYI – BASKETBALL NIRVANA IN DHARAMSHALA", link: "http://hoopistani.blogspot.com/2016/04/supreme-courts-gangyi-basketball.html" },
  { title: "GOVERNMENT OF INDIA DOESN'T RECOGNIZE BASKETBALL AMONG NATIONAL SPORTS FEDERATIONS FOR 2016", link: "http://hoopistani.blogspot.com/2016/04/government-of-india-doesnt-recognize.html" },
  { title: "21-YEAR-OLD PALPREET SINGH BRAR WINS INDIA'S ACG-NBA JUMP PROGRAMME TO SECURE A NBA D-LEAGUE TRYOUT", link: "http://hoopistani.blogspot.com/2016/02/21-year-old-palpreet-singh-brar-wins.html" },
  { title: "BFI-IOA SPAT: FIBA DE-RECOGNIZES BASKETBALL AT SOUTH ASIAN GAMES, TELLS TEAMS NOT TO PARTICIPATE", link: "http://hoopistani.blogspot.com/2016/02/bfi-ioa-spat-fiba-de-recognizes.html" },
  { title: "INDIA'S COMBINED FIBA RANKING DROPS TO 52 AT THE END OF 2015", link: "http://hoopistani.blogspot.com/2016/01/indias-combined-fiba-ranking-drops-to.html" },
  { title: "RANBIR CHOPRA - INDEPENDENT INDIA'S FIRST BASKETBALL CAPTAIN - PASSES AWAY", link: "http://hoopistani.blogspot.com/2016/01/ranbir-chopra-independent-indias-first.html" },
  { title: "BUDDING UP BASKETBALL PLAYER COMMITS SUICIDE AFTER SUFFERING HARASSMENT", link: "http://hoopistani.blogspot.com/2015/12/budding-up-basketball-player-commits.html" },
  { title: "SUPREME COURTS: NO SLEEP IN NAGPADA", link: "http://hoopistani.blogspot.com/2015/12/supreme-courts-no-sleep-in-nagpada.html" },
  { title: "INDIAN BASKETBALL FAMILY RAISES RS. 2.75 LAKHS FOR PLAYER SANDEEP SINGH'S BRAIN TUMOUR SURGERY", link: "http://hoopistani.blogspot.com/2015/12/indian-basketball-family-raises-rs-275.html" },
  { title: "BASKETBALL FEDERATION OF INDIA PLEDGES FINANCIAL SUPPORT TO THE FAMILY OF SATNAM SINGH, FIRST INDIAN DRAFTED TO THE NBA", link: "http://hoopistani.blogspot.com/2015/10/basketball-federation-of-india-pledges.html" },
  { title: "AMJYOT'S ASCENT", link: "http://hoopistani.blogspot.com/2015/11/amjyots-ascent.html" },
  { title: "SATNAM SINGH AND INDIA FEATURED IN NBA'S NEW AD CAMPAIGN!", link: "http://hoopistani.blogspot.com/2015/10/satnam-singh-and-india-featured-in-nbas.html" },
  { title: "FIBA URGES INDIAN SPORTS MINISTRY TO GRANT IMMEDIATE RECOGNITION OF BFI TO TEAM GOVINDRAJ", link: "http://hoopistani.blogspot.com/2015/10/fiba-urges-indian-sports-ministry-to.html" },
  { title: "KING SINGH", link: "http://hoopistani.blogspot.com/2015/09/king-singh.html" },
  { title: "AFTER GEETHU", link: "http://hoopistani.blogspot.com/2015/09/after-geethu_9.html" },
  { title: "GOVINDRAJ FACTION SENDS LETTER STATING THEIR CLAIM TO THE BASKETBALL FEDERATION OF INDIA (BFI)", link: "http://hoopistani.blogspot.com/2015/09/govindraj-faction-sends-letter-stating_1.html" },
  { title: "BASKETBALL FEDERATION OF INDIA TO IMPLEMENT INSTANT REPLAY SYSTEM", link: "http://hoopistani.blogspot.com/2015/08/basketball-federation-of-india-to.html" },
  { title: "MILESTONES IN INDIAN BASKETBALL", link: "http://hoopistani.blogspot.com/2015/08/milestones-in-indian-basketball-2015.html" },
  { title: "INDIAN BASKETBALL LEGEND - THE LATE KHUSHI RAM - IMMORTALIZED WITH STATUE IN HARYANA VILLAGE", link: "http://hoopistani.blogspot.com/2015/08/indian-basketball-legend-late-khushi.html" },
  { title: "SIX INDIAN COACHES CHOSEN FOR BASKETBALL WITHOUT BORDERS PROGRAMME IN SOUTH AFRICA", link: "http://hoopistani.blogspot.com/2015/07/six-indian-coaches-to-be-coached-at.html" },
  { title: "BIG DREAMS: THE DAY THAT INDIAN BASKETBALL, THE NBA, AND SATNAM SINGH BHAMARA CHANGED FOREVER", link: "http://hoopistani.blogspot.com/2015/07/big-dreams-day-that-indian-basketball.html" },
  { title: "UBA LAUNCHES TWO-WEEK PROFESSIONAL BASKETBALL LEAGUE IN INDIA", link: "http://hoopistani.blogspot.com/2015/07/uba-launches-two-week-professional.html" },
  { title: "NEW BASKETBALL FEDERATION OF INDIA, NEW WEBSITE", link: "http://hoopistani.blogspot.com/2015/07/new-basketball-federation-of-india-new.html" },
  { title: "COMPETING SIDES OF BASKETBALL FEDERATION OF INDIA SET FOR A SHOWDOWN WITH INDIAN OLYMPIC ASSOCIATION IN NEW DELHI", link: "http://hoopistani.blogspot.com/2015/07/competing-sides-of-basketball.html" },
  { title: "FORMER INDIAN FOOTBALL LEGEND IM VIJAYAN NOW COLLECTING BASKETBALL MEDALS", link: "http://hoopistani.blogspot.com/2015/07/former-indian-football-legend-im.html" },
  { title: "THE GREAT DEFLATE: SPORTS MINISTRY PUTS ALL OFFICIAL BASKETBALL EVENTS IN INDIA ON HOLD AFTER BFI FIASCO", link: "http://hoopistani.blogspot.com/2015/06/the-great-deflate-sports-ministry-holds.html" },
  { title: "HEADLESS AND COACH-LESS IN THE EYE OF THE STORM", link: "http://hoopistani.blogspot.com/2015/06/headless-and-coach-less-in-eye-of-storm.html" },
  { title: "INDIAN BASKETBALL PLAYER'S ASSOCIATION (IBPA) OFFICIALLY KICK-STARTED IN NEW DELHI", link: "http://hoopistani.blogspot.com/2015/06/indian-basketball-players-association.html" },
  { title: "INDIA'S AMJYOT SINGH AND AMRIT PAL SINGH HEAD OUT TO JAPAN TO PLAY IN PROFESSIONAL BASKETBALL SUMMER LEAGUE", link: "http://hoopistani.blogspot.com/2015/06/indias-big-man-basketball-duo-head-out.html" },
  { title: "FIBA RECOGNIZES 'TEAM GOVINDRAJ' TO LEAD BFI. WILL INDIAN BASKETBALL FIASCO CLEAR UP?", link: "http://hoopistani.blogspot.com/2015/05/fiba-recognizes-team-govindraj-to-lead.html" },
  { title: "DOCUMENTARY ON INDIAN BASKETBALL STAR PRASHANTI SINGH SHORTLISTED FOR NATIONAL STUDENT FILM AWARD", link: "http://hoopistani.blogspot.com/2015/05/documentary-on-indian-basketball-star.html" },
  { title: "SLUMDOG CHAMPION: BASKETBALL IS TRANSFORMING THE LIFE OF A GIRL FROM KARNATAKA'S SLUMS", link: "http://hoopistani.blogspot.com/2015/05/slumdog-champion-basketball-is.html" },
  { title: "LOST OPPORTUNITIES HAVE LIMITED THE POTENTIAL OF MANY INDIAN STAR BASKETBALL PLAYERS", link: "http://hoopistani.blogspot.com/2015/02/lost-opportunities-have-limited.html" },
  { title: "INDIAN RAILWAYS BASKETBALL COACH APARNA GHOSH GIVEN LIFETIME ACHIEVEMENT AWARD BY CALCUTTA SPORTS JOURNALIST CLUB", link: "http://hoopistani.blogspot.com/2015/04/indian-railways-basketball-coach-aparna.html" },
  { title: "HUNDREDS JOIN 'INDIAN BASKETBALL COACHES NETWORK' BY TEAM INDIA HEAD COACH SCOTT FLEMMING", link: "http://hoopistani.blogspot.com/2015/01/hundreds-join-indian-basketball.html" },
  { title: "POONAM MAHAJAN BECOMES THE FIRST WOMAN PRESIDENT OF MAHARASHTRA STATE BASKETBALL ASSOCIATION", link: "http://hoopistani.blogspot.com/2015/01/poonam-mahajan-becomes-first-woman.html" },
  { title: "FOR INDIA, 3X3 BASKETBALL SHOULD BE PART OF THE JOURNEY – NOT THE DESTINATION", link: "http://hoopistani.blogspot.com/2014/12/for-india-3x3-basketball-should-be-part.html" },
  { title: "DECEMBER 28TH NAMED 'INDIAN BASKETBALL DAY' IN HONOUR OF HARISH SHARMA", link: "http://hoopistani.blogspot.com/2014/12/december-28th-named-indian-basketball.html" },
  { title: "FIBA/BFI COACHING CERTIFICATION COURSES IN FIVE MORE INDIAN CITIES THIS MONTH", link: "http://hoopistani.blogspot.com/2014/11/fibabfi-coaching-certification-courses.html" },
  { title: "FIBA ASIA TO CONDUCT CLINIC FOR BASKETBALL REFEREES & COMMISSIONERS IN NEW DELHI IN DECEMBER", link: "http://hoopistani.blogspot.com/2014/10/fiba-asia-to-conduct-clinic-for.html" },
  { title: "TEAM INDIA COACH SCOTT FLEMMING IS BRINGING INDIVIDUAL PLAYER BASKETBALL DEVELOPMENT VIDEOS", link: "http://hoopistani.blogspot.com/2014/10/team-india-coach-scott-flemming-is.html" },
  { title: "A QUICK CHAT WITH SIM BHULLAR: CHANGING THE PERCEPTION OF INDIAN ATHLETES", link: "http://hoopistani.blogspot.com/2014/10/a-quick-chat-with-sim-bhullar-changing.html" },
  { title: "THE AGE OLD QUESTION", link: "http://hoopistani.blogspot.com/2014/09/the-age-old-question.html" },
  { title: "INDIAN BASKETBALL LEAGUES, FINANCIAL CHALLENGES, AND THE NBA DREAM: A COMPREHENSIVE Q&A WITH BFI CEO ROOPAM SHARMA", link: "http://hoopistani.blogspot.com/2014/09/indian-basketball-leagues-financial.html" },
  { title: "AFTER NUMEROUS VOICES OF PROTEST, FIBA (TENTATIVELY) RELAXES HEADGEAR RULE FOR INTERNATIONAL BASKETBALL", link: "http://hoopistani.blogspot.com/2014/09/after-numerous-voices-of-protest-fiba.html" },
  { title: "PUNJAB'S JUNIOR BASKETBALL PLAYER GAGANDEEP KAUR FELICITATED WITH THE UNUSUAL TITLE \"PLAYER OF INDIA\"", link: "http://hoopistani.blogspot.com/2014/09/punjabs-junior-basketball-player.html" },
  { title: "FIBA DELAYS DECISION ON HEADGEAR BAN; SIKH COMMUNITY REACTS", link: "http://hoopistani.blogspot.com/2014/09/fiba-delays-decision-on-headgear-ban.html" },
  { title: "BFI & FIBA BRING BACK BASKETBALL COACHING CERTIFICATION COURSES FOR INDIAN COACHES", link: "http://hoopistani.blogspot.com/2014/08/bfi-fiba-bring-back-fiba-basketball.html" },
  { title: "RETURN OF THE FIBA/HEADGEAR CONTROVERSY: INDIA'S ANMOL SINGH FORCED TO REMOVE TURBAN AT U18 FIBA ABC", link: "http://hoopistani.blogspot.com/2014/08/return-of-fibaheadgear-controversy.html" },
  { title: "GEETHU ANNA JOSE OFFICIALLY RECEIVES ARJUNA AWARD AT RASHTRAPATI BHAVAN", link: "http://hoopistani.blogspot.com/2014/08/geethu-anna-jose-officially-receives.html" },
  { title: "FIBA TO REVIEW BASKETBALL HEADGEAR RULE FOLLOWING PRESSURE FROM BFI, #LETSIKHSPLAY, & MORE", link: "http://hoopistani.blogspot.com/2014/07/fiba-to-review-basketball-headgear-rule.html" },
  { title: "DON'T CALL IT A COMEBACK: PRATHAM SINGH RETURNED FROM INJURY TO BECOME ONE OF INDIA'S HEROES AT WUHAN", link: "http://hoopistani.blogspot.com/2014/07/wonder-of-wuhan-india-should-build-on.html" },
  { title: "INDIAN REFS ALSO CALLING THE SHOTS AT FIBA ASIA CUP", link: "http://hoopistani.blogspot.com/2014/07/indian-refs-also-calling-shots-at-fiba.html" },
  { title: "WONDER OF WUHAN: INDIA SHOULD BUILD ON HISTORIC WIN OVER CHINA TO SPARK A BASKETBALL REVOLUTION", link: "http://hoopistani.blogspot.com/2014/07/talent-found-amrit-pal-singhs.html" },
  { title: "TALENT FOUND: AMRIT PAL SINGH'S ASTONISHING STORY FROM FARMER TO INDIAN BASKETBALL STAR", link: "http://hoopistani.blogspot.com/2014/07/talent-found-amrit-pal-singhs.html" },
  { title: "THREE INDIAN PLAYERS AT BASKETBALL WITHOUT BORDERS ASIA CAMP IN TAIPEI", link: "http://hoopistani.blogspot.com/2014/06/three-indian-players-at-basketball.html" },
  { title: "INDIAN TEENAGER ASHIKA KURUVILLA CONTINUES TO IMPROVE HER BASKETBALL TALENTS IN NEW YORK", link: "http://hoopistani.blogspot.com/2014/05/indian-teenager-ashika-kuruvilla.html" },
  { title: "JUST GO OUT AND PLAY: TO GET SERIOUS ABOUT BASKETBALL IN INDIA, WE HAVE TO FIRST GET CASUAL", link: "http://hoopistani.blogspot.com/2014/04/just-go-out-and-play-to-get-serious.html" },
  { title: "POONAM CHATURVEDI - INDIA'S NATIONAL CHAMPION WITH CHHATTISGARH - HAS BRAIN TUMOUR", link: "http://hoopistani.blogspot.com/2014/03/poonam-chaturvedi-indias-national.html" },
  { title: "FORMER INDIA BASKETBALL PLAYER K SURYANARAYANA RAJA PASSES AWAY", link: "http://hoopistani.blogspot.com/2014/03/former-india-basketball-player-k.html" },
  { title: "'VALLINAM', THE TAMIL MOVIE ON BASKETBALL, IS HERE!", link: "http://hoopistani.blogspot.com/2014/03/vallinam-tamil-movie-on-basketball-is.html" },
  { title: "HOMECOMING: INDERBIR GILL BRINGS HIS BASKETBALL KNOWLEDGE BACK TO INDIA", link: "http://hoopistani.blogspot.com/2014/01/homecoming-inderbir-gill-brings-his.html" },
  { title: "SHOT OF THE CENTURY: HOW RAY ALLEN CHANGED NBA HISTORY", link: "http://hoopistani.blogspot.com/2013/08/shot-of-century-how-ray-allen-changed.html" },
  { title: "INDIA'S SNEHAL BENDKE BECOMES ONE OF TWO FIRST WOMEN REFEREES TO OFFICIATE AT MEN'S FIBA ASIA CHAMPIONSHIP", link: "http://hoopistani.blogspot.com/2013/07/indias-snehal-bendke-becomes-one-of-two.html" },
  { title: "DR. S. SUBRAMANIAN – ONE OF INDIA'S GREATEST-EVER BASKETBALL COACHES – PASSES AWAY", link: "http://hoopistani.blogspot.com/2013/05/dr-s-subramanian-one-of-indias-greatest.html" },
  { title: "SIM BHULLAR: A SMALL STEP FOR A GIANT; A GIANT STEP FOR INDIAN BASKETBALL", link: "https://www.sportskeeda.com/basketball/sim-bhullar-giant-step-for-indian-basketball" },
  { title: "INDIA'S BIG BASKETBALL HOPE SATNAM SINGH BHAMARA: ONE STEP CLOSER", link: "http://hoopistani.blogspot.com/2013/02/indias-big-basketball-hope-satnam-singh.html" },
  { title: "SUICIDE DRILL: A BASKETBALL PLAYER'S DEATH REMINDS US OF THE PLIGHT OF INDIAN ATHLETES", link: "http://hoopistani.blogspot.com/2013/03/suicide-drill-basketball-players-death.html" },
  { title: "THE ELEPHANT, THE DRAGON, & THE BASKETBALL", link: "http://hoopistani.blogspot.com/2012/09/the-elephant-dragon-basketball.html" },
  { title: "'VALLINAM': NEW TAMIL MOVIE, BASED ON BASKETBALL, TO BE RELEASED SOON", link: "http://hoopistani.blogspot.com/2013/01/new-tamil-movie-vallinam-to-focus-on.html" },
  { title: "SWAMI SRI DUNKACHARYAS: A BRIEF GLIMPSE AT NBA PLAYERS PRACTICING YOGA", link: "https://www.sportskeeda.com/basketball/swami-sri-dunkacharyas-a-brief-glimpse-at-nba-players-practicing-yoga" },
  { title: "IN JEENA PS, A NEW LEADER EMERGERS FOR THE FUTURE OF INDIAN BASKETBALL", link: "https://www.sportskeeda.com/basketball/in-jeena-ps-a-new-leader-emerges-for-the-future-of-indian-basketball" },
  { title: "SUMMER OF '80: INDIAN BASKETBALL AT THE OLYMPICS", link: "https://www.sportskeeda.com/basketball/summer-of-80-indian-basketball-at-the-olympics" },
  { title: "PASHA BAINS: THE DRIVE FOR SUCCESS", link: "http://hoopistani.blogspot.com/2012/05/pasha-bains-drive-for-success.html" },
  { title: "HARISH SHARMA (1958-2012): INDIAN BASKETBALL'S VISIONARY LEADER PASSES AWAY", link: "http://hoopistani.blogspot.com/2012/02/harish-sharma-1958-2012-indian.html" },
  { title: "THE HEART, THE MIND, AND THE ALL STAR VOTE", link: "http://hoopistani.blogspot.com/2012/01/heart-mind-and-all-star-vote.html" },
  { title: "AJAY PRATAP SINGH: THE FUTURE IS HERE, NOW", link: "http://hoopistani.blogspot.com/2011/12/ajay-pratap-singh-future-is-here-now.html" },
  { title: "VISHESH BHRIGUVANSHI & YADWINDER SINGH BARRED FROM PLAYING IN SENIOR NATIONALS", link: "http://hoopistani.blogspot.com/2011/12/vishesh-bhrighuvanshi-yadwinder-singh.html" },
  { title: "HAREESH KOROTH: UNEXPECTED RISE; UNFINISHED BUSINESS", link: "http://hoopistani.blogspot.com/2011/09/hareesh-koroth-unexpected-rise.html" },
  { title: "NAWABASKETBALL? LUCKNOW HAS ITS OWN SPECIAL LIAISON WITH HOOPS", link: "http://hoopistani.blogspot.com/2011/09/nawabketball-lucknow-has-its-own.html" },
  { title: "START DRIBBLING KIDS; INDIA NEEDS A POINT GUARD", link: "http://hoopistani.blogspot.com/2011/09/start-dribbling-kids-india-needs-point.html" },
  { title: "BARKHA SONKAR: NO FEAR", link: "http://hoopistani.blogspot.com/2011/07/barkha-sonkar-no-fear.html" },
  { title: "KERALA BASKETBALL: SOUTHERN SUPREMACY", link: "http://hoopistani.blogspot.com/2011/07/kerala-basketball-southern-supremacy.html" },
  { title: "ZAK PENWELL: INDIAN BASKETBALL'S NEW WORKOUT PLAN", link: "http://hoopistani.blogspot.com/2011/06/zak-penwell-indian-basketballs-new.html" },
  { title: "PETE GAUDET – Q&A: THE HOOPS SCIENTIST", link: "http://hoopistani.blogspot.com/2011/06/pete-gaudet-q-hoops-scientist.html" },
  { title: "BIG: A EULOGY TO SHAQ'S NBA CAREER", link: "http://hoopistani.blogspot.com/2011/06/big-eulogy-to-shaqs-nba-career.html" },
  { title: "IMG BASKETBALL'S BOBBY SHARMA: \"THE FUTURE OF INDIAN BASKETBALL IS VERY, VERY BRIGHT\"", link: "http://hoopistani.blogspot.com/2011/05/img-basketballs-bobby-sharma-future-of.html" },
  { title: "POONAM CHATURVEDI: THE NEXT NEXT BIG THING", link: "http://hoopistani.blogspot.com/2011/05/poonam-chaturvedi-next-next-big-thing.html" },
  { title: "FROM PLAYER TO COACH, MANISHA DANGE LOOKS TO COMPLETE THE HOOPS CYCLE", link: "http://hoopistani.blogspot.com/2011/05/from-player-to-coach-manisha-dange.html" },
];

function ArticlesContent() {
  return (
    <div>
      <VaultBadge label="ARTICLES" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {ARTICLES_ITEMS.map((item, i) => {
          const title = typeof item === "string" ? item : item.title;
          const link = typeof item === "string" ? "PLACEHOLDER_link" : item.link;
          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: TV.orange,
                color: TV.white,
                fontFamily: BARLOW,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: "0.8px",
                padding: "8px 16px",
                borderRadius: 20,
                textDecoration: "none",
                textTransform: "uppercase",
                display: "inline-block",
                textAlign: "center",
                transition: "transform 0.15s, background 0.15s",
              }}
            >
              {title}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── TOOLS DATA & CONTENT ─────────────────────────────────────────────────────
function ToolsContent() {
  const toolsData = [
    {
      title: "TOURNAMENT BRACKET GENERATOR",
      version: "1.0",
      appLink: "https://www.refereevision.com/bracket_1.0.xlsm",
      manualLink: "http://www.refereevision.com/TOURNAMENT BRACKET GENERATOR_Manual_V1.0.pdf",
      appAvailable: true,
      manualAvailable: true,
    },
    {
      title: "CLASSIFICATION CALCULATOR",
      version: "4.0",
      appLink: "https://www.refereevision.com/Classification_Calc_V4.0.xlsm",
      manualLink: "http://www.refereevision.com/TEAM CLASSIFICATION CALCULATOR_Manual_V4.0.pdf",
      appAvailable: true,
      manualAvailable: true,
    },
    {
      title: "FIBA DSS",
      version: "1.1.0.6",
      appLink: "https://bit.ly/FIBADSS",
      manualLink: "https://sway.cloud.microsoft/Qd0iXwiQCV9h6fT8?ref=Link",
      appAvailable: true,
      manualAvailable: true,
      extraText: (
        <div style={{ marginTop: 12, fontSize: 13, color: TV.inactive, fontFamily: BARLOW, lineHeight: 1.5 }}>
          A username and password provided through your national federation is required for downloading game data and rosters before a game.<br />
          For training purposes the following login can be used:<br />
          <span style={{ color: TV.orange, fontWeight: 700 }}>User: dsstraining2022</span> &nbsp; <span style={{ color: TV.orange, fontWeight: 700 }}>Password: dss2022</span>
        </div>
      ),
    },
    {
      title: "DIGITAL SCORESHEET",
      version: "1.0",
      appLink: "PLACEHOLDER_app_link",
      manualLink: "PLACEHOLDER_manual_link",
      appAvailable: false,
      manualAvailable: false,
    },
  ];

  return (
    <div>
      <VaultBadge label="TOOLS" />
      <div style={{ textAlign: "center", marginBottom: 28, fontFamily: BARLOW, fontSize: 14, color: TV.orange, fontWeight: 600 }}>
        Do not run the application on Google Spreadsheet as Macros are not supported.<br />
        Download the Excel using File-&gt;Download option on Spreadsheet and run the application on Microsoft Excel.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 650, margin: "0 auto" }}>
        {toolsData.map((tool, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <VaultBadge label={tool.title} />
            <div style={{ width: "100%", border: `1.5px solid ${TV.orange}`, borderRadius: 4, overflow: "hidden", background: TV.charcoal }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1.5px solid ${TV.orange}`, padding: "10px 0", textAlign: "center", fontFamily: BARLOW, fontWeight: 800, fontSize: 15, color: TV.orange, letterSpacing: "1px" }}>
                <div>VERSION</div>
                <div>APPLICATION</div>
                <div>MANUAL</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "14px 0", alignItems: "center", textAlign: "center", fontFamily: BARLOW, fontWeight: 700, fontSize: 14, color: TV.white }}>
                <div>{tool.version}</div>
                <div>
                  {tool.appAvailable ? (
                    <a href={tool.appLink} target="_blank" rel="noopener noreferrer" style={{ background: TV.orange, color: TV.white, padding: "6px 14px", borderRadius: 3, textDecoration: "none", fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      📥 DOWNLOAD
                    </a>
                  ) : (
                    <span style={{ color: TV.inactive }}>Coming Soon....</span>
                  )}
                </div>
                <div>
                  {tool.manualAvailable ? (
                    <a href={tool.manualLink} target="_blank" rel="noopener noreferrer" style={{ background: TV.orange, color: TV.white, padding: "6px 14px", borderRadius: 3, textDecoration: "none", fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      📥 DOWNLOAD
                    </a>
                  ) : (
                    <span style={{ color: TV.inactive }}>Coming Soon.....</span>
                  )}
                </div>
              </div>
            </div>
            {tool.extraText}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Placeholder tab ──────────────────────────────────────────────────────────
function PlaceholderContent({ tab }: { tab: VaultTab }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, gap: 14 }}>
      <span style={{ fontSize: 40 }}>🔒</span>
      <span style={{ fontFamily: BARLOW, fontWeight: 700, fontSize: 20, color: TV.inactive, letterSpacing: "2px", textTransform: "uppercase" }}>
        {tab} — Coming Soon
      </span>
    </div>
  );
}

// ─── Main Vault page ──────────────────────────────────────────────────────────
export default function Vault() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<VaultTab>(() => {
    if (tabParam && VAULT_TABS.includes(tabParam as VaultTab)) {
      return tabParam as VaultTab;
    }
    return "ASSIST MAGAZINE";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    if (tabParam && VAULT_TABS.includes(tabParam as VaultTab)) {
      setActiveTab(tabParam as VaultTab);
    }
  }, [tabParam]);

  const isMobile = width < 640;
  const isTablet = width < 1024;

  const handleTabSelect = (tab: VaultTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [activeTab]);

  useEffect(() => {
    if (!isMobile && sidebarOpen) setSidebarOpen(false);
  }, [isMobile, sidebarOpen]);

  const drawerContent = isMobile && (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
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
          background: TV.charcoal,
          borderRight: `1px solid ${TV.border}`,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.7)" : "none",
        }}
      >
        <div
          style={{
            padding: "28px 20px 16px",
            borderBottom: `1px solid ${TV.border}`,
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
              color: TV.orange,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            VAULT
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: TV.inactive,
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
              padding: 4,
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div style={{ paddingTop: 0 }}>
          {VAULT_TABS.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => {
                  handleTabSelect(tab);
                  setSidebarOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 20px",
                  background: active ? TV.orange : "transparent",
                  color: active ? TV.white : TV.inactive,
                  fontFamily: BARLOW,
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  border: "none",
                  borderLeft: active ? `4px solid ${TV.white}` : "4px solid transparent",
                  cursor: "pointer",
                  transition: "background 0.12s, color 0.12s",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Mobile top bar */}
      {isMobile && (
        <div
          style={{
            background: TV.charcoal,
            borderBottom: `1px solid ${TV.border}`,
            borderTop: `3px solid ${TV.orange}`,
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
              color: TV.orange,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            VAULT
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: BARLOW,
                fontSize: 13,
                color: TV.inactive,
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
                border: `1px solid ${TV.border}`,
                color: TV.white,
                cursor: "pointer",
                padding: "6px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                borderRadius: 2,
              }}
              aria-label="Open menu"
            >
              <span style={{ display: "block", width: 18, height: 2, background: TV.orange }} />
              <span style={{ display: "block", width: 18, height: 2, background: TV.orange }} />
              <span style={{ display: "block", width: 18, height: 2, background: TV.orange }} />
            </button>
          </div>
        </div>
      )}

      {/* Render mobile drawer via portal */}
      {isMobile && typeof document !== "undefined" && createPortal(drawerContent, document.body)}

      {/* Body with Desktop Sidebar + Main Content */}
      <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
        {!isMobile && (
          <aside
            style={{
              width: 200,
              background: TV.charcoal,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              borderRight: `1px solid ${TV.border}`,
              position: "sticky",
              top: 52,
              height: "calc(100vh - 52px)",
              alignSelf: "flex-start",
              overflowY: "auto",
            }}
          >
            <div style={{ padding: "40px 28px 16px", borderBottom: `1px solid ${TV.border}` }}>
              <span
                style={{
                  fontFamily: BARLOW,
                  fontWeight: 800,
                  fontSize: 28,
                  color: TV.orange,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                VAULT
              </span>
            </div>
            {VAULT_TABS.map((tab) => {
              const active = tab === activeTab;
              let bg = "transparent";
              let color = TV.inactive;
              let borderLeft = "4px solid transparent";
              if (active) {
                bg = TV.orange;
                color = TV.white;
                borderLeft = `4px solid ${TV.white}`;
              }
              return (
                <button
                  key={tab}
                  onClick={() => handleTabSelect(tab)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 28px",
                    background: bg,
                    color,
                    fontFamily: BARLOW,
                    fontWeight: 600,
                    fontSize: 15,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    border: "none",
                    borderLeft,
                    borderRadius: 0,
                    cursor: "pointer",
                    transition: "background 0.12s, color 0.12s",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </aside>
        )}

        {/* Content */}
        <main
          style={{
            flex: 1,
            padding: isMobile ? "24px 16px" : isTablet ? "28px 32px" : "36px 44px",
            overflowY: "auto",
            background: "var(--off-white)",
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >
          {activeTab === "ASSIST MAGAZINE" && <AssistMagazineContent isMobile={isMobile} isTablet={isTablet} />}
          {activeTab === "MIC'D UP" && <MicDUpContent />}
          {activeTab === "TOUGH CALLS" && <ToughCallsContent />}
          {activeTab === "QUIZ" && <QuizContent />}
          {activeTab === "RULEBOOKS" && <RulebooksContent isMobile={isMobile} />}
          {activeTab === "BOOKS" && <BooksContent />}
          {activeTab === "DOCUMENTARIES" && <DocumentariesContent />}
          {activeTab === "ARTICLES" && <ArticlesContent />}
          {activeTab === "TOOLS" && <ToolsContent />}
        </main>
      </div>
    </div>
  );
}
