import _ from 'lodash';

const createTree = (name, status = '', children = [], value = '') => ({
  name,
  status,
  children,
  value,
});

const diffConstructor = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));

  const result = unionKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.has(data1, key) && _.has(data2, key)) {
      if (value1 === value2) {
        acc.name = key;
        acc.value = value1;
        acc.status = 'unchanged';
      } else if (_.isObject(value1) && _.isObject(value2)) {
        acc.name = key;
        acc.children = diffConstructor(value1, value2);
        acc.status = 'nested';
      } else if (data1[key] !== data2[key]) {
        acc.name = key;
        acc.children = [
          createTree(acc.name, 'changed', [], value1),
          createTree(acc.name, 'changed', [], value2),
        ];
      }
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      acc.name = key;
      acc.value = value1;
      acc.status = 'deleted';
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      acc.name = key;
      acc.value = value2;
      acc.status = 'added';
    }
    return acc;
  }, {});

  return result;
};

export default diffConstructor;
