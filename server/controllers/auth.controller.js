const ErrorResponse = require('../common/app.error');
const asyncHandler = require('../middleware/async.handler');
const User = require('../models/User');
const sendEmail = require('../common/email');
const crypto = require('crypto');

/**
 * @desc   Register user
 * @route  Post /api/v1/auth/register
 * @access Public
 */
const register = asyncHandler(async (req, res, next) => {
	const { name, password, email, role } = req.body;
	const user = await User.create({ name, password, email, role });
	// const token = user.getSignedJwtToken();
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
	if (!email || !password)
		return next(new ErrorResponse('Please provide an email and password', 400));
	// Check for user
	const user = await User.findOne({ email }).select('+password');
	if (!user) return next(new ErrorResponse('Invalid credentials', 401));
	// Check if password matches
	const isMatch = await user.matchPassword(password);
	if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));
	sendTokenResponse(user, res, 200);
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
const updateDetails = asyncHandler(async (req, res, next) => {
	const { name, email } = req.body;
	const user = await User.findByIdAndUpdate(
		req.user.id,
		{ name, email },
		{
			new: true,
			runValidators: true,
		},
	);
	res.status(200).json({ success: true, data: user });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
const updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');
	const { currentPassword, newPassword } = req.body;
	// Check current password
	if (!(await user.matchPassword(currentPassword))) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	user.password = newPassword;
	await user.save();

	sendTokenResponse(user, 200, res);
});

/**
 * @desc      Forgot password
 * @route     POST /api/v1/auth/forgotpassword
 * @access    Public
 */
const forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return next(new ErrorResponse('There is no user with that email', 404));
	// Get reset token
	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });
	// Create reset url
	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;
	const message = `You are receiving this email because you (or someone else) has 
	requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
	try {
		await sendEmail({ email: user.email, subject: 'Password reset token', message });
		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorResponse('Email could not be sent', 500));
	}
	res.status(200).json({ success: true, data: user });
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});
	if (!user) return next(new ErrorResponse('Invalid token', 400));
	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
const logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		data: {},
	});
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

const AuthController = {
	register,
	login,
	logout,
	me,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword,
};

module.exports = AuthController;
