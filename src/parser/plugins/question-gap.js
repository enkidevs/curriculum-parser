import visit from 'unist-util-visit'

export default function questionGap () {
  https: inlineTokenizer.locator = locator

  const Parser = this.Parser

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers
  const inlineMethods = Parser.prototype.inlineMethods
  inlineTokenizers.questionGap = inlineTokenizer
  inlineMethods.splice(0, 0, 'questionGap')

  const Compiler = this.Compiler
  if (Compiler) {
    const visitors = Compiler.prototype.visitors
    if (!visitors) return

    visitors.questionGap = node => {
      return '???'
    }
  }

  function locator (value, fromIndex) {
    return value.indexOf('???', fromIndex)
  }

  function inlineTokenizer (eat, value, silent) {
    const match = /^\?{3}/.exec(value)

    if (silent) return silent
    if (!match) return

    const [questionGap] = match

    return eat(questionGap)({
      type: 'questionGap',
      value: questionGap
    })
  }
}
