---
name: Adca
description: A pantry-first recipe finder where one full-bleed dish owns the frame, set in black, violet indigo, gold, and ivory.
colors:
  rich-black: "#0E0B12"
  rich-black-raised: "#17131E"
  indigo-night: "#1C1347"
  violet-indigo: "#24185A"
  violet-indigo-bright: "#3B2A86"
  violet-indigo-soft: "#6E5BC4"
  glamour-gold: "#C9A23A"
  glamour-gold-hi: "#DDB94F"
  ivory-white: "#FAF6EA"
  ivory-shade: "#F1EBD9"
  on-dark: "rgba(250, 246, 234, 0.92)"
  on-dark-muted: "rgba(250, 246, 234, 0.72)"
  on-dark-faint: "rgba(250, 246, 234, 0.6)"
  line-dark: "rgba(250, 246, 234, 0.16)"
  ink-muted: "#4E4858"
  line-light: "#DDD4BF"
typography:
  display:
    fontFamily: "'Jost Variable', 'Jost', system-ui, sans-serif"
    fontSize: "clamp(44px, 6.4vw, 96px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Jost Variable', 'Jost', system-ui, sans-serif"
    fontSize: "clamp(36px, 4.4vw, 68px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Jost Variable', 'Jost', system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Merriweather', Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-reading:
    fontFamily: "'Merriweather', Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Jost Variable', 'Jost', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "0.14em"
  label-small:
    fontFamily: "'Jost Variable', 'Jost', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.14em"
  readout:
    fontFamily: "'Geist Mono Variable', 'Geist Mono', ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.02em"
    fontFeature: "tnum"
rounded:
  check: "3px"
  control: "4px"
  sheet: "14px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  panel: "28px"
  xl: "36px"
  section: "44px"
  2xl: "64px"
components:
  button-gold:
    backgroundColor: "{colors.glamour-gold}"
    textColor: "{colors.rich-black}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  button-gold-hover:
    backgroundColor: "{colors.glamour-gold-hi}"
  button-dark:
    backgroundColor: "{colors.rich-black}"
    textColor: "{colors.ivory-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  button-dark-hover:
    backgroundColor: "{colors.violet-indigo-bright}"
  button-ghost:
    backgroundColor: "rgba(14, 11, 18, 0.25)"
    textColor: "{colors.ivory-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  button-ghost-small:
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "40px"
  chip-ingredient:
    backgroundColor: "{colors.ivory-white}"
    textColor: "{colors.violet-indigo}"
    rounded: "{rounded.control}"
    padding: "4px 4px 4px 12px"
  toggle-leave-out:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  toggle-leave-out-checked:
    backgroundColor: "{colors.glamour-gold}"
    textColor: "{colors.rich-black}"
  input-panel:
    backgroundColor: "rgba(14, 11, 18, 0.35)"
    textColor: "{colors.ivory-white}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  panel:
    backgroundColor: "{colors.violet-indigo}"
    textColor: "{colors.on-dark}"
    padding: "28px 28px 32px"
    width: "340px"
  topbar:
    backgroundColor: "{colors.rich-black}"
    textColor: "{colors.on-dark-muted}"
    padding: "0 24px"
    height: "60px"
  queue-item-active:
    backgroundColor: "{colors.violet-indigo}"
    textColor: "{colors.glamour-gold}"
    padding: "12px 20px"
  reading-sheet:
    backgroundColor: "{colors.ivory-white}"
    textColor: "{colors.rich-black}"
    typography: "{typography.body-reading}"
---

# Design System: Adca

## Overview

**Creative North Star: "The Dish Under the Spotlight"**

Adca is a dark stage with one lit plate on it. Rich Black is the room, violet indigo is the furniture (the pantry panel, the active queue row, the mobile bar), and the food photograph is the only thing in full colour: it fills its frame edge to edge under a black scrim that rises from the bottom so the Jost title, a gold Geist Mono readout, and a Merriweather caption can sit on it. Glamour Gold is the house light that picks out what you can act on: focus rings, the outline icon rail, the active tab underline, the primary action, the match readout.

When the visitor commits to a dish, the room changes. The recipe page splits into a sticky black photo stage on the left and an Ivory White reading sheet on the right, where the accent switches from gold to violet indigo and Merriweather sets the method at 17px with generous leading. The dark world is for choosing; the ivory sheet is for cooking.

Density is moderate and deliberate: tracked uppercase Jost on every control, hairline rules instead of boxes, mono numerals for every count. Nothing is a card. Results are a vertical scroll-snap feed of full-height dishes, never a thumbnail grid.

