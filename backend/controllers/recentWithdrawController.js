const RecentWithdraw = require("../models/RecentWithdraw")

// Додавання нового користувача
const addRecentWithdraw = async (req, res) => {
    try {
        const newRecentWithdraw = new RecentWithdraw({
            ip: req.body.ip,
            wallet: req.body.wallet,
            amount: req.body.amount,
        })
        await newRecentWithdraw.save()
        res.status(201).send(newRecentWithdraw)
    } catch (error) {
        console.error("Error adding recent withdraw:", error)
        res.status(500).send("Error adding recent withdraw")
    }
}

// Отримання всіх користувачів
const getRecentWithdraws = async (req, res) => {
    try {
        const recentWithdraws = await RecentWithdraw.find()
        res.status(200).send(recentWithdraws)
    } catch (error) {
        console.error("Error retrieving recent withdraws:", error)
        res.status(500).send("Error retrieving recent withdraws")
    }
}

module.exports = { addRecentWithdraw, getRecentWithdraws }
