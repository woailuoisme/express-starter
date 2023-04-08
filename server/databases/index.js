const sequelize = require('./sequelize');
const logger = require('../common/logger');

exports.assertDatabaseConnectionOk = async () => {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    logger.info('Database connection OK!');
  } catch (error) {
    logger.info('Unable to connect to the database:');
    logger.error(error.message);
    process.exit(1);
  }
};
