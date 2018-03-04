import { parse } from '../index'
import { createTest, loadFixtures } from '../../test-utils'

createTest('insight.parse', parse, loadFixtures('insight'))
