const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/async.handler');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
// const { upload } = require('../middleware/uploads_handler');
const { uploadsImagePath } = require('../common/config');

// mkdirp.sync(uploadPath)
router.post(
  '/avatar',
  asyncHandler((req, res, next) => {
    // const filePath = path.join(__dirname, '../public/uploads/', req.params.img);
    console.log(req.files.file);
    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  })
);

module.exports = router;
