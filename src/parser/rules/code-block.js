// Takes codeBlocks, first word without space is the language, everything else is code
// a code block ends with ``` or a question gap

export const order = 4
export const regex = /^```(.+)?\n([\s\S]+?)\s*```\s*/
export const match = source => regex.exec(source)

export const parse = ([, language, content]) => {
  return {
    type: 'codeBlock',
    content,
    language
  }
}
