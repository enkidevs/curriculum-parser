import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkBreaks from 'remark-breaks'
import * as plugins from './plugins'

const processor = unified()
  .use(remarkParse)
  .use(remarkBreaks)
  .use(plugins.questionGap)

processor.use(plugins.code, {
  processor
})

export function parse (mdString) {
  return processor.runSync(processor.parse(mdString))
}
