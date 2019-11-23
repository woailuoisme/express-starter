const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const pluralize = require('pluralize');
const colors = require('colors');

// 获取到组件名
const args = process.argv.splice(2);
console.log(!args, args.length);
if (!args || args.length !== 2) {
	console.log('Please input argument....'.yellow.inverse);
	process.exit(1);
}
const type = args[0];
const modelName = args[1];

const modelLowercase = modelName.toLowerCase();
const modelCapitalize = _.capitalize(modelName);
const modelPluralize = pluralize(modelName);

// console.log(type);
// console.log(modelName, modelPluralize, modelCapitalize);
console.log(`prepare to create ${modelName} a model`.green.bold);

let modeDir = './models/';
let controllerDir = './controllers/';
let routerDir = './routers/';

/*****************model config 读取模板替换能容 生成目录和文件路径 ********************/
let modelTemplate = fs.readFileSync(path.join(__dirname, './templates/model.stub'), 'utf8');
let modelContent = modelTemplate.replace(/{Model}/g, modelCapitalize); // target file modelContent
let modelDirPath = path.join(__dirname, modeDir);
let modelFilePath = path.join(__dirname, modeDir, modelCapitalize + '.js');

/*****************route config 读取模板替换能容 生成目录和文件路径 ********************/
let routerTemplate = fs.readFileSync(path.join(__dirname, './templates/router.stub'), 'utf8');
let routerContent = routerTemplate.replace(/{model}/g, modelLowercase); // target file modelContent
// model template  dir and file path
let routerDirPath = path.join(__dirname, routerDir);
let routerFilePath = path.join(__dirname, routerDir, modelLowercase + '.js');

/*****************controller config 读取模板替换能容 生成目录和文件路径 ********************/
let controllerTemplate = fs.readFileSync(path.join(__dirname, './templates/controller.stub'), 'utf8');
let controllerContent = controllerTemplate
	.replace(/{model}/g, modelLowercase) // target file modelContent
	.replace(/{modelPluralize}/g, modelPluralize) // target file modelContent
	.replace(/{modelCapitalize}/g, modelCapitalize); // target file modelContent
// model template  dir and file path
let controllerDirPath = path.join(__dirname, controllerDir);
let controllerFilePath = path.join(__dirname, controllerDir, modelLowercase + '.js');

// console.log(modelDirPath, modelFilePath);
// process.exit(1);

const makefile = (dirPath, filePath, content) => {
	// mkdirSync
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
		console.log(`The folder ${dirPath} has been created!`.green.inverse.bold);
	}
	// writeFile async
	if (!fs.existsSync(filePath)) {
		fs.writeFile(filePath, content, err => {
			if (err) throw err;
			console.log(`The ${filePath} has been created!`.cyan.bold);
		});
	} else {
		console.error(`error!\n ${filePath} has already been existed!`.red.inverse.bold);
	}
};

if (type === 'model') {
	makefile(modelDirPath, modelFilePath, modelContent);
} else if (type === 'controller') {
	makefile(controllerDirPath, controllerFilePath, controllerContent);
} else if (type === 'router') {
	makefile(routerDirPath, routerFilePath, routerContent);
} else if (type === 'all') {
	makefile(routerDirPath, routerFilePath, routerContent);
	makefile(modelDirPath, modelFilePath, modelContent);
	makefile(controllerDirPath, controllerFilePath, controllerContent);
} else {
	console.log('undefine argument.'.red.inverse + ' example: node make model user'.cyan.bold);
	process.exit(1);
}
