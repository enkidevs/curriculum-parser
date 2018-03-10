const jestInCase = require('jest-in-case')
const fs = require('fs')
const path = require('path')
const { getParser } = require('../index')

const folderNames = folderPath =>
  fs
    .readdirSync(folderPath)
    .filter(name => fs.statSync(path.join(folderPath, name)).isDirectory())

const fixturePath = folderPath =>
  path.join(__dirname, ...folderPath.split('/'), '__tests__', 'fixtures')

module.exports.loadFixtures = function loadFixtures (folderPath) {
  const names = folderNames(fixturePath(folderPath)).filter(
    name => name !== 'error'
  )
  const fixtures = names.map(folderName =>
    module.exports.loadFixture(folderPath, folderName)
  )
  return fixtures
}

function loadFile (folderPath = '', name = '') {
  try {
    const fullPath = path.join(folderPath, name)
    return fs.readFileSync(fullPath, 'utf8')
  } catch (e) {
    return null
  }
}

module.exports.loadRawFixture = function loadRawFixture ({
  type: folderPath,
  file: fileName
}) {
  const fp = path.join(fixturePath(folderPath), fileName)
  return loadFile(fp)
}

module.exports.loadFixture = function loadFixture (folderPath, folderName) {
  const fp = path.join(fixturePath(folderPath), folderName)
  const output = {}
  const textFile = loadFile(fp, 'text.md')
  if (textFile) {
    output.text = textFile.toString()
  }
  const astFile = loadFile(fp, 'ast.json')
  if (astFile) {
    output.ast = JSON.parse(astFile)
  }
  const stringifiedFile = loadFile(fp, 'stringified.md')
  if (stringifiedFile) {
    output.stringified = stringifiedFile.toString()
  }
  return output
}

module.exports.createTestParse = function createTestParse (type) {
  jestInCase(
    `${type}.parse`,
    async fixture => {
      const parser = getParser(type)
      const ast = await parser.parse(fixture.text, { compact: true })
      expect(toJSON(ast)).toEqual(fixture.ast)
    },
    module.exports.loadFixtures(type)
  )
}

module.exports.createTestParseSync = function createTestParseSync (type) {
  jestInCase(
    `${type}.parseSync`,
    fixture => {
      const parser = getParser(type)
      const ast = parser.parseSync(fixture.text)
      expect(toJSON(ast)).toEqual(fixture.ast)
    },
    module.exports.loadFixtures(type)
  )
}

module.exports.createTestStringify = function createTestStringify (type) {
  jestInCase(
    `${type}.stringify`,
    async fixture => {
      const parser = getParser(type)
      const str = await parser.stringify(fixture.ast)
      expect(str).toEqual(fixture.stringified)
    },
    module.exports.loadFixtures(type)
  )
}

module.exports.createTestStringifySync = function createTestStringifySync (
  type
) {
  jestInCase(
    `${type}.stringifySync`,
    fixture => {
      const parser = getParser(type)
      const str = parser.stringifySync(fixture.ast)
      expect(str).toEqual(fixture.stringified)
    },
    module.exports.loadFixtures(type)
  )
}

function toJSON (obj) {
  return JSON.parse(JSON.stringify(obj))
}
