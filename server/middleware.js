// const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line no-unused-vars
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const expressValidator = require('express-validator');

const morgan = require('morgan');
const log = require('./common/logger');
// eslint-disable-next-line no-unused-vars
const expressPino = require('express-pino-logger')({
	logger: log,
});

const devMiddleware = app => {
	//	dev logging middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
		// app.use(expressPino);
	}
	app.use(cookieParser());
	app.use(expressValidator);
	app.use(fileupload());
};

const prodMiddleware = app => {
	app.use(expressValidator);
	app.use(cookieParser());
	// File uploading
	app.use(fileupload());
	// Sanitize data
	app.use(mongoSanitize());
	// Set security headers
	app.use(helmet());
	// Prevent XSS attacks
	app.use(xss());
	// Rate limiting
	const limiter = rateLimit({
		windowMs: 10 * 60 * 1000, // 10 mins
		max: 100,
	});
	app.use(limiter);
	// Prevent http param pollution
	app.use(hpp());
	// Enable CORS
	app.use(cors());
};

module.exports = { devMiddleware, prodMiddleware };
