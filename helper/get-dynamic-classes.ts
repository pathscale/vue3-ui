function getDynamicClasses(raw: string): { optional: string[]; unstable: string[] } {
  // finds everything between simple quotes in value, where value is <tag :class={value} />
  // const classes: string[] = []

  // const tokens = raw.match(/(?<=').+?(?=')/g) ?? []
  // const goodClasses = tokens.filter(cl => !cl.startsWith(':'))
  // goodClasses.forEach(cl => cl.split(' ').forEach(cll => classes.push(cll)))

  // expected and most common pattern is: classes like is-X will depend on a prop named X
  // nevertheless, sometimes a class will depend on a computed prop or on a specifically named prop

  // list of classes not named is-x or that are named is-x but depend on something other than x
  // const unusualClasses = classes.filter(
  //   cl => !cl.startsWith('is-') || !raw.includes(`'${cl}': ${cl.slice(3)}`),
  // )

  // list of classes that are not unusual
  // const optional = classes.filter(cl => !unusualClasses.includes(cl))

  // return { optional, unstable: unusualClasses }

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
