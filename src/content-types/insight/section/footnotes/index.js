import { parse as mdParse } from '../../../../parser'

export function parse (footnotes) {
  return mdParse(footnotes)
}
