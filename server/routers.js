const bootcamp = require('./routers/bootcmap.router');
const course = require('./routers/course.router');
const auth = require('./routers/auth.router');
const user = require('./routers/user.router');
const file = require('./routers/file.router');
const routers = app => {
	// app.use('/api/v1/examples', examplesRouter);
	app.use('/api/v1/bootcamps', bootcamp);
	app.use('/api/v1/courses', course);
	app.use('/api/v1/users', user);
	app.use('/api/v1/auth', auth);
	app.use('/file', file);
};

module.exports = routers;

//	mount router
