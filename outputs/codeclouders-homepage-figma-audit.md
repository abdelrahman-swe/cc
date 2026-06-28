# CodeClouders Homepage Figma Audit

Source: https://www.figma.com/design/ki4BXvIoqd1WERQEzlbRbn/Codeclouders.web?node-id=413-23839&m=dev  
Node: `413:23839`  
Target: literal frontend implementation of the Arabic RTL homepage only.

## Current Validation Snapshot

- TypeScript: `npm.cmd run typecheck` passes.
- Referenced frontend assets in `src/features/home/LiteralHomePage.tsx`: all checked paths exist.
- Current local screenshot: `outputs/codeclouders-home-audit-current.png`.
- Current route intent: frontend-only literal implementation through `src/app/[locale]/page.tsx` -> `src/features/home/LiteralHomePage.tsx`.
- Payload/CMS is not required for the literal visual pass.

## Non-Negotiable Pixel Goals

The page is only done when the rendered `/ar` page visually matches the Figma frame at desktop `1440px` width:

1. Desktop frame width is `1440px`.
2. Main content container is `1240px`.
3. Desktop side margin is `100px`.
4. Direction is document-level RTL via `dir="rtl"`.
5. No section may be added that is not visible in the Figma homepage frame.
6. All visible Arabic copy must render as Arabic, not mojibake.
7. All cards, logos, images, CTA positions, and footer columns must match the Figma order.
8. The page should be compared with screenshots at `1440x4096` and top viewport `1440x1100`.

## Design Tokens

### Color

| Token | Value | Usage |
|---|---:|---|
| `primary` | `#F15722` | Orange CTA, headline emphasis, stats numbers, timeline nodes |
| `primary-light` | `#F4794E` | Hover/soft orange accents |
| `primary-accent` | `#FCDDD3` | Timeline line, light orange borders |
| `primary-soft` | `#FEEEE9` | Icon backgrounds and orange pills |
| `secondary` | `#243A77` | Main navy text, nav CTA, secondary CTAs |
| `secondary-space` | `#0D193B` | Footer background |
| `secondary-dark` | `#0E1730` | Body/headline dark text |
| `secondary-midnight` | `#070C18` | Deep footer/edge dark |
| `neutral-white` | `#FFFFFF` | Page/card background |
| `mutedText` | `#74829A` | Paragraphs and secondary labels |
| `softBackground` | `#FAFBFF` | Light card/image backgrounds |
| `borderSoft` | `#EEF2F8` | Default section/card border |
| `borderBlue` | `#CFE0FF` | Hero value card border |
| `borderOrange` | `#F1D5CC` | AI/service subcard and orange accent cards |

### Typography

Primary font: `Thmanyah Sans`.

Required font files:

- `/font/thmanyah-typeface/thmanyahsans/woff2/thmanyahsans-Regular.woff2`
- `/font/thmanyah-typeface/thmanyahsans/woff2/thmanyahsans-Medium.woff2`
- `/font/thmanyah-typeface/thmanyahsans/woff2/thmanyahsans-Bold.woff2`
- `/font/thmanyah-typeface/thmanyahsans/woff2/thmanyahsans-Black.woff2`

Rules:

- Use `font-display: swap`.
- Disable synthetic weight with `font-synthesis-weight: none`.
- Do not default homepage headings to serif unless the Figma text style explicitly calls for it.
- Keep letter spacing at `0`.
- Text must not use viewport-scaled font sizing.

Desktop type scale:

| Element | Size | Weight | Notes |
|---|---:|---:|---|
| Nav links | `15px` | `500` | Active link orange/bold |
| Hero headline | `52px` | `900` | Navy with orange inline emphasis |
| Hero subtitle | `16px` | `400` | Muted, centered |
| Section tag | `15px` | `500` | Pill, muted |
| Section heading | `32px` | `700` | Navy |
| Service/project card title | `22px` | `700` | Dark |
| Body text | `15px` | `400` | Muted, `~28px` line height |
| Stats numbers | `30px` | `900` | Orange |
| Footer text | `15px` | `400/700` | White/white alpha |

