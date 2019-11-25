const asyncHandler = require('./async.handler');
const ErrorResponse = require('../common/error.response');
const validator = require('validator');

const loginRequest = asyncHandler((req, res, next) => {
	const { email, password } = req.body;
	let errors;
	if (validator.isEmpty(email)) errors.push('email is required');
	if (validator.isEmail(email)) errors.push('email is invalid');
	if (validator.isEmpty(password)) errors.push('password is required');
	if (validator.isLength(password, { max: 15, min: 6 })) errors.push('password is required');

	if (errors) return next(new ErrorResponse((errors.join(','), 422)));

	next();
});

module.exports = { loginRequest };
