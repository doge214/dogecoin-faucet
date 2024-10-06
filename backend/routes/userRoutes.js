const express = require("express")
const { addUser, getUsers, getUserByWallet, getUserByIp, updateUserBalanceByWallet } = require("../controllers/userController")

const router = express.Router()

// Маршрути для користувачів
router.post("/users", addUser)
router.get("/users", getUsers)
router.get("/user/wallet/:wallet", getUserByWallet)
router.get("/user/ip/:ip", getUserByIp)
router.put("/user/update/byWallet/:wallet", updateUserBalanceByWallet)

module.exports = router
