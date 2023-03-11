import _ from 'lodash';

const replacer = ' ';
const quadrupleSpace = '    ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);
const getBracketIndent = (depth) => quadrupleSpace.repeat(depth - 1);

const stringify = (data, depth = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(data)) {
      return String(currentValue);
    }

    const indent = quadrupleSpace.repeat(currentDepth);
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
    const lines = currentValue.flatMap(({
      type, key, value, value1, value2,
    }) => {
      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'nested':
          return `${indent}  ${key}: ${iter(value, depth + 1)}`;
        case 'removed':
          return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
        case 'updated':
          return [
            `${indent}- ${key}: ${stringify(value1, depth + 1)}`,
            `${indent}+ ${key}: ${stringify(value2, depth + 1)}`,
          ].join('\n');
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data);
};
export default stylish;
