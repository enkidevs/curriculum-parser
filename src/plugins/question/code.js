const unified = require('unified')
const visit = require('unist-util-visit')
const base = require('../base')
const questionGap = require('./question-gap')

module.exports = function code () {
  return transform

  function transform (ast) {
    visit(ast, 'code', parseCode)
  }

  function parseCode (node) {
    if (node.value.includes('???')) {
      node.type = 'question-code'
      const processor = unified()
        .use(base)
        .use(questionGap)
      const ast = processor.runSync(processor.parse(node.value))
      node.children = ast.children
    }
  }
}
