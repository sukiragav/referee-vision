

## REFEREE VISION — Full Rebuild Prompt (New Figma Account)

Reconstruct the **Referee Vision** website exactly as described below. This is a complete from-scratch rebuild matching the design direction of the existing site but fixing specific issues. Read every section carefully before designing.

---

### GLOBAL DESIGN SYSTEM

**Colors:**

- `--black: #111111` — Header, Hero, Nav, Footer backgrounds

- `--charcoal: #1C1C1C` — Nav bar specifically

- `--orange: #E8651A` — All accents, badges, buttons, dividers

- `--white: #FFFFFF` — Primary text on dark backgrounds

- `--off-white: #F7F4F0` — Background for "Ways We Help" section

- `--light-grey: #F0EDE8` — Background for "Programs & Resources" section

- `--pure-white: #FFFFFF` — Background for "From The Desk" section

- `--grey-text: #888888` — Secondary descriptions

- `--dark-text: #1A1A1A` — Body text on light sections

**Typography:**

- Display/Headings: **Barlow Condensed ExtraBold** (Google Fonts) — all caps, tight tracking

- Body: **DM Sans** Regular — clean, modern, readable

- Signature only: **Cormorant Garamond** Italic — elegant, personal

**Spacing:** Generous padding. Sections breathe. No cramped layouts.

---

### SECTION 1 — HEADER

**Background:** `#111111`

**Height:** ~100px

**Layout:** Horizontal flex row. Three zones: Left (logo), Center (empty space), Right (social icons)

**Left Zone — Logo Block:**

- Import and display the user's provided PNG logo image. Do not use a star badge placeholder. Respect the logo's original proportions. Size: approximately 60–70px height. Do not crop, distort, or restyle it.

- To the right of the logo image, stacked vertically:

  - **REFEREE VISION** — Barlow Condensed ExtraBold, 36px, white, all caps, tight letter spacing

  - *One Stop to Rule Them All* — Cormorant Garamond Italic, 15px, `#AAAAAA`, normal weight

**Right Zone — Social Icons:**

- Five icons in a horizontal row: YouTube, Facebook, Instagram, X/Twitter, WhatsApp

- Style: SVG outline icons, white, 22px each, equal spacing (24px gap)

- No background, no circles, just clean line icons

---

### SECTION 2 — NAVIGATION BAR

**Background:** `#1C1C1C`

**Height:** 52px

**Layout:** Full-width horizontal bar. All items left-aligned with padding-left 32px.

**Left Edge Detail:**

- A 4px wide vertical orange bar (`#E8651A`) on the far left edge of the nav bar. Spans full height of nav. This is a referee stripe detail.

**Nav Items:**

ABOUT · REFEREES · BOOKS · VIDEOS · WEBINARS · COACHES · VAULT

**Text styling:**

- Barlow Condensed SemiBold

- 14px

- White

- Letter spacing: 2px

- All caps

- 32px gap between items

**Hover state:**

- Orange bottom border (3px)

- Text turns orange

**Behavior:** Sticky. Stays fixed to top of viewport on scroll.

---

### SECTION 3 — HERO

**Background:** `#111111` with a basketball court SVG overlay

**Basketball Court Background — CRITICAL:**

Draw a faint overhead-view basketball court using SVG lines directly in the background. The court is centered in the hero. All lines use `rgba(255,255,255,0.07)` — extremely subtle. Do not use images. Draw with SVG paths:

- Full rectangular court outline

- Center circle (large)

- Half-court line (horizontal)

- Three-point arc (both ends — curved lines)

- Paint/lane rectangles (both ends)

- Free throw circles (both ends)

- Basket positions (small circles at ends)

This creates texture. The court must be clearly recognizable as a basketball court if you look closely, but must not compete with the text at all. Think: watermark level visibility.

**Content — centered horizontally and vertically:**

1. **Overline label:**

   - Text: `BASKETBALL FEDERATION OF INDIA`

   - Style: Barlow Condensed, 12px, `#E8651A`, letter spacing 4px, all caps

   - Margin bottom: 20px

