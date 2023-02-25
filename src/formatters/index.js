import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      return null;
  }
};

export default format;
