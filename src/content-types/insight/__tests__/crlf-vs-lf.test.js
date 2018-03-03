import { loadFixture } from '../../test_utils'
import { parse } from '../index'

describe('parsing should work for CRLF or CR or LF whitespace between content', () => {
  test('ASTs are equal', () => {
    const { ast, md } = loadFixture('insight/crlf-vs-lf')
    expect(ast).toEqual(parse(md))
  })
})
