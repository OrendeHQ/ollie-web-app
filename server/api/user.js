const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {

  // POST /api/user/register
  register(req, res) {
    const { username, email, password } = req.body;
    const newAccount = new User({ username, email });
    newAccount.password = newAccount.generateHash(password);
    newAccount.save((err) => {
      if (err) return res.status(500).json({ message: JSON.stringify(err) });
      res.status(200).json(newAccount);
    });
  },

  // POST /api/user/login
  login(req, res) {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(422).json({ message: 'Invalid Credentials' });
    }
    User.findOne({ username }, (err, user) => {
      if (err) return res.status(500).json({ message: JSON.stringify(err) });
      if (!user) return res.status(404).json({ message: 'User Not Found' });
      if (!user.checkPassword(password, user.password)) return res.status(403).json({ message: 'Invalid Credentials' });
      const token = jwt.sign(user._doc, process.env.SECRET, { expiresIn: '168h' });
      res.status(200).json({ token });
    });
  },

  // GET /api/user/me
  getMyInfo(req, res) {
    res.status(200).json(req.user);
  }
};
