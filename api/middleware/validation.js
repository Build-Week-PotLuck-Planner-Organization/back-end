const Potlucks = require("../potluck/potluck-model")
const Users = require("../auth/auth-model")
const Foods = require("../food/food-model")

function validatePotluckById (req, res, next) {

    Potlucks.findPotluckById(req.params.pid)
    .then (potluck => {
        if(potluck) {
            req.potluck = potluck
            next()
        } else {
            res.status(400).json({ message: "Could not find potluck with the given ID."})
        }
    }) 
    .catch (err => {
        console.log("error:", err)
        res.status(500).json({ message: `There was a problem with your ${req.method} request.`})
    })
}

function validateUserById (req, res, next) {

    Users.findUserById(req.params.uid)
    .then (user => {
        if(user) {
            req.user = user
            next()
        } else {
            res.status(400).json({ message: "Could not find user with the given ID."})
        }
    }) 
    .catch (err => {
        console.log("error:", err)
        res.status(500).json({ message: `There was a problem with your ${req.method} request.`})
    })
}

function validateFoodById (req, res, next) {

    Foods.findFoodById(req.params.fid)
    .then (food => {
        if(food) {
            req.food = food
            next()
        } else {
            res.status(400).json({ message: "Could not find food with the given ID."})
        }
    }) 
    .catch (err => {
        console.log("error:", err)
        res.status(500).json({ message: `There was a problem with your ${req.method} request.`})
    })
}

module.exports = {
    validatePotluckById, 
    validateUserById,
    validateFoodById,
}