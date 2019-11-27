const asyncHandler = require('./async.handler');
const ErrorResponse = require('../common/error.response');
// const { check, validationResult } = require('express-validator');
// const validator = require('validator');

const loginValidate = asyncHandler((req, res, next) => {
	req.check('name', 'name is required').notEmpty();
	req.check('password', 'name is required').notEmpty();
	req.check('email', 'please input email correct type').isEmail();
	// password must be at least 5 chars long
	req.check('password')
		.isLength({ min: 5 })
		.withMessage('password is more than 5 character ')
		.matches(/\d/)
		.withMessage('password must bu number');

	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = req.validationError();
	const errorsMessage = errors.map(error => error.message);
	const firstError = errorsMessage[0];
	if (firstError) return new ErrorResponse(firstError, 422);

	next();
});

module.exports = { loginValidate };
