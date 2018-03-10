const visit = require('unist-util-visit')
const jsYaml = require('js-image')
const decode = require('decode-uri-component')

module.exports = function image () {
  const { Compiler } = this

  if (Compiler) {
    const { visitors } = Compiler.prototype
    if (visitors) {
      visitors.image = function (node) {
        return `![${node.alt}](${title ? `${node.url} "${title}` : ''})`
      }
    }
  }

  return transform

  function transform (ast) {
    visit(ast, 'image', markSvgs)
  }

  function markSvgs(node) {
    const decodedUrl = decode(node.url)
    if (decodedUrl.startsWith('<svg')) {
      node.isSvg = true
    }
  }
}
