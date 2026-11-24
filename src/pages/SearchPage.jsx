import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import IngredientInput from '../components/IngredientInput.jsx'
import DishFeed from '../components/DishFeed.jsx'
import Icon from '../components/Icon.jsx'
import { searchRecipes } from '../api/spoonacular.js'
import { CUISINES, DIETS, INTOLERANCES, MEAL_TYPES } from '../data/filters.js'

const list = (s) => (s ? s.split(',').filter(Boolean) : [])

function paramsToForm(sp) {
  return {
    query: sp.get('q') || '',
    ingredients: list(sp.get('ing')),
    cuisine: sp.get('cuisine') || '',
    diet: sp.get('diet') || '',
    intolerances: list(sp.get('intol')),
    type: sp.get('type') || '',
    maxReadyTime: sp.get('time') || '',
  }
}

function formToParams(f) {
  const out = {}
  if (f.query) out.q = f.query
  if (f.ingredients.length) out.ing = f.ingredients.join(',')
  if (f.cuisine) out.cuisine = f.cuisine
  if (f.diet) out.diet = f.diet
  if (f.intolerances.length) out.intol = f.intolerances.join(',')
  if (f.type) out.type = f.type
  if (f.maxReadyTime) out.time = f.maxReadyTime
  return out
}

function summarize(f) {
  const bits = [...f.ingredients]
  if (f.cuisine) bits.push(f.cuisine)
  if (f.diet) bits.push(f.diet)
  if (f.type) bits.push(f.type)
  if (f.maxReadyTime) bits.push(`≤ ${f.maxReadyTime} min`)
  if (f.query) bits.push(`“${f.query}”`)
  return bits.length ? bits.join(' · ') : 'Everything'
}

export default function SearchPage() {
  const [sp, setSp] = useSearchParams()
  const spKey = sp.toString()
  const [form, setForm] = useState(() => paramsToForm(sp))
  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const hasSearched = spKey !== ''
  const active = paramsToForm(sp)

  // Search whenever the URL changes (submit, back button, shared link)
  useEffect(() => {
    const params = paramsToForm(new URLSearchParams(spKey))
    setForm(params)
    setError('')
    if (!spKey) {
      setResults([])
      setTotal(0)
      return
    }
    let cancelled = false
    setLoading(true)
    searchRecipes({ ...params, offset: 0 })
      .then((d) => {
        if (cancelled) return
        setResults(d.results)
        setTotal(d.totalResults)
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [spKey])

  function submit(e) {
    e.preventDefault()
    const p = formToParams(form)
    // An empty search still needs a URL param so it runs
    setSp(Object.keys(p).length ? p : { all: '1' })
    setPanelOpen(false)
  }

  function reset() {
    setForm(paramsToForm(new URLSearchParams()))
  }

  const loadMore = useCallback(async () => {
    setLoadingMore(true)
    try {
      const d = await searchRecipes({ ...paramsToForm(new URLSearchParams(spKey)), offset: results.length })
      setResults((r) => [...r, ...d.results.filter((x) => !r.some((y) => y.id === x.id))])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoadingMore(false)
    }
  }, [spKey, results.length])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const toggleIntol = (i) =>
    setForm({
      ...form,
      intolerances: form.intolerances.includes(i)
        ? form.intolerances.filter((x) => x !== i)
        : [...form.intolerances, i],
    })

  let emptyState
  if (loading) {
    emptyState = (
      <div className="empty" aria-live="polite">
        <div className="empty-pulse" />
        <p className="readout">Looking through the pantry…</p>
      </div>
    )
  } else if (error) {
    emptyState = (
      <div className="empty" role="alert">
        <h2 className="empty-title">That didn’t work.</h2>
        <p className="empty-text">{error}</p>
      </div>
    )
  } else if (hasSearched) {
    emptyState = (
      <div className="empty">
        <h2 className="empty-title">Nothing on the menu for that.</h2>
        <p className="empty-text">Try fewer filters, or swap an ingredient for something more common.</p>
        <button type="button" className="btn btn-ghost" onClick={() => setPanelOpen(true)}>Adjust search</button>
      </div>
    )
  } else {
    emptyState = (
      <div className="empty">
        <h2 className="empty-title">What’s in your kitchen?</h2>
        <p className="empty-text">
          Add the ingredients you have and we’ll find the dishes that use the most of them, and tell you exactly what’s missing.
        </p>
        <button type="button" className="btn btn-gold only-mobile" onClick={() => setPanelOpen(true)}>Add ingredients</button>
      </div>
    )
  }

  return (
    <div className="workspace">
      <div className="mobile-bar only-mobile">
        <p className="mobile-summary">{hasSearched ? summarize(active) : 'No search yet'}</p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPanelOpen(true)} aria-expanded={panelOpen} aria-controls="search-panel">
          <Icon name="filters" size={18} /> Filters
        </button>
      </div>

      <form id="search-panel" className={`panel${panelOpen ? ' is-open' : ''}`} onSubmit={submit}>
        <div className="panel-head">
          <h1 className="panel-title">Your pantry</h1>
          <button type="button" className="icon-btn only-mobile" onClick={() => setPanelOpen(false)} aria-label="Close filters">
            <Icon name="close" />
          </button>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="ingredient-entry">Ingredients you have</label>
          <IngredientInput id="ingredient-entry" value={form.ingredients} onChange={(ingredients) => setForm({ ...form, ingredients })} />
        </div>

        <div className="field-grid">
          <div className="field">
            <label className="field-label" htmlFor="f-cuisine">Cuisine</label>
            <select id="f-cuisine" value={form.cuisine} onChange={set('cuisine')}>
              <option value="">Any</option>
              {CUISINES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="f-diet">Diet</label>
            <select id="f-diet" value={form.diet} onChange={set('diet')}>
              <option value="">Any</option>
              {DIETS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="f-type">Meal</label>
            <select id="f-type" value={form.type} onChange={set('type')}>
              <option value="">Any</option>
              {MEAL_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="f-time">Ready within</label>
            <select id="f-time" value={form.maxReadyTime} onChange={set('maxReadyTime')}>
              <option value="">Any time</option>
              {[15, 20, 30, 45, 60, 90].map((m) => <option key={m} value={m}>{m} min</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="f-query">Dish name</label>
          <input id="f-query" value={form.query} onChange={set('query')} placeholder="Pasta, curry, tacos…" />
        </div>

        <fieldset className="field">
          <legend className="field-label">Leave out</legend>
          <div className="toggles">
            {INTOLERANCES.map((i) => (
              <label key={i} className="toggle">
                <input type="checkbox" checked={form.intolerances.includes(i)} onChange={() => toggleIntol(i)} />
                <span>{i}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="panel-actions">
          <button type="submit" className="btn btn-gold" disabled={loading}>{loading ? 'Searching…' : 'Find dishes'}</button>
          <button type="button" className="btn btn-text" onClick={reset}>Clear</button>
        </div>
        <p className="panel-note">Ranked by how much of your pantry each dish uses.</p>
      </form>
      {panelOpen && <div className="panel-backdrop only-mobile" onClick={() => setPanelOpen(false)} />}

      <DishFeed
        recipes={loading ? [] : results}
        total={total}
        showMatch={active.ingredients.length > 0}
        hasMore={results.length < total}
        loadingMore={loadingMore}
        onLoadMore={loadMore}
        emptyState={emptyState}
      />
    </div>
  )
}
