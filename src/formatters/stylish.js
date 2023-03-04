import _ from 'lodash';

const replacer = ' ';
const quadrupleSpace = '    ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);
const getBracketIndent = (depth) => quadrupleSpace.repeat(depth - 1);

const stringify = (data, depth = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(data)) {
      return `${currentValue}`;
    }

    const indent = '    '.repeat(currentDepth);
    const bracketIndent = getBracketIndent(currentDepth);

    const output = Object
      .entries(data)
      .map(([key, value]) => `${indent}${key}: ${stringify(value, currentDepth + 1)}`);
    return ['{', ...output, `${bracketIndent}}`].join('\n');
  };
  return iter(data, depth);
};

const stylish = (data) => {
  const iter = (currentValue, depth = 1) => {
    const indent = getIndent(depth);
    const bracketIndent = getBracketIndent(depth);
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
            throw new Error(`Unsupported node type (${value.type})!`);
        }
      });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data);
};
export default stylish;
