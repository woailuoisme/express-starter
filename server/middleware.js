// const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const log = require('./common/logger');
// eslint-disable-next-line no-unused-vars
const expressPino = require('express-pino-logger')({
	logger: log,
});

const middleware = app => {
	//	dev logging middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
		// app.use(expressPino);
	}
	app.use(cookieParser());
	// app.use(fileupload());
};

module.exports = middleware;
