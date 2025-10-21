// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  const parts = authHeader.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];

  if (!token) return res.status(401).json({ msg: 'Invalid token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id, name, role?}
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ msg: 'Invalid token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // {id,name}
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };
