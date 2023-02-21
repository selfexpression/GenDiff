import yaml from 'js-yaml';
import stylish from './formatters/stylish.js';

const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return stylish(yaml.load(data));
    case '.yaml':
      return stylish(yaml.load(data));
    default:
      return null;
  }
};

export default parse;
