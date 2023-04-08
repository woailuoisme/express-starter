const auth = require('./routers/auth.router');
const user = require('./routers/user.router');
const file = require('./routers/file.router');
const web = require('./routers/web.router');
const routers = (app) => {
  // app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/users', user);
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/file', file);
  app.use(web);
};

module.exports = routers;

//	mount router
