export const regex = /\?{3}/
export const order = 3
export const match = source => regex.exec(source)

export const parse = ([, content]) => ({
  type: 'questionGap',
  content
})
