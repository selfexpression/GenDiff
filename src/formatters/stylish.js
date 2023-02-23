import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const entries = Object.entries(data);
  const output = entries.map(([key, value]) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  const result = ['{', ...output, `${indent(depth - 1)}  }`].join('\n');
  return result;
};

const stylish = (data) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return String(currentValue);
    }

    const entries = Object.entries(currentValue);

    const lines = entries.map(([key, value]) => {
      let line;
      if (value.status === 'added') {
        line = `${indent(depth)}+ ${key}: ${stringify(value.value, depth + 1)}`;
      } else if (value.status === 'nested') {
        line = `${indent(depth)}  ${key}: ${iter(value.value, depth + 1)}`;
      } else if (value.status === 'deleted') {
        line = `${indent(depth)}- ${key}: ${stringify(value.value, depth + 1)}`;
      } else if (value.status === 'unchanged') {
        line = `${indent(depth)}  ${key}: ${stringify(value.value, depth + 1)}`;
      } else if (value.status === 'changed') {
        line = `${indent(depth)}- ${key}: ${stringify(value.value, depth + 1)}\n${indent(depth)}+ ${key}: ${stringify(value.value2, depth + 1)}`;
      }
      return line;
    });
    const result = ['{', ...lines, `${indent(depth - 1)}}`].join('\n');
    return result;
  };
  return iter(data, 1);
};
export default stylish;
