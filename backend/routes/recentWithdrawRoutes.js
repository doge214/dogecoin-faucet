const express = require("express")
const { addRecentWithdraw, getRecentWithdraws } = require("../controllers/recentWithdrawController")

const router = express.Router()

// Маршрути для користувачів
router.post("/recentWithdraws", addRecentWithdraw)
router.get("/recentWithdraws", getRecentWithdraws)

module.exports = router
