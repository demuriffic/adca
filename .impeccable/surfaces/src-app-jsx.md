---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/pages/SearchPage.jsx","src/pages/RecommendPage.jsx","src/pages/RecipePage.jsx"]
---

# Surface brief: Adca app (Search, Recommend, Recipe)

Scope: the whole app shell and its three routes. Visitor mode: Operate.
Audience/job: home cooks deciding what to make from what they have (often phone, kitchen), and planners browsing ahead. Task: pantry → ranked dish → steps → export.
Constraints: pinned palette (Violet Indigo, Glamour Gold, Ivory White, Rich Black); pinned type (Jost headings/buttons, Merriweather body, Geist Mono flavor). Spoonacular attribution stays visible. Standard web controls.

## Direction contract

THESIS: One dish owns the frame. Results are a vertical snap feed of full-bleed dishes, not a grid of thumbnails; it refuses the recipe-site photo-card grid.

OWN-WORLD: Rich Black ground (#0E0B12) with violet-indigo panels (#24185A / #3B2A86), full-bleed food photography under a black bottom scrim, Glamour Gold (#C9A23A) as the single interface accent (focus rings, rail glyphs, match readouts), Ivory (#FAF6EA) for type and for the recipe reading sheet. Jost tracked caps on buttons, big Jost titles; Merriweather captions; Geist Mono readouts ("3 of 3 yours · 25 min"). Thin outline glyph rail on the right of each dish. Dot/position pager.

STORY: The visitor adds their pantry, sees the best match fill the stage with what they have and what's missing, flicks or uses the Up next queue to compare, opens one, cooks from an ivory reading sheet, and exports it.

FIRST VIEWPORT: Desktop: top bar (wordmark, Search/Recommend tabs). Left 320px indigo panel: pantry chips plus filters and the Find dishes button. Centre: a 9:16-ish stage with full height, the dish photo full-bleed, title/caption/match lower left, gold rail (Open, Copy, Share, Next) on the right. Right column: the Up next ranked queue with counts, which is the comparison list. Mobile: the stage fills the screen below the bar; filters live in a sheet.

FORM: Full-bleed vertical feed (catalog: pop-culture-shelf-vertical-video-feed-surface), chosen by the user from the bolder re-roll as competitive challenger, not my ordered list. seed:1c3006428c197f63

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: scroll-snap feed with keyboard ↑/↓ and the queue jumping the stage; a match readout per dish. Motion: hard snap, scrim fade on caption; reduced motion disables smooth scroll.

Unresolved: none.
