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
        let line;
        if (value.status === 'added') {
          line = `${indent}+ ${value.key}: ${stringify(value.value, depth + 1)}`;
        } else if (value.status === 'nested') {
          line = `${indent}  ${value.key}: ${iter(value.children, depth + 1)}`;
        } else if (value.status === 'deleted') {
          line = `${indent}- ${value.key}: ${stringify(value.value, depth + 1)}`;
        } else if (value.status === 'unchanged') {
          line = `${indent}  ${value.key}: ${stringify(value.value, depth + 1)}`;
        } else if (value.status === 'changed') {
          line = [
            `${indent}- ${value.key}: ${stringify(value.value, depth + 1)}`,
            `${indent}+ ${value.key}: ${stringify(value.value2, depth + 1)}`,
          ].join('\n');
        }
        return line;
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
