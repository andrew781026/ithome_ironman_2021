const tree = require('tree-node-cli');

const string = tree('D:\\test\\ithome_ironman_2021\\day-23\\test-comp', {
  allFiles: true,
  exclude: [/node_modules/, /lcov/],
  maxDepth: 4,
});

console.log(string);
