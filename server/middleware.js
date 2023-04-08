// const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line no-unused-vars
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const fileupload = require('express-fileupload');

// const pino = require('pino-http')();
const morgan = require('morgan');
const logger = require('./common/logger');

const devMiddleware = (app) => {
  app.use(cookieParser());
  app.use(fileupload());
  // app.use(pino);
  app.use(
    morgan('tiny', {
      stream: {
        write(message) {
          logger.info(message.toString());
        }
      }
    })
  );
};

const prodMiddleware = (app) => {
  // app.use(expressValidator());
  app.use(cookieParser());
  // File uploading
  app.use(fileupload());
  // Sanitize data
  // Set security headers
  app.use(helmet());
  // Prevent XSS attacks
  app.use(xss());
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 100
  });
  app.use(limiter);
  // Prevent http param pollution
  app.use(hpp());
  // Enable CORS
  app.use(cors());
};

module.exports = { devMiddleware, prodMiddleware };
