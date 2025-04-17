function getDynamicClasses(raw: string): { optional: string[]; unstable: string[] } {
  const optional = new Set<string>()
  const unstable = new Set<string>()

  // detect array syntax like ['slider', type]
  const arrayExpr = raw.match(/^\s*\[([^\]]+)\]\s*$/)
  if (arrayExpr) {
    const items = arrayExpr[1].split(',').map(i => i.trim())

    for (const item of items) {
      // string literal class
      const literalMatch = item.match(/^['"](.+)['"]$/)
      if (literalMatch) {
        const classes = literalMatch[1].split(' ')
        classes.forEach(cl => optional.add(cl))
        continue
      }

      // dynamic binding to prop or variable
      if (/^[a-zA-Z0-9_$]+$/.test(item)) {
        // Heuristic: dynamic props like "type" → possible "is-success", "is-warning", etc.
        unstable.add(`is-${item}`)
      }
    }
  }

  // fallback for original pattern (e.g. { 'is-active': isActive })
  const tokens = raw.match(/(?<=').+?(?=')/g) ?? []
  const goodClasses = tokens.filter(cl => !cl.startsWith(':'))
  goodClasses.forEach(cl => cl.split(' ').forEach(cll => optional.add(cll)))

  const unusualClasses = [...optional].filter(
    cl => !cl.startsWith('is-') || !raw.includes(`'${cl}': ${cl.slice(3)}`),
  )

  // move those to unstable
  unusualClasses.forEach(cl => {
    optional.delete(cl)
    unstable.add(cl)
  })

  return {
    optional: Array.from(optional),
    unstable: Array.from(unstable),
  }
}

export default getDynamicClasses
