const Server = require('./common/server');
const routes = require('./routers');
const { devMiddleware, prodMiddleware } = require('./middleware');
const logger = require('./common/logger');

const { PORT } = require('./common/config');
const middleware = process.env.NODE_ENV === 'development' ? devMiddleware : prodMiddleware;

// const mongoConnect = require('./common/mongodb');
// mongoConnect()

// server startup
const server = new Server().middleware(middleware).router(routes).listen(PORT);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  // logger.error(`Error: ${err.message}`);
  logger.error(err);
  // Close server & exit process
  server.close(() => {
    logger.error('Server is closed');
    process.exit(1);
  });
});
