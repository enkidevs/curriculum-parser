const remarkFrontmatter = require('remark-frontmatter')
const yaml = require('./yaml')
const headline = require('./headline')
const section = require('./section')

module.exports = [remarkFrontmatter, yaml, headline, section]
