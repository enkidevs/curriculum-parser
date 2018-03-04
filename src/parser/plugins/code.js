import visit from 'unist-util-visit'

export default function code ({ processor }) {
  return transform

  function transform (ast) {
    visit(ast, 'code', parseCode)
  }

  function parseCode (node) {
    const ast = processor.runSync(processor.parse(node.value))
    node.children = ast.children
  }
}
