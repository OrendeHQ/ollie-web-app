const bookshelf = require('./bookshelf');
const bcrypt = require('bcryptjs');

const User = bookshelf.Model.extend({
  tableName: 'users'
}, {
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  },
  checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
});

module.exports = bookshelf.model('User', User);
