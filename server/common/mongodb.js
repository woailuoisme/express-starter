const mongoose = require('mongoose');
const logger = require('./logger');
const { MONGO_URI, NODE_ENV } = require('./config');
const connectDB = async () => {
	const conn = await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 500, // Reconnect every 500ms
		poolSize: 6, // Maintain up to 10 socket connections. default 5
		// If not connected, return errors immediately rather than waiting for reconnect
		bufferMaxEntries: 0,
		connectTimeoutMS: 20000, // Give up initial connection after 10 seconds.default 30000
		socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity.default 30000
	});
	conn.connection.on('connecting', () => {
		logger.info(`Mongodb is connecting on ${conn.connection.host}`.green.bold);
	});
	conn.connection.on('open', () => {
		logger.info(`Mongodb connected on ${conn.connection.host}`.green.bold);
	});
	conn.connection.on('error', err => {
		logger.fatal(err);
	});
	conn.connection.on('reconnected', () => {
		logger.info('Mongodb reconnected');
	});
	conn.connection.on('reconnectFailed', () => {
		logger.error('Mongodb reconnected failed');
	});
	conn.connection.on('reconnectTries', () => {
		logger.info('Mongodb reconnected try completed');
	});
	conn.connection.on('disconnected', () => {
		logger.error('Mongodb disconnected');
	});

	if (NODE_ENV === 'development')
		mongoose.set('debug', (collectionName, method, query, doc, options) => {
			logger.info(
				`${collectionName}.${method} ${JSON.stringify(query)} ${JSON.stringify(
					options || {},
				)}`,
				doc,
			);
		});
};

module.exports = connectDB;