2. **Hero Headline:**

   - Text: `ONE STOP TO RULE THEM ALL`

   - Font: Barlow Condensed ExtraBold, 96px desktop / 52px mobile

   - Color: White

   - All caps, tight tracking

   - Line height: 1.0

3. **Hero Subtitle:**

   - Text: "The definitive platform for basketball referees to sharpen their officiating edge"

   - Font: DM Sans, 18px, `#CCCCCC`

   - Max-width: 560px, centered

   - Margin top: 20px

4. **CTA Button:**

   - Text: `EXPLORE RESOURCES`

   - Background: `#E8651A`

   - Text: White, Barlow Condensed SemiBold, 14px, letter spacing 3px

   - Padding: 16px 40px

   - No border radius (sharp rectangle)

   - On click: smooth scroll to Programs & Resources section

   - Margin top: 32px

**Bottom Edge:**

- 3px solid orange horizontal line as section bottom border

---

### SECTION 4 — WAYS WE HELP YOU IMPROVE

**Background:** `#F7F4F0` (warm off-white — distinct from the section below)

**Add a subtle thin orange top border (2px) to visually separate from the hero.**

**Layout:** Two equal columns, 60px padding on both sides.

---

**LEFT COLUMN:**

Top area — stacked side by side:

- Giant number **6** — Barlow Condensed ExtraBold, 180px, `#E8651A`, line height 1

- To its right, heading stacked:

  - **WAYS WE HELP** (line 1)

  - **YOU IMPROVE** (line 2)

  - Font: Barlow Condensed ExtraBold, 48px, `#1A1A1A`, all caps

Below the heading (full column width):

Description paragraph:

> "Referee Vision is India's premier platform dedicated to basketball officiating excellence. We provide comprehensive resources for referees at all levels to enhance their skills, stay current with rule changes, and connect with the officiating community."

Font: DM Sans, 16px, `#555555`, line height 1.8.

**Basketball Illustration — CRITICAL FIX:**

Below the paragraph, draw a **geometrically accurate basketball** using SVG. This is the most important visual fix from the previous version. The old version had incorrect globe-like lines. Here is exactly how a real basketball looks:

- Large circle (the ball body) — filled `#E8651A`, stroked with `#1A1A1A` (3px)

- **Seam lines — accurate basketball seams:**

  - One horizontal curved line across the middle (a smooth S-curve arc going left to right across the full width, curving gently up then down — the main equatorial seam)

  - One vertical curved line from top to bottom (a smooth S-curve going top to bottom, curving left then right — the meridian seam)

  - These two seams divide the ball into 4 roughly equal panels

  - Each seam line has a narrow gap/border either side (a thin pale line paralleling each seam) to suggest the rubber groove — approximately 2–3px either side

- The seam lines are `#1A1A1A` (dark brown-black), 2.5px stroke

- Size: 220px × 220px SVG

- Centered in the lower-left column space

- Do NOT draw globe grid lines. Do NOT draw diamond patterns. Draw basketball seams only — two curved crossing lines.

---

**RIGHT COLUMN:**

Six vertically stacked feature items. Each item:

- **Orange circle badge** on the left: 48px diameter, `#E8651A` fill, white Barlow Condensed ExtraBold number centered inside (28px)

- To the right:

  - **Title** — DM Sans SemiBold, 17px, `#1A1A1A`

  - **Description** — DM Sans Regular, 14px, `#777777`

- 24px gap between each item

- A very faint horizontal divider line (`#E0DDD8`, 1px) between each item except the last

Items:

1. **Physical & Mental Books** — Comprehensive guides for referee fitness, nutrition, and psychology

2. **Rule Books** — Latest FIBA and BFI officiating rules and official interpretations

3. **Videos on Rules** — Visual explanations and demonstrations of rule mechanics

4. **Webinars on Rules** — Live sessions with expert referees and instructors

