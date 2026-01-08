const express = require('express');
const router = express.Router();
const Training = require('../models/Training')
const trainings = require('../controllers/trainings.controller')
const courseRouter = require('./courses.routes')

router.post('/', trainings.createTraining)
router.get('/', trainings.getAllTraining)
router.get('/:id', trainings.getTraining)
router.put('/:id/photo', trainings.putPhotoUpload) 

router.use('/:trainingId/courses', courseRouter)

module.exports = router;
