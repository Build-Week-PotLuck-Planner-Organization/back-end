const express = require("express")
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } =require("uuid")
const jwt = require("jsonwebtoken")
const Users = require("./auth-model")
const { restrict } = require("../middleware/restricted")

const router = express.Router()

router.get("/users", restrict("organizer"), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        const { name, username, password, email, phone } = req.body

        const usernameConflict = await Users.findBy({ username }).first()
        const emailConflict = await Users.findBy({email}).first()
        const phoneConflict = await Users.findBy({ phone }).first()

        if(usernameConflict) {
            return res.status(409).json({
                message: "Username is already taken by another user."
            })
        }

        if(emailConflict) {
            return res.status(409).json({
                message: "Email is already taken by another user."
            })
        }

        if(phoneConflict) {
            return res.status(409).json({
                message: "Phone number is already taken by another user."
            })
        }

        const newUser = await Users.add({
            id: uuidv4(), 
            name,
            username,
            password: await bcrypt.hash(password, 14),
            email,
            phone
        })

        console.log(newUser)
        res.status(201).json(newUser)

    } catch(err) {
        next(err)
    }
}) 

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        if(!user) {
            return res.status(401).json({
                message: "Invalid Credentials",
            })
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid) {
            return res.status(401).json({
                message: "Password is Invalid",
            })
        }

        const token = jwt.sign({
            userId: user.id,
            userRole: "organizer",
        }, process.env.JWT_SECRET)

        res.json({
            id: user.id,
            message: `Welcome ${user.username}!`,
            token
        })

    } catch(err) {
        next(err)
    }
})

module.exports = router