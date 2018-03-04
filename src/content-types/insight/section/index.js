import {
  skipBlankLines,
  getContentBoundaries,
  SECTION_START_REGEX,
  SECTION_TITLE_REGEX,
} from '../../utils';
import createNode from '../../create-node';
import { insightSectionTitleToNameMap, TYPES, NAMES } from '../../constants';

import * as questionParser from '../../question';
import * as quizParser from '../../quiz';

const sectionParsers = [...insightSectionTitleToNameMap.values()].reduce(
  (map, name) => {
    map.set(name, require(`./${name}`).default);
    return map;
  },
  new Map()
);

export function parse(lines, lineNum) {
  const titleLineNum = skipBlankLines(lines, lineNum + 1); // + 1 to skip ---

  if (!SECTION_TITLE_REGEX.test(lines[titleLineNum])) {
    throw new SyntaxError(
      `Invalid section title on line ${titleLineNum}: ${lines[titleLineNum]}`
    );
  }

  const [, title] = lines[titleLineNum].match(SECTION_TITLE_REGEX);
  const name = insightSectionTitleToNameMap.get(title);

  const sectionEndCondition =
    name === NAMES.GAMECONTENT
      ? undefined // game content only ends on a new-line or EOF (it contains multiple --- parts)
      : line => SECTION_START_REGEX.test(line);

  const { startLineNum, endLineNum } = getContentBoundaries({
    lines,
    startLineNum: titleLineNum,
    endCondition: sectionEndCondition,
  });

  const sectionParser = sectionParsers.get(name);

  return createNode({
    lines,
    name,
    type: TYPES.SECTION,
    startLineNum,
    endLineNum,
    nodes: sectionParser(lines.slice(startLineNum, endLineNum + 1).join('\n')),
  });
}
