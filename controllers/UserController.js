var express = require("express")
var app = express()
const bcrypt = require("bcrypt")
const { User, hashPassword } = require("../models/User")
const { UserCreateValidation, UserDeleteValidation } = require("../validations/VUser")

const getValidationError = (details) => {
    let errors = details.map((item) => {
        return item.message.replace(/"/g, "")
    })
    return errors
}

app.get("/", async (req, res) => {
    const users = await User.find()
    res.json({ success: true, message: "Success", data: users })
})

app.delete("/", async (req, res) => {
    const validate = UserDeleteValidation.validate(req.body)
    if (validate.error) {
        const errors = getValidationError(validate.error.details)
        res.json({ success: false, message: errors })
        throw validate.error
    }
    User.findOneAndRemove(req.body.id)
        .then((model) => {
            res.json({ success: true, message: "User successfully deleted" })
        })
        .catch((err) => {
            res.json({ success: false, message: "Failed to delete user" })
        })
})

app.post("/", async (req, res) => {
    const validate = UserCreateValidation.validate(req.body)
    if (validate.error) {
        const errors = getValidationError(validate.error.details)
        res.json({ success: false, message: errors })
        throw validate.error
    }
    const { email, password, name, photo } = req.body
    const hash_password = await hashPassword(password)
    const _user = new User({ email, password: hash_password, name, photo })
    _user
        .save()
        .then((model) => {
            res.json({ success: true, message: `User '${email}' successfully created` })
        })
        .catch((err) => {
            res.json({ success: false, message: "Failed to create user" })
        })
})

module.exports = app
