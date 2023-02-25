import _ from 'lodash';

const plain = (data) => {
  const entries = Object.entries(data);
  const output = entries.map(([, value]) => {
    const correctValue = _.isObject(value.value) ? '[complex value]' : value.value;
    console.log(entries);
    let line;
    if (value.status === 'added') {
      line = `Property ${value.key} was added with value: ${correctValue}`;
    } else if (value.status === 'deleted') {
      line = `Property ${value.key} was removed`;
    } else if (value.status === 'changed') {
      line = `Property ${value.key} was updated. From ${correctValue} to ${value.value2}`;
    } else if (value.status === 'nested') {
      line = `${plain(value.children)}`;
    }
    return line;
  });
  return output.join('\n');
};

export default plain;
