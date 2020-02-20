const ErrorResponse = require('../common/app.error');
const asynHandler = require('../middleware/async.handler');
const User = require('../models/User');
/**
 * @desc  get all user
 * @route /api/v1/users
 * @access public
 */
const index = asynHandler(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		success: true,
		count: users.length,
		data: users,
	});
});
/**
 * @desc  create single user
 * @route /api/v1/users
 * @access public
 */
const create = asynHandler(async (req, res, next) => {
	const user = await User.create(req.body);
	res.status(201).json({
		success: true,
		data: user,
	});
});

/**
 * @desc  get single user
 * @route /api/v1/users/:id
 * @access public
 */
const show = asynHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: user,
	});
});

/**
 * @desc  update single user
 * @route /api/v1/users/:id
 * @access private
 */
const update = asynHandler(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query', // mongoose-unique-validator docs
	});
	if (!user) {
		return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({ success: true, data: user });
});

/**
 * @desc  delete single user
 * @route /api/v1/users/:id
 * @access private
 */
const destroy = asynHandler(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) {
		return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: user,
		msg: `delete single user ${req.params.id}`,
	});
});

const UserController = {
	index,
	show,
	update,
	destroy,
	create,
};

module.exports = UserController;
