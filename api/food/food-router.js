const express = require("express")
const { v4: uuidv4 } =require("uuid")
const Foods = require("./food-model")
const { restrict } = require("../middleware/restricted")
const { validatePotluckById } = require("../middleware/validation")

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

router.post("/potlucks/:pid", restrict("organizer"), async (req, res, next) => {
    try {
        const { pid } = req.params
        const { name }= req.body
        const addedFood = await Foods.addFoodToPotluck({
            pid,
            id: uuidv4(),
            name,
        })
        res.status(201).json(addedFood)
    } catch(err) {
        next(err)
    }
})

module.exports = router