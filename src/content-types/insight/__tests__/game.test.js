import { loadFixture } from '../../test_utils'
import { parse } from '../index'

describe('parsing should return the proper AST for a game', () => {
  test('ASTs are equal', () => {
    const { ast, md } = loadFixture('insight/game')
    expect(ast).toEqual(parse(md))
  })
})
