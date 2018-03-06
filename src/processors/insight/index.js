const remarkFrontmatter = require('remark-frontmatter')
const remarkParseYaml = require('remark-parse-yaml')
const base = require('../base')
const { code, questionGap, yaml } = require('../../plugins')

module.exports = function insight () {
  return base()
    .use(remarkFrontmatter)
    .use(remarkParseYaml)
    .use(yaml)
    .use(questionGap)
    .use(code)
}
