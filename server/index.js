const Server = require('./common/server');
const routes = require('./routers');
const middleware = require('./middleware');
const conndb = require('./common/mongodb');
const dotenv = require('dotenv');
const { rootPath } = require('./common/util');
const path = require('path');

dotenv.config({ path: path.join(rootPath, '/.env') });
//	connecting mongodb
conndb();
// startup

new Server()
	.middleware(middleware)
	.router(routes)
	.listen(process.env.PORT);
