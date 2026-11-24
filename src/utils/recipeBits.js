// Spoonacular serves the same photo at several sizes; the stage wants the largest.
export function bigImage(url) {
  if (!url) return ''
  return url.replace(/-\d+x\d+\.(jpg|jpeg|png)$/i, '-636x393.$1')
}

export function pad(n) {
  return String(n).padStart(2, '0')
}

// Used/missed ingredients from complexSearch (fillIngredients=true)
export function matchSummary(recipe) {
  const used = (recipe.usedIngredients || []).map((i) => i.name)
  const missed = (recipe.missedIngredients || []).map((i) => i.name)
  return { used, missed, hasMatch: recipe.usedIngredientCount !== undefined }
}

export function listToSentence(items, max = 4) {
  const shown = items.slice(0, max)
  const rest = items.length - shown.length
  if (rest > 0) shown.push(`${rest} more`)
  if (shown.length <= 1) return shown.join('')
  return `${shown.slice(0, -1).join(', ')} and ${shown[shown.length - 1]}`
}
