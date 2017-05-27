const bookshelf = require('./bookshelf');

const Series = bookshelf.Model.extend({
  tableName: 'series',
  items() {
    return this.hasMany('Item');
  }
}, {
  dependents: ['items']
});

module.exports = bookshelf.model('Series', Series);
