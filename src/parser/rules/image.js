// Takes images alt text and content, in this format: ![alt](<svg> string). Yeah, this is god damned complex

export const order = 3
export const regex = /^!\[((?:\[[^\]]*\]|[^\]]|\](?=[^[]*\]))*)\]\(\s*<?((?:[^\s\\]|\\.)*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/
export const match = source => regex.exec(source)
