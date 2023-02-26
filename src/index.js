import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import diffConstructor from './diffConstructor.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getRawData = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  return readFileSync(fullPath, 'utf-8');
};

const getExtention = (filepath) => path.extname(filepath);

export default (filePath1, filePath2, formatName = 'stylish') => {
  const fileExtension1 = getExtention(filePath1);
  const fileExtension2 = getExtention(filePath2);
  const data1 = getRawData(filePath1);
  const data2 = getRawData(filePath2);
  const dataParse1 = parse(data1, fileExtension1);
  const dataParse2 = parse(data2, fileExtension2);
  const result = diffConstructor(dataParse1, dataParse2);
  return format(result, formatName);
};
