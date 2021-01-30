const db = require("../../data/dbConfig")

function findPotluck() {
    return db("potlucks as p")
        .innerJoin("users as u", "u.id", "host_id")    
        .select("p.id", "p.potluck_name", "p.location", "p.date", "u.name as host_name")
}

module.exports = { 
    findPotluck,
}