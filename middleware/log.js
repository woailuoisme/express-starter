/**
 * @desc logger request to console
 */
const log = (req, res, next) => {
	console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
	next();
};

module.exports = log;
