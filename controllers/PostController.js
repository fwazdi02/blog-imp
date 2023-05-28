var express = require("express")
var app = express()
const { Post } = require("../models/Post")
const { ObjectFile } = require("../models/ObjectFile")
const { PostCreateValidation, PostDeleteValidation } = require("../validations/VPost")

const getValidationError = (details) => {
    let errors = details.map((item) => {
        return item.message.replace(/"/g, "")
    })
    return errors
}

app.get("/", async (req, res) => {
    const data = await Post.find()
    res.json({ success: true, message: "Success", data })
})

app.get("/:id", async (req, res) => {
    Post.findById(req.params.id)
        .then((data) => {
            res.json({ success: true, message: "Success", data })
        })
        .catch((err) => {
            res.json({ success: false, message: "Post not found" })
        })
})

app.delete("/", async (req, res) => {
    const validate = PostDeleteValidation.validate(req.body)
    if (validate.error) {
        const errors = getValidationError(validate.error.details)
        res.json({ success: false, message: errors })
        throw validate.error
    }
    Post.findOneAndRemove(req.body.id)
        .then((model) => {
            res.json({ success: true, message: "Post successfully deleted" })
        })
        .catch((err) => {
            res.json({ success: false, message: "Failed to delete Post" })
        })
})

app.post("/", async (req, res) => {
    const validate = PostCreateValidation.validate(req.body)
    if (validate.error) {
        const errors = getValidationError(validate.error.details)
        res.json({ success: false, message: errors })
        throw validate.error
    }
    const { title, content, image, images } = req.body
    console.log("image", image, images)
    const uploaded_by = req.user
    let imageId = null
    if (image) {
        imageId = ObjectFile.findById(image)
    }
    let imageIds = null
    if (images) {
        imageIds = ObjectFile.find({ id: { $in: images } })
    }
    const _data = new Post({ title, content, image: imageId, images: imageIds, uploaded_by })
    _data
        .save()
        .then((model) => {
            res.json({ success: true, message: `Post successfully created` })
        })
        .catch((err) => {
            console.log(err)
            res.json({ success: false, message: "Failed to Post" })
        })
})

module.exports = app
