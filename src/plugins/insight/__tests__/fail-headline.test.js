const { loadRawFixture } = require('../../test-utils')
const { getParser, types } = require('../../../index')

describe('Fail insight headline parsing', () => {
  const text = loadRawFixture({
    type: 'insight',
    file: 'error/missing-headline.md'
  })

  let parser
  beforeEach(() => {
    parser = getParser(types.INSIGHT)
  })

  test('parseSync should throw on missing headline', () => {
    expect(() => {
      parser.parseSync(text)
    }).toThrow(/Must have exactly 1 headline but found \d+ instead./)
  })

  test('parse should throw on missing headline', () => {
    expect(async () => {
      await parser
        .parse(text)
        .rejects.toThrow(/Must have exactly 1 headline but found \d+ instead./)
    })
  })
})
