const mongoose = require('mongoose');
const logger = require('./logger');
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	logger.info(`Mongodb connect on ${conn.connection.host}`.cyan.underline.bold);

	conn.connection.on('error', err => {
		logger.error(err);
	});

	if (process.env.NODE_ENV === 'development')
		mongoose.set('debug', (collectionName, method, query, doc, options) => {
			logger.info(`${collectionName}.${method} ${JSON.stringify(query)} ${JSON.stringify(options || {})}`, doc);
		});
};

module.exports = connectDB;
