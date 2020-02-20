const asyncHandler = require('./async.handler');
const ErrorResponse = require('../common/app.error');
// const { check, validationResult } = require('express-validator');
const validator = require('validator');

const loginRequest = asyncHandler((req, res, next) => {
	const { password, email } = req.body;
	let errors;
	if (validator.inEmpty(email)) errors.push({ message: 'email is required' });
	if (validator.isEmail(email)) errors.push({ message: 'please input email correct type' });

	if (validator.inEmpty(password)) errors.push({ message: 'password is required' });
	if (validator.isLength(password, { min: 6 }))
		errors.push({ message: 'password is more than 5 character' });

	if (errors.lenghth > 0) {
		const errorsMessage = errors.map(error => error.message);
		return new ErrorResponse(errorsMessage, 422);
	}

	next();
});

module.exports = { loginRequest };
