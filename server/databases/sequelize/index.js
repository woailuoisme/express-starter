const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const { logger } = require('../../common');
const { DB_DIALECT, DB_HOST, DB_PORT, DB_USER_NAME, DB_USER_PWD, DB_DATABASE } = require('../../common/config');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'sqlite-example-database/example-db.sqlite',
//   logQueryParameters: true,
//   benchmark: true,
//   logging: msg => logger.debug(msg),
// });

const sequelize = new Sequelize(DB_DATABASE, DB_USER_NAME, DB_USER_PWD, {
  host: DB_HOST,
  port: DB_PORT,
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  dialect: DB_DIALECT,
  logging: (msg) => logger.debug(msg)
});

// const   pool= {
//   max: 5,
//   min: 0,
//   acquire: 30000,
//   idle: 10000
// }

const modelDefiners = [
  require('./models/user.model'),
  require('./models/instrument.model'),
  require('./models/orchestra.model')
  // Add more models here...
  // require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
