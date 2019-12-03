const fse = require('fs-extra');
const colors = require('colors');

const createFile = async (content, path, overwrite = false) => {
	const exists = await fse.pathExists(path);
	if (!exists) {
		await fse.outputFile(path, content);
		console.log(`The ${path} has been created!`.green.inverse.bold);
	} else {
		if (overwrite) {
			await fse.outputFile(path, content);
			console.log(`The ${path} has been overwrite!`.green.inverse.bold);
		}
		console.error(`error!!! ${path} has already been existed!`.red.inverse.bold);
	}
};

const remove = async path => {
	const exists = await fse.pathExists(path);
	if (!exists) {
		await fse.remove(path);
		console.log(`The ${path} has been created!`.green.inverse.bold);
	} else {
		console.error(`error!!! ${path} has already been existed!`.red.inverse.bold);
	}
};

module.exports = {
	createFile,
};
