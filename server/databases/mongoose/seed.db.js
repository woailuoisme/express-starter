const fs = require('fs');
const util = require('util');
const readDir = util.promisify(fs.readdir).bind(fs);
const path = require('path');
const mongoose = require('mongoose');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

async function seedDatabase(runSaveMiddleware = false) {
  const dir = await readDir(__dirname);
  console.log(dir);
  const seedFiles = dir.filter((f) => f.endsWith('.seed.js'));
  console.log(seedFiles);
  //
  // for (const file of seedFiles) {
  // 	const fileName = file.split('.seed.js')[0];
  // 	const modelName = toTitleCase(fileName);
  // 	const model = mongoose.models[modelName];
  //
  // 	if (!model) throw new Error(`Cannot find Model '${modelName}'`);
  // 	const fileContents = require(path.join(__dirname, file));
  //
  // 	runSaveMiddleware ? await model.create(fileContents) : await model.insertMany(fileContents);
  // }
}
seedDatabase();