5. **Coaches** — Dedicated coaching manuals, strategy guides, and officiating perspectives for coaches

6. **Vault** — A vast collection of basketball magazines, historical materials, and rare officiating resources

---

### SECTION 5 — PROGRAMS & RESOURCES

**Background:** `#FFFFFF` (pure white — clearly different from the off-white section above)

**Add a 3px orange top divider line to clearly mark the section boundary.**

**Also add a thin 1px `#E8E8E8` horizontal rule across full width as a top inner border, giving a clean document-like entry.**

**Section Heading (centered):**

- **PROGRAMS & RESOURCES** — Barlow Condensed ExtraBold, 56px, `#1A1A1A`

- Subtitle: "Explore a range of programs, services, and resources designed to support and enhance every aspect of your officiating journey" — DM Sans, 16px, `#777777`, max-width 620px, centered

**Card Grid:**

- 3 columns × 2 rows

- Gap: 28px

- Max-width: 1100px, centered

**Each Card:**

- Background: `#FFFFFF`

- Border: 1px solid `#E2E2E2`

- Border-radius: 0 (sharp corners — sports/official document style)

- Padding: 36px 32px

- No shadow

**Card Interior:**

- Icon holder: 52px circle, background `#F5F2EE`, centered icon inside (Tabler outline icon, 24px, `#888888`)

- Title: Barlow Condensed SemiBold, 22px, `#1A1A1A`, all caps, margin-top 16px

- Description: DM Sans, 14px, `#777777`, line height 1.7

**Hover state:**

- Border color changes to `#E8651A`

- Icon color changes to `#E8651A`

- Title color changes to `#E8651A`

- Smooth transition 0.2s

**Cards:**

1. **PHYSICAL & MENTAL BOOKS** | book icon | "Comprehensive guides covering referee fitness, nutrition, psychology, and peak performance"

2. **RULE BOOKS** | document icon | "Latest FIBA rules, BFI regulations, and official interpretations for Indian referees"

3. **VIDEOS ON RULES** | video-camera icon | "Visual rule explanations and mechanics demonstrations for practical learning"

4. **WEBINARS ON RULES** | screen/presentation icon | "Live and recorded expert sessions for ongoing referee education"

5. **COACHES** | clipboard icon | "Dedicated coaching manuals, strategy guides, and officiating perspectives designed for coaches"

6. **VAULT** | archive icon | "A vast collection of basketball magazines, historical materials, and rare officiating resources"

---

### SECTION 6 — FROM THE DESK

**Background:** `#FFFFFF`

**Visual separation from Programs section:** Add a full-width horizontal rule (1px, `#D0CCC8`) at the very top of this section, plus 80px top padding. This creates a clear page break between the white sections without changing colors.

**Layout:** Single column, centered content, max-width 780px, margin auto.

**Left-side Court Arc Decoration — CRITICAL FIX:**

On the left side of this section, draw a large SVG basketball court arc as a decorative watermark. This must be clearly visible but remain decorative — not so faint it disappears.

Exact specification:

- Draw a three-point arc (the curved line from a basketball court — a large semicircle)

- Color: `#E8651A` at **18–22% opacity** (not 5% like before — needs to be visibly orange)

- Stroke width: 3px, no fill

- Also include two straight lines extending down from each end of the arc (the lane line extensions that complete the three-point area)

- Size: approximately 280px wide × 320px tall SVG

- Positioned: absolute, left: 0, vertically centered in the section

- It should feel like the corner of a basketball court is bleeding into the left edge of the page

**Content (right of decoration, or full-width centered depending on layout):**

1. **Label:**

   - `FROM THE DESK` — Barlow Condensed, 12px, `#AAAAAA`, letter spacing 4px, all caps

   - Margin bottom: 24px

