import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (data1, data2) => {
    const pairs = Object.entries(data1);
    const pairs2 = Object.entries(data2);
    const unionPairs = _.unionWith(pairs, pairs2, _.isEqual);

    const result = _.sortBy(unionPairs).map(([key, value]) => {
      if (!_.has(data1, key)) {
        return `+ ${key}: ${value}`;
      } else if (!_.has(data2, key)) {
        return `- ${key}: ${value}`;
      } else if (_.has(data1, key) && _.has(data2, key) && data1[value] !== data2[value]) {
        return `- ${key}: ${value}`;
      } else {
        return `  ${key}: ${value}`;
      }
    });
  
    return result.join('\n');
  };

  export default (filePath1, filePath2) => {
    const data1 = readFileSync(filePath1, 'utf-8');
    const data2 = readFileSync(filePath2, 'utf-8');
    const dataParse1 = JSON.parse(data1);
    const dataParse2 = JSON.parse(data2);
    return genDiff(dataParse1, dataParse2);
  };