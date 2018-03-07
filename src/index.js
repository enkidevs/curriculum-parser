const unified = require('unified')
const plugins = require('./plugins')

const types = {
  BASE: 'base',
  INSIGHT: 'insight',
  QUESTION: 'question'
}

function getPlugins (type) {
  switch (type) {
    case types.BASE:
      return [...plugins.base]
    case types.INSIGHT:
      return [...plugins.base, ...plugins.insight]
    case types.QUESTION:
      return [...plugins.base, ...plugins.question]
    default:
      throw `Invalid type ${type}`
  }
}

function getProcessor (type) {
  return unified().use(getPlugins(type))
}

function parseSync (type, md) {
  const processor = getProcessor(type)
  return processor.runSync(processor.parse(md))
}

function parse (type, md) {
  const processor = getProcessor(type)
  return new Promise((resolve, reject) => {
    processor.run(processor.parse(md), (err, ast) => {
      if (err) return reject(err)
      resolve(ast)
    })
  })
}

module.exports = {
  plugins,
  getPlugins,
  types,
  getProcessor,
  parseSync,
  parse
}
