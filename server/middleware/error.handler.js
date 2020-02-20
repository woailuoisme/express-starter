const ErrorResponse = require('../common/app.error');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// Log to console for dev
	console.log(err);

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Resource not found`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		// const message = 'Duplicate field value entered';
		error = new ErrorResponse(err.errmsg, 422);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map(val => val.message);
		error = new ErrorResponse(message, 422);
	}

	if (process.env.NODE_ENV === 'devolopment') {
		res.status(error.statusCode || 500).json({
			success: false,
			msg: error.message || 'Server Error',
		});
	}

	res.status(error.statusCode || 500).json({
		success: false,
		msg: error.message || 'Server Error',
	});
};

module.exports = errorHandler;
