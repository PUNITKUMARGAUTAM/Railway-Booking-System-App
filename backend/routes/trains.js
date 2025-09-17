const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const trainController = require('../controllers/trainController');

// public
router.get('/search', trainController.searchTrains); // GET /api/trains/search?from=X&to=Y&date=YYYY-MM-DD
router.get('/:id', trainController.getTrain);
router.get('/schedule/:id', trainController.getSchedule);

// admin (protected)
router.post('/', auth, trainController.createTrain);
router.post('/schedule', auth, trainController.createSchedule);

module.exports = router;
