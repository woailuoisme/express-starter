const http = require('http');
const os = require('os');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// eslint-disable-next-line no-unused-vars
const color = require('colors');
const conndb = require('./src/utils/mongodb');
const errorHandler = require('./src/middleware/error');
const notFound = require('./src/middleware/notFound');
const log = require('./src/utils/logger');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const expressPino = require('express-pino-logger')({
	logger: log,
});

//	load env vars
dotenv.config({ path: '.env' });

//	connected db
conndb();

const app = express();

//	××××××××××××××××-mount all middleware-×××××××××××××//
// app.use(notFound);

//	dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
	// app.use(expressPino);
}
app.use(express.static(path.join(__dirname, 'public')));

//	body parser url query use qs lib
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload());

// Set static folder

// ×××××××××××××××××××××××××××××××××××××××××××××××××× //
// import router
const bootcamp = require('./src/routers/bootcamp');
const course = require('./src/routers/course');
const auth = require('./src/routers/auth');
const user = require('./src/routers/user');
const file = require('./src/routers/file');

//	mount router
app.use('/api/v1/bootcamps', bootcamp);
app.use('/api/v1/courses', course);
app.use('/api/v1/users', user);
app.use('/api/v1/auth', auth);
app.use('/file', file);

app.use(notFound);
//	error handler
app.use(errorHandler);

const PORT = process.env.PORT;

const welcome = p => () =>
	log.info(
		`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}`.green.inverse,
	);
const server = http.createServer(app).listen(PORT, welcome(PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	// console.log(`Error: ${err.message}`.red);
	console.log(err);
	// Close server & exit process
	server.close(() => process.exit(1));
});
