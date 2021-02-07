const express = require("express")
const { v4: uuidv4 } =require("uuid")
const Foods = require("./food-model")
const Potlucks = require("../potluck/potluck-model")
const { restrict } = require("../middleware/restricted")
const { validatePotluckById, validateFoodById } = require("../middleware/validation")

const router = express.Router()

router.get("/foods", restrict("organizer"), async (req, res, next) => {
    try {
        res.json(await Foods.findFood())
    } catch(err) {
        next(err)
    }
})

router.get('/potlucks/:pid/foods', restrict("organizer"), validatePotluckById, async (req, res, next) => {
    try {
        const { pid } = req.params
        const potluckFoods = await Foods.findAllPotluckFood(pid)
        res.json(potluckFoods)
    } catch(err) {
        next(err)
    }
})

router.post("/foods", restrict("organizer"), async (req, res, next) => {
    try {
        const { name } = req.body
        const newFood = await Foods.addFood({
            id: uuidv4(),
            name,
        })
            res.status(201).json(newFood)
        } catch(err) {
        next(err)
    }
})
//add food to a specific potluck
    //we need a potluck id and a food id
    //potluck id will come from the parameter
    //expect a food name string in the body
    //first check if the potluck id is a valid id if not throw an error
    //check if the food exists by searching for the food by name
    //if it doesn't exist then insert food into the food table then return the id
    //if it does exist grab the id
    //insert the potluck id and the food id into the potluck food table
// router.post("/api/potlucks/:pid/foods/:fid", restrict(), validatePotluckById, async (req, res, next) => {
//     try {
//         const { pid, fid } = req.params
//         const food = req.body
//         const addedFood = await Potlucks.addFoodToPotluck(food, pid, fid)
//         res.status(201).json(addedFood)
    
//     } catch(err) {
//         next(err)
//     }
// })
// //update food to taken
// router.put("/potlucks/:pid/foods/:fid", restrict("organizer"), validatePotluckById, validateFoodById, async (req, res, next) => {
//     try {
//         const {pid, fid} = req.params
//         const changes = req.body
//         const potluck = await Foods.findPotluckFoodById(pid, fid)
//         if (potluck) {
//             const updatedFood = await Foods.updateTaken(pid, fid, changes)
//             res.json(updatedFood)
//         } else {
//             res.status(404).json({ message: "You need to add this food to the potluck first."})
//         }
//     } catch(err) {
//         next(err)
//     }
// })

module.exports = router