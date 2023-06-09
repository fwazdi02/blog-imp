const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const passport = require("passport")

router.post("/login", function (req, res) {
    passport.authenticate("local", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Something is not right",
                user: user,
            })
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err)
            }
            const token = jwt.sign(user, "your_jwt_secret")
            return res.json({ user, token })
        })
    })(req, res)
})
