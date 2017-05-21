const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) return res.status(403).json({ message: 'Unauthorized' });
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(500).json(err);
    if (decoded.exp <= (Date.now() / 1000)) res.status(403).json({ message: 'Token Expired' });
    req.user = decoded;
    next();
  });
};
