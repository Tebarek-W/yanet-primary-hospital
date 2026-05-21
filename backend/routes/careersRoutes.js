const express = require('express');
const router = express.Router();
const {
  getAllVacancies, getVacancyById, createVacancy, updateVacancy, deleteVacancy,
  getAllInternships, createInternship, updateInternship, deleteInternship,
} = require('../controllers/careersController');

// Vacancies
router.get('/vacancies', getAllVacancies);
router.get('/vacancies/:id', getVacancyById);
router.post('/vacancies', createVacancy);
router.put('/vacancies/:id', updateVacancy);
router.delete('/vacancies/:id', deleteVacancy);

// Internships
router.get('/internships', getAllInternships);
router.post('/internships', createInternship);
router.put('/internships/:id', updateInternship);
router.delete('/internships/:id', deleteInternship);

module.exports = router;
