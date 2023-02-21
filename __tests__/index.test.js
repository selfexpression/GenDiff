import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedJson = readFile('expectedJSON.txt');
const expectedStylish = readFile('expectedStylish.txt');

test('gendiff', () => {
  const filePathJSON1 = getFixturePath('file1.json');
  const filePathJSON2 = getFixturePath('file2.json');
  const filePathYAML1 = getFixturePath('file1.yml');
  const filePathYAML2 = getFixturePath('file2.yml');
  expect(genDiff(filePathJSON1, filePathJSON2)).toBe(expectedJson);
  expect(genDiff(filePathYAML1, filePathYAML2)).toBe(expectedStylish);
});
