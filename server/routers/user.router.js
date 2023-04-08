const express = require('express');
const router = express.Router();
const { show, index, create, update, destroy } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.handler');

router.route('/').get(index, protect).post(create, protect);
router.route('/:id').get(show, protect).put(update, protect).delete(destroy, protect);

module.exports = router;
