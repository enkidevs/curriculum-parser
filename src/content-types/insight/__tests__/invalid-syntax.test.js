import { loadFixture } from '../../test-utils';
import { parse } from '../index';

const headline = loadFixture('insight/invalid-syntax-headline');
const attr = loadFixture('insight/invalid-syntax-attribute');
const attrTitle = loadFixture('insight/invalid-syntax-attribute-title');
const section = loadFixture('insight/invalid-syntax-section');
const sectionTitle = loadFixture('insight/invalid-syntax-section-title');

describe('invalid syntax', () => {
  test('parsing should throw on invalid headline syntax', () => {
    expect(() => {
      parse(headline.text);
    }).toThrow(/Invalid headline on line [0-9]+:/);
  });

  test('parsing should throw on invalid attribute syntax', () => {
    expect(() => {
      parse(attr.text);
    }).toThrow();
  });

  test('parsing should throw on missing attribute title', () => {
    expect(() => {
      parse(attrTitle.text);
    }).toThrow(/Invalid token on line [0-9]+:/);
  });

  test('parsing should throw on invalid section syntax', () => {
    expect(() => {
      parse(section.text);
    }).toThrow(/Invalid section title on line [0-9]+:/);
  });

  test('parsing should throw on invalid section title', () => {
    expect(() => {
      parse(sectionTitle.text);
    }).toThrow(/Invalid section title on line [0-9]+:/);
  });
});