2. **Message paragraph:**

   > "I thank FIBA Referee Department, Youtube channels and all others for providing valuable study materials. This platform serves as a centralized hub to help basketball referees across India access quality resources, stay updated with rule changes, and continuously improve their officiating skills. Our goal is to elevate the standard of basketball officiating in the country through education, collaboration, and dedication to excellence."

   - DM Sans, 17px, `#333333`, line height 1.9

3. **Divider:** 1px `#DDDDDD` horizontal line, full section width, margin 40px 0

4. **Signature:**

   - *K. Ajoy Lawrence* — Cormorant Garamond Italic, 56px, `#1A1A1A`

   - Below: "Referee – BFI Panel-A | Basketball Federation of India" — DM Sans, 14px, `#888888`

---

### SECTION 7 — FOOTER

**Background:** `#111111`

**Top edge:** 3px solid `#E8651A` line across full width

**Layout:** Three equal columns, 60px padding, 48px top/bottom padding

---

**Column 1 — Brand:**

- User PNG logo image (same as header, ~50px height)

- **REFEREE VISION** — Barlow Condensed ExtraBold, 22px, white, all caps

- Social icons row: YouTube · Facebook · Instagram · X · WhatsApp

  - SVG outline icons, white, 20px, 16px gap between

---

**Column 2 — Quick Links:**

- Heading: **QUICK LINKS** — Barlow Condensed SemiBold, 13px, `#E8651A`, letter spacing 3px

- Links: About · Referees · Books · Videos · Webinars · Coaches · Vault

- Each: DM Sans, 14px, `#AAAAAA`, 10px vertical gap

- Hover: white, no underline

---

**Column 3 — Get The App:**

- Heading: **GET THE APP** — Barlow Condensed SemiBold, 13px, `#E8651A`, letter spacing 3px

- Google Play badge:

  - Black rectangle, border-radius 8px

  - Google Play triangle logo on left

  - Two lines of text: small "Get it on" + larger "Google Play"

  - White text throughout

  - Width: ~180px

- Below badge: "Access all referee resources on the go" — DM Sans, 13px, `#777777`

---

**Copyright Bar:**

- Full-width dark strip `#0A0A0A`, 48px height

- Centered text: "Copyrights © 2026 | All Rights Reserved by Referee Vision"

- DM Sans, 13px, `#666666`

---

### SECTION BACKGROUND RHYTHM — SUMMARY

This is critical. Three adjacent light sections must feel visually distinct:

| Section | Background | Top Separator |

|---|---|---|

| Ways We Help | `#F7F4F0` warm off-white | 2px orange line |

| Programs & Resources | `#FFFFFF` pure white | 3px orange line + 1px grey inner rule |

| From The Desk | `#FFFFFF` pure white | 1px grey rule + 80px top padding |

The slight warm tint of `#F7F4F0` versus pure `#FFFFFF` creates visual breathing room. The orange and grey dividers give clear entry points to each section. Do not make all three sections the same background.

---

### REGARDING THE BASKETBALL ILLUSTRATION



Here is the exact SVG to use for the basketball in the Ways We Help section. Copy this precisely:

```

A circle of radius ~110px centered in a 240×240 viewBox.

Fill: #E8651A

Stroke: #1A1A1A, 3px

Seam 1 (horizontal S-curve):

A cubic bezier path that starts at the left edge of the circle (around 9 o'clock position), 

curves upward through the center-top area, passes through center, 

curves downward through center-bottom area, exits at right edge (3 o'clock position).

This mimics the horizontal equatorial seam of a real basketball.

Seam 2 (vertical S-curve):

A cubic bezier path that starts at the top of the circle (12 o'clock),

curves left through center, passes through center,

curves right through center-bottom, exits at bottom (6 o'clock).

This mimics the vertical meridian seam.

Each seam: stroke #1A1A1A, stroke-width 2.5px, no fill.

Add a parallel path 4px away on each side of each seam in rgba(0,0,0,0.15) at 1px width — this creates the groove shadow effect real basketballs have.

```

Give this SVG description to your agent or draw it manually in Figma as two curved paths over an orange circle.

---

