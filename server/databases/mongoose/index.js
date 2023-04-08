const mongoose = require('mongoose');
const logger = require('../../common/logger');
const { MONGO_URI, NODE_ENV } = require('../../common/config');

const mongoConnect = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI, {
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    });

    logger.info('Mongo connected');
    if (NODE_ENV === 'development')
      mongoose.set('debug', (collectionName, method, query, doc, options) => {
        logger.info(`${collectionName}.${method} ${JSON.stringify(query)} ${JSON.stringify(options || {})}`, doc);
      });
    return connection;
  } catch (error) {
    logger.error(error);
  }
};

exports.removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
};
exports.dropAllCollections = async () => {
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
module.exports = mongoConnect;
