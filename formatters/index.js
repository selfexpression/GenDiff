
import { YAMLException } from 'js-yaml';
import path from 'path';

export default (fileName) => {
  const fileExtension = path.extname(fileName);

  switch (fileExtension) {
    case 'json':
      return JSON;
    case 'yam' && 'yaml':
      return YAMLException;
    default:
      return null;
  }
};
