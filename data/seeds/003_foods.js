exports.seed = async function(knex) {
  await knex('foods').del()

  await knex('foods').insert([
    {id: "3f85d22e-21a9-4ee4-9e9a-b14479b36555", name: "Apple Pie"},
    {id: "3f75d22e-21a9-4ee4-9e9a-b14479b36555", name: "Chocolate Cake"},
    {id: "3f65d22e-21a9-4ee4-9e9a-b14479b36555", name: "Oranges"},
    {id: "3f55d22e-21a9-4ee4-9e9a-b14479b36555", name: "White Grapes"},
    {id: "3f45d22e-21a9-4ee4-9e9a-b14479b36555", name: "Mac and Cheese"},
    {id: "3f35d22e-21a9-4ee4-9e9a-b14479b36555", name: "Turkey Sandwiches"},
  ])
};
