import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import diffConstructor from './diffConstructor.js';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';

const getRawData = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  return readFileSync(fullPath, 'utf-8');
};

export default (filePath1, filePath2, formatter = stylish) => {
  const fileExtension1 = path.extname(filePath1);
  const fileExtension2 = path.extname(filePath2);
  const data1 = getRawData(filePath1);
  const data2 = getRawData(filePath2);
  const dataParse1 = parse(data1, fileExtension1);
  const dataParse2 = parse(data2, fileExtension2);
  const result = diffConstructor(dataParse1, dataParse2);
  console.log(formatter(result));
  return formatter(result);
};
