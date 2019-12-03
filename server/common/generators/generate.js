const fse = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const pluralize = require('pluralize');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { createFile } = require('../file.helper');
const { modelPath, controllerPath, routerPath } = require('../config');

const make = (modelName = '', type = '') => {
	if (!modelName && !type) {
		console.log(`modelName and type is not empty...`.red.inverse);
		return;
	}
	const modelLowercase = modelName.toLowerCase();
	const modelCapitalize = _.capitalize(modelName);
	const modelPluralize = pluralize(modelName);

	const inputModePath = path.join(__dirname, './templates/model.stub');
	const inputControllerPath = path.join(__dirname, './templates/controller.stub');
	const inputRouterPath = path.join(__dirname, './templates/router.stub');

	const outputModePath = path.join(modelPath, `/${modelLowercase}.js`);
	const outputControllerPath = path.join(controllerPath, `/${modelLowercase}.controller.js`);
	const outputRouterPath = path.join(routerPath, `/${modelLowercase}.router.js`);

	// read model template and replace
	const modelTemplate = fse.readFileSync(inputModePath, 'utf8');
	const modelContent = modelTemplate.replace(/{modelCapitalize}/g, modelCapitalize);
	// read router template and replace
	const routerTemplate = fse.readFileSync(inputRouterPath, 'utf8');
	const routerContent = routerTemplate.replace(/{modelLowercase}/g, modelLowercase);
	// read controller template adn replace
	const controllerTemplate = fse.readFileSync(inputControllerPath, 'utf8');
	const controllerContent = controllerTemplate
		.replace(/{modelLowercase}/g, modelLowercase)
		.replace(/{modelPluralize}/g, modelPluralize)
		.replace(/{modelCapitalize}/g, modelCapitalize);

	switch (type) {
		case 'model':
			createFile(modelContent, outputModePath);
			break;
		case 'controller':
			createFile(controllerContent, outputControllerPath);
			break;
		case 'router':
			createFile(routerContent, outputRouterPath);
			break;
		case 'test':
			createFile(modelContent, outputModePath);
			break;
		case 'all':
			createFile(modelContent, outputModePath);
			createFile(controllerContent, outputControllerPath);
			createFile(routerContent, outputRouterPath);
			break;
		default:
			console.log(`please input the type...`.red.inverse);
	}
};

module.exports = make;
