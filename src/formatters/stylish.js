import _ from 'lodash';

const stringify = (data, depth = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(data)) {
      return `${currentValue}`;
    }

    const indent = '    '.repeat(currentDepth);
    const bracketIndent = '    '.repeat(currentDepth - 1);

    const output = Object
      .entries(data)
      .map(([key, value]) => `${indent}${key}: ${stringify(value, currentDepth + 1)}`);
    return [
      '{',
      ...output,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, depth);
};

const stylish = (data) => {
  const iter = (currentValue, depth = 1) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indent = ' '.repeat(depth * 4 - 2);
    const bracketIndent = '    '.repeat(depth - 1);
    const lines = Object
      .entries(currentValue)
      .map(([, value]) => {
        switch (value.type) {
          case 'added':
            return `${indent}+ ${value.key}: ${stringify(value.value, depth + 1)}`;
          case 'nested':
            return `${indent}  ${value.key}: ${iter(value.children, depth + 1)}`;
          case 'removed':
            return `${indent}- ${value.key}: ${stringify(value.value, depth + 1)}`;
          case 'unchanged':
            return `${indent}  ${value.key}: ${stringify(value.value, depth + 1)}`;
          case 'updated':
            return [
              `${indent}- ${value.key}: ${stringify(value.from, depth + 1)}`,
              `${indent}+ ${value.key}: ${stringify(value.to, depth + 1)}`,
            ].join('\n');
          default:
            return null;
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data);
};
export default stylish;
