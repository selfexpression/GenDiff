import _ from 'lodash';

const correctValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (data) => {
  const iter = (node, emptyString) => {
    const output = node.flatMap(({
      type, key, value, value1, value2,
    }) => {
      const path = [...emptyString, key];
      const newPath = path.join('.');
      switch (type) {
        case 'added':
          return `Property '${newPath}' was added with value: ${correctValue(value)}`;
        case 'removed':
          return `Property '${newPath}' was removed`;
        case 'updated':
          return `Property '${newPath}' was updated. From ${correctValue(value1)} to ${correctValue(value2)}`;
        case 'unchanged':
          return '';
        case 'nested':
          return `${iter(value, path)}`;
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
    });
    return output.filter((line) => line !== '').join('\n');
  };
  return iter(data, '');
};

export default plain;
