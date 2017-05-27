const bookshelf = require('./index');

const Item = bookshelf.Model.extend({
  tableName: 'items',
  series() {
    this.belongsTo('Series');
  }
});

module.exports = bookshelf.model('Item', Item);
