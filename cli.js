#! /usr/bin/env node

const [, , filePath] = process.argv;
const readFile = require('util').promisify(require('fs').readFile);

if (!filePath) {
  process.stderr.write('Missing file name');
} else {
  const parser = require('./dist');
  readFile(filePath).then(text => console.log(parser.parse(text)));
}