**Key Characteristics:**
- Rich Black ground, violet indigo panels, full-bleed photography under a bottom-weighted black scrim.
- Glamour Gold as the single accent on dark grounds; violet indigo as the accent on ivory.
- Jost for titles and tracked-caps controls, Merriweather for anything read as prose, Geist Mono for counts, readouts, and hints.
- Hairline rules (1px) and 4px corners; pills only for toggles and the position counter; circles only for icon buttons.
- One outline icon set: 24px grid, 1.5px stroke, round caps and joins.
- Motion is short colour fades (0.2s) plus a long expo-out ease for reveals and the mobile sheet.

## Colors

A four-colour pinned palette (Violet Indigo, Glamour Gold, Ivory White, Rich Black) built out into two grounds: a dark choosing world and an ivory reading world.

### Primary
- **Glamour Gold** (`glamour-gold`): the interface accent on every dark ground. Primary buttons, focus outlines, caret, text selection, the active tab underline, the rail icon strokes and their outline rings, the match readout, checked leave-out toggles, the select chevron, and the active queue title. On ivory it appears only as the 2px strike-through line on done ingredients and steps.
- **Gold Highlight** (`glamour-gold-hi`): hover state of the gold button only.

### Secondary
- **Violet Indigo** (`violet-indigo`): the panel colour. The pantry and filters panel, the mobile summary bar, the active queue row, the missing-image fallback, the suggestion hover, and the text colour of ivory ingredient chips.
- **Bright Violet Indigo** (`violet-indigo-bright`): the accent on ivory. Checkboxes, step numerals, section counts, source links, export status, and focus outlines inside the reading sheet; also the dark button hover and the scrollbar thumb.
- **Indigo Night** (`indigo-night`): the empty and loading stage behind the large display headline.
- **Soft Violet Indigo** (`violet-indigo-soft`): defined in the token set as the light end of the indigo family; not used on a shipped surface yet.

### Neutral
- **Rich Black** (`rich-black`): page ground, top bar, the feed stage, the dark export buttons, the scrim's solid end, and body text on the ivory sheet.
- **Raised Black** (`rich-black-raised`): the autocomplete suggestion list floating over the panel.
- **Ivory White** (`ivory-white`): headline and button text on dark, ingredient chips, and the recipe reading sheet ground.
- **Ivory Shade** (`ivory-shade`): hover fill on the chip remove control.
- **On-dark ramp** (`on-dark` / `on-dark-muted` / `on-dark-faint`): ivory at 92%, 72%, and 60% for body text, inactive tabs and labels, and hints and counts on dark grounds.
- **Dark hairline** (`line-dark`): ivory at 16% for top bar, queue, and list dividers on dark.
- **Muted Ink** (`ink-muted`): secondary text on ivory (7.9:1), including done items and the source line.
- **Light hairline** (`line-light`): dividers between ingredients, steps, and sections on the ivory sheet.

### Named Rules
**The Accent Follows the Ground Rule.** Gold is the accent on black and indigo; Bright Violet Indigo is the accent on ivory. Gold is never text on ivory.

**The Photograph Is the Colour Rule.** The interface stays within black, indigo, gold, and ivory so the dish photo is the only full-spectrum element on screen.

## Typography

**Display Font:** Jost Variable (with Jost, system-ui, sans-serif)
**Body Font:** Merriweather (with Georgia, serif)
**Label/Mono Font:** Geist Mono Variable (with Geist Mono, ui-monospace, monospace)

**Character:** A geometric sans with confident weight for names and controls, a sturdy screen serif for anything you read in sentences, and a mono that makes every number feel measured. All three are self-hosted.

### Hierarchy
- **Display** (Jost 600, `display`): empty, loading, and error headlines on the Indigo Night stage ("What's in your kitchen?").
- **Headline** (Jost 600, `headline`): the dish name over the photo in the feed. The recipe title uses the same voice slightly larger (clamp 40px to 80px, line-height 1.02, -0.02em). Both collapse to a fixed 34 to 36px on mobile and wrap with `text-wrap: pretty`.
- **Title** (Jost 500, `title`): reading-sheet section heads (Ingredients, Method), 26px on mobile; the panel title uses the same treatment at 28px.
- **Body** (Merriweather 400, `body`): dish captions (max 46ch), form values, empty-state copy at 18px/1.7 (max 44ch).
- **Body Reading** (Merriweather 400, `body-reading`): ingredients and method on the ivory sheet, capped at 68ch.
- **Label** (Jost 600, `label`, uppercase): all buttons; tabs use Jost 500 at the same size and tracking.
- **Label Small** (Jost 500, `label-small`, uppercase): field labels and the queue heading; rail labels use 12px at 0.08em.
- **Readout** (Geist Mono 400, `readout`, tabular numerals): the "have 3 · need 2 · 45 min" line, step numerals, queue numbers and meta, section counts, field hints, loading lines. Counts are zero-padded ("01 / 48").

