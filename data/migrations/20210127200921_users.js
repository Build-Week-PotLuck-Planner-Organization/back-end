exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.string('name', 255).notNullable();
    users.string('username', 255).notNullable().unique();
    users.string('password', 255).notNullable();
    users.string('email', 255).notNullable();
    users.string('phone', 255).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.create('users');
};
