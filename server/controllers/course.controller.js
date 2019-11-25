const ErrorResponse = require('../common/error.response');
const asyncHandler = require('../middleware/async.handler');
const Course = require('../models/Course');
/**
 * @desc   Get all course
 * @route  GET /api/v1/courses
 * @access Public
 */
const index = asyncHandler(async (req, res, next) => {
	const courses = await Course.find();
	res.status(200).json({ success: true, count: courses.length, data: courses });
});
/**
 * @desc   Create single course
 * @route  POST /api/v1/courses
 * @access Public
 */
const create = asyncHandler(async (req, res, next) => {
	const course = await Course.create(req.body);
	res.status(201).json({ success: true, data: course });
});

/**
 * @desc   Get single course
 * @route  GET /api/v1/courses/:id
 * @access Public
 */
const show = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
	res.status(200).json({ success: true, data: course });
});

/**
 * @desc   Update single course
 * @route  PUT /api/v1/courses/:id
 * @access private
 */
// eslint-disable-next-line consistent-return
const update = asyncHandler(async (req, res, next) => {
	const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query', // mongoose-unique-validator docs
	});
	if (!course) return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
	res.status(200).json({ success: true, data: course });
});

/**
 * @desc   Delete single course
 * @route  Delete /api/v1/courses/:id
 * @access Private
 */
const destroy = asyncHandler(async (req, res, next) => {
	const course = await Course.findByIdAndDelete(req.params.id);
	if (!course) return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));

	res.status(200).json({
		success: true,
		data: course,
		msg: `delete single course ${req.params.id}`,
	});
});
const CourseController = {
	index,
	show,
	create,
	update,
	destroy,
};

module.exports = CourseController;