### Layout

Global:

- `max-width: 1240px`
- desktop margin: `100px`
- grid: 12 columns
- bento/card gap: `24px`
- list gap: `32px`

Desktop Figma section dimensions:

| Section | Figma Y | Height | Required Notes |
|---|---:|---:|---|
| Nav | `0` | `100` | Nav container `1240x56`, y `22` |
| Hero | `100` | `995` | Heading centered, cards at y `438` relative to hero |
| Partners | `1095` | `392` | Title block y `64`, logos y `192` |
| Services | `1487` | `1725` | `1240px` bento grid, `24px` gaps |
| Who/Stats/Why | `3212` | `796` | Left benefits, right intro/stats |
| Featured Work | `4008` | `937` | Three `397px` cards |
| Methodology | `4945` | `1024` | Center numbered timeline |
| Contact CTA | `5969` | `584` | Orange band `1240x456` |
| Footer | `6553` | `356` | Container `1200x193`, y `64` |

### Radii

| Token | Value | Usage |
|---|---:|---|
| `card` | `50px` | Hero/service cards |
| `subcard` | `16px` | AI card inner panel |
| `button` | `50.5px` | CTAs |
| `contactBand` | `32px` | Orange contact section |
| `projectCard` | `28px` | Featured work cards |
| `projectImage` | `18px` | Project image crop |

### Shadows And Borders

- Default card shadow: `0 18px 44px rgba(14, 23, 48, 0.04)`.
- Hero card shadow: `0 20px 50px rgba(36, 58, 119, 0.06)`.
- Button shadow: `0 12px 28px rgba(14, 23, 48, 0.12)`.
- Default card border: `1px solid #EEF2F8`.
- Hero card border: `1px solid #CFE0FF`.
- Orange subcard border: `1px solid #F1D5CC`.

## Required Assets

Use these assets from `public/` for the literal implementation.

### Brand

- `/Logo.svg` for nav and footer logo.

### Hero

- `/footer.svg` or `/images/hero-blur-orange.svg` for the soft wave/blur.
- `/images/hero-card-orange.svg` for hero-card soft background.
- `/images/chart-orange.svg` for chart card visual.

### Partner Logos

Visual order must match the Figma row:

- `/images/sadia.svg`
- `/images/stc.svg`
- `/images/mada.svg`
- `/media/nafath.svg`
- `/images/naama.svg`
- `/images/noboco.svg`

### Services

- `/mockups/mascot_web.png`
- `/mockups/3aloolo.png`
- `/mockups/Mockup 14.png`
- `/mockups/Dashboard 1.png`
- `/images/service-image.svg`
- `/images/service-image-3.png`
- `/images/globe.svg`
- Optional exact block reference: `/images/blocks/services-preview.png`

### Featured Work

- `/media/red-cresent.png`
- `/mockups/Mockup 14.png`

### Contact CTA

- `/mockups/mascot.png`
- `/mockups/mascot_arm_front.png`

### Footer

- `/icons/twitter.svg`
- `/icons/email.svg`
- `/icons/Vector.svg`
- `/icons/mouse.svg`

### Do Not Use For Final Pixel Match

The generated fallback assets under `/assets/home/*` are useful placeholders but are not the literal Figma asset set. Do not use them for final visual parity.

## Section Implementation Specs

### 1. Navbar

Figma:

- Frame: `1440x100`.
- Nav container: x `100`, y `22`, width `1240`, height `56`.
- Logo: `160x39`, visually on the right.
- CTA: `160x56`, visually on the left.
- Menu group: centered width `920`, y `13`, height `30`.

Acceptance:

- Active link is `الرئيسية` in orange.
- CTA is navy, pill radius `50.5px`, 40px circular arrow icon.
- Logo is exactly `/Logo.svg`, not recreated.

### 2. Hero

Figma:

