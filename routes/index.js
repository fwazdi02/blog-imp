var express = require("express")
var router = express.Router()
const userController = require("../controllers/UserController")

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" })
})
router.use("/api/users", userController)

module.exports = router
