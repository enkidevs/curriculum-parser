import jestInCase from 'jest-in-case'
import fs from 'fs'
import path from 'path'

const folderNames = folderPath =>
  fs
    .readdirSync(folderPath)
    .filter(name => fs.statSync(path.join(folderPath, name)).isDirectory())

const fixturePath = folderPath =>
  path.join(__dirname, ...folderPath.split('/'), '__tests__', 'fixtures')

export function loadFixtures (folderPath, { includeInvalid = false } = {}) {
  const names = folderNames(fixturePath(folderPath))
  const fixtures = names.map(folderName => loadFixture(folderPath, folderName))
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

export function loadFixture (folderPath, folderName) {
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

export function createTest (name, parse, fixtures) {
  jestInCase(
    name,
    fixture => {
      expect(JSON.parse(JSON.stringify(parse(fixture.text)))).toEqual(
        fixture.ast
      )
    },
    fixtures
  )
}
