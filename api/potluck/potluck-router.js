const express = require("express")
const Potlucks = require("./potluck-model")
const { v4: uuidv4 } =require("uuid")
const { validatePotluckById, validateUserById } = require("../middleware/validation")
const { restrict } = require("../middleware/restricted")

const router = express.Router()

router.get("/", restrict("organizer"), async (req, res, next) => {
    try {
        res.json(await Potlucks.findPotluck())
    } catch(err) {
        next(err)
    }
})

router.get("/:pid", restrict("organizer"), validatePotluckById, async (req, res, next) => {
    try {
        const potluck = await Potlucks.findPotluckById(req.params.pid)
        res.json(potluck)
    } catch(err) {
        next(err)
    }
})

router.post("/", restrict("organizer"), async (req, res, next) => {
    try {
        const { potluck_name, date, location, host_id } = req.body
        const newPotluck = await Potlucks.addPotluck({
            id: uuidv4(),
            potluck_name,
            date,
            location,
            host_id
        })
            res.status(201).json(newPotluck)
        } catch(err) {
        next(err)
    }
})

router.put("/:pid", restrict("organizer"), validatePotluckById, async (req, res, next) => {
    try {
        const { pid } = req.params
        const potluckInfo = req.body
        const potluck = await Potlucks.findPotluckById(pid)
        if (potluck) {
            const updatedPotluck = await Potlucks.updatePotluck(pid, potluckInfo)
            res.json(updatedPotluck)
        } else {
            res.status(404).json({
                message: "Could not find potluck with the given ID."
            })
        }
    } catch(err) {
        next(err)
    }
})

router.delete("/:pid", restrict("organizer"), validatePotluckById, (req, res, next) => {
    Potlucks.deletePotluck(req.params.pid)
    .then(() => {
        res.status(200).json({
            message: "The potluck has been deleted."
        })
    })
    .catch(next)
})

//Guests
// router.post("/api/potlucks/:pid/users/:uid", restrict("organizer"), validatePotluckById, validateUserById, async (req, res, next) => {
//     try {
//         const { pid, uid } = req.params
//         const guest = await Potlucks.findPotluckGuestById(pid, uid)
//         if (guest) {
//             res.status(409).json({ message: "This guest has already been invited to your potluck."})
//         } else {
//             Potlucks.addUserToPotluck(pid, uid)
//         .then(user => {
//             res.status(201).json(user)
//         })
//         }
//     } catch(err) {
//         next(err)
//     }
// })

// router.put("/api/potlucks/:pid/users/:uid", restrict(), validatePotluckById, validateUserById, async (req, res, next) => {
//     try {
//     const { pid, uid } = req.params
//     const changes = req.body
//     const guest = await Potlucks.findPotluckGuestById(pid, uid)
//     if (guest) {
//         const updatedGuest = await Potlucks.updateAttending(pid, uid, changes)
//         res.json(updatedGuest)
//     } else {
//         res.status(404).json({message: "That user has not been added to this potluck yet."})
//     }

//     } catch(err) {
//         next(err)
//     }
// })

module.exports = router