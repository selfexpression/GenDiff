import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { expect, test } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedJson = readFile('expectedJSON.txt');

test('gendiff', () => {
  const filepath1 = getFixturePath(`file1.json`);
  const filepath2 = getFixturePath(`file2.json`);
    expect(genDiff(filepath1, filepath2)).toBe(expectedJson);
});