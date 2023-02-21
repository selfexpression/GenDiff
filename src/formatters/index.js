import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

export default (data, depth, mapping) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, value]) => mapping.unchanged({ key, value }, depth + 1));

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};
