const path = require('path');
const env = require('dotenv');
env.config({ path: path.join(__dirname, '../../.env') });
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

const NODE_ENV = process.env.NO_ENV || 'development';
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI_CLUSTER = process.env.MONGO_URI_CLUSTER;

const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH || publicPath;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';
const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE || 30;

const TZ = process.env.TZ || 'Asia/Shanghai';
const APP_ID = process.env.APP_ID || 'express';
const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

module.exports = {
	NODE_ENV,
	PORT,
	MONGO_URI,
	MONGO_URI_CLUSTER,
	FILE_UPLOAD_PATH,
	JWT_COOKIE_EXPIRE,
	JWT_EXPIRE,
	JWT_SECRET,
	TZ,
	APP_ID,
	LOG_LEVEL,
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
