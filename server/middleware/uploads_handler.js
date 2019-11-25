const multer = require('multer');
const { uploadsPath } = require('../common/util');
const path = require('path');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads');
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	},
});

const upload = multer({ storage: storage }).single('file');

module.exports = { upload };
