const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// All message routes should be protected
router.use(authMiddleware);

router.get('/me', messageController.getDoctorChannels);
router.post('/send', messageController.sendMessage);

module.exports = router;
