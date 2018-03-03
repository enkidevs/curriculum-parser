import SimpleMarkdown from 'simple-markdown'
import enkiRules from './rules'
import omitBy from 'lodash.omitby'
import mergeWith from 'lodash.mergewith'
import pick from 'lodash.pick'

const ruleProps = ['regex', 'match', 'order', 'parse', 'react']
const unusedRuleTypesSet = new Set(['fence'])
const defaultRules = omitBy(SimpleMarkdown.defaultRules, (rule, type) =>
  unusedRuleTypesSet.has(type)
)

export const rules = mergeWith(
  defaultRules,
  enkiRules,
  (defaultRule, enkiRule) => ({
    ...defaultRule,
    ...pick(enkiRule, ruleProps) // make sure we only merge SimpleMarkdown rule props
  })
)

export function createParser (rules) {
  return SimpleMarkdown.parserFor(rules)
}

export function parse (md, rls = rules) {
  return createParser(rls)(md)
}
