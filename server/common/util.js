const path = require('path');
const appPath = path.join(__dirname, './..');
const commonPath = path.join(appPath, './common');

console.log(appPath, commonPath);
module.exports = { appPath };
