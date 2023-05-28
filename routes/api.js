const express = require("express")
const router = express.Router()

const objectFileController = require("../controllers/ObjectFileController")
const postController = require("../controllers/PostController")

router.use("/file", objectFileController)
router.use("/posts", postController)

module.exports = router
