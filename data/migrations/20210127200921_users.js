exports.up = async function(knex) {
  await knex.schema.createTable('users', users => {
    users.increments();
    users.text('name', 255).notNullable();
    users.text('username', 255).notNullable().unique();
    users.text('password', 255).notNullable();
    users.text('email', 255).notNullable();
    users.text('phone', 255).notNullable();
  })

  await knex.schema.createTable('potlucks', potlucks => {
    potlucks.increments();
    potlucks.text('potluck_name', 255).notNullable();
    potlucks.date('date', 255).notNullable();
    potlucks.text('location', 255).notNullable();
    potlucks.integer('host_id', 255)
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
};

exports.down = async function(knex) {
  await knex.schema.create('potlucks');
  await knex.schema.create('users');
};
