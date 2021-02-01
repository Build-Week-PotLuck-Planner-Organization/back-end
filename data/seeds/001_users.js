exports.seed = async function(knex) {
  await knex('users').del()

  await knex('users').insert([
    {id: "4f95d22e-21a9-4ee4-9e9a-b14479b36555", name: "Elizabeth Allen", username: "eallen", password: "123456", email: "eallen@gmail.com", phone: "777-777-7777"},
    {id: "4f95d22e-21a9-4ee4-9e9a-b14479b36556", name: "Dylan Heart", username: "dheart", password: "654321", email: "dheart@gmail.com", phone: "444-444-4444"},
    {id: "4f95d22e-21a9-4ee4-9e9a-b14479b36557", name: "Mackenzie Reynolds", username: "mreynolds", password: "abcdef", email: "mreynold@gmail.com", phone: "555-555-5555"},
    {id: "4f95d22e-21a9-4ee4-9e9a-b14479b36558", name: "Michael Flores", username: "mflores", password: "fedcba", email: "mflores@gmail.com", phone: "222-222-2222" },
  ])
};
