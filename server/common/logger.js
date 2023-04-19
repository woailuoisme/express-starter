import fs from 'fs';
import winston, { format } from 'winston';

import 'winston-daily-rotate-file';

require('winston-daily-rotate-file');

// Use LOG_DIR from env
const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Create log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}
const { getIPAddress } = require('./info');

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf((info) => `[${info.timestamp}] [${getIPAddress()}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      // format: format.combine(format.colorize(), format.simple(),),
      level: 'info'
    }),
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp({ format: 'HH-MM:ss YYYY-MM-DD' }), format.json()),
      maxFiles: '7d',
      level: LOG_LEVEL,
      dirname: LOG_DIR,
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%-debug.log'
    })
  ]
});

exports.logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }
};

module.exports = logger;
