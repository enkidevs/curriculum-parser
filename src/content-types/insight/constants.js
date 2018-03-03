export const TYPES = {
  HEADLINE: 'headline',
  SECTION: 'section',
  ATTRIBUTE: 'attribute'
}

export const NAMES = {
  HEADLINE: 'headline',
  ...[...sectionNameToTitleMap.keys()].reduce((hash, key) => {
    hash[key.toUpperCase()] = key
    return hash
  }, {})
}

export const orderedSectionNames = [
  'content',
  'practiceQuestion',
  'reviseQuestion',
  'quiz',
  'footnotes',
  'gameContent'
]

export const sectionNameToTitleMap = new Map([
  ['content', 'Content'],
  ['practiceQuestion', 'Practice'],
  ['reviseQuestion', 'Revision'],
  ['quiz', 'Quiz'],
  ['footnotes', 'Footnotes'],
  ['gameContent', 'Game Content']
])

export const sectionTitleToNameMap = orderedSectionNames.reduce((map, prop) => {
  map.set(sectionNameToTitleMap.get(prop), prop)
  return map
}, new Map())
