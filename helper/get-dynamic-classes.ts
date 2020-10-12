import { runInNewContext } from 'vm'
import { textual, falsy, truthy } from './data'

function getDynamicClasses(raw: string): string[] {
  const data = `[${raw}]`
  const classes: string[] = []

  const res: (string | Record<string, string> | (string | Record<string, string>)[])[] = []

  try {
    res.push(...(runInNewContext(data, { ...textual, ...truthy }) as []))
    res.push(...(runInNewContext(data, { ...textual, ...falsy }) as []))
  } catch (err) {
    // eslint-disable-next-line no-console -- Needed for dev
    console.error(
      `\u001B[31m${err.message}\u001B[0m\n`,
      'Do not forget to add it to the helper\'s data.ts file,\n',
      'otherwise generated CSS might be incorrect.\n',
      `context: \u001B[33m${data}\u001B[0m\n`,
    )
  }

  for (const item of res) {
    const i = Array.isArray(item) ? item : [item]
    for (const v of i) {
      if (typeof v === 'string') classes.push(...v.split(' '))
      else if (typeof v === 'object') {
        for (const [v1, v2] of Object.entries(v)) {
          if (typeof v1 === 'string') classes.push(...v1.split(' '))
          if (typeof v2 === 'string') classes.push(...v2.split(' '))
        }
      }
    }
  }

  return classes
}

export default getDynamicClasses
