import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedJson = readFile('expectedJson.txt');

test('gendiff', () => {
  const filePathYAML1 = getFixturePath('file1.yml');
  const filePathYAML2 = getFixturePath('file2.yml');
  const filePathJson1 = getFixturePath('file1.yml');
  const filePathJson2 = getFixturePath('file2.yml');
  expect(genDiff(filePathYAML1, filePathYAML2)).toBe(expectedStylish);
  expect(genDiff(filePathJson1, filePathJson2)).toBe(expectedJson);
});
