const insight = require('../../index')
const { createTestParseSync, loadFixtures } = require('../../../test-utils')

createTestParseSync('insight', insight(), loadFixtures('insight'))
