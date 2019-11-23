const express = require('express');
const router = express.Router();
const {show, index, create, update, destroy, photoUpload} = require('../controllers/bootcamp');
const advancedResults = require('../middleware/advancedResults');
const {protect, authorize} = require('../middleware/AuthHandler');
const Bootcamp = require('../models/Bootcamp');

// console.log(Bootcamp)
router
    .route('/')
    // .get(index)
    .get(protect, advancedResults(Bootcamp), index)
    .post(create);
router
    .route('/:id')
    .get(show)
    .put(update)
    .delete(destroy);

router.route('/:id/photo').put(photoUpload);

module.exports = router;
