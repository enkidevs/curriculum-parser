import jestInCase from 'jest-in-case'
import { parse } from '../index'
import { loadFixtures } from '../../../../test_utils'

const fixtures = loadFixtures('insight/section/reviseQuestion')

jestInCase(
  'reviseQuestion.parse',
  fixture => {
    console.log(fixture.text)
    console.log(JSON.stringify(parse(fixture.text), null, 2))
    expect(parse(fixture.text)).toBe(fixture.ast)
  },
  fixtures
)
