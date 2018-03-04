import {
  BLANK_LINE_REGEX,
  SECTION_START_REGEX,
  ATTRIBUTE_NAME_REGEX
} from '../utils'
import * as attributeParser from '../attribute'
import * as headlineParser from './headline'
import * as sectionParser from './section'

export const section = sectionParser
export const attribute = attributeParser
export const headline = headlineParser

export function parse (string = '') {
  // normalize linebreaks to \n.
  string = string.replace(/\r?\n|\r/g, '\n')

  const ast = {
    type: 'insight',
    children: []
  }

  const lines = string.split(/\n/g)

  const headlineNode = headlineParser.parse(lines, 0)
  ast.children.push(headlineNode)

  for (let i = headlineNode.position.end.line + 1; i < lines.length; i++) {
    const line = lines[i]

    if (BLANK_LINE_REGEX.test(line)) {
      continue
    }

    if (SECTION_START_REGEX.test(line)) {
      const node = section.parse(lines, i)
      ast.children.push(node)
      i = node.position.end.line
      continue
    }

    if (ATTRIBUTE_NAME_REGEX.test(line)) {
      const node = attribute.parse(lines, i)
      ast.children.push(node)
      i = node.position.end.line
      continue
    }

    throw new SyntaxError(`Invalid token on line ${i}: ${line}`)
  }

  return ast
}
