const mongoose = require('mongoose');

const SeatStatesSchema = new mongoose.Schema({
  seatNumber : String,
  coach : String,
  price : Number,
  class : String,
  isBooked : { type : Boolean , default : false }
});

const scheduleSchema = new mongoose.Schema({
  train : { type : mongoose.Schema.Types.ObjectId , ref:'Train' , required : true },
  date : { type : Date , required : true },
  fromTime : String,
  toTime : String,
  seats : [SeatStatesSchema]
}, { timestamps: true });

module.exports = mongoose.model('Schedule' , scheduleSchema);
