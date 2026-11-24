# Adca

*Any dish, cook anytime.*

A recipe finder webapp. It runs entirely in the browser: no login, no database, no backend. Recipe data comes from the [Spoonacular API](https://spoonacular.com/food-api).

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and paste in your free Spoonacular key.
3. `npm run dev`

## Features
- Search by the ingredients you have, by cuisine, diet, intolerances, meal type, max time, or dish name
- Recommend random dishes, optionally filtered by cuisine or diet
- Export a recipe: copy it, download it as .txt, share it (mobile, e.g. to Notes), or print it

## Notes
- The free tier allows about 150 API points a day. Responses are cached in sessionStorage to save quota.
- Because the app is frontend-only, the API key ends up inside the JS bundle. Before deploying publicly, put a small serverless proxy (Cloudflare Worker, Netlify function) in front of the API.
