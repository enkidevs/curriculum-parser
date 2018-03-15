# This repo is deprecated. The parser is moved to [https://github.com/enkidevs/curriculum-processors](https://github.com/enkidevs/curriculum-processors)

# Enki Curriculum Parser

## Resources

* https://unifiedjs.github.io/ with guides https://unifiedjs.github.io/#guides

* https://remark.js.org/

* https://github.com/remarkjs/remark/tree/master/packages/remark-parse#extending-the-parser

* https://astexplorer.net/#/gist/0a92bbf654aca4fdfb3f139254cf0bad/ffe102014c188434c027e43661dbe6ec30042ee2

## API

```js
const {
  types,
  getParser
} = require('@enkidevs/curriculum-parser')

const parser = getParser(types.INSIGHT)

const ast = parser.parseSync('some markdown string') // or vfile(/path/to/markdown-file)

const markdownString = parser.stringifySync(ast)  // we get back the markdown string
```

## Usage

```js
const {
  types, getProcessor
} = require('@enkidevs/curriculum-parser');

const remark2rehype = require('remark-rehype');
const doc = require('rehype-document');
const format = require('rehype-format');
const html = require('rehype-stringify');
var vfile = require('to-vfile');
var report = require('vfile-reporter');

getProcessor(types.INSIGHT)
  .use(remark2rehype)
  .use(doc, { title: 'Insight' })
  .use(format)
  .use(html)
  .process(vfile.readSync('insight.md'), function (err, file) {
    console.error(report(err || file));
    console.log(String(file));
  });
```