### Named Rules
**The Three Voices Rule.** Jost names things and labels actions, Merriweather speaks in sentences, Geist Mono counts. Do not set a sentence in Jost or a number readout in Merriweather.

**The Tracked Caps Rule.** Every button and tab is uppercase Jost at 0.14em tracking (0.1em at the small size). The text-link button is the only exception: sentence case, underlined.

## Layout

A full-height application shell: a sticky 60px top bar, then a workspace that fills the remaining viewport. On desktop the workspace is a three-column grid: a 340px violet indigo panel, a centred stage capped at 760px wide, and a 300px "Up next" queue separated by a hairline. The stage is a vertical scroll-snap container (`y mandatory`, `snap-stop: always`) where each dish is exactly one viewport tall; a zero-padded position pill floats top left.

The recipe page is a 5:6 split: a sticky photo stage on the left at viewport height and the ivory reading sheet on the right, padded `40px clamp(24px, 5vw, 72px) 64px`, sections separated by 44px gaps.

Breakpoints: at 1180px the queue drops and the panel narrows to 320px. At 860px the workspace stacks: a 56px indigo summary bar with a Filters button sits above a full-width stage, the search panel becomes a bottom sheet (88dvh max, 14px top corners) over a 60% black backdrop, the Recommend panel stays inline in compact form, and the recipe becomes a single column with a 62dvh photo stage. At 420px the attribution shortens to the Spoonacular link.

Spacing runs on an 8px base with a few named steps: 8px between chips and toggles, 16px mobile gutters, 24px desktop gutters, 28px panel padding, 36px caption inset above the slide bottom, 44px between sheet sections, 64px sheet bottom padding.

Print hides the top bar, photo, checkboxes, hints, and export controls and sets the sheet in black on white at 11pt.

## Elevation & Depth

Mostly flat. Depth comes from ground changes (black to indigo to ivory) and from the photograph under its scrim, not from shadows. Shadows appear only on elements that float over other content.

