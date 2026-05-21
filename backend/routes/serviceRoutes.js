const express = require('express');
const router = express.Router();
const { getAllServices, getServiceBySlug, createService, updateService, deleteService } = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);
router.post('/', createService);
router.put('/:slug', updateService);
router.delete('/:slug', deleteService);

module.exports = router;
