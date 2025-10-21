const Train = require('../models/Train');
const Schedule = require('../models/Schedule');

exports.createTrain = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin only' });
    }

    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.searchTrains = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const trains = await Train.find({
      from: new RegExp(`^${from}$`, 'i'),
      to: new RegExp(`^${to}$`, 'i')
    });

    const result = [];
    for (const t of trains) {
      if (date) {
        const dateObj = new Date(date);
        const sched = await Schedule.findOne({
          train: t._id,
          date: { $eq: dateObj }
        });
        result.push({ train: t, schedule: sched });
      } else {
        result.push({ train: t });
      }
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.getTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const train = await Train.findById(id);
    if (!train) return res.status(404).json({ msg: 'Train not found' });
    res.json(train);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { trainId, date, fromTime, toTime, seats } = req.body;
    const schedule = new Schedule({ train: trainId, date, fromTime, toTime, seats });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.getSchedule = async (req, res) => {
  try {
    const { id } = req.params; // schedule id
    const schedule = await Schedule.findById(id).populate('train');
    if (!schedule) return res.status(404).json({ msg: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
