const visit = require('unist-util-visit')
const { parseSync } = require('../../index')

module.exports = function code () {
  return transform

  function transform (ast) {
    visit(ast, 'code', parseCode)
  }

  function parseCode (node) {
    const ast = parseSync('base', node.value)
    node.children = ast.children
  }
}
