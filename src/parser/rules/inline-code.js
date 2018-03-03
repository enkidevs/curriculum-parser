// Take everything inside single backticks -> `blabla`
export const regex = /^`([^`\n]*?)`/
export const match = source => regex.exec(source)

export const parse = capture => ({
  type: 'inlineCode',
  content: capture[1]
})
