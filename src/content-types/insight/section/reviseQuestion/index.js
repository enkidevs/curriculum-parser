import { parse as mdParse } from '../../../../parser'

export function parse (reviseQuestion, rules) {
  return mdParse(reviseQuestion, rules)
}
