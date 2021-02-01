const db = require("../../data/dbConfig")
const router = require("./potluck-router")

async function addPotluck(potluck) {
    const [id] = await db("potlucks").insert(potluck, "id")
    return findPotluckById(id)
}

function findPotluck() {
    return db("potlucks as p")
        .innerJoin("users as u", "u.id", "host_id")    
        .select("p.id", "p.potluck_name", "p.location", "p.date", "u.name as host_name")
}

function findPotluckBy(filter) {
    return db ("potlucks as p")
    .innerJoin("users as u", "u.id", "p.host_id")
    .select("p.id", "p.name", "p.location", "p.date", "u.name as host_name")
    .where(filter)
}

function findPotluckById(id) {
    return db("potlucks as p")
    .innerJoin("users as u", "u.id", "p.host_id")
    .select("p.id", "p.potluck_name", "p.location", "p.date", "u.name as host_name")
    .where({ "p.id": id })
    .first()
}

async function addPotluck(potluck) {
    const [id] = await db("potlucks").insert(potluck, "id")
    return findPotluckById(id)
}

async function updatePotluck(id, changes) {
    await db("potlucks")
    .where({id})
    .update(changes)
    return findPotluckById(id)
}

function deletePotluck(id) {
    return db("potlucks")
    .where({id})
    .del()
}

module.exports = { 
    addPotluck,
    findPotluck,
    findPotluckBy,
    findPotluckById,
    updatePotluck,
    deletePotluck,
}