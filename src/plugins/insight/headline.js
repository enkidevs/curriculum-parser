const visit = require('unist-util-visit')
const toString = require('mdast-util-to-string')

module.exports = function headline () {
  const { Compiler } = this

  if (Compiler) {
    const { visitors } = Compiler.prototype
    if (visitors) {
      visitors.headline = function (headline) {
        return `# ${headline.value}`
      }
    }
  }

  return transform

  function transform (ast) {
    visit(ast, 'heading', parseHeadline)
  }

  function parseHeadline (node) {
    if (node.depth === 1) {
      node.type = 'headline'
      node.value = node.children[0].value
      delete node.depth
      delete node.children
    }
  }
}
