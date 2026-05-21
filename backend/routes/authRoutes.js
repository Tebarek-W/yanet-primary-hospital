const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/staff-login', authController.staffLogin);

module.exports = router;
