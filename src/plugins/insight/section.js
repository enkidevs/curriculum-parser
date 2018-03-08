const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkStringify = require('remark-stringify')
const visit = require('unist-util-visit')
const question = require('../question')

module.exports = function section () {
  const { Compiler } = this

  if (Compiler) {
    const { visitors } = Compiler.prototype
    if (visitors) {
      visitors.section = function (node) {
        const thematicBreak = {
          type: 'thematicBreak'
        }
        const heading = {
          type: 'heading',
          depth: 2,
          children: [
            {
              type: 'text',
              value: node.name
            }
          ]
        }
        const processor = unified()
          .use(remarkParse)
          .use(remarkStringify, {
            bullet: '*'
          })
          .use(customThematicBreak)
          .use(question)

        return processor.stringify({
          type: 'root',
          children: [thematicBreak, heading, ...node.children]
        })
      }
    }
  }

  return transform

  function transform (ast) {
    const newAstChildren = []
    let section, current, next
    for (let astIndex = 1; astIndex < ast.children.length; astIndex++) {
      current = ast.children[astIndex - 1]
      next = ast.children[astIndex]

      if (!current || !next) {
        break
      }

      if (
        !(
          current.type === 'thematicBreak' &&
          next.type === 'heading' &&
          next.depth === 2
        )
      ) {
        if (section) {
          section.children.push(current)
        } else {
          newAstChildren.push(current)
        }
        continue
      }

      section = {
        type: 'section',
        name: next.children[0].value,
        children: []
      }

      astIndex += 1 // skip the heading that was included in the section above

      newAstChildren.push(section)
    }

    ast.children = newAstChildren
  }
}

function customThematicBreak() {
  const { Compiler } = this
  if (Compiler) {
    const { visitors } = Compiler.prototype
    if (visitors) {
      visitors.thematicBreak = function() {
        return '---'
      }
    }
  }
}
