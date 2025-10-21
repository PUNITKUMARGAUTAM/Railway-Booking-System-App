// controllers/authController.js
const User = require('../models/TravelUser');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

// ------------------- REGISTER -------------------
exports.register = async (req, res) => {
  try {
    // check if user already exists
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: Crypto.AES.encrypt(req.body.password, process.env.PASS_SECR).toString(),
      role: req.body.role || 'user'
    });

    const saveUser = await newUser.save();

    // create token
    const token = jwt.sign(
      { id: saveUser._id, name: saveUser.name, role: saveUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY || '7d' }
    );

    const { password, ...others } = saveUser._doc;
    res.status(201).json({ user: others, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------- LOGIN -------------------
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: 'Wrong email' });

    const hashPassword = Crypto.AES.decrypt(user.password, process.env.PASS_SECR);
    const originalPassword = hashPassword.toString(Crypto.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY || '7d' }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ user: others, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// const User = require('../models/TravelUser');
// const Crypto = require('crypto-js');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const newUser = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: Crypto.AES.encrypt(req.body.password, process.env.PASS_SECR).toString(),
//     });
//     const saveUser = await newUser.save();
//     res.status(201).json({msg:'Registered', userId: saveUser._id});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(401).json('Wrong email');

//     const hashPassword = Crypto.AES.decrypt(user.password, process.env.PASS_SECR);
//     const originalPassword = hashPassword.toString(Crypto.enc.Utf8);

//     if (originalPassword !== req.body.password) {
//       return res.status(401).json("Wrong password");
//     }

//     const token = jwt.sign(
//       { id: user._id, name: user.name },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.TOKEN_EXPIRY }
//     );

//     const { password, ...others } = user._doc;
//     res.status(200).json({ ...others, token });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// };
