const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/:img', (req, res) => {
	const filePath = path.join(__dirname, '../public/uploads/', req.params.img);
	console.log(filePath);
	res.sendFile(filePath);
	console.log('Request for ' + req.url + ' received.');
});

module.exports = router;
