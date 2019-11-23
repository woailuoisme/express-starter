const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

/**
 * @desc   Register user
 * @route  Post /api/v1/auth/register
 * @access Public
 */
const register = asyncHandler(async (req, res, next) => {
	const { name, password, email, role } = req.body;
	const user = await User.create({ name, password, email, role });
	const token = user.getSignedJwtToken();
	sendTokenResponse(user, res, 200);
});

/**
 * @desc      Login user
 * @route     POST /api/v1/auth/login
 * @access    Public
 */
const login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	// Validate emil & password
	if (!email || !password) return next(new ErrorResponse('Please provide an email and password', 400));
	// Check for user
	const user = await User.findOne({ email }).select('+password');
	if (!user) return next(new ErrorResponse('Invalid credentials', 401));
	// Check if password matches
	const isMatch = await user.matchPassword(password);
	if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));
	sendTokenResponse(user, res, 200);
});

/**
 * @desc   Get single user
 * @route  Get /api/v1/auth/me
 * @access Public
 */
const me = asyncHandler(async (req, res, next) => {
	const user = User.findById(req.params.id);
	if (user) return new ErrorResponse(`User ${req.params.id} is not found`);
	res.status(200).json({ success: true, data: user });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, res, statusCode) => {
	// Create token
	const token = user.getSignedJwtToken();
	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	if (process.env.NODE_ENV === 'production') options.secure = true;
	res.status(statusCode)
		.cookie('token', token, options)
		.json({ success: true, token });
};

module.exports = AuthController = {
	register,
	login,
	me,
};
