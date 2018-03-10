const unified = require('unified')
const compactAst = require('mdast-util-compact')
const remarkStringify = require('remark-stringify')
const plugins = require('./plugins')

const types = {
  BASE: 'base',
  INSIGHT: 'insight',
  QUESTION: 'question'
}

function getPlugins (type, postBasePlugins = []) {
  switch (type) {
    case types.BASE:
      return [...plugins.base, ...postBasePlugins]
    case types.INSIGHT:
      return [
        ...plugins.base,
        ...postBasePlugins,
        ...plugins.insight,
        ...plugins.question
      ]
    case types.QUESTION:
      return [...plugins.base, ...postBasePlugins, ...plugins.question]
    default:
      throw `Invalid type ${type}`
  }
}

function getProcessor (type, postBasePlugins) {
  const plugins = getPlugins(type, postBasePlugins)
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
    const processor = getProcessor(type, [remarkStringify])
    return new Promise((resolve, reject) => {
      processor.run(ast, (err, ast) => {
        if (err) return reject(err)
        resolve(processor.stringify(ast))
      })
    })
  }

  function stringifySync (ast) {
    const processor = getProcessor(type, [remarkStringify])
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
