const express = require('express');
const router = express.Router();
const { register, me, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

router.get('/:id', me);

module.exports = router;
