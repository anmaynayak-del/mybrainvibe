# MyBrainVibe Responsive Audit

## Methodology
- Captured baseline desktop screenshots at `1920`, `1536`, `1440`, `1366`, `1280`, `1024` widths (stored in `.responsive-audit/baseline/`).
- Captured mobile/tablet screenshots at `768`, `390`, `320` widths (stored in `.responsive-audit/mobile/`).
- Analyzed source code across `app/**`, `components/**`, and `globals.css` to identify responsive breaks, overflow risks, and hardcoded dimensions.

## Global Findings
- **Base Classes as Desktop Styles**: Most components utilize base unprefixed classes (e.g., `w-full`, `absolute`, `p-6`, `flex`, `grid`) designed implicitly for desktop canvas sizing. To adhere to Rule 1, these base classes will be left untouched. Mobile overrides must use `max-lg:`, `max-md:`, and `max-sm:` variants to strictly layer on top without altering the desktop baseline.
- **Horizontal Overflow**: `globals.css` applies `overflow-x: hidden` to the `body`, which masks horizontal overflow issues but can lead to content being clipped on mobile viewports.
- **GSAP / Animations**: Currently, no GSAP timelines or ScrollTriggers are explicitly defined in the components surveyed, but any future additions or modifications will strictly utilize `gsap.matchMedia()` for `max-width: 1023px` to preserve desktop behaviors.

---

## File-by-File Audit & Plan

### `components/Navbar.tsx`
- **Audit Findings**:
  - Desktop nav links are `hidden md:flex`. Since `md:` applies from `768px`, tablets (768px - 1023px) will attempt to display the full desktop navigation, which can cause overlap with the logo or CTA.
  - The "Book Assessment" CTA uses `hidden sm:flex`, rendering it visible at `640px+`. This can crowd the header on small tablets.
  - Hardcoded padding: `px-4 sm:px-6 lg:px-8`.
- **Proposed Plan (Stage 2-4)**:
  - Add `max-lg:hidden` to the desktop nav container (overriding `md:flex` implicitly for `<1024px`).
  - Keep the mobile menu toggle visible on `<1024px` using `max-lg:flex`.
- **Desktop Risk Rating**: **Low** (Using `max-lg:` guarantees `1024px+` stays exactly the same).

### `components/Hero/HeroSection.tsx`
- **Audit Findings**:
  - The sticky wrapper uses `h-screen`, which can cause issues with mobile browser chrome (address bars shrinking/expanding).
- **Proposed Plan**:
  - Layer `max-lg:h-[100dvh]` on the sticky wrapper.
- **Desktop Risk Rating**: **Low**.

### `components/Hero/CanvasSequence.tsx`
- **Audit Findings**:
  - The component dynamically calculates layout using JS. If `canvasRatio < 1` (portrait), it offsets `Y` by `15%`.
- **Proposed Plan**:
  - Adjust the `canvasRatio < 1` offset if testing reveals the 3D model overlaps text on specific mobile widths.
- **Desktop Risk Rating**: **Low** (Only affects `canvasRatio < 1`, which is intrinsically portrait).

### `components/Hero/HeroOverlays.tsx`
- **Audit Findings**:
  - **Phase 1 (Intro)**: Left and right blocks are absolutely positioned (`left-0`, `right-0`) with `w-full` on mobile. They may overlap text on small screens.
  - **Phase 2 (About)**: Both left and right content blocks have `top-[50%] -translate-y-1/2 w-full`. On mobile, they will render directly on top of one other.
  - **Phase 3 (Who We Serve)**: Interactive circular nodes use hardcoded inline positioning (`left: 6%`, `right: 6%`, `top: 50%`, `30%`, `70%`). Hover panels have a max-width up to `320px`, which will exceed the viewport on small mobile devices. Hover-only interactions (`onMouseEnter`) cannot be triggered properly on touch devices.
  - **Phase 4 (Offerings)**: Left and right blocks share identical absolute positioning constraints on mobile, causing severe overlap.
- **Proposed Plan**:
  - Apply `max-lg:relative`, `max-lg:top-auto`, `max-lg:translate-y-0` and CSS flex/grid stacking to correctly order the elements.
  - For Phase 3, swap hover interactions to tap/click for `max-lg:` or restructure the nodes into a vertical scrolling list using mobile-only overrides.
- **Desktop Risk Rating**: **Medium**. Extensive changes required for mobile, requiring careful use of `max-lg:` prefixes to ensure the complex desktop absolute positioning is untouched.

### `components/About/AboutSection.tsx`
- **Audit Findings**:
  - The right-side highlight card uses `sm:translate-y-8`, which might cause overflow or margin collapse on tablet devices if the container height isn't accommodating.
- **Proposed Plan**:
  - Add `max-lg:translate-y-0` or adjust the container's bottom padding for tablet/mobile.
- **Desktop Risk Rating**: **Low**.

### `components/ClinicalInsights/ClinicalInsightsSection.tsx`
- **Audit Findings**:
  - Structural layout uses `grid-cols-1 lg:grid-cols-12`, which safely falls back to a stacked layout on mobile.
  - Metric switcher tabs (`flex rounded-xl ... gap-1.5`) may squeeze text on `320px` width.
- **Proposed Plan**:
  - Apply `max-sm:flex-col` or `max-sm:overflow-x-auto` to the tabs to ensure readability.
- **Desktop Risk Rating**: **Low**.

### `components/WhatWeDo/WhatWeDoSection.tsx`
- **Audit Findings**:
  - Feature grid is `grid-cols-1 md:grid-cols-2 lg:gap-8`.
  - The metrics strip uses `grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0`. Applying `divide-y` on a 2-column grid will incorrectly add top borders to the 2nd item (which is in the first row).
- **Proposed Plan**:
  - Change mobile metrics border strategy: use `max-md:divide-y-0 max-md:gap-y-6` or target specific grid rows for borders.
- **Desktop Risk Rating**: **Low**.

### `components/WhoWeServe/WhoWeServeSection.tsx`
- **Audit Findings**:
  - Tab selector uses `grid-cols-2 lg:grid-cols-4`, which is safe.
  - Detail card uses `p-8 sm:p-12`. On `320px` width, `p-8` leaves very little room for content.
- **Proposed Plan**:
  - Reduce padding via `max-sm:p-5`.
- **Desktop Risk Rating**: **Low**.

### `components/Footer/Footer.tsx`
- **Audit Findings**:
  - Grid layout handles breakpoints well (`grid-cols-1 md:grid-cols-2 lg:grid-cols-5`). Text sizes are appropriately responsive.
- **Proposed Plan**:
  - Minimal changes needed. Ensure column spacing is adequate on mobile.
- **Desktop Risk Rating**: **None**.

---
*Audit completed.* 
