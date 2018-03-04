import { parse as mdParse } from '../../../../parser'

export function parse (reviseQuestion) {
  return mdParse(reviseQuestion)
}
