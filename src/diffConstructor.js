import _ from 'lodash';
import formatter from './formatters/index.js';

export default (data1, data2) => {
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
