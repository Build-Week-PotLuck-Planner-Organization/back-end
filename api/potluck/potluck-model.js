const db = require("../../data/dbConfig")

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

//Guests 
// async function addUserToPotluck(pid, uid) {
    
//     await db("potlucks_users").insert({user_id: uid, potluck_id: pid, isAttending: false})

//     return db("potlucks_users as pu")
//        .innerJoin("users as u", "u.id", "pu.user_id")
//        .innerJoin("potlucks as p", "p.id", "pu.potluck_id")
//        .select("p.potluck_name", "u.name as user_name", "pu.isAttending")
//        .where({"p.id": pid})
// }

// async function updateAttending(pid, uid, changes) {
//     await db("potlucks_users as pu")
//     .where({"potluck_id": pid, "user_id": uid})
//     .update(changes)
// }

// function findPotluckGuestById(pid, uid) {
//     return db("potlucks_users as pu")
//         .innerJoin("users as u", "u.id", "pu.user_id")
//         .innerJoin("potlucks as p", "p.id", "pu.potluck_id")
//         .select("p.id as potluck_id", "p.potluck_name", "u.id as user_id", "u.name as guest_name", "pu.isAttending")
//         .where({"pu.potluck_id": pid, "pu.user_id": uid})
// }

module.exports = { 
    addPotluck,
    findPotluck,
    findPotluckBy,
    findPotluckById,
    updatePotluck,
    deletePotluck,
}