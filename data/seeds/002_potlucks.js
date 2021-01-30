exports.seed = async function(knex) {
  return knex('potlucks').insert([
    {potluck_name: "Family Potluck 2021", date: "08-30-2020", location: "123 Sunshine Ave. Charlotte, NC 12312", host_id: 1},
    {potluck_name: "Spectrum Potluck", date: "04-12-2020", location: "345 Sunset Blvd. Raleigh, NC 22345", host_id: 2},
    {potluck_name: "Friendly Potluck", date: "12-30-2021", location: "222 Cloud Ave. Houston, TX 32345", host_id: 3},
    {potluck_name: "Surprise Potluck 2021", date: "12-31-2021", location: "321 Starry St. Austin, TX 22322", host_id: 2},
  ])
};
