const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const passport = require("passport")

/* POST login. */
router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(info)
                return res.json({ success: false, message: info?.message })
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)

                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, process.env.APP_JWT_KEY)

                return res.json({ success: true, user, token })
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next)
})
module.exports = router
