const http = require('http');
const os = require('os');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const errorHandler = require('../middleware/error.handler');
const notFound = require('../middleware/not.found.handler');
const logger = require('./logger');
const { publicPath, uploadsPath } = require('../common/util');

const app = express();

class ExpressServer {
	constructor() {
		app.use(express.static(publicPath));
		app.use(express.static(uploadsPath));
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
		// TODO: debug all routers   ????
		app._router.stack.forEach(function(r) {
			if (r.route && r.route.path) {
				logger.info(r.route.path);
			}
		});
		return this;
	}

	listen(port = process.env.PORT) {
		const welcome = p => () =>
			logger.info(
				`up and running in ${process.env.NODE_ENV ||
					'development'} @: ${os.hostname()} on port: ${p}}`,
			);
		http.createServer(app).listen(port, welcome(port));
		return app;
	}
}

module.exports = ExpressServer;
