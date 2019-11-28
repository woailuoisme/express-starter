const express = require('express');
const router = express.Router();
const {
	show,
	index,
	create,
	update,
	destroy,
	photoUpload,
} = require('../controllers/bootcamp.controller');
const advancedResults = require('../middleware/adv.results.handler');
const { protect, authorize } = require('../middleware/auth.handler');
const BootcmapRouter = require('../models/Bootcamp');

// console.log(Bootcamp)
router
	.route('/')
	// .get(index)
	.get(protect, advancedResults(BootcmapRouter), index)
	.post(create);
router
	.route('/:id')
	.get(show)
	.put(update)
	.delete(destroy);

router.route('/:id/photo').put(photoUpload);

module.exports = router;
