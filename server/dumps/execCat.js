const shell = require('shelljs');
const path = require('path');

shell.exec(path.resolve(__dirname, 'catScript.sh'));
console.log(path.resolve(__dirname, 'catScript.sh'));
