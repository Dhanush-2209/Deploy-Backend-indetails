// individualRoutes.js
const express = require('express');
const router = express.Router();
const individualController = require('../controllers/individualController');

router.post('/submit', individualController.createIndividual);
router.get('/projects', individualController.getIndividualProjects);
router.get('/projects/:status', individualController.getFilteredProjects); // Add this line
router.put('/update/individual/:projectName', individualController.updateIndividualProject);

module.exports = router;