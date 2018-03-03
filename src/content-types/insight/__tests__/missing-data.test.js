import { loadFixture } from '../../test_utils'
import { parse } from '../index'

describe('parsing should work when data is missing', () => {
  test('ASTs are equal', () => {
    const { ast, md } = loadFixture('insight/missing-data')
    expect(ast).toEqual(parse(md))
  })
})
