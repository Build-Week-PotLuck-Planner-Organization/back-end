
exports.seed = async function(knex) {
  await knex('potlucks_foods').del()

  await knex('potlucks_foods').insert([
    {potluck_id: "3f95d22e-21a9-4ee4-9e9a-b14479b36555", food_id: "3f85d22e-21a9-4ee4-9e9a-b14479b36555", isTaken: true},
    {potluck_id: "5f95d22e-21a9-4ee4-9e9a-b14479b36555", food_id: "3f75d22e-21a9-4ee4-9e9a-b14479b36555", isTaken: false},
    {potluck_id: "5f95d22e-21a9-4ee4-9e9a-b14479b36555", food_id: "3f65d22e-21a9-4ee4-9e9a-b14479b36555", isTaken: true},
    {potluck_id: "7f95d22e-21a9-4ee4-9e9a-b14479b36555", food_id: "3f55d22e-21a9-4ee4-9e9a-b14479b36555", isTaken: false},
  ])
};
