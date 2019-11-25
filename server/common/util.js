const path = require('path');
const rootPath = path.join(__dirname, './../..');
const serverPath = path.join(__dirname, './..');
const commonPath = path.join(serverPath, './common');
const controllerPath = path.join(serverPath, './controllers');
const modelPath = path.join(serverPath, './models');
const routerPath = path.join(serverPath, './routers');
const seederPath = path.join(serverPath, './seeders');
const middlewarePath = path.join(serverPath, './middleware');

const publicPath = path.join(serverPath, './../public');
const uploadsPath = path.join(serverPath, './../uploads');
const uploadsImagePath = path.join(serverPath, './../uploads/images');
const appPath = path.join(serverPath, './../client');

module.exports = {
	rootPath,
	serverPath,
	commonPath,
	controllerPath,
	modelPath,
	routerPath,
	seederPath,
	middlewarePath,
	publicPath,
	uploadsPath,
	appPath,
	uploadsImagePath,
};
