exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.unique('username');
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.unique('email');
    table.boolean('activated').notNullable().defaultTo(false);
    table.boolean('admin').notNullable().defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
