import { useState } from 'react'
import Icon from './Icon.jsx'
import { formatRecipe, slugify } from '../utils/formatRecipe.js'

export default function ExportBar({ recipe }) {
  const [status, setStatus] = useState('')
  const text = formatRecipe(recipe)
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  function flash(msg) {
    setStatus(msg)
    setTimeout(() => setStatus(''), 2000)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      flash('Copied to clipboard')
    } catch {
      flash('Couldn’t copy. Try Download instead.')
    }
  }

  function download() {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slugify(recipe.title)}.txt`
    a.click()
    URL.revokeObjectURL(url)
    flash('Saved as a .txt file')
  }

  async function share() {
    try {
      await navigator.share({ title: recipe.title, text })
    } catch {
      /* dismissed */
    }
  }

  return (
    <div className="export no-print">
      <div className="export-actions" role="group" aria-label="Take this recipe with you">
        <button type="button" className="btn btn-dark" onClick={copy}><Icon name="copy" size={18} />Copy text</button>
        <button type="button" className="btn btn-dark" onClick={download}><Icon name="download" size={18} />Download .txt</button>
        {canShare && <button type="button" className="btn btn-dark" onClick={share}><Icon name="share" size={18} />Share to Notes</button>}
        <button type="button" className="btn btn-dark" onClick={() => window.print()}><Icon name="print" size={18} />Print</button>
      </div>
      <p className="export-status readout" aria-live="polite">{status}</p>
    </div>
  )
}
