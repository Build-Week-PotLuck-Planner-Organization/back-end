exports.up = async function(knex) {
  return knex.schema
  
  .createTable('users', users => {
    users.uuid('id').notNullable().unique().primary();
    users.text('name', 255).notNullable();
    users.text('username', 255).notNullable().unique();
    users.text('password', 255).notNullable();
    users.text('email', 255).notNullable();
    users.text('phone', 255).notNullable();
  })

  .createTable('potlucks', potlucks => {
    potlucks.uuid('id').notNullable().unique().primary();
    potlucks.text('potluck_name', 255).notNullable();
    potlucks.date('date', 255).notNullable();
    potlucks.text('location', 255).notNullable();
    potlucks.uuid('host_id')
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.schema

  .dropTableIfExists('potlucks, users');
};
