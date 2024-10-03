const mongoose = require("mongoose")

const recentWithdrawSchema = new mongoose.Schema({
    coin: String,
    amount: Number,
    time: Date,
    wallet: String,
})

const RecentWithdraw = mongoose.model("RecentWithdraw", recentWithdrawSchema)
module.exports = RecentWithdraw
