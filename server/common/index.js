const server = require('server');
const sendEmails = require('email');
const config = require('config');

const logger = require('logger');

module.exports = {
  server,
  sendEmails,
  config,
  logger
};
