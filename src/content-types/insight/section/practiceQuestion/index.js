import { parse as mdParse } from '../../../../parser'

export function parse (practiceQuestion) {
  return mdParse(practiceQuestion)
}
