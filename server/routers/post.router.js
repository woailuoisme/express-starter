const express = require('express');
const router = express.Router();
const { show, index, create, update, destroy } = require('../controllers/post.controller');

router
	.route('/')
	.get(index)
	.post(create);
router
	.route('/:id')
	.get(show)
	.put(update)
	.delete(destroy);

module.exports = router;
