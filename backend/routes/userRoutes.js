const express = require("express")
const { addUser, getUsers } = require("../controllers/userController")

const router = express.Router()

// Маршрути для користувачів
router.post("/users", addUser)
router.get("/users", getUsers)

module.exports = router
