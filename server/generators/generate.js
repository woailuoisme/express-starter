const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const pluralize = require('pluralize');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const make = (modelName = '', type = '') => {
	if (!modelName && modelName === '') {
		console.log(`modelName is not empty...`.red.inverse);
		return;
	}
	if (!type) {
		console.log(`type is not empty...`.red.inverse);
		return;
	}
	const modelLowercase = modelName.toLowerCase();
	const modelCapitalize = _.capitalize(modelName);
	const modelPluralize = pluralize(modelName);

	// console.log(type);
	// console.log(modelName, modelPluralize, modelCapitalize);
	// console.log(`prepare to create ${modelName} a model`.green.bold);
	const inputModePath = path.join(__dirname, './templates/model.stub');
	const inputControllerPath = path.join(__dirname, './templates/controller.stub');
	const inputRouterPath = path.join(__dirname, './templates/router.stub');

	const outputModePath = path.join(__dirname, `../models/${modelLowercase}.js`);
	const outputControllerPath = path.join(__dirname, `../controllers/${modelLowercase}.controller.js`);
	const outputRouterPath = path.join(__dirname, `../routers/${modelLowercase}.router.js`);

	// read model template and replace
	const modelTemplate = fs.readFileSync(inputModePath, 'utf8');
	const modelContent = modelTemplate.replace(/{Model}/g, modelCapitalize); // target file modelContent
	// read router template and replace
	const routerTemplate = fs.readFileSync(inputRouterPath, 'utf8');
	const routerContent = routerTemplate.replace(/{model}/g, modelLowercase); // target file modelContent
	// read controller template adn replace
	const controllerTemplate = fs.readFileSync(inputControllerPath, 'utf8');
	const controllerContent = controllerTemplate
		.replace(/{model}/g, modelLowercase) // target file modelContent
		.replace(/{modelPluralize}/g, modelPluralize) // target file modelContent
		.replace(/{modelCapitalize}/g, modelCapitalize); // target file modelContent

	switch (type) {
		case 'model':
			generate(modelContent, outputModePath).then(r => null);
			break;
		case 'controller':
			generate(controllerContent, outputControllerPath).then(r => null);
			break;
		case 'router':
			generate(routerContent, outputRouterPath).then(r => null);
			break;
		case 'test':
			generate(modelContent, outputModePath).then(r => null);
			break;
		case 'all':
			generate(modelContent, outputModePath).then(r => null);
			generate(controllerContent, outputControllerPath).then(r => null);
			generate(routerContent, outputRouterPath).then(r => null);
			break;
		default:
			console.log(`please input the type...`.red.inverse);
	}
};

const generate = async (content, path) => {
	const exists = await fse.pathExists(path);
	if (!exists) {
		try {
			await fse.outputFile(path, content);
			console.log(`The ${path} has been created!`.green.inverse.bold);
		} catch (err) {
			console.error(err);
		}
	} else {
		console.error(`error!!! ${path} has already been existed!`.red.inverse.bold);
	}
};

module.exports = make;
