import { runInNewContext } from 'vm'
import { textual, falsy, truthy } from './data'

function getDynamicClasses(raw: string): string[] {
  const data = `[${raw}]`
  const classes: string[] = []

  // console.log(data)

  const res = [
    ...(runInNewContext(data, { ...textual, ...truthy }) as []),
    ...(runInNewContext(data, { ...textual, ...falsy }) as []),
  ] as (string | Record<string, string> | (string | Record<string, string>)[])[]

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
