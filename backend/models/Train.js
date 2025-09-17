const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  name : { type : String , required: true },
  number : { type : String , required : true , unique : true },
  from : { type : String , required : true },
  to : { type : String , required : true },
  baseFare : { type : Number, default : 0 },
  coaches : [{ coachType : String , seatsPerCoach : Number }]
}, { timestamps : true });

module.exports = mongoose.model('Train' , TrainSchema);
