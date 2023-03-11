import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import diffConstructor from './diffConstructor.js';
import parseData from './parsers.js';
import formatDiff from './formatters/index.js';

const getFormat = (filepath) => _.trim(path.extname(filepath), '.');

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return parseData(data, getFormat(filepath));
};

export default (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);
  const result = diffConstructor(data1, data2);
  return formatDiff(result, formatName);
};
