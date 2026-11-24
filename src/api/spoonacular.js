const BASE = 'https://api.spoonacular.com'
const KEY = import.meta.env.VITE_SPOONACULAR_KEY

function cacheGet(k) {
  try {
    const v = sessionStorage.getItem(k)
    return v ? JSON.parse(v) : null
  } catch {
    return null
  }
}

function cacheSet(k, v) {
  try {
    sessionStorage.setItem(k, JSON.stringify(v))
  } catch {
    /* storage full or unavailable: skip caching */
  }
}

async function get(path, params = {}, { cache = true } = {}) {
  if (!KEY || KEY === 'your_key_here') {
    throw new Error('Missing API key. Add VITE_SPOONACULAR_KEY to your .env file and restart the dev server.')
  }
  const qs = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v)
  }
  const cacheKey = `sp:${path}?${qs}`
  if (cache) {
    const hit = cacheGet(cacheKey)
    if (hit) return hit
  }
  qs.set('apiKey', KEY)

  let res
  try {
    res = await fetch(`${BASE}${path}?${qs}`)
  } catch {
    throw new Error('Network error. Check your internet connection.')
  }
  if (!res.ok) {
    if (res.status === 402) throw new Error('Daily API limit reached. Try again tomorrow.')
    if (res.status === 401) throw new Error('Invalid API key. Check VITE_SPOONACULAR_KEY in .env.')
    if (res.status === 404) throw new Error('Not found.')
    throw new Error(`Request failed (${res.status}).`)
  }
  const data = await res.json()
  if (cache) cacheSet(cacheKey, data)
  return data
}

export const PAGE_SIZE = 12

export function searchRecipes({ query, ingredients = [], cuisine, diet, intolerances = [], type, maxReadyTime, offset = 0 }) {
  return get('/recipes/complexSearch', {
    query,
    includeIngredients: ingredients.join(','),
    cuisine,
    diet,
    intolerances: intolerances.join(','),
    type,
    maxReadyTime,
    sort: ingredients.length ? 'max-used-ingredients' : undefined,
    fillIngredients: true,
    addRecipeInformation: true,
    number: PAGE_SIZE,
    offset,
  })
}

export function getRecipe(id) {
  return get(`/recipes/${id}/information`, { includeNutrition: false })
}

export function randomRecipes({ tags = [], number = 6 } = {}) {
  // Never cached, so Shuffle always gives a fresh set
  return get('/recipes/random', { number, 'include-tags': tags.join(',') }, { cache: false })
}

export function autocompleteIngredient(query) {
  return get('/food/ingredients/autocomplete', { query, number: 5 })
}
