const db = require("../../data/dbConfig")

async function add(user) {
    const [id] = await db ("users").insert(user)
    return findById(id)
}

function find() {
    return db("users").select("id", "name", "username", "email", "phone")
}

function findBy(filter) {
    return db("users")
    .select("id", "name", "username", "password", "email", "phone")
    .where(filter)
}

function findById(id) {
    return db("users")
        .select("id", "name", "username", "email", "phone")
        .where({ id})
        .first()
}

module.exports = {
    add, 
    find, 
    findBy, 
    findById
}