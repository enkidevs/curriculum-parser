const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkBreaks = require('remark-breaks')

module.exports = function base () {
  return unified()
    .use(remarkParse)
    .use(remarkBreaks)
}
