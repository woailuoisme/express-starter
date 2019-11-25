const http = require('http');
const os = require('os');
const express = require('express');
const dotenv = require('dotenv');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const errorHandler = require('../middleware/error.handler');
const notFound = require('../middleware/not.found.handler');
const log = require('./logger');
const path = require('path');
const { publicPath, uploadsPath, seederPath } = require('../common/util');

// connected db
// conndb();

const app = express();

class ExpressServer {
	constructor() {
		const root = path.normalize(`${__dirname}/../..`);
		app.set('appPath', `${root}client`);
		app.use(express.static(`${root}/public`));
		// app.use(express.static(publicPath));
		//	body parser url query use qs lib
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		// this.middleware();
	}

	middleware(handlers) {
		handlers(app);
		return this;
	}

	router(routes) {
		routes(app);
		app.use(notFound);
		app.use(errorHandler);
		app._router.stack.forEach(function(r) {
			if (r.route && r.route.path) {
				console.log(r.route.path);
			}
		});
		return this;
	}

	listen(port = process.env.PORT) {
		const welcome = p => () =>
			log.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
		http.createServer(app).listen(port, welcome(port));
		return app;
	}
}

module.exports = ExpressServer;
