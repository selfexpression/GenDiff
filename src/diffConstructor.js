import _ from 'lodash';

const diffConstructor = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));

  const result = _.sortBy(unionKeys).map((key) => {
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'deleted', value: data1[key] };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        return {
          key,
          status: 'changed',
          value: data1[key],
          value2: data2[key],
        };
      }
      if (data1[key] === data2[key]) {
        return { key, status: 'unchanged', value: data1[key] };
      }
    }
    if (_.isObject(data1[key]) || _.isObject(data2[key])) {
      return { key, status: 'nested', children: diffConstructor(data1[key], data2[key]) };
    }
  });
  console.log(JSON.stringify(result, null, 2));
  return result;
};

export default diffConstructor;
