const visit = require('unist-util-visit')
const { base } = require('../processors')

module.exports = function code () {
  return transform

  function transform (ast) {
    visit(ast, 'code', parseCode)
  }

  function parseCode (node) {
    const ast = processor.runSync(processor.parse(node.value))
    node.children = ast.children
  }
}
