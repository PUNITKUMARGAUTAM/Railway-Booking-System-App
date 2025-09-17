const Train = require('../models/Train');
const Schedule = require('../models/Schedule');

exports.createTrain = async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.json(train);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.searchTrains = async (req, res) => {
  try {
    // use query parameters for search
    const { from, to, date } = req.query;
    const trains = await Train.find({
      from: new RegExp(`^${from}$`, 'i'),
      to: new RegExp(`^${to}$`, 'i')
    });
    const dateObj = date ? new Date(date) : null;
    const result = [];
    for (const t of trains) {
      if (dateObj) {
        const sched = await Schedule.findOne({ train: t._id, date: { $eq: dateObj } });
        result.push({ train: t, schedule: sched });
      } else {
        result.push({ train: t });
      }
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.getTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const train = await Train.findById(id);
    if (!train) return res.status(404).json({ msg: 'Train not found' });
    res.json(train);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.createSchedule = async (req, res) => {
  try {
    const { trainId, date, fromTime, toTime, seats } = req.body;
    const schedule = new Schedule({ train: trainId, date, fromTime, toTime, seats });
    await schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.getSchedule = async (req, res) => {
  try {
    const { id } = req.params; // schedule id
    const schedule = await Schedule.findById(id).populate('train');
    if (!schedule) return res.status(404).json({ msg: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}
