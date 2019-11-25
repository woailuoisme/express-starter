const pino = require('pino');
const moment = require('moment-timezone');
//pin timestamp json sting `,"time":1493426328206`;
const now = moment()
	.tz('Asia/Shanghai')
	.format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
const logger = pino({
	name: process.env.APP_ID || 'express',
	level: process.env.LOG_LEVEL || 'debug',
	timestamp: () => `,"time":"${now}"`,
});

module.exports = logger;
