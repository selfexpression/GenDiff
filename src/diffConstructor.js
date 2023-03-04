import _ from 'lodash';

const diffConstructor = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));
  const sortKeys = _.sortBy(unionKeys);

  return sortKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    if (!_.isObject(data1[key]) || !_.isObject(data2[key])) {
      return {
        key,
        type: 'updated',
        from: data1[key],
        to: data2[key],
      };
    }
    const children = diffConstructor(data1[key], data2[key]);
    return { key, type: 'nested', children };
  });
};

export default diffConstructor;
