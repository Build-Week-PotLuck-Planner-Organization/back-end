const db = require("../../data/dbConfig")
const Potlucks = require("../potluck/potluck-model")

async function addFood(food) {
    const [id] = await db("foods").insert(food, "id")
    return findFoodById(id)
}

async function addFoodToPotluck(food, pid, fid) {
    let newFood = await findFoodByName(food)
    if (newFood) {
      newFood = await addFood(food)
    }
 
    await db("potlucks_foods").insert({food_id: newFood.id, potluck_id: id, isTaken: false})
 
    return db("potlucks_foods as pf")
         .innerJoin("foods as f", "f.id", "pf.food_id")
         .innerJoin("potlucks as p", "p.id", "pf.potluck_id")
         .select("p.name as potluck_name","f.id as food_id", "f.name as food_name", "pf.isTaken")
         .where({ "p.id": id })
 } 

function findFood() {
    return db('foods').select('id', 'name')
}

function findFoodByName(name) {
    return db('foods')
        .select('id', 'name')
        .where({ name })
}

function findFoodById(id) {
    return db('foods')
        .select('id', 'name')
        .where({ id })
        .first()
}

async function updateTaken(pid, fid, changes) {
    await db('potlucks_foods')
        .where({'potluck_id': 'pid', 'food_id': 'fid'})
        .update(changes)
    return findPotluckFoodById(pid, fid)
}

function findPotluckFoodById(pid, fid) {
    return db('potlucks_foods as pf')
        .innerJoin('foods as f', 'f.id', 'pf.food_id')
        .innerJoin('potlucks as p', 'p.id', 'pf.potluck_id')
        .select('p.id as potluck_id', 'p.potluck_name', 'f.id as food_id', 'f.name', 'pf.isTaken')
        .where({'pf.potluck_id': pid, 'pf.food_id': fid})
}

function findAllPotluckFood(pid) {
    return db('potlucks_foods as pf')
        .innerJoin('foods as f', 'f.id', 'pf.food_id')
        .innerJoin('potlucks as p', 'p.id', 'pf.potluck_id')
        .select('p.potluck_name', 'f.name', 'pf.isTaken')
        .where({'pf.potluck_id': pid})
}

module.exports = {
    addFood,
    findFood,
    findFoodByName,
    findFoodById,
    updateTaken,
    findPotluckFoodById,
    findAllPotluckFood,
    addFoodToPotluck,
}