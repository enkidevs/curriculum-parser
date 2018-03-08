const unified = require('unified')
const compactAst = require('mdast-util-compact')
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
      return [...plugins.base, ...plugins.insight, ...plugins.question]
    case types.QUESTION:
      return [...plugins.base, ...plugins.question]
    default:
      throw `Invalid type ${type}`
  }
}

function getProcessor (type) {
  const plugins = getPlugins(type)
  return unified().use(plugins)
}

function getParser (type) {
  function parse (md, { compact = false } = {}) {
    const processor = getProcessor(type)
    return new Promise((resolve, reject) => {
      processor.run(processor.parse(md), (err, ast) => {
        if (err) return reject(err)
        resolve(compact ? compactAst(ast) : ast)
      })
    })
  }

  function parseSync (md, { compact = false } = {}) {
    const processor = getProcessor(type)
    const ast = processor.runSync(processor.parse(md))
    return compact ? compactAst(ast) : ast
  }

  function stringify (ast) {
    const processor = getProcessor(type)
    return new Promise((resolve, reject) => {
      processor.run(ast, (err, ast) => {
        if (err) return reject(err)
        resolve(processor.stringify(ast))
      })
    })
  }

  function stringifySync (ast) {
    const processor = getProcessor(type)
    return processor.stringify(ast)
  }

  return {
    parse,
    parseSync,
    stringify,
    stringifySync
  }
}

module.exports = {
  plugins,
  getPlugins,
  types,
  getProcessor,
  getParser
}
