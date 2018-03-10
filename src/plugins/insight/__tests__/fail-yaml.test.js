const { loadRawFixture } = require('../../test-utils')
const { getParser, types } = require('../../../index')

describe('Fail insight yaml parsing', () => {
  const text = loadRawFixture({
    type: 'insight',
    file: 'error/missing-yaml.md'
  })

  let parser
  beforeEach(() => {
    parser = getParser(types.INSIGHT)
  })

  test('parseSync should throw on missing yaml', () => {
    expect(() => {
      parser.parseSync(text)
    }).toThrow(/Must have exactly 1 yaml configuration but found \d+ instead./)
  })

  test('parse should throw on missing yaml', () => {
    expect(async () => {
      await parser
        .parse(text)
        .rejects.toThrow(
          /Must have exactly 1 yaml configuration but found \d+ instead./
        )
    })
  })
})