- Section y `100`, height `995`.
- Headline block: x `394`, y `64`, width `652`, height `214`.
- Hero cards group: x `96`, y `438`, width `1248`, height `373`.
- CTA: x `591`, y `875`, width `258`, height `56`.

Acceptance:

- Hero headline is centered and split: navy base, orange word emphasis.
- Hero subtitle is centered below headline.
- Three cards are `~397x373`, gap `24px`, radius `50px`.
- RTL visual order must be:
  1. right: button/decision card
  2. middle: process/understanding card
  3. left: chart/clarity card
- Orange CTA is centered below cards.

### 3. Partners

Figma:

- Section y `1095`, height `392`.
- Inner container: x `100`, y `64`, width `1240`, height `264`.
- Title block height `112`.
- Logo row y `192`, height `72`.

Acceptance:

- Tag says `شركاء النجاح`.
- Heading says `علامات تشاركنا شغف التميز في حضورها الرقمي`.
- Logos are muted/gray and evenly distributed across `1240px`.

### 4. Services

Figma:

- Section y `1487`, height `1725`.
- Inner container: x `100`, y `64`, width `1240`, height `1597`.
- Title block: height `112`.
- Grid starts y `167.75`.
- Gap: `24px`.

Desktop grid:

- First row:
  - Left wide AI card: x `0`, width `818`, height `530.75`.
  - Right service card: x `842`, width `397`, height `530.75`.
- Second row:
  - Three service cards: x `0`, `421`, `842`, each `397x530.75`.
- Third row:
  - Wide staffing card: x `0`, y `1109.5`, width `1240`, height `320`.
  - Image side: width `815`.
  - Text side begins around x `871`, width `369`.

Acceptance:

- Card radius is `50px`.
- Inner AI panel radius is `16px`.
- Service card images use actual public mockups.
- Text hierarchy and image scale must match `/images/blocks/services-preview.png`.

### 5. Who Are We / Stats / Why Us

Figma:

- Section y `3212`, height `796`.
- Inner: x `100`, y `64`, width `1240`, height `668`.
- Benefit cards: x `0`, width `580`, four cards, each `580x143`, vertical gap `32`.
- Intro/stats block: x `653`, width `587`.

Acceptance:

- Benefits must sit visually left.
- Intro/stats must sit visually right.
- Three stats appear inline under paragraph:
  - `+200` مشروع
  - `+150` عميل
  - `+10` سنوات
- CTA is navy and placed under stats.

### 6. Featured Work / Results

Figma:

- Section y `4008`, height `937`.
- Inner: x `100`, y `64`, width `1240`, height `818.854`.
- Cards row: y `168`, three columns x `0`, `421`, `842`, width `397`, height `538.854`.
- Project image area: `365x445`.
- CTA: x `508`, y `762.854`, width `224`, height `56`.

Acceptance:

- Three project cards in one row.
- Each has image, category pill, Arabic project title, and arrow-up icon.
- Use actual project images, not generic English preview art.

### 7. Methodology

Figma:

- Section y `4945`, height `1024`.
- Title block: x `100`, y `64`, width `1240`, height `112`.
- Left cards group: x `100`, y `379`, width `564`, height `447`.
- Right cards group: x `792`, y `240`, width `560`, height `437`.
- Center timeline: x `696`, y `216`, width `64`, height `656`.
- CTA: x `627`, y `904`, width `186`, height `56`.

Acceptance:

- Center line is vertical and orange-soft.
- Number nodes are orange circles.
- Cards alternate around timeline:
  - step 1 right
  - step 2 left
  - step 3 right
  - step 4 left
- Cards are `~560x148`.

### 8. Contact CTA

Figma:

- Section y `5969`, height `584`.
- Inner: x `100`, y `64`, width `1240`, height `456`.
- Orange band radius `32px`.
- Left visual robot/image area.
- Text group: x `566`, y `96`, width `634`, height `211`.
- CTA inside text group: x `376`, y `155`, width `258`, height `56`.

