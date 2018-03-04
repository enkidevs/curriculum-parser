import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkBreaks from 'remark-breaks'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseYaml from 'remark-parse-yaml'
import * as plugins from './plugins'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkParseYaml)
  .use(remarkBreaks)
  .use(plugins.questionGap)

processor.use(plugins.code, {
  processor
})

export function parse (mdString) {
  return processor.runSync(processor.parse(mdString))
}
