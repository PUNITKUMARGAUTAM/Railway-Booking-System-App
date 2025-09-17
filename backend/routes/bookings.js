const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

router.post('/', auth, bookingController.bookSeats);
router.get('/my', auth, bookingController.getMyBookings);
router.post('/cancel/:id', auth, bookingController.cancelBooking);

module.exports = router;
