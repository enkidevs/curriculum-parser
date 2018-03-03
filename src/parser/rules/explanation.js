// Catch everything in between %exp% -> "%exp this is a explanation%"

export const regex = /%exp([\s\S]*?)%/
export const order = 98
export const match = source => regex.exec(source)

export const parse = capture => ({
  type: 'explanation',
  content: capture[1]
})
