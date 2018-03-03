import { loadFixture } from '../../test_utils'
import { parse } from '../index'

describe('parsing should return the proper AST', () => {
  test('ASTs are equal', () => {
    const { ast, md } = loadFixture('insight/correct')
    expect(ast).toEqual(parse(md))
  })
})
