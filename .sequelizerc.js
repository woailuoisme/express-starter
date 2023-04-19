const path = require('path');

module.exports = {
  'config':          path.resolve('./server/databases/sequelize', 'database.json'),
  'migrations-path': path.resolve('./server/databases/sequelize', 'migrations'),
  'seeders-path': path.resolve('./server/databases/sequelize', 'seeders'),
  'models-path': path.resolve('./server/databases/sequelize', 'models')
};
