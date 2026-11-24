import { useState } from 'react'
import DishFeed from '../components/DishFeed.jsx'
import Icon from '../components/Icon.jsx'
import { randomRecipes } from '../api/spoonacular.js'
import { CUISINES, DIETS } from '../data/filters.js'

const STORAGE_KEY = 'recommend:last'

function loadSaved() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function RecommendPage() {
  const [cuisine, setCuisine] = useState('')
  const [diet, setDiet] = useState('')
  // Restore the last set so returning from a recipe costs no API points
  const [recipes, setRecipes] = useState(loadSaved)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function shuffle(e) {
    e?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const tags = [cuisine, diet].filter(Boolean).map((t) => t.toLowerCase())
      const d = await randomRecipes({ tags, number: 8 })
      setRecipes(d.recipes)
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d.recipes)) } catch { /* storage unavailable */ }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  let emptyState
  if (loading) {
    emptyState = (
      <div className="empty" aria-live="polite">
        <div className="empty-pulse" />
        <p className="readout">Choosing something good…</p>
      </div>
    )
  } else if (error) {
    emptyState = (
      <div className="empty" role="alert">
        <h2 className="empty-title">That didn’t work.</h2>
        <p className="empty-text">{error}</p>
      </div>
    )
  } else {
    emptyState = (
      <div className="empty">
        <h2 className="empty-title">Let us choose tonight.</h2>
        <p className="empty-text">Pick a cuisine or diet if you have a mood in mind, or leave it open, and press Surprise me.</p>
      </div>
    )
  }

  return (
    <div className="workspace">
      <form className="panel panel-compact" onSubmit={shuffle}>
        <div className="panel-head">
          <h1 className="panel-title">Recommend</h1>
        </div>
        <div className="field-grid field-grid-stack">
          <div className="field">
            <label className="field-label" htmlFor="r-cuisine">Cuisine</label>
            <select id="r-cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="">Any</option>
              {CUISINES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="r-diet">Diet</label>
            <select id="r-diet" value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option value="">Any</option>
              {DIETS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="panel-actions">
          <button type="submit" className="btn btn-gold" disabled={loading}>
            <Icon name="shuffle" size={18} />
            {loading ? 'Choosing…' : recipes.length ? 'Shuffle' : 'Surprise me'}
          </button>
        </div>
        <p className="panel-note">Eight dishes at a time, chosen at random.</p>
      </form>

      <DishFeed recipes={loading ? [] : recipes} emptyState={emptyState} />
    </div>
  )
}
