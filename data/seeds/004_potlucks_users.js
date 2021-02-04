
exports.seed = async function(knex) {
  await knex('potlucks_users').del()

  await knex('potlucks_users').insert([
    {potluck_id: "3f95d22e-21a9-4ee4-9e9a-b14479b36555", user_id: "4f95d22e-21a9-4ee4-9e9a-b14479b36555", isAttending: "true"},
    {potluck_id: "5f95d22e-21a9-4ee4-9e9a-b14479b36555", user_id: "4f95d22e-21a9-4ee4-9e9a-b14479b36556", isAttending: "false"},
    {potluck_id: "6f95d22e-21a9-4ee4-9e9a-b14479b36555", user_id: "4f95d22e-21a9-4ee4-9e9a-b14479b36557", isAttending: "true"},
    {potluck_id: "7f95d22e-21a9-4ee4-9e9a-b14479b36555", user_id: "4f95d22e-21a9-4ee4-9e9a-b14479b36555", isAttending: "true"},
  ])
};
