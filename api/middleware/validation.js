const Potlucks = require("../potluck/potluck-model")

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
        res.status(500).json({ message: `There was a problem with your ${req.method} request`})
    })
}

module.exports = {
    validatePotluckById, 
}