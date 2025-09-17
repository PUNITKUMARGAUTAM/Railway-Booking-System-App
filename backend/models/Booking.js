const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId, ref : 'TravelUser' , required : true },
  schedule : { type : mongoose.Schema.Types.ObjectId, ref : 'Schedule' , required : true },
  seats: [
    {
      seatNumber : String,
      coach : String,
      class : String,
      price : Number
    }
  ],
  totalAmount : Number,
  status : { type: String , enum:['CONFIRMED','CANCELLED' , 'PENDING'], default: 'CONFIRMED' },
  bookedAt : { type : Date, default : Date.now }
});

module.exports = mongoose.model('Booking' , BookingSchema);
