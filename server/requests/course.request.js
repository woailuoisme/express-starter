const asyncHandler = require('./async.handler');
const Course = require('../models/course');
const ErrorResponse = require('../common/app.error');

const indexRequest = asyncHandler(async (req, res, next) => {
	next();
});
const showRequest = asyncHandler((req, res, next) => {
	next();
});
const storeRequest = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404);
	// Make sure user is course owner
	if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to create course ${course._id}`,
				401,
			),
		);
	}
	next();
});

const updateRequest = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404);
	// Make sure user is course owner
	if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to update course ${course._id}`,
				401,
			),
		);
	}
	next();
});

const destroyRequest = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404);
	// Make sure user is course owner
	if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to delete course ${course._id}`,
				401,
			),
		);
	}
	next();
});

module.exports = { indexRequest, storeRequest, showRequest, updateRequest, destroyRequest };
