import { useEffect, useRef, useState } from 'react'
import { autocompleteIngredient } from '../api/spoonacular.js'
import Icon from './Icon.jsx'

export default function IngredientInput({ id, value, onChange }) {
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [highlight, setHighlight] = useState(-1)
  const timer = useRef()

  useEffect(() => {
    clearTimeout(timer.current)
    const q = text.trim()
    if (q.length < 2) {
      setSuggestions([])
      return
    }
    timer.current = setTimeout(() => {
      autocompleteIngredient(q)
        .then((list) => {
          setSuggestions(list.map((i) => i.name).filter((n) => !value.includes(n)))
          setHighlight(-1)
        })
        .catch(() => setSuggestions([]))
    }, 300)
    return () => clearTimeout(timer.current)
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

  function add(name) {
    const n = name.trim().toLowerCase()
    if (n && !value.includes(n)) onChange([...value, n])
    setText('')
    setSuggestions([])
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown' && suggestions.length) {
      e.preventDefault()
      setHighlight((h) => (h + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp' && suggestions.length) {
      e.preventDefault()
      setHighlight((h) => (h <= 0 ? suggestions.length - 1 : h - 1))
    } else if (e.key === 'Enter' || e.key === ',') {
      if (!text.trim() && e.key === 'Enter') return // let Enter submit the form when the field is empty
      e.preventDefault()
      add(highlight >= 0 ? suggestions[highlight] : text)
    } else if (e.key === 'Escape') {
      setSuggestions([])
    } else if (e.key === 'Backspace' && !text && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  const listId = `${id}-suggestions`

  return (
    <div className="ingredient-input">
      <div className="chips">
        {value.map((ing) => (
          <span key={ing} className="chip">
            {ing}
            <button type="button" className="chip-x" aria-label={`Remove ${ing}`} onClick={() => onChange(value.filter((v) => v !== ing))}>
              <Icon name="close" size={14} />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => setTimeout(() => setSuggestions([]), 150)}
          placeholder={value.length ? 'Add another…' : 'Chicken, rice, garlic…'}
          autoComplete="off"
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-controls={listId}
          aria-activedescendant={highlight >= 0 ? `${listId}-${highlight}` : undefined}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions" id={listId} role="listbox">
          {suggestions.map((s, i) => (
            <li key={s} id={`${listId}-${i}`} role="option" aria-selected={i === highlight}>
              <button type="button" tabIndex={-1} onMouseDown={(e) => e.preventDefault()} onClick={() => add(s)}>{s}</button>
            </li>
          ))}
        </ul>
      )}
      <p className="field-hint">Press Enter after each one.</p>
    </div>
  )
}
