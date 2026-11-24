import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { bigImage, pad, matchSummary, listToSentence } from '../utils/recipeBits.js'
import { formatRecipe } from '../utils/formatRecipe.js'
import { getRecipe } from '../api/spoonacular.js'

function Caption({ recipe, showMatch }) {
  const { used, missed } = matchSummary(recipe)
  if (showMatch && used.length) {
    return (
      <p className="slide-caption">
        Uses your {listToSentence(used)}.
        {missed.length ? <> You’ll need {listToSentence(missed)}.</> : <> Nothing else needed.</>}
      </p>
    )
  }
  const summary = [recipe.dishTypes?.[0], recipe.cuisines?.[0]].filter(Boolean).join(' · ')
  return summary ? <p className="slide-caption">{summary.charAt(0).toUpperCase() + summary.slice(1)}</p> : null
}

function Readout({ recipe, showMatch }) {
  const parts = []
  if (showMatch && recipe.usedIngredientCount !== undefined) {
    parts.push(`have ${recipe.usedIngredientCount}`, `need ${recipe.missedIngredientCount}`)
  }
  if (recipe.readyInMinutes) parts.push(`${recipe.readyInMinutes} min`)
  if (recipe.servings) parts.push(`serves ${recipe.servings}`)
  return <p className="readout">{parts.join(' · ')}</p>
}

export default function DishFeed({ recipes, total, showMatch, hasMore, loadingMore, onLoadMore, emptyState }) {
  const stageRef = useRef(null)
  const slideRefs = useRef([])
  const [active, setActive] = useState(0)
  const [shareMsg, setShareMsg] = useState('')
  const [copyMsg, setCopyMsg] = useState('')

  // Reset to the top whenever a new result set arrives
  const firstId = recipes[0]?.id
  useEffect(() => {
    setActive(0)
    stageRef.current?.scrollTo({ top: 0 })
  }, [firstId])

  // Track which dish owns the stage
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        }
      },
      { root: stage, threshold: 0.6 },
    )
    slideRefs.current.slice(0, recipes.length).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [recipes.length])

  // Fetch the next page as the visitor nears the end
  useEffect(() => {
    if (hasMore && !loadingMore && recipes.length && active >= recipes.length - 2) onLoadMore?.()
  }, [active, hasMore, loadingMore, recipes.length, onLoadMore])

  function go(i) {
    const clamped = Math.max(0, Math.min(recipes.length - 1, i))
    slideRefs.current[clamped]?.scrollIntoView({ block: 'start' })
  }

  function onKeyDown(e) {
    if (['ArrowDown', 'PageDown', 'j'].includes(e.key)) { e.preventDefault(); go(active + 1) }
    if (['ArrowUp', 'PageUp', 'k'].includes(e.key)) { e.preventDefault(); go(active - 1) }
  }

  // Copy the full recipe as text. Search results lack steps, so fetch details;
  // ClipboardItem with a promise keeps the user gesture alive while it loads (Safari).
  async function copy(recipe) {
    const textPromise = recipe.extendedIngredients
      ? Promise.resolve(formatRecipe(recipe))
      : getRecipe(recipe.id).then(formatRecipe)
    try {
      if (window.ClipboardItem && navigator.clipboard.write) {
        const blob = textPromise.then((t) => new Blob([t], { type: 'text/plain' }))
        await navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })])
      } else {
        await navigator.clipboard.writeText(await textPromise)
      }
      setCopyMsg('Copied')
    } catch {
      setCopyMsg('Open to copy')
    }
    setTimeout(() => setCopyMsg(''), 1800)
  }

  async function share(recipe) {
    const url = `${window.location.origin}/recipe/${recipe.id}`
    try {
      if (navigator.share) {
        await navigator.share({ title: recipe.title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setShareMsg('Link copied')
    } catch {
      return
    }
    setTimeout(() => setShareMsg(''), 1800)
  }

  if (!recipes.length) {
    return (
      <div className="feed feed-empty">
        <div className="stage-wrap">
          <div className="stage stage-empty">{emptyState}</div>
        </div>
      </div>
    )
  }

  const count = total || recipes.length

  return (
    <div className="feed">
      <div className="stage-wrap">
      <div
        className="stage"
        ref={stageRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Dishes. Use the up and down arrow keys to move between them."
      >
        {recipes.map((r, i) => (
          <article
            key={r.id}
            className={`slide${i === active ? ' is-active' : ''}`}
            data-index={i}
            ref={(el) => (slideRefs.current[i] = el)}
            aria-label={`${i + 1} of ${count}: ${r.title}`}
          >
            {r.image ? (
              <img className="slide-img" src={bigImage(r.image)} alt="" loading={i < 2 ? 'eager' : 'lazy'} />
            ) : (
              <div className="slide-img slide-img-missing" />
            )}
            <div className="slide-scrim" />
            <div className="slide-text">
              <h2 className="slide-title">
                <Link to={`/recipe/${r.id}`}>{r.title}</Link>
              </h2>
              <Readout recipe={r} showMatch={showMatch} />
              <Caption recipe={r} showMatch={showMatch} />
            </div>
            <div className="rail">
              <Link className="rail-btn" to={`/recipe/${r.id}`}>
                <Icon name="open" /><span>Open</span>
              </Link>
              <button type="button" className="rail-btn" onClick={() => copy(r)}>
                <Icon name="copy" /><span>{copyMsg && i === active ? copyMsg : 'Copy'}</span>
              </button>
              <button type="button" className="rail-btn" onClick={() => share(r)}>
                <Icon name="share" /><span>{shareMsg && i === active ? shareMsg : 'Share'}</span>
              </button>
              <button type="button" className="rail-btn" onClick={() => go(i - 1)} disabled={i === 0}>
                <Icon name="up" /><span>Previous</span>
              </button>
              <button type="button" className="rail-btn" onClick={() => go(i + 1)} disabled={i === recipes.length - 1}>
                <Icon name="down" /><span>Next</span>
              </button>
            </div>
          </article>
        ))}
        {loadingMore && <div className="slide slide-loading" aria-live="polite">Plating more dishes…</div>}
      </div>

      <div className="position" aria-hidden="true">
        <span className="position-pill">
          <span className="position-now">{pad(active + 1)}</span>
          <span className="position-total">/ {pad(count)}</span>
        </span>
      </div>
      </div>

      <aside className="queue" aria-label="Up next">
        <h2 className="queue-title">Up next</h2>
        <ol className="queue-list">
          {recipes.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                className={`queue-item${i === active ? ' is-active' : ''}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => go(i)}
              >
                <span className="queue-n">{pad(i + 1)}</span>
                <span className="queue-name">{r.title}</span>
                <span className="queue-meta">
                  {showMatch && r.usedIngredientCount !== undefined
                    ? `have ${r.usedIngredientCount} · need ${r.missedIngredientCount}`
                    : r.readyInMinutes ? `${r.readyInMinutes} min` : ''}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  )
}
