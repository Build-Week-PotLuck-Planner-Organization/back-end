const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Potlucks = require("./potluck-model")
const { restrict } = require("../middleware/restricted")

const router = express.Router()

router.get("/", restrict("organizer"), async (req, res, next) => {
    try {
        res.json(await Potlucks.findPotluck())
    } catch(err) {
        next(err)
    }
})

module.exports = router