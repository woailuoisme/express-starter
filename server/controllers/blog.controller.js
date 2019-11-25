const ErrorResponse = require('../common/error.response');
const asyncHandler = require('../middleware/async.handler');
const Blog = require('../models/Blog');
/**
 * @desc   Get all blog
 * @route  GET /api/v1/blogs
 * @access Public
 */
const index = asyncHandler(async (req, res, next) => {
	const blogs = await Blog.find();
	res.status(200).json({ success: true, count: blogs.length, data: blogs });
});
/**
 * @desc   Create single blogs
 * @route  POST /api/v1/blogs
 * @access Public
 */
const create = asyncHandler(async (req, res, next) => {
	const blog = await Blog.create(req.body);
	res.status(201).json({ success: true, data: blog });
});

/**
 * @desc   Get single blog
 * @route  GET /api/v1/blogs/:id
 * @access Public
 */
const show = asyncHandler(async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);
	if (!blog) return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
	res.status(200).json({ success: true, data: blog });
});

/**
 * @desc   Update single blog
 * @route  PUT /api/v1/blogs/:id
 * @access private
 */
const update = asyncHandler(async (req, res, next) => {
	const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query', //mongoose-unique-validator docs
	});
	if (!blog) return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
	res.status(200).json({ success: true, data: blog });
});

/**
 * @desc   Delete single blog
 * @route  Delete /api/v1/blogs/:id
 * @access Private
 */
const destroy = asyncHandler(async (req, res, next) => {
	const blog = await Blog.findByIdAndDelete(req.params.id);
	if (!blog) return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));

	res.status(200).json({
		success: true,
		data: blog,
		msg: `delete single blog ${req.params.id}`,
	});
});

const BlogController = {
	index,
	show,
	create,
	update,
	destroy,
};

module.exports = BlogController;
