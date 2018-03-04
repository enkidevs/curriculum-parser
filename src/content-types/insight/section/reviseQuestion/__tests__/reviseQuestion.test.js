import { parse } from '../index'
import { createTest, loadFixtures } from '../../../../test-utils'

createTest(
  'reviseQuestion.parse',
  parse,
  loadFixtures('insight/section/reviseQuestion')
)
