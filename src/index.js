import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (data1, data2) => {
    const unionKeys = _.union(_.keys(data1), _.keys(data2));
  
    const result = unionKeys.reduce((acc, key) => {
      const firstCheck = _.has(data1, key);
      const secondCheck = _.has(data2, key);
      if (!firstCheck) {
        acc[key] = '-';
      } else if (!secondCheck) {
        acc[key] = '+';
      } else if (data1[key] !== data2[key]) {
        acc[key] = '-';
      } else {
        acc[key] = '';
      }
  
      return acc;
    }, {});
  
    return result;
  };

  export default (filePath1, filePath2) => {
    const data1 = readFileSync(filePath1, 'utf-8');
    const data2 = readFileSync(filePath2, 'utf-8');
    const dataParse1 = JSON.parse(data1);
    const dataParse2 = JSON.parse(data2);
    return genDiff(dataParse1, dataParse2);
  };