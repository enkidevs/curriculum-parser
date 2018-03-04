import jestInCase from 'jest-in-case'
import fs from 'fs'
import path from 'path'

const folderNames = folderPath =>
  fs
    .readdirSync(folderPath)
    .filter(name => fs.statSync(path.join(folderPath, name)).isDirectory())

const fixturePath = folderPath =>
  path.join(__dirname, ...folderPath.split('/'), '__tests__', 'fixtures')

export function loadFixtures (folderPath) {
  const fp = fixturePath(folderPath)
  const names = folderNames(fp)
  return names.map(fileName => loadFixture(path.join(fp, fileName)))
}

function loadFile (folderPath = '', name = '') {
  try {
    const fullPath = path.join(folderPath, name)
    return fs.readFileSync(fullPath, 'utf8')
  } catch (e) {
    return null
  }
}

export function loadFixture (folderPath) {
  return {
    text: loadFile(folderPath, 'text.md').toString(),
    ast: JSON.parse(loadFile(folderPath, 'ast.json'))
  }
}

export function createTest (name, parse, fixtures) {
  jestInCase(
    name,
    fixture => {
      console.log(JSON.stringify(parse(fixture.text)))
      expect(JSON.parse(JSON.stringify(parse(fixture.text)))).toEqual(
        fixture.ast
      )
    },
    fixtures
  )
}
