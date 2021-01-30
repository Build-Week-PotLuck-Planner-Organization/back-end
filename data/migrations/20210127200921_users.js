exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.text('name', 255).notNullable();
    users.text('username', 255).notNullable().unique();
    users.text('password', 255).notNullable();
    users.text('email', 255).notNullable();
    users.text('phone', 255).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.create('users');
};
