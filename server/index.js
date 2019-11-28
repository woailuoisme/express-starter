const Server = require('./common/server');
const routes = require('./routers');
const { devMiddleware, prodMiddleware } = require('./middleware');
const conndb = require('./common/mongodb');
const { PORT } = require('./common/config');
//	connecting mongodb
conndb();

const middleware = process.env.NODE_ENV === 'development' ? devMiddleware : prodMiddleware;

// startup
new Server()
	.middleware(middleware)
	.router(routes)
	.listen(PORT);
