const pino = require('pino');
const moment = require('moment-timezone');
const { APP_ID, LOG_LEVEL } = require('./config');
// pin timestamp json sting `,"time":1493426328206`;
const now = moment()
	.tz('Asia/Shanghai')
	.format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
const logger = pino({
	name: APP_ID || 'express',
	level: LOG_LEVEL || 'debug',
	timestamp: () => `,"time":"${now}"`,
});

module.exports = logger;
