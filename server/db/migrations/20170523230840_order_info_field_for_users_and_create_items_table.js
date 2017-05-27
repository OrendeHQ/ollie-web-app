exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('address');
      table.string('city');
      table.string('postal_code');
      table.string('country');
    }),
    knex.schema.createTable('series', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    }),
    knex.schema.createTable('items', (table) => {
      table.increments('id').primary();
      table.integer('series_id').unsigned().notNullable()
        .references('id').inTable('series');
      table.string('picture').notNullable();
      table.string('model_number').notNullable();
      table.string('description').notNullable();
      table.decimal('wattage').notNullable();
      table.string('lamp_base').notNullable();
      table.integer('lamp_life').notNullable();
      table.string('color_temp').notNullable();
      table.decimal('price', 2).notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.fall([
    knex.schema.dropTable('items'),
    knex.schema.dropTable('series'),
    knex.schema.table('users', (table) => {
      table.dropColumn('address');
      table.dropColumn('city');
      table.dropColumn('postal_code');
      table.dropColumn('country');
    })
  ]);
};
