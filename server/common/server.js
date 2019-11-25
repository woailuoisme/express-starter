const http = require('http');
const os = require('os');
const path = require('path');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const color = require('colors');
// eslint-disable-next-line no-unused-vars
const conndb = require('./mongodb');
const errorHandler = require('../middleware/error.handler');
const notFound = require('../middleware/not.found.handler');
const log = require('./logger');

//	connected db
// conndb();

const app = express();

class ExpressServer {
	constructor() {
		const root = path.normalize(`${__dirname}/../..`);
		app.set('appPath', `${root}client`);
		app.use(express.static(`${root}/public`));
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
