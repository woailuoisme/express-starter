const Server = require('./common/server');
const routes = require('./routers');
const { devMiddleware, prodMiddleware } = require('./middleware');
const logger = require('./common/logger');

const { PORT } = require('./common/config');
//	connecting mongodb

const middleware = process.env.NODE_ENV === 'development' ? devMiddleware : prodMiddleware;

// server startup
const server = new Server()
	.middleware(middleware)
	.router(routes)
	.listen(PORT);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	// logger.error(`Error: ${err.message}`);
	logger.error(err);
	// Close server & exit process
	// server.close(() => {
	// 	logger.error('server is closed');
	// 	process.exit(1);
	// });
});

module.exports = server;
