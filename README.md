# Enki Curriculum Parser

## Resources

* https://unifiedjs.github.io/ with guides https://unifiedjs.github.io/#guides

* https://remark.js.org/

* https://github.com/remarkjs/remark/tree/master/packages/remark-parse#extending-the-parser

* https://astexplorer.net/#/gist/0a92bbf654aca4fdfb3f139254cf0bad/ffe102014c188434c027e43661dbe6ec30042ee2

## API

```js
import {
  insight, // parser for an insight markdown like this one: https://github.com/enkidevs/curriculum-tools/blob/v1/test/fixtures/insights/immediately-invoked-function-expression-iife.md
} from '@enkidevs/curriculum-parser';

insight.full(entireInsightString); // returns an AST representing the entire insight
insight.section.full(anyInsightSectionString); // returns an AST representing an insight section
insight.section.content(anyInsightSectionContentString); // returns an AST representing the section "Content"
insight.section.footnotes(anyInsightSectionFootnotesString); // returns an AST representing the section "Footnotes"
insight.section.game(anyInsightSectionGameString); // returns an AST representing the section "Game"
insight.section.practiceQuestion(anyInsightSectionPracticeQuestionString); // returns an AST representing the section "Practice Question"
insight.section.reviseQuestion(anyInsightSectionReviseQuestionString); // returns an AST representing the section "Revision Question"
insight.section.quiz(anyInsightSectionQuizString); // returns an AST representing the section "Quiz"
insight.attribute(insightAttributeString); // returns an AST representing an insight attribute
```
