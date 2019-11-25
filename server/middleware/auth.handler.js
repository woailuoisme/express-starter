const jwt = require('jsonwebtoken');
const asyncHandler = require('./async.handler');
const ErrorResponse = require('../common/error.response');
const User = require('../models/user');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
		// Set token from cookie
	}
	// else if (req.cookies.token) {
	//   token = req.cookies.token;
	// }
	// Make sure token exists
	if (!token) return next(new ErrorResponse('Not authorized to access this route', 401));
	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id);
		next();
	} catch (err) {
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}
});

// Grant access to specific roles
const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
		}
		next();
	};
};

module.exports = {
	protect,
	authorize,
};
