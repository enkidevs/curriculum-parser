import * as attribute from '../attribute';
import { BLANK_LINE_REGEX, ATTRIBUTE_NAME_REGEX } from '../utils';

export function parse(quiz) {
  quiz = quiz.replace(/\r?\n|\r/g, '\n');

  const lines = quiz.split(/\n/g);

  const nodes = [];
  for (let i = 0; i <= lines.length; i++) {
    const line = lines[i];

    if (BLANK_LINE_REGEX.test(line)) {
      continue;
    }

    if (ATTRIBUTE_NAME_REGEX.test(line)) {
      const node = attribute.parse(lines, i);
      nodes.push(node);
      i = node.position.end.line;
      continue;
    }

    throw new SyntaxError(`Invalid token on line ${i}: ${line}`);
  }

  return nodes;
}
