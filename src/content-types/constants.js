import snakecase from 'lodash.snakecase'

export const orderedInsightSectionNames = [
  'content',
  'practiceQuestion',
  'reviseQuestion',
  'quiz',
  'footnotes',
  'gameContent'
]

export const insightSectionNameToTitleMap = new Map([
  ['content', 'Content'],
  ['practiceQuestion', 'Practice'],
  ['reviseQuestion', 'Revision'],
  ['quiz', 'Quiz'],
  ['footnotes', 'Footnotes'],
  ['gameContent', 'Game Content']
])

export const insightSectionTitleToNameMap = orderedInsightSectionNames.reduce(
  (map, prop) => {
    map.set(insightSectionNameToTitleMap.get(prop), prop)
    return map
  },
  new Map()
)

export const TYPES = {
  HEADLINE: 'headline',
  SECTION: 'section',
  ATTRIBUTE: 'attribute'
}

export const NAMES = {
  HEADLINE: 'headline',
  ...[...insightSectionNameToTitleMap.keys()].reduce((hash, key) => {
    console.log(`key=${key}`)
    hash[snakecase(key).toUpperCase()] = key
    return hash
  }, {})
}
