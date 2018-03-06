function parseSync (processor, md) {
  return processor.runSync(processor.parse(md))
}

function parse (processor, md) {
  return new Promise((resolve, reject) => {
    processor.run(processor.parse(md), (err, file) => {
      if (err) return reject(err)
      resolve(file)
    })
  })
}

module.exports = {
  plugins: require('./plugins'),
  processors: require('./processors'),
  parseSync,
  parse
}