Acceptance:

- Orange background is exactly `#F15722`.
- Robot image visually overlaps lower/left area like Figma.
- Text is white, large, right aligned in RTL.
- CTA is white pill with orange text.

### 9. Footer

Figma:

- Section y `6553`, height `356`.
- Footer container: x `120`, y `64`, width `1200`, height `193`.
- Logo: x `1040`, y `0`, `160x39`.
- Copyright: x `120`, y `297`, width `1200`, height `15`.

Acceptance:

- Background is `#0D193B`.
- Columns match visual order: social, address/contact, links, logo.
- Footer logo must be visible on dark background.

## RTL Rules

- Use document-level `dir="rtl"` from app layout.
- Prefer logical Tailwind properties: `ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`.
- Do not rely on random `flex-row-reverse` unless matching a specific Figma coordinate.
- Grid auto-placement in RTL can visually reverse desktop columns. For pixel-perfect sections, order DOM or assign explicit grid columns so x positions match Figma.
- Arrow icons should point visually the same way as Figma; in RTL this often requires explicit rotation or choosing `ArrowLeft`.

## Current Implementation Audit

### Already In Place

- `/ar` renders a frontend-only literal page.
- `Thmanyah Sans` is loaded in `src/app/globals.css`.
- Tailwind brand colors match the design-system token file.
- Every asset path referenced by `LiteralHomePage.tsx` currently exists.
- `npm.cmd run typecheck` passes.
- Main page uses `1240px` max container and desktop section heights close to Figma.

### Must Fix Before Calling It 100%

1. Verify the current page screenshot against the Figma screenshot after the latest grid-order fixes.
2. Ensure all Arabic strings display correctly in browser and source editor.
3. Remove or avoid non-Figma decorative fallbacks from `/assets/home/*`.
4. Replace any generic or English preview imagery with actual Figma/public project assets.
5. Confirm services grid x positions exactly match Figma:
   - AI wide card left, `818px`.
   - service card right, `397px`.
   - second row three cards.
   - staffing wide card full width.
6. Confirm who/stats section x positions:
   - benefits left, intro/stats right.
7. Confirm methodology alternation:
   - step 1 right, step 2 left, step 3 right, step 4 left.
8. Confirm contact CTA robot placement:
   - visual should not be clipped incorrectly at desktop.
9. Confirm footer logo contrast:
   - if `/Logo.svg` is dark-only, use a white logo asset or CSS filter that matches Figma.
10. Run final validation:
   - `npm.cmd run typecheck`
   - `npm.cmd run build`
   - screenshot `1440x1100`
   - screenshot `1440x4096`
   - mobile screenshot at `390px`

## Done Checklist

Use this as the final review gate.

- [ ] Browser route `/ar` does not fetch homepage content from Payload for the literal design pass.
- [ ] `html` has `dir="rtl"` and `lang="ar"`.
- [ ] Fonts load from `/public/font/thmanyah-typeface`.
- [ ] Primary font is `Thmanyah Sans`.
- [ ] Desktop container is exactly `1240px`.
- [ ] Nav height is `100px`.
- [ ] Hero height is `995px`.
- [ ] Hero cards are `373px` tall with `50px` radius.
- [ ] Partners section height is `392px`.
- [ ] Services section height is `1725px`.
- [ ] Services bento grid uses `24px` gaps and `50px` card radius.
- [ ] Who/stats section height is `796px`.
- [ ] Featured work section height is `937px`.
- [ ] Featured work cards are `397px` wide.
- [ ] Methodology section height is `1024px`.
- [ ] Contact CTA section height is `584px`.
- [ ] Footer height is `356px`.
- [ ] All required images listed above are used and loaded.
- [ ] No visible text overlaps at `1440px`, `1024px`, `768px`, and `390px`.
- [ ] Motion, if kept, respects `prefers-reduced-motion`.
- [ ] Final screenshots are reviewed against Figma, not just against code.
