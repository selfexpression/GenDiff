import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, value]) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...output,
    `${indent(depth - 1)}  }`]
    .join('\n');
};

const stylish = (value) => {
  const iter = (currentValue, depth) => {
    if (_.isObject(currentValue)) {
      return String(currentValue);
    }
    const lines = Object.entries(currentValue)
      .map(([key, val]) => {
        let line;
        if (val.status === 'added') {
          line = `${indent(depth)}+ ${key}: ${stringify(val.value, depth + 1)}`;
        } else if (val.status === 'nested') {
          line = `${indent(depth)}  ${key}: ${iter(val.value, depth + 1)}`;
        } else if (val.status === 'deleted') {
          line = `${indent(depth)}- ${key}: ${stringify(val.value, depth + 1)}`;
        } else if (val.status === 'unchanged') {
          line = `${indent(depth)}  ${key}: ${stringify(val.value, depth + 1)}`;
        } else if (val.status === 'changed') {
          line = `${indent(depth)}- ${key}: ${stringify(val.value, depth + 1)}\n${indent(depth)}+ ${key}: ${stringify(val.value2, depth + 1)}`;
        }
        return line;
      });
    return [
      '{',
      ...lines,
      `${indent(depth - 1)}}`]
      .join('\n');
  };
  return iter(value, 1);
};
export default stylish;
