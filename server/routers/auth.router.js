const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  me,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword
} = require('../controllers/auth.controller');

const { protect } = require('../middleware/auth.handler');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, me);
router.post('/forgot_password', forgotPassword);
router.put('/update_password', protect, updatePassword);
router.put('/reset_password/:reset_token', resetPassword);
router.put('/update_details', protect, updateDetails);

module.exports = router;
