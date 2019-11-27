const express = require('express');
const {
	register,
	login,
	logout,
	me,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword,
} = require('../controllers/auth.controller');

const router = express.Router();

const { protect } = require('../middleware/auth.handler');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, me);
router.post('/forgotpassword', forgotPassword);
router.put('/updatepassword', protect, updatePassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;
