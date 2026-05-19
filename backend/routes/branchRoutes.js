const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

// Get all branches
router.get('/', branchController.getAllBranches);

// Get single branch
router.get('/:slug', branchController.getBranchBySlug);

// Create branch
router.post('/', branchController.createBranch);

// Update branch
router.put('/:slug', branchController.updateBranch);

// Delete branch
router.delete('/:slug', branchController.deleteBranch);

module.exports = router;
