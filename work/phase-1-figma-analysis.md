# Phase 1 Figma Analysis

Source: `ki4BXvIoqd1WERQEzlbRbn`, node `413:23839`.

## Frame

- Desktop artboard: 1440 x 6909.
- Direction: RTL Arabic.
- Visual style: white canvas, navy primary text/buttons, bright orange primary CTA, soft blue borders/shadows, rounded 24-32px cards.
- Main container width: 1240px with 100px desktop side margins.

## Homepage Sections

1. Hero
   - Centered Arabic headline with split navy/orange emphasis.
   - Secondary muted description.
   - Three rounded hero value cards.
   - Orange CTA centered below cards.
2. Partners
   - Pill tag.
   - Center heading.
   - Horizontal logo row.
3. Services
   - Pill tag and title.
   - Masonry-like grid: one large AI card, four medium cards, one wide staffing card.
4. Why Us / Stats
   - Right text block with three inline stats.
   - Left vertical benefit cards.
5. Featured Work / Results
   - Three project cards with product screenshots and chip metadata.
   - Center CTA.
6. Methodology
   - Four timeline cards around a central numbered vertical line.
   - Center CTA.
7. CTA band
   - Large orange rounded band with robot imagery and white headline.

## Requested Sections Mapping

- Who Are We: implemented as the intro copy inside the Why Us section.
- Stats: implemented as CMS statistics within the Why Us section.
- Results: implemented as Featured Work cards and outcome copy.
- Blog Preview: not visible in the provided frame; create CMS-driven preview section after Featured Work/Methodology in the homepage module, visually consistent and lazy loaded.

## Architecture Notes

- Build only homepage route and supporting CMS/admin scaffolding.
- All visible strings and image URLs should be read from Payload globals/collections through a single home data adapter.
- Prefer server components for layout; reserve client components for motion wrappers.
- Dynamic import heavier below-the-fold sections.
- Use CSS logical properties and `dir="rtl"` to preserve accessibility and responsive behavior.
