const { User } = require('../db/models');
const jwt = require('jsonwebtoken');

module.exports = {

  // POST /api/user/register
  register(req, res) {
    const { username, email, password } = req.body;
    if (typeof username !== 'string') return res.status(422).json({ message: 'Invalid Username' });
    if (typeof email !== 'string') return res.status(422).json({ message: 'Invalid Email' });
    if (typeof password !== 'string') return res.status(422).json({ message: 'Invalid Password' });
    const hashedPassword = User.generateHash(password);
    new User({ username, email, password: hashedPassword }).save().then((user) => {
      const token = jwt.sign(user, process.env.SECRET, { expiresIn: '168h' });
      res.status(200).json({ token, redirect: '/' });
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  },

  // POST /api/user/login
  login(req, res) {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(422).json({ message: 'Invalid Credentials' });
    }
    User.where({ username }).fetch().then((user) => {
      user = user.attributes;
      if (!User.checkPassword(password, user.password)) return res.status(403).json({ message: 'Invalid Credentials' });
      const token = jwt.sign(user, process.env.SECRET, { expiresIn: '168h' });
      res.status(200).json({ token , redirect: user.admin ? '/admin': '/' });
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  },

  // GET /api/user/me
  getMyInfo(req, res) {
    res.status(200).json(req.user);
  }
};
