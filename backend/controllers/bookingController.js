const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');
const Booking = require('../models/Booking');

exports.bookSeats = async (req, res) => {
  const { scheduleId, seats } = req.body; // seats: [{seatNumber, coach, price, class}]
  const userId = req.user.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const schedule = await Schedule.findById(scheduleId).session(session);
    if (!schedule) throw new Error('Schedule not found');

    for (const s of seats) {
      const seatObj = schedule.seats.find(x => x.seatNumber === s.seatNumber && x.coach === s.coach);
      if (!seatObj) throw new Error(`Seat ${s.seatNumber} not found`);
      if (seatObj.isBooked) throw new Error(`Seat ${s.seatNumber} already booked`);
      seatObj.isBooked = true;
    }

    await schedule.save({ session });

    const total = seats.reduce((acc, cur) => acc + (cur.price || 0), 0);
    const booking = new Booking({ user: userId, schedule: scheduleId, seats, totalAmount: total });
    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    const populatedBooking = await Booking.findById(booking._id)
      .populate({ path: 'schedule', populate: { path: 'train' } })
      .populate('user', '-password');

    res.json(populatedBooking);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ msg: err.message });
  }
}

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({ path: 'schedule', populate: { path: 'train' } });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(id).session(session);
    if (!booking) throw new Error('Booking not found');
    if (booking.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Not allowed' });

    const schedule = await Schedule.findById(booking.schedule).session(session);
    for (const s of booking.seats) {
      const seatObj = schedule.seats.find(x => x.seatNumber === s.seatNumber && x.coach === s.coach);
      if (seatObj) seatObj.isBooked = false;
    }
    await schedule.save({ session });

    booking.status = 'CANCELLED';
    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: 'Cancelled', booking });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ msg: err.message });
  }
}
