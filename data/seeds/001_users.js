exports.seed = async function(knex) {
  return knex('users').insert([
    {name: "Elizabeth Allen", username: "eallen", password: "123456", email: "eallen@gmail.com", phone: "777-777-7777"},
    {name: "Dylan Heart", username: "dheart", password: "654321", email: "dheart@gmail.com", phone: "444-444-4444"},
    {name: "Mackenzie Reynolds", username: "mreynolds", password: "abcdef", email: "mreynold@gmail.com", phone: "555-555-5555"},
    {name: "Michael Flores", username: "mflores", password: "fedcba", email: "mflores@gmail.com", phone: "222-222-2222" },
  ])
};
