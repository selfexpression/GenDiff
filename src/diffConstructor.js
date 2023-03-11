import _ from 'lodash';

const diffConstructor = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));
  const sortKeys = _.sortBy(unionKeys);

  return sortKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', value: diffConstructor(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'updated', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

export default diffConstructor;
