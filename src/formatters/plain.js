import _ from 'lodash';

const correctValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (data) => {
  const iter = (node, emptyString) => {
    const entries = Object.entries(node);
    const output = entries.map(([, value]) => {
      const path = [...emptyString, value.key];
      const newPath = path.join('.');
      switch (value.status) {
        case 'added':
          return `Property '${newPath}' was added with value: ${correctValue(value.value)}`;
        case 'deleted':
          return `Property '${newPath}' was removed`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${correctValue(value.value)} to ${correctValue(value.value2)}`;
        case 'unchanged':
          return '';
        case 'nested':
          return `${iter(value.children, path)}`;
        default:
          return null;
      }
    });
    return output.filter((line) => line !== '').join('\n');
  };
  return iter(data, '');
};

export default plain;
