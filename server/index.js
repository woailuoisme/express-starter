const dotenv = require('dotenv');
const Server = require('./common/server');
const routes = require('./routers');
const middleware = require('./middleware');
const conndb = require('./common/mongodb');

dotenv.config();

//	connected db

conndb();
new Server()
	.middleware(middleware)
	.router(routes)
	.listen(process.env.PORT);
