const mongoose = require('mongoose');
const logger = require('./logger');
const { MONGO_URI, NODE_ENV } = require('./config');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

const connectDB = async () => {
	try {
		const { connection } = await mongoose.connect(MONGO_URI, {
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

		logger.info('mongdb connected');
		if (NODE_ENV === 'development')
			mongoose.set('debug', (collectionName, method, query, doc, options) => {
				logger.info(
					`${collectionName}.${method} ${JSON.stringify(query)} ${JSON.stringify(
						options || {},
					)}`,
					doc,
				);
			});
		return connection;
	} catch (error) {
		logger.error(error);
	}
};

exports = async function removeAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		await collection.deleteMany();
	}
};

exports = async function dropAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		try {
			await collection.drop();
		} catch (error) {
			// Sometimes this error happens, but you can safely ignore it
			if (error.message === 'ns not found') return;
			// This error occurs when you use it.todo. You can
			// safely ignore this error too
			if (error.message.includes('a background operation is currently running')) return;
			console.log(error.message);
		}
	}
};
module.exports = connectDB;
