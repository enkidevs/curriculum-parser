const jestInCase = require('jest-in-case')
const fs = require('fs')
const path = require('path')
const { parseSync } = require('../index')

const folderNames = folderPath =>
  fs
    .readdirSync(folderPath)
    .filter(name => fs.statSync(path.join(folderPath, name)).isDirectory())

const fixturePath = folderPath =>
  path.join(__dirname, ...folderPath.split('/'), '__tests__', 'fixtures')

module.exports.loadFixtures = function loadFixtures (
  folderPath,
  { includeInvalid = false } = {}
) {
  const names = folderNames(fixturePath(folderPath))
  const fixtures = names.map(folderName =>
    module.exports.loadFixture(folderPath, folderName)
  )
  if (includeInvalid) {
    return fixtures
  }
  return fixtures.filter(fixture => !fixture.text.startsWith('invalid'))
}

function loadFile (folderPath = '', name = '') {
  try {
    const fullPath = path.join(folderPath, name)
    return fs.readFileSync(fullPath, 'utf8')
  } catch (e) {
    return null
  }
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
  return output
}

module.exports.createTestParseSync = function createTestParseSync (
  name,
  processor,
  fixtures
) {
  jestInCase(
    `${name}.parseSync`,
    fixture => {
      console.log(JSON.stringify(parseSync(processor, fixture.text), null, 2))
      expect(
        JSON.parse(JSON.stringify(parseSync(processor, fixture.text)))
      ).toEqual(fixture.ast)
    },
    fixtures
  )
}
