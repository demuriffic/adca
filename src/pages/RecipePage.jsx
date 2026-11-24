import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ExportBar from '../components/ExportBar.jsx'
import Icon from '../components/Icon.jsx'
import { getRecipe } from '../api/spoonacular.js'
import { getSteps } from '../utils/formatRecipe.js'
import { bigImage } from '../utils/recipeBits.js'

export default function RecipePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(() => new Set())

  useEffect(() => {
    let cancelled = false
    setRecipe(null)
    setError('')
    setDone(new Set())
    getRecipe(id)
      .then((r) => !cancelled && setRecipe(r))
      .catch((e) => !cancelled && setError(e.message))
    return () => { cancelled = true }
  }, [id])

  function back() {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  function toggle(key) {
    setDone((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  if (error) {
    return (
      <div className="recipe-status" role="alert">
        <h1 className="empty-title">We couldn’t open that recipe.</h1>
        <p className="empty-text">{error}</p>
        <button type="button" className="btn btn-ghost" onClick={back}>Go back</button>
      </div>
    )
  }
  if (!recipe) {
    return (
      <div className="recipe-status" aria-live="polite">
        <div className="empty-pulse" />
        <p className="readout">Setting the table…</p>
      </div>
    )
  }

  const steps = getSteps(recipe)
  const meta = [
    recipe.readyInMinutes && `${recipe.readyInMinutes} min`,
    recipe.servings && `serves ${recipe.servings}`,
    recipe.cuisines?.[0],
    recipe.diets?.slice(0, 2).join(', '),
  ].filter(Boolean)

  return (
    <article className="recipe">
      <div className="recipe-stage">
        {recipe.image && <img className="slide-img" src={bigImage(recipe.image)} alt="" />}
        <div className="slide-scrim" />
        <button type="button" className="btn btn-ghost btn-sm recipe-back no-print" onClick={back}>
          <Icon name="back" size={18} /> Back
        </button>
        <div className="recipe-head">
          <h1 className="recipe-title">{recipe.title}</h1>
          <p className="readout">{meta.join(' · ')}</p>
        </div>
      </div>

      <div className="sheet">
        <ExportBar recipe={recipe} />

        <section className="sheet-section" aria-labelledby="ing-h">
          <h2 id="ing-h" className="sheet-h">
            Ingredients <span className="sheet-count">{recipe.extendedIngredients?.length || 0}</span>
          </h2>
          <ul className="checklist">
            {recipe.extendedIngredients?.map((ing, i) => {
              const key = `i${i}`
              return (
                <li key={key}>
                  <label className={`check${done.has(key) ? ' is-done' : ''}`}>
                    <input type="checkbox" checked={done.has(key)} onChange={() => toggle(key)} />
                    <span className="check-box"><Icon name="check" size={14} /></span>
                    <span>{ing.original}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="sheet-section" aria-labelledby="steps-h">
          <h2 id="steps-h" className="sheet-h">
            Method <span className="sheet-count">{steps.length} steps</span>
          </h2>
          {steps.length ? (
            <ol className="steps">
              {steps.map((s, i) => {
                const key = `s${i}`
                return (
                  <li key={key} className={done.has(key) ? 'is-done' : ''}>
                    <button type="button" className="step" onClick={() => toggle(key)} aria-pressed={done.has(key)}>
                      <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="step-text">{s}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          ) : (
            <p className="sheet-muted">This recipe didn’t come with written steps. The original source has them.</p>
          )}
          {steps.length > 0 && <p className="sheet-hint">Tap a step to mark it done.</p>}
        </section>

        {recipe.sourceUrl && (
          <p className="sheet-source">
            Original recipe from{' '}
            <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">{recipe.sourceName || new URL(recipe.sourceUrl).hostname}</a>
            . Data by Spoonacular.
          </p>
        )}
      </div>
    </article>
  )
}
