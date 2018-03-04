import { parse } from '../index';
import { createTest, loadFixtures } from '../../test-utils';

createTest('question.parse', parse, loadFixtures('question'));
