const express = require('express');
const asyncHandler = require('../middleware/async.handler');
const dayjs = require("dayjs");
const router = express.Router();
const pkg = require('../../package.json');

router.get(
  '/',
  asyncHandler(async (req, res, next) =>  res.json({
      now: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  }))
);

router.get('/health-check',  asyncHandler(async (req, res, next) =>  res.send('OK')));


module.exports = router;
