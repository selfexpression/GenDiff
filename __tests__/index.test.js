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
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJSON.txt');

test.each(['.json', '.yml', '.yaml'])('Diff expected', (extention) => {
  const filepath1 = getFixturePath(`file1${extention}`);
  const filepath2 = getFixturePath(`file2${extention}`);
  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJson);
});
