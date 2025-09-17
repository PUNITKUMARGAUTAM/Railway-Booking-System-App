const User = require('../models/TravelUser');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: Crypto.AES.encrypt(req.body.password, process.env.PASS_SECR).toString(),
    });
    const saveUser = await newUser.save();
    res.status(201).json({msg:'Registered', userId: saveUser._id});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json('Wrong email');

    const hashPassword = Crypto.AES.decrypt(user.password, process.env.PASS_SECR);
    const originalPassword = hashPassword.toString(Crypto.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password");
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
