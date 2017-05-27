const bookshelf = require('./index');

const Series = bookshelf.Model.extend({
  tableName: 'series',
  items() {
    this.hasMany('Item');
  }
});

module.exports = bookshelf.model('Series', Series);