### Shadow Vocabulary
- **Floating list** (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45)`): the ingredient autocomplete over the panel.
- **Bottom sheet** (`box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.5)`): the mobile filters sheet rising over the stage.

### Scrim
The slide and recipe stages layer two gradients over the photo: from the bottom, solid Rich Black to 90% at 28%, 45% at 48%, clear by 66%; from the top, 45% to clear by 18% so the position pill and back button stay legible. Translucent black fills (25% to 70%) back the ghost button, rail rings, and position pill on photos.

### Named Rules
**The Float-Only Shadow Rule.** A shadow means the element sits above another layer (dropdown, sheet). Resting surfaces never carry one.

## Shapes

Quiet, mostly square geometry. Buttons, inputs, selects, chips, the chip field, and the suggestion list share a 4px corner (`control`); the ingredient checkbox is 3px. Pills (`pill`) are reserved for the leave-out toggles and the position counter. Circles (`circle`) are reserved for icon buttons: rail rings, the chip remove target, the panel close button, the loading pulse. The mobile filter sheet takes 14px top corners. Borders are 1px hairlines everywhere; the checkbox stroke is 1.5px and tab and title underlines are 2px.

Icons are one inline-SVG outline set on a 24px grid at 1.5px stroke with round caps and joins, sized 14px (chip, check), 18px (buttons), or 22px (rail).

## Components

### Buttons
Firm, tracked, and full-height for thumbs.
- **Shape:** gently squared (4px), 48px tall, 22px side padding; small size 40px tall, 14px padding, 13px at 0.1em.
- **Gold (primary):** Glamour Gold fill, Rich Black text. One per view: Find dishes, Surprise me, Add ingredients.
- **Dark:** Rich Black fill, Ivory text, used on the ivory sheet for export actions with an 18px leading icon. Hover fills Bright Violet Indigo.
- **Ghost:** translucent black fill with a 45% ivory border, for actions over photos or dark empty states (Back, Go back, Adjust search). Hover lifts to a 10% ivory fill and a solid ivory border.
- **Text:** sentence case, underlined, muted ivory (Clear); hover brightens to ivory.
- **Hover / Focus:** 0.2s colour transitions; 2px gold focus outline at 2px offset (indigo on the ivory sheet). Disabled drops to 60% opacity.

### Chips
- **Ingredient chip:** Ivory fill, Violet Indigo Jost 500 at 15px, 4px corners, with a 26px circular remove target carrying a 14px close icon. Chips sit inside a field that matches the panel inputs and turns gold on focus.
- **Leave-out toggle:** a 1px 30%-ivory outlined pill in Jost 14px. Hover brightens border and text to ivory; checked fills Glamour Gold with Rich Black text and strikes the word through, because checked means "leave this out".

### Cards / Containers
There are no cards. Containers are grounds: the indigo panel (28px padding, 22px gaps), the black queue column with hairline-separated rows, and the ivory sheet. Lists on the sheet are separated by light hairlines above and below each row.

### Inputs / Fields
- **Style:** 44px tall, 35% black fill over indigo, 22% ivory hairline, 4px corners, Merriweather 15px in ivory, faint ivory placeholder. Selects are custom-drawn with a gold chevron.
- **Focus:** border turns Glamour Gold; keyboard focus adds a 1px gold ring.
- **Labels:** Label Small caps above each field; Geist Mono 12px hints below.

### Navigation
Top bar on Rich Black with a hairline bottom border: the Jost 600 22px wordmark, then Search and Recommend tabs in tracked caps at 72% ivory. Hover goes to ivory; the active tab is ivory with a 2px gold underline flush to the bar's bottom edge. On desktop (above 1180px) the tagline "Any dish, cook anytime." sits right-aligned in gold Geist Mono 13px, followed by the Spoonacular attribution in faint Merriweather 13px. On mobile the tabs tighten to 13px at 0.1em.

### Dish Slide (signature)
A full-height snap slide: photo covering the frame (positioned at 65% vertically so plates sit in view), the double scrim, then bottom-left text with the Headline title, gold readout, and Merriweather caption. Inactive slides hold the text at 50% opacity, 10px low; the active slide brings it to full over 0.6s on the expo-out ease. Arrow keys, Page Up/Down, and j/k move between slides.

### Action Rail (signature)
A right-edge vertical stack of 64px-wide buttons (Open, Copy, Share, Previous, Next): a 22px gold outline icon in a 12px-padded circle with a 70% gold hairline over 45% black, and a 12px tracked-caps ivory label below. Hover fills the circle gold with a black icon. Disabled ends fall to 35% opacity.

### Up Next Queue (signature)
A 300px ranked list: mono zero-padded number in a 30px column, Jost 500 15px dish name, mono "have · need" meta. Hover tints Bright Violet Indigo at 30%; the active row fills Violet Indigo and turns its name gold. Clicking jumps the stage.

### Reading Checklist
Ingredients are rows with a 22px indigo-stroked checkbox; steps are full-width buttons with a 48px mono numeral column. Done items go Muted Ink with a 2px gold strike-through, and the checkbox fills indigo with an ivory check.

## Do's and Don'ts

### Do:
- **Do** use Glamour Gold for the one primary action per view, for focus, and for readouts on dark grounds; switch to Bright Violet Indigo for the same jobs on the ivory sheet.
- **Do** set every count and numeral in Geist Mono with tabular figures, zero-padded where it ranks (01, 02).
- **Do** put text on photography only over the bottom scrim, and back any control on a photo with a translucent black fill.
- **Do** keep controls at least 44px tall (48px for primary buttons) and give every interactive element the 2px focus outline.
- **Do** use 1px hairlines (`line-dark` on dark, `line-light` on ivory) to separate rows instead of boxing them.
- **Do** honour reduced motion: smooth scroll and transitions switch off and slide text shows at full opacity.

### Don't:
- **Don't** present results as a grid of thumbnail cards; one dish fills the frame at a time.
- **Don't** set gold text on the ivory sheet; gold appears there only as the strike-through line.
- **Don't** add shadows to resting surfaces; reserve them for the dropdown and the mobile sheet.
- **Don't** introduce a second icon style, filled icons, or emoji and text glyphs as icons; extend the 24px, 1.5px-stroke outline set.
- **Don't** round controls beyond 4px; pills belong to toggles and the position counter, circles to icon buttons.
- **Don't** set prose in Jost or readouts in Merriweather.
