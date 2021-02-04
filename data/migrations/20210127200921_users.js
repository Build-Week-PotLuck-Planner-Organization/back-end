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
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })

  .createTable('foods', foods => {
    foods.uuid('id').notNullable().unique().primary();
    foods.text('name').notNullable().unique();
  })

  .createTable('potlucks_users', table => {
    table.uuid('potluck_id')
      .notNullable()
      .references('id')
      .inTable('potlucks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
    table.boolean('isAttending').notNull().defaultTo('false')

    table.primary(['potluck_id', 'user_id'])
  })

  .createTable('potlucks_foods', table => {
    table.uuid('potluck_id')
      .notNullable()
      .references('id')
      .inTable('potlucks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.uuid('food_id')
      .notNullable()
      .references('id')
      .inTable('foods')
    table.boolean('isTaken').notNullable().defaultTo('false')

    table.primary(['potluck_id', 'food_id'])
  })
};

exports.down = function(knex) {
  return knex.schema

  .dropTableIfExists('potlucks_foods, potlucks_users,foods, potlucks, users');
};
