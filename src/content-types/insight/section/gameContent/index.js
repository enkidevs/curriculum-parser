import { parse as mdParse } from '../../../../parser'

export function parse (gameContent) {
  return mdParse(gameContent)
}
