const base = require('../base')
const { questionGap, code } = require('../../plugins')

module.exports = function insight () {
  return base()
    .use(questionGap)
    .use(code)
}
