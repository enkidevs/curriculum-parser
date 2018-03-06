const remarkFrontmatter = require('remark-frontmatter')
const remarkParseYaml = require('remark-parse-yaml')
const yaml = require('./yaml')

module.exports = [remarkFrontmatter, remarkParseYaml, yaml]
