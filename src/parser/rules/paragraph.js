// Takes everything until it finds
// a double linebreak,
// a codeblock ```
// or an image ![]
export const order = 6
export const regex = /^([\S\s]+?)(?=(```|!\[|\n{1,}))/
export const match = source => regex.exec(source)
