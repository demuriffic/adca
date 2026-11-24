# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two equally important audiences:
- **The fridge-moment cook:** at home, often on a phone in the kitchen, deciding what to make from the ingredients already on hand.
- **The planner:** browsing ahead by cuisine and diet, and exporting recipes as text for notes or a shopping list.

## Product Purpose
A recipe finder that answers "what can I cook?" from what you have, what cuisine you want, or a recommendation. Success means a user goes from ingredients to a chosen recipe and its steps quickly, and can take the recipe with them as plain text.

## Positioning
No account, no database, nothing to sign up for: open it, enter ingredients, cook. Results are ranked by how many of *your* ingredients each dish uses, with what's missing named outright.

## Operating Context
- Online only. Recipe data comes live from the Spoonacular API (free tier, about 150 points a day).
- Export targets: clipboard, a .txt download, the native share sheet (e.g. phone Notes), and print.
- Used both in the kitchen on mobile and at a desk while planning.

## Capabilities and Constraints
- Search by ingredients (chips with autocomplete), cuisine, diet, intolerances, meal type, max time, and dish name.
- Recommend: random dishes, optionally filtered by cuisine or diet.
- Recipe detail: ingredients, steps, source attribution (required by Spoonacular).
- No login, no backend, no persistent storage beyond the browser session.
- Spoonacular attribution and source links must stay visible.

## Brand Commitments
- Name: **Adca**. Tagline: "Any dish, cook anytime."
- Voice: refined and warm, gracious like a good host, never stiff.
- Palette (user-pinned): Violet Indigo, Glamour Gold, Ivory White, Rich Black.
- Type (user-pinned): Jost for headings and buttons, Merriweather for body, Geist Mono for flavor text.

## Evidence on Hand
No testimonials, user counts, or press. Never invent any. Recipe imagery and content come from the API at runtime.

## Product Principles
1. Ingredients first: what the user already has is the main way in.
2. Tell people what's missing, not just what matches.
3. Zero friction: no accounts, no setup, no clutter in front of the recipe.
4. The recipe is portable: export is a first-class action, not an afterthought.
