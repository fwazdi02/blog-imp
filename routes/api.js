const express = require("express")
const router = express.Router()

const userController = require("../controllers/UserController")
const objectFileController = require("../controllers/ObjectFileController")
const postController = require("../controllers/PostController")

router.use("/users", userController)
router.use("/file", objectFileController)
router.use("/posts", postController)

module.exports = router
