var express = require("express")
var app = express()
const bcrypt = require("bcrypt")
const { ObjectFile } = require("../models/ObjectFile")
const { ObjectFileCreateValidation, ObjectFileDeleteValidation } = require("../validations/VObjectFile")

const getValidationError = (details) => {
    let errors = details.map((item) => {
        return item.message.replace(/"/g, "")
    })
    return errors
}

app.get("/", async (req, res) => {
    const data = await ObjectFile.find()
    res.json({ success: true, message: "Success", data })
})

app.get("/:id", async (req, res) => {
    ObjectFile.findById(req.params.id)
        .then((data) => {
            res.json({ success: true, message: "Success", data })
        })
        .catch((err) => {
            res.json({ success: false, message: "File not found" })
        })
})

app.delete("/", async (req, res) => {
    const validate = ObjectFileDeleteValidation.validate(req.body)
    if (validate.error) {
        const errors = getValidationError(validate.error.details)
        res.json({ success: false, message: errors })
        throw validate.error
    }
    ObjectFile.findOneAndRemove(req.body.id)
        .then((model) => {
            res.json({ success: true, message: "File successfully deleted" })
        })
        .catch((err) => {
            res.json({ success: false, message: "Failed to delete file" })
        })
})

app.post("/upload", async (req, res) => {
    const validate = ObjectFileCreateValidation.validate(req.body)
    if (validate.error) {
        const errors = getValidationError(validate.error.details)
        res.json({ success: false, message: errors })
        throw validate.error
    }
    const { name, base64data, extention, description } = req.body
    const uploaded_by = req.user
    const _data = new ObjectFile({ name, base64data, extention, description, uploaded_by })
    _data
        .save()
        .then((model) => {
            res.json({ success: true, message: `File successfully uploaded` })
        })
        .catch((err) => {
            res.json({ success: false, message: "Failed to upload file" })
        })
})

module.exports = app
