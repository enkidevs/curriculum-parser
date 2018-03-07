const remarkFrontmatter = require('remark-frontmatter')
const remarkParseYaml = require('remark-parse-yaml')
const yaml = require('./yaml')
const question = require('../question')

module.exports = [remarkFrontmatter, remarkParseYaml, yaml, ...question]
