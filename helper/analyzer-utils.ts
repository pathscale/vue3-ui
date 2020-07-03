import * as sfcparser from '@vue/compiler-sfc'

export interface ParsedSFC {
  template: sfcparser.SFCTemplateBlock | null
  script: sfcparser.SFCScriptBlock | null
}

export function parseSFC(code: string, id: string): ParsedSFC {
  const {
    descriptor: { template, script },
  } = sfcparser.parse(code, {
    sourceMap: false,
    sourceRoot: process.cwd(),
    filename: id,
    pad: 'line',
  })

  return { template, script }
}

export function isVueSFC(id: string) {
  return /\.vue$/i.test(id)
}
