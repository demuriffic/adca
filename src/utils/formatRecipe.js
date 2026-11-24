export function stripHtml(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent || '').trim()
}

export function getSteps(recipe) {
  const steps = (recipe.analyzedInstructions || []).flatMap((block) => block.steps.map((s) => s.step))
  if (steps.length) return steps
  const text = stripHtml(recipe.instructions || '')
  return text ? text.split(/\n+|(?<=\.)\s+(?=[A-Z])/).map((s) => s.trim()).filter(Boolean) : []
}

export function slugify(s = 'recipe') {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'recipe'
}

export function formatRecipe(recipe) {
  const lines = [recipe.title, '='.repeat(recipe.title.length), '']
  const meta = []
  if (recipe.servings) meta.push(`Servings: ${recipe.servings}`)
  if (recipe.readyInMinutes) meta.push(`Ready in: ${recipe.readyInMinutes} min`)
  if (meta.length) lines.push(meta.join(' | '), '')

  lines.push('INGREDIENTS')
  for (const ing of recipe.extendedIngredients || []) lines.push(`- ${ing.original}`)
  lines.push('')

  const steps = getSteps(recipe)
  lines.push('INSTRUCTIONS')
  if (steps.length) steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`))
  else lines.push('No instructions provided. See the source link.')
  lines.push('')

  if (recipe.sourceUrl) lines.push(`Source: ${recipe.sourceUrl}`)
  return lines.join('\n')
}
