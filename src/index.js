import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import _ from 'lodash';

const getRawData = (filePath) => {
  const fullPath = path.resolve(cwd(), filePath);
  return readFileSync(fullPath, 'utf-8');
};

const genDiff = (data1, data2) => {
    const unionKeys = _.union(_.keys(data1), _.keys(data2));

    const result = _.sortBy(unionKeys).reduce((acc, key) => {
      if (_.has(data1, key) && _.has(data2, key)) {
        if (data1[key] === data2[key]) {
          acc.push(`    ${key}: ${data1[key]}`);
        }
      }
      if (_.has(data1, key) && _.has(data2, key)) {
        if (data1[key] !== data2[key]) {
          acc.push(`  - ${key}: ${data1[key]}`);
          acc.push(`  + ${key}: ${data2[key]}`);
        }
      }
      if (_.has(data1, key) && !_.has(data2, key)) {
          acc.push(`  - ${key}: ${data1[key]}`);
      }
      if (!_.has(data1, key) && _.has(data2, key)) {
          acc.push(`  + ${key}: ${data2[key]}`);
      }
      return acc;
  }, []);

  return result.join('\n');
};

  export default (filePath1, filePath2) => {
    const data1 = getRawData(filePath1);
    const data2 = getRawData(filePath2);
    const dataParse1 = JSON.parse(data1);
    const dataParse2 = JSON.parse(data2);
    return genDiff(dataParse1, dataParse2);
  };