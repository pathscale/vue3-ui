function getDynamicClasses(raw: string): { optional: string[]; unstable: string[] } {
  // finds everything between simple quotes in value, where value is <tag :class={value} />
  const classes: string[] = []

  const tokens = raw.match(/(?<=').+?(?=')/g) ?? []
  const goodClasses = tokens.filter(cl => !cl.startsWith(':'))
  goodClasses.forEach(cl => cl.split(' ').forEach(cll => classes.push(cll)))

  // expected and most common pattern is: classes like is-X will depend on a prop named X
  // nevertheless, sometimes a class will depend on a computed prop or on a specifically named prop

  // list of classes not named is-x or that are named is-x but depend on something other than x
  const unusualClasses = classes.filter(
    cl => !cl.startsWith('is-') || !raw.includes(`'${cl}': ${cl.slice(3)}`),
  )

  // list of classes that are not unusual
  const optional = classes.filter(cl => !unusualClasses.includes(cl))

  return { optional, unstable: unusualClasses }
}

export default getDynamicClasses
