import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
  popup?: boolean;
};

const WEBINAR_DATA: Record<Tab, WebinarItem[]> = {
  RULES: [
    { title: "RULE CHANGES 2024", presenter: "Mike Thomson", action: "watch", link: "https://library.fibairef.basketball/images/documents/4d81a1fc754e37efc5ef54f12f0fdeee/Rec_2024_Rules_Changes.mp4", popup: true },
    { title: "RULE CHANGES 2022", presenter: "Mike Thomson", action: "watch", link: "http://library.fibairef.basketball/images/documents/0d6c5660a964de7951b08de8a6fec868/FIBA_RULE_CHANGES_2022_MS_v2.mp4", popup: true },
    { title: "RULE CHANGES 2020", presenter: "Mike Thomson", action: "watch", link: "https://youtu.be/FlNM0oq_72k", popup: true },
    { title: "RULE CHANGES 2020", presenter: "Roberto Chiari", action: "watch", link: "https://youtu.be/5-aF1joAiVE", popup: true },
    { title: "RULE CHANGES 2020", presenter: "Roberto Chiari", action: "watch", link: "https://www.youtube.com/watch?v=iSyNA30oPhs", popup: true },
    { title: "TRAVELLING", presenter: "Roberto Chiari", action: "watch", link: "https://youtu.be/kxxz30JJYb8", popup: true },
    { title: "HANDLING SPECIAL SITUATIONS", presenter: "Michael Weiland", action: "watch", link: "https://youtu.be/5WlNxlEbANA", popup: true },
    { title: "THE LAST 2 MINUTES", presenter: "George Postalian", action: "watch", link: "https://youtu.be/8Tu3UBL2K4g", popup: true },
  ],
  FOULS: [
    { title: "UNSPORTSMANLIKE FOUL", presenter: "Sretan Radovic", action: "watch", link: "https://youtu.be/smCQXRLQpfs", popup: true },
    { title: "HOW TO CALL CONTACT", presenter: "Chris Delaney", action: "watch", link: "https://youtu.be/YSJM_eMDnj8", popup: true },
    { title: "FAKE A FOUL", presenter: "Roberto Chiari", action: "watch", link: "https://youtu.be/sdR4_m5KBB4", popup: true },
  ],
  "GAME MANAGEMENT": [
    { title: "COMMUNICATION", presenter: "Jilly Harris", action: "watch", link: "https://youtu.be/d5K62c8Su2s", popup: true },
    { title: "CONFLICT RESOLUTION", presenter: "Albert Joseph", action: "watch", link: "https://youtu.be/08U9dpnArPg", popup: true },
    { title: "GAME MANAGEMENT", presenter: "Roberto Chiari", action: "watch", link: "https://youtu.be/kq4QTobtDIY", popup: true },
    { title: "MANAGING AND DEALING WITH COACHES", presenter: "Oggie Sokolovic", action: "watch", link: "https://youtu.be/2LxvhqLw8bU", popup: true },
    { title: "MANAGING COACHES AND PLAYERS", presenter: "Clifton Grant", action: "watch", link: "https://youtu.be/7k0tetmxWS8", popup: true },
  ],
  "3X3": [
    { title: "3X3 RULES AND INTERPRETATIONS", presenter: "Vanessa Devlin", action: "watch", link: "https://youtu.be/OrhQFDNPR_A", popup: true },
    { title: "3X3 FOUL SELECTION & PHYSICALITY", presenter: "Vanessa Devlin", action: "watch", link: "https://youtu.be/Ppt2D1Wchb0", popup: true },
    { title: "3X3 MECHANICS", presenter: "Vanessa Devlin", action: "watch", link: "https://youtu.be/_ed3_F7dv5A", popup: true },
  ],
  "TABLE OFFICIALS": [
    { title: "HOW TO USE A SCORESHEET", presenter: "Michelle Nicholas", action: "watch", link: "https://youtu.be/cIsh7-EbwMU", popup: true },
    { title: "SCORESHEET (TF, DQF & FIGHTING SITUATIONS)", presenter: "Bernard Vassallo", action: "watch", link: "https://youtu.be/U6UBnAFzEJY", popup: true },
    { title: "DIGITAL SCORESHEET USER MANUAL", action: "download", link: "https://drive.google.com/file/d/1A4ThJZepDiYRONdU5fVOZANNYB6PpwQa/view" },
    { title: "DSS (Pre-game Duties)", action: "watch", link: "https://library.fibairef.basketball/doc/L0tUeUFCeDFmemNhNTdoNmQ0N0Nvdz09", popup: true },
    { title: "DSS (How to record different actions)", action: "watch", link: "https://library.fibairef.basketball/doc/UEdtVEd0RXYzaU95bWlpeVloWVF0Zz09", popup: true },
    { title: "DSS (How to close the game and print DSS)", action: "watch", link: "https://library.fibairef.basketball/doc/WWVoYlJXZDk5TnNWaVJEVjdLcHNTQT09", popup: true },
  ],
  MECHANICS: [
    { title: "3PO BASIC MECHANICS", presenter: "John Rearden", action: "watch", link: "https://www.youtube.com/embed/dqf_OzPL5A4?autoplay=1", popup: true },
    { title: "INDIVIDUAL OFFICIATING TECHNIQUES", presenter: "Roberto Chiari", action: "watch", link: "https://www.youtube.com/embed/rWJuIL4HzFg?autoplay=1", popup: true },
    { title: "OABO THREE PERSON CLINIC - SESSION ONE", action: "watch", link: "https://www.youtube.com/embed/4rse3EkNUTQ?autoplay=1", popup: true },
    { title: "OABO THREE PERSON CLINIC - SESSION TWO", action: "watch", link: "https://www.youtube.com/embed/7BvmuQx17lg?autoplay=1", popup: true },
    { title: "OABO THREE PERSON CLINIC - SESSION THREE", action: "watch", link: "https://www.youtube.com/embed/6ngfaG7Qc0E?autoplay=1", popup: true },
    { title: "OABO THREE PERSON CLINIC - SESSION FOUR", action: "watch", link: "https://www.youtube.com/embed/ndhSiOIU_UI?autoplay=1", popup: true },
  ],
  "WOMEN IN OFFICIATING": [
    { title: "GETTING READY! WOMEN'S WORLD CUP QUALIFYNG TOURNAMENTS (Mar 5, 2026)", presenter: "Cisil Gungor (TUR)\nViola Gyorgyi (NOR)\nChantal Julien (FRA)\nMaripier Malo (CAN)", action: "watch", link: "https://library.fibairef.basketball/doc/dGVlOVM5d1JEMDhPMXdoUFJzTThhQT09?autoplay=1", popup: true },
    { title: "EFFECTIVE COMMUNICATION UNDER PRESSURE (Jan 29, 2026)", presenter: "Lauren Holtkamp-Sterling (USA)", action: "watch", link: "https://library.fibairef.basketball/doc/ZVM2bHdEa3ZQcDdYVjc3UFdJQWZrQT09?autoplay=1", popup: true },
    { title: "REACHING THE TOP (Different paths to the elite level) (Nov 24, 2025)", presenter: "Julirys Guzman (PUR)\nCisil Gungor (TUR)", action: "watch", link: "https://library.fibairef.basketball/images/documents/7c003b12a40ef3fc99c531860569db9c/WiO_Recording__REACHING_THE_TOP_S3.mp4?autoplay=1", popup: true },
    { title: "BUILDING CONFIDENCE AND AUTHORITY (Apr 17,2025)", presenter: "Amy Bonner (USA)", action: "watch", link: "https://library.fibairef.basketball/images/documents/3808ec3be817cc685685a0c7eecb9ba1/Wio_Recording_Building_Confidence_S2.mp4?autoplay=1", popup: true },
    { title: "REACHING THE NEXT LEVEL (Feb 6, 2025)", presenter: "Lauren Holtkamp-Sterling (USA)", action: "watch", link: "https://library.fibairef.basketball/images/documents/9c1288be19a53250294477cca8b75d7d/Wio_Recording_Reaching_next_level_S1.mp4?autoplay=1", popup: true },
    { title: "BREAKING BARRIERS: STRATEGIES FOR ADDRESSING BIASES (Nov 28, 2024)", presenter: "Dubravka Martinovic (CRO)", action: "watch", link: "https://library.fibairef.basketball/images/documents/a848d5449f7e8ad6ec93c4cdc98d2bfb/Wio_Recording_Addressing_Biases_S3.mp4?autoplay=1", popup: true },
    { title: "BACK TO REFEREEING (Apr 18,2024)", presenter: "Maripier Malo (CAN)\nYasmina Alcaraz (ESP)", action: "watch", link: "https://library.fibairef.basketball/images/documents/287ac6a5a9ef46de1302fcc373ae0eee/Wio_Recording_Back_To_Refereeing_S2.mp4?autoplay=1", popup: true },
    { title: "THE WOMEN'S GAME (Feb 29, 2024)", presenter: "Nadine Crowley (CAN)\nChantal Julien (FRA)", action: "watch", link: "https://library.fibairef.basketball/images/documents/fe23ebfb488261d49eab0ce521111e7a/WiO_Recording__The_Womens_Game__S1.mp4?autoplay=1", popup: true },
    { title: "MY JOURNEY (Dec 14, 2023)", presenter: "Cecilia Toth (HUN)", action: "watch", link: "http://library.fibairef.basketball/images/documents/eaa2f0660d434ca24cb0f8a0d6077825/WiO_Recording__Taking_the_Next_Step__S5.mp4?autoplay=1", popup: true },
    { title: "WOMEN IN BASKETBALL - COACHING WOMEN'S NATIONAL TEAM (Apr 20, 2023)", presenter: "Victor Lapena (CAN)", action: "watch", link: "http://library.fibairef.basketball/images/documents/442db987dd6a7cdf28ce4f13f3eef359/WiO_Rec_COACHING_NT__S4.mp4?autoplay=1", popup: true },
    { title: "WOMEN IN BASKETBALL - PLAYER'S PERSPECTIVE (Mar 23, 2023)", presenter: "Michelle Gonzalez (PRI)", action: "watch", link: "http://library.fibairef.basketball/images/documents/b18bea944ef9fa4233db67281cfb7774/WiO_Recording__WOMEN_in_BASKETBALL__S3.mp4?autoplay=1", popup: true },
    { title: "WOMEN REFEREEING IN FOOTBALL (Feb 16, 2023)", presenter: "Natalie Qaqaya\nLina Lehtovaara", action: "watch", link: "http://library.fibairef.basketball/images/documents/e792512bb68ee6d2f9da6e154a2db2a9//WiO_UEFA_REFEREEING_S2_2023.mp4?autoplay=1", popup: true },
    { title: "REFEREE MATERNITY PLAN (Dec 22, 2022)", presenter: "Fiba Referee Operations", action: "watch", link: "http://library.fibairef.basketball/images/documents/59bc9066c9785c3cf59931fd0c454fd3/WiO_Recording_MATERNITY_PLAN_S8.mp4?autoplay=1", popup: true },
    { title: "FIBA MATERNITY PLAN - Handbook for Female Referees (November 2022 Version 1.0)", action: "download", link: "https://drive.google.com/file/d/1fI3wD94DMaNM0EUoJ9ccHoFIff5vE7V6/view" },
    { title: "FIBA MATERNITY PLAN - Guidelines for National Federations (November 2022 Version 1.0)", action: "download", link: "https://drive.google.com/file/d/1fGphlpbkERj-b40M6GWYY9YycCx1Bk6k/view" },
    { title: "DOWN UNDER (Sep 29, 2022)", presenter: "Amy Bonner (USA)\nViola Gyorgyi (NOR)\nSara Elsharnouby (EGY)", action: "watch", link: "http://library.fibairef.basketball/images/documents/e66c7f21d1ff0f3950498bbf560739d3/WiO_Recording_DOWN_UNDER_S7.mp4?autoplay=1", popup: true },
    { title: "WITH MENTAL FLEXIBILITY ON THE WAY TO THE TOP (Aug 18, 2022)", presenter: "Dubravka Martinovic\nJacquiline Dover (AUS)", action: "watch", link: "http://library.fibairef.basketball/images/documents/a08b5d8ba610c605ad1fe0c043a91327/WiO_BUILDING_LEGACY_21July2022.mp4?autoplay=1", popup: true },
    { title: "WOMEN IN BASKETBALL 2022-23 (Jun 23, 2022)", presenter: "Elisabeth Cebrian Scheurer", action: "watch", link: "http://library.fibairef.basketball/images/documents/658f67494f208f554105acb6ec4ac25d/WiO_23June2022__S4.mp4?autoplay=1", popup: true },
    { title: "FAMILY AFFAIRS (May 19, 2022)", presenter: "Susana Gomez (ESP)\nLuis Miguel Castillo (ESP)", action: "watch", link: "http://library.fibairef.basketball/images/documents/995bbb2993a38f0feee0a45134fc19c6/WiO_Recording_Family_Affairs_S3.mp4?autoplay=1", popup: true },
    { title: "IN CHARGE (NBA G-LEAGUE) (Apr 27, 2022)", presenter: "Maripier Malo (CAN)\nHortenica Sanchez (MEX)\nBianca Burns (USA)\nAshley Gloss (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/5c6756382faa046ddab755d016eda374/WiO_Recording_In_Charge_S2_720p.mp4?autoplay=1", popup: true },
    { title: "LEVEL UP (Mar 24, 2022)", presenter: "Yana Nikogossyan (KAZ)\nYasmina Alcaraz (ESP)\nSara Gamal (EGY)\nAriadna Cheuca (FIN)", action: "watch", link: "http://library.fibairef.basketball/images/documents/8a05516279454e6c49d1f484b26271f5/WiO23March22_Level_Up_720p.mp4?autoplay=1", popup: true },
    { title: "MENTORING PROGRAMME - CASE STUDY:EUROPE (Nov 10, 2021)", presenter: "Elisabeth Cebrian-Scheurer (ESP)\nKati Nynas (FIN)\nDubravka Martinovic (CRO)\nLaure Coanus (FRA)\nAriadna Cheuca Moreno (FIN)", action: "watch", link: "http://library.fibairef.basketball/images/documents/4c922a4e4defb0766ea686b4a9999b40/WiO_15Nov_2021_MP_Europe.mp4?autoplay=1", popup: true },
    { title: "OFFICIATING IN AFRICA (Sep 30, 2021)", presenter: "Mendoza Esperanza (ESP)\nAhmed Aya (EGY)\nZouzou Nadege\nBoussetta Chahinaz\nLea Kane", action: "watch", link: "http://library.fibairef.basketball/images/documents/2e8d05514939bfb56591e63f9e1d0ad3/WiO_Recording_Officiating_in_FIBA_Africa.mp4?autoplay=1", popup: true },
    { title: "DEVELOPMENT AND BEST PRACTICES (Jun 17, 2021)", presenter: "Nadine Crowley (CAN)\nChantal Julien (FRA)\nJasmina Juras (SRB)", action: "watch", link: "http://library.fibairef.basketball/images/documents/e25052455cd2514b0791451d61b1a2b7/WiO_17June_BestPractices.mp4?autoplay=1", popup: true },
    { title: "BUILDING CONFIDENCE FOR BETTER PERFORMANCE (May 12, 2021)", presenter: "Dubravka Martinovic", action: "watch", link: "http://library.fibairef.basketball/images/documents/d22232bc30cf8eeb257cbc27a111bf1d/Recording_WiO_F3_BC4BP_12May2021.mp4?autoplay=1", popup: true },
    { title: "MOTIVATION AND INSPIRATION (Apr 22, 2021)", presenter: "Lauren Holtkamp-Sterling (USA)\nMaj Forsberg (DEN/USA)\nOzlem Yalman (TUR)", action: "watch", link: "http://library.fibairef.basketball/images/documents/2df565bc8e47663d244ca06928e687a6/Recording_22Apr2021_WiO_F2_MI.mp4?autoplay=1", popup: true },
    { title: "WOMEN IN OFFICIATING (Mar 8, 2021)", presenter: "Andreas Zagkklis\nAurellie Vidot\nNadine Crowley (CAN)\nAlejandro Vaquera (ESP)\nDubravka Martinovic", action: "watch", link: "http://library.fibairef.basketball/images/documents/cefd27bad3e651a1377caa09602688c3//W2021_WiO_F1_8March_Recording.mp4?autoplay=1", popup: true }
  ],
  "FIBA MONDAY": [
    { title: "CLEAR AND CONCLUSIVE - UNSPORTSMANLIKE FOUL (Apr 6, 2026)", presenter: "Mike Thomson (CAN)", action: "watch", link: "https://library.fibairef.basketball/images/documents/9e1587bd388ad4022c52cc9ad3caa52d/Recording_MS2026_S4_Clear__Conclusive_UF.mp4?autoplay=1", popup: true },
    { title: "HOW TO COVER HELP DEFENDER (Mar 2, 2026)", presenter: "Roberto Chiari (ITA)", action: "watch", link: "https://library.fibairef.basketball/images/documents/b47d8cf3a971eb85632cc840d9af8b6c/Recording_MS2026_S3_Cover_Help_Defender.mp4?autoplay=1", popup: true },
    { title: "SCOUTING THE TEAMS (Feb 2, 2026)", presenter: "Wojciech Liszka (POL)\nWaseem Husainy (CAN)", action: "watch", link: "https://library.fibairef.basketball/doc/bnpJVjhjNU1CbU13MDUvSjMzUG5Ydz09?autoplay=1", popup: true },
    { title: "IN-VISIBLE TRAINING (Nov 3, 2025)", presenter: "Dr. Alejandro Vaquera (ESP)", action: "watch", link: "https://library.fibairef.basketball/images/documents/56f0d88b90e685300e532cee6db1242d/Recording_MS2025_S6_IN_VISIBLE_TRAINING.mp4?autoplay=1", popup: true },
    { title: "OFFICIAL RULES: Practical Situations (Part I) (Oct 3, 2025)", presenter: "Mike Thomson (CAN)", action: "watch", link: "https://library.fibairef.basketball/images/documents/5653da1fbe53ee5769e489dbc1c74715/Recording_MS2025_S5_OBR_Practical_Situations.mp4?autoplay=1", popup: true },
    { title: "BACK TO BASICS - Next steps for court coverage (Mar 3, 2025)", presenter: "Roberto Chiari (ITA)\nNadine Crowley (CAN)", action: "watch", link: "https://library.fibairef.basketball/images/documents/ec832430e4ba9d489a530eeb74fa303e/Recording_MS2025_S3_B2B_Next_steps_Court_CVE.mp4?autoplay=1", popup: true },
    { title: "ROLE OF AN OFFICIAL - Being a part of something bigger (Feb 3, 2025)", presenter: "Monty McCutchen (USA)", action: "watch", link: "https://library.fibairef.basketball/images/documents/a50ab7e77eab09e27138c0b4a4085c10/Recording_MS_2025_S2_Role_of_an_Official.mp4?autoplay=1", popup: true },
    { title: "BACK TO BASICS - Building the foundation for 3PO court coverage (Jan 13, 2025)", presenter: "Nadine Crowley (CAN)", action: "watch", link: "https://library.fibairef.basketball/images/documents/59a39b91e9b0fbf2060fde0c65fafb70/Recording_MS_2025_BACK2BASICS_3PO_CourtCG.mp4?autoplay=1", popup: true },
    { title: "2024 HIGHLIGHTS - WHAT'S NEXT IN 2025 (Dec 2, 2024)", presenter: "Carl Jungebrand", action: "watch", link: "https://library.fibairef.basketball/images/documents/872c6ee9bcf11ce524b7a8c3908c459a/Recording_MS_2024_Highlights_Whats_Next_2025.mp4?autoplay=1", popup: true },
    { title: "OBRI 2024 - Practical Cases (Nov 4, 2024)", presenter: "FIBA Referee Operations", action: "watch", link: "https://library.fibairef.basketball/images/documents/65f263ad0318c1d9e054af65d3f75525/Recording_MS_NOV2024_OBRI2024_CASES.mp4?autoplay=1", popup: true },
    { title: "LISTENING & LEARNING (Mar 4, 2024)", presenter: "Ferdinand Pascual (PHI)\nJose Carrion (PUR)\nAriadna Chueca (ESP)\nYann Davidson (MAD)", action: "watch", link: "https://library.fibairef.basketball/images/documents/8ae96871d49870bd3541d7e55fda4d71/Recording_MS_MAR2024_LISTENING__LEARNING.mp4?autoplay=1", popup: true },
    { title: "MONEY TIME COMMUNICATION (Dec 4, 2023)", presenter: "Dubravka Martinovic", action: "watch", link: "http://library.fibairef.basketball/images/documents/cc5283938ad7f236af8594eb0a540796/Recording__Moneytime_Communication_.mp4?autoplay=1", popup: true },
    { title: "BASIC PROTOCOLS - PART I (Nov 6, 2023)", presenter: "Roberto Chiari", action: "watch", link: "http://library.fibairef.basketball/images/documents/f81a7ae51009cd40c32932f4abe08e1d//Recording__BASIC_PROTOCOLS_part_1__V2.mp4?autoplay=1", popup: true },
    { title: "WORLD CUP 2023 - TRAILBLAZING SUCCESS (Oct 2, 2023)", presenter: "Referee Operations", action: "watch", link: "http://library.fibairef.basketball/images/documents/89fb68dcc5c9d6c239a92e5188ce048c/Recording__FIBA_World_Cup_2023__Session_5.mp4?autoplay=1", popup: true },
    { title: "EXPECTATIONS FROM HIGH LEVEL REFEREES (Apr 3, 2023)", presenter: "Terry Moore (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/04388bd3c9ecec030ad3f61afc875a82/Recording_MS_April_2023_EXPECTATIONS.mp4?autoplay=1", popup: true },
    { title: "SIMPLE STEPS TO BETTER CALLS (Mar 6, 2023)", presenter: "Mike Thomson (CAN)", action: "watch", link: "http://library.fibairef.basketball/images/documents/21bd9e0daf91c254d775f21fb23f343f/MS2023_SIMPLE_STEPS_TO_BETTER_CALLS__S3.mp4?autoplay=1", popup: true },
    { title: "INJURY PREVENTION AND RECOVERY (Feb 6, 2023)", presenter: "Crystal Dupuche (AUS)", action: "watch", link: "http://library.fibairef.basketball/images/documents/17deca057ac59cd99bea3c363bd62fed/MS2023_S2_INJURY_RECOVERY_Feb2023.mp4?autoplay=1", popup: true },
    { title: "BODY LANGUAGE (Jan 9, 2023)", presenter: "Dr. Jose Maria Buceta", action: "watch", link: "http://library.fibairef.basketball/images/documents/f09a80989e89441f79716d69c59d182c/MS2023Jan__BODY_LANGUAGE.mp4?autoplay=1", popup: true },
    { title: "RECAP OF 2022 (Dec 5, 2022)", presenter: "Greydy Diaz\nCarl Jungebrand", action: "watch", link: "http://library.fibairef.basketball/images/documents/4c2747cf1c421a031b35d7b420402c62/Recording__RECAP_OF_2022__Session_12.mp4?autoplay=1", popup: true },
    { title: "FIBA GOL2023-25 - 4TH EDITION (Nov 7, 2022)", presenter: "Tomas Rimkus (LTU)", action: "watch", link: "http://library.fibairef.basketball/images/documents/8fee714adc423640ed9e5babbc06f3f0/Recording__FIBA_GOL2023_25__Session_11.mp4?autoplay=1", popup: true },
    { title: "VIVA LAS VEGAS - NBA SUMMER CAMP 2022 (Aug 1, 2022)", presenter: "Manuel Mazzoni (ITA)\nRoberto Vazquez (PUR)\nBoris Krejic (SLO)\nMartins Koslovzkis (LAT)\nYohan Rosso (FRA)\nGrant Todey (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/6bcd548ecc15238370f895e7dc0c252a/MS1AUG_LAS_VEGAS_S8.mp4?autoplay=1", popup: true },
    { title: "TALK & WALK - INSIDE OF FIBA U17 WORLD CUP PREPARATION (Jul 4, 2022)", presenter: "Albert Joseph (FIBA)\nMike Thomson (CAN)\nBianca Burns (USA)\nGatis Salins (LAT)\nScott Beker (AUS)\nKyounghwan Lee (KOR)\nJeanna Reneau (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/efab20f6e0861c618f9b43f3487772a3/Recording_TALK__WALK_Session_7.mp4?autoplay=1", popup: true },
    { title: "UNDER THE SURFACE IN FIBA REFEREE OPERATIONS (Jun 6, 2022)", presenter: "FIBA Referee Operations", action: "watch", link: "http://library.fibairef.basketball/images/documents/97f33fa7aeeb6148114ab193be6af380/MSJune2022_UNDER_SURFACE_S6.mp4?autoplay=1", popup: true },
    { title: "SEASON END - A SELF-REFLECTION OF A JOURNEY (May 2, 2022)", presenter: "Dubravka Martinovic", action: "watch", link: "http://library.fibairef.basketball/images/documents/9e63789ec6b6e6fa343067dd62603c14/Recording_SEASON_END_Session_5.mp4?autoplay=1", popup: true },
    { title: "SEE FAST - DECIDE SLOW (Mar 7, 2022)", presenter: "Matt Kallio (CAN)\nJulio Anaya (PAN)", action: "watch", link: "http://library.fibairef.basketball/images/documents/220c16434300ed747d2b9ad97907469f/Recording_SEE_FAST___DECIDE_SLOW_Session_3.mp4?autoplay=1", popup: true },
    { title: "BEING A PROFESSIONAL (Apr 4, 2022)", presenter: "France & Japan National Federations", action: "watch", link: "http://library.fibairef.basketball/images/documents/0f37b39fac5d19cfa21cfb7875cebc5f/Recording_BEING_A_PROFESSIONAL_Session_4.mp4?autoplay=1", popup: true },
    { title: "THEN & NOW (Feb 7, 2022)", presenter: "Chantal Julien (FRA)\nTerry Moore (USA)\nAbreu Muhimua (MOZ)\nCostas Rigas (GRE)", action: "watch", link: "http://library.fibairef.basketball/images/documents/a123b7dce60be3887bd1dcb2ea980afd/Recording_THEN__NOW_MNS_Session_2_720p.mp4?autoplay=1", popup: true },
    { title: "MODERN BASKETBALL & ITS INTERRELATIONSHIP WITH REFEREEING (Jan 3, 2022)", presenter: "Nelson Isley (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/8f4c894f64f9df5bcd5a133a11dc1fae/Recording_MS1_2022_MODERN_BASKETBALL_720p.mp4?autoplay=1", popup: true },
    { title: "INVISIBLE TRAINING (Dec 6, 2021)", presenter: "Dr. Chema Buceta", action: "watch", link: "http://library.fibairef.basketball/images/documents/56ba1d87d5e080af3e8c979470810f8c/Recording_INVISIBLE_TRAINING_MS12_720p.mp4?autoplay=1", popup: true },
    { title: "HEARING AND LISTENING (Nov 8, 2021)", presenter: "FIBA Referee Operations", action: "watch", link: "http://library.fibairef.basketball/images/documents/1fd4ae58f66f7b03e81d407fc51535fd/MNS_HEARING_LISTENING_S11_8Nov2021.mp4?autoplay=1", popup: true },
    { title: "RUN & CALL (Oct 4, 2021)", presenter: "Alejandro Vaquera (ESP)\nDavid Suarez (ESP)\nHaris Pojskic (SWE)\nMaria Munoz (GUA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/40ba074a0eef17da88dd73f5ea0b59b3/Recording_RUN__CALL_MNS_Session_10.mp4?autoplay=1", popup: true },
    { title: "\"SO WHAT?\" / SCOUTING THE TEAMS (Sep 6, 2021)", presenter: "Dubravka Martinovic\nAdemir Zurapovic (BIH)", action: "watch", link: "http://library.fibairef.basketball/images/documents/99d8d229b006118eb323db3b15a54d2b/MS_S19_SO_WHAT_SCOUTING_TEAMS.mp4?autoplay=1", popup: true },
    { title: "TOKYO 2020 - BUBBLE LIFE (Aug 2, 2021)", presenter: "Officating Team", action: "watch", link: "http://library.fibairef.basketball/images/documents/47e1c515ff60fb93425eaee33a4d5647/MS_Session_08_Tokyo2020_720p.mp4?autoplay=1", popup: true },
    { title: "INSIDE THE COMPETITION (Jul 5, 2021)", presenter: "Officating Team", action: "watch", link: "http://library.fibairef.basketball/images/documents/0944f66d30c833f2bd43a488b91d11af/MS_INSIDE_COMPETITION_720p.mp4?autoplay=1", popup: true },
    { title: "MENTOR PROGRAMME FOR REFEREES (Jun 7, 2021)", presenter: "Cristiano Maranho (BRA)\nAntonio Conde (ESP)\nImene Tahimi (ALG)\nEdwin Quiles (PUR)", action: "watch", link: "http://library.fibairef.basketball/images/documents/f4398ef366cd9213b6c97b60b23a19b4/MS_7June_MP_Recording.mp4?autoplay=1", popup: true },
    { title: "MY PREPARATION FOR THE COMPETITION (May 3, 2021)", presenter: "Samir Abaakil (MOR)\nAmy Bonner (USA)\nJames Boyer (AUS)\nViola Gyorgyi (NOR)\nTakaki Kato (JPN)", action: "watch", link: "http://library.fibairef.basketball/images/documents/2b324c01a33bea39da8665a6e4771272/Recording_MS__MyPrep_3May2021.mp4?autoplay=1", popup: true },
    { title: "STEPS TO SUCCESS - CASE STUDY: OFFICIATING PLAN BY TBF (Apr 12, 2021)", presenter: "Rustu Nuran (TUR)\nYener Yilmaz (TUR)\nOzlem Yalman (TUR)\nMehmet Karabilecen (TUR)\nSinem Tetik (TUR)", action: "watch", link: "http://library.fibairef.basketball/images/documents/3be860c989d92b48a4b7f7a6cad97b74/Recording_TBF_STEPS_TO_SUCCESS_MNS_Session_04.mp4?autoplay=1", popup: true },
    { title: "COMMON SENSE COMMUNICATION - PART I (Mar 8, 2021)", presenter: "JD Collins (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/b5acf024a16eb73d5efd8aa6f1a99dbc/Recording_WB21_MS7_P1.mp4?autoplay=1", popup: true },
    { title: "COMMON SENSE COMMUNICATION - PART II (Mar 8, 2021)", presenter: "JD Collins (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/50c0cb6e42cfc8fcc0a5456834cefb02/Recording_WB21_MS7_P2.mp4?autoplay=1", popup: true },
    { title: "FINAL PRE-GAME - WORLD CUP 2019 FINAL CREW (Feb 1, 2021)", presenter: "Cristiano Maranho (BRA)\nYohan Rosso (FRA)\nSteven Anderson (USA)", action: "watch", link: "http://library.fibairef.basketball/images/documents/bc1e330a3245248510add399bc7c78a2/MS_1Feb2021_FPG_Recording.mp4?autoplay=1", popup: true }
  ],
  STATISTICS: [
    { title: "BASIC STATISTICS DEFINITIONS", presenter: "Trish Nicholl", action: "watch", link: "https://youtu.be/ps12xdaj_vk", popup: true },
    { title: "FLS - V7 DEMONSTRATION", presenter: "Brett Gallo", action: "watch", link: "https://youtu.be/rQ4F4Dm0fW0", popup: true },
  ],
  MISCELLANEOUS: [
    { title: "COMMUNICATION & ADVANCED 3PO MECHANICS", presenter: "Yohan Rosso", action: "watch", link: "https://www.youtube.com/embed/ndhSiOIU_UI?autoplay=1", popup: true },
    { title: "REFEREEING CRASH COURSE", action: "watch", link: "https://youtu.be/eWZKKmicFGo", popup: true },
    { title: "MASTERING THE MENTAL GAME", presenter: "Sara Mansson", action: "watch", link: "https://www.youtube.com/embed/ndhSiOIU_UI?autoplay=1", popup: true },
    { title: "TIPS FOR REFEREES", presenter: "Steffen Hamann", action: "watch", link: "https://youtu.be/4aVMjmTZIfU", popup: true },
    { title: "LEADERSHIP, GAME CONTROL AND TRAITS OF ELITE REFEREES", presenter: "Nadine Crowley", action: "watch", link: "https://youtu.be/z0sfei6yWDM", popup: true },
    { title: "TIPS FROM THE ARCTIC CIRCLE", presenter: "Karol Kowalski", action: "watch", link: "https://youtu.be/r4TpXfEaem0", popup: true },
    { title: "REFEREEING MASTERCLASS", presenter: "Manuel Mazzoni", action: "watch", link: "https://youtu.be/JjSA58pxAgQ", popup: true },
    { title: "HOW TO BECOME A TOP BASKETBALL REFEREE", presenter: "Olegs Latisevs", action: "watch", link: "https://youtu.be/YJSn_2LQhbw", popup: true },
    { title: "MENTAL STATE OF AN OFFICIAL", presenter: "Max Audette", action: "watch", link: "https://youtu.be/kkRkjoCrNr4", popup: true },
    { title: "WHAT IS YOUR BRAND ?", presenter: "Perry Stothart", action: "watch", link: "https://youtu.be/am1K8_gWkiE", popup: true },
    { title: "PREPARATION OF AN OFFICIAL", presenter: "Brent Stocker", action: "watch", link: "https://youtu.be/heIhEu6NjpM", popup: true },
    { title: "GAME CONTROL", presenter: "Chris Delaney/Ardavan Eizadirad", action: "watch", link: "https://youtu.be/fqN4fuoUecE", popup: true },
    { title: "GETTING THROUGH THE TOUGH STUFF", presenter: "Karen Lasuik", action: "watch", link: "https://youtu.be/AHuz32n8aMA", popup: true },
    { title: "I SPY WITH MY LITTLE EYE", presenter: "Jason Steill", action: "watch", link: "https://youtu.be/cV2XgRTw9dg", popup: true },
    { title: "TIPS FOR BASKETBALL REFEREES", presenter: "Ville Selkee", action: "watch", link: "https://youtu.be/BhK8n7D-Kfc", popup: true },
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
            background: T.charcoal, borderRight: `1px solid ${T.border}`,
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
        borderRight: `1px solid ${T.border}`,
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

// ─── Video Modal ──────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1).split("?")[0];
    if (parsed.hostname.includes("youtube.com")) return parsed.searchParams.get("v");
  } catch { /* ignore */ }
  return null;
}

function VideoModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const youtubeId = getYouTubeId(url);
  const embedSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
    : null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeInModal 0.22s ease",
      }}
    >
      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 960,
          background: "#111",
          border: `1px solid ${T.orange}`,
          boxShadow: `0 0 60px rgba(232,101,26,0.3)`,
          display: "flex", flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Modal header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: `1px solid ${T.border}`,
          background: T.charcoal,
        }}>
          <span style={{
            fontFamily: BARLOW, fontWeight: 700, fontSize: 17,
            color: T.orange, letterSpacing: "2px", textTransform: "uppercase",
          }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: `1px solid ${T.border}`,
              color: T.inactive, fontSize: 18, cursor: "pointer",
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 2, transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.orange; (e.currentTarget as HTMLButtonElement).style.color = T.orange; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.border; (e.currentTarget as HTMLButtonElement).style.color = T.inactive; }}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
        {/* Video — iframe for YouTube, native <video> for direct URLs */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title={title}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "100%",
                border: "none",
              }}
            />
          ) : (
            <video
              src={url}
              controls
              autoPlay
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "100%",
              }}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Webinar Row ──────────────────────────────────────────────────────────────
function WebinarRow({
  item,
  isLast,
  isMobile,
  onOpenPopup,
}: {
  item: WebinarItem;
  isLast: boolean;
  isMobile: boolean;
  onOpenPopup: (url: string, title: string) => void;
}) {
  const h = useHover();
  const isDownload = item.action === "download";

  const handleAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.popup && item.link) {
      e.preventDefault();
      onOpenPopup(item.link, item.title);
    }
  };

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
          target={item.popup ? undefined : "_blank"}
          rel="noopener noreferrer"
          onClick={handleAction}
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
function WebinarTabContent({ tab, isMobile, onOpenPopup }: { tab: Tab; isMobile: boolean; onOpenPopup: (url: string, title: string) => void }) {
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
              onOpenPopup={onOpenPopup}
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
  const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);
  const width = useWindowWidth();

  const openPopup = (url: string, title: string) => setVideoModal({ url, title });
  const closePopup = () => setVideoModal(null);

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
            <WebinarTabContent tab={activeTab} isMobile={isMobile} onOpenPopup={openPopup} />
          </div>
        </main>
      </div>

      {/* Video popup modal */}
      {videoModal && (
        <VideoModal url={videoModal.url} title={videoModal.title} onClose={closePopup} />
      )}
    </div>
  );
}
