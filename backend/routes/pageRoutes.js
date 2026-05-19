const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Get all pages schemas (for public site)
router.get('/', pageController.getAllPages);

// Get single page (for admin editor)
router.get('/:id', pageController.getPageById);

// Update single page (for admin editor)
router.put('/:id', pageController.updatePage);

module.exports = router;
