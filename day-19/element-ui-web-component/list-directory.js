const tree = require('tree-node-cli');

const string = tree('E:\\web_projects\\ithome_ironman_2021\\day-19\\element-ui-web-component\\node_modules\\element-ui', {
  allFiles: true,
  maxDepth: 4,
});

console.log(string);
