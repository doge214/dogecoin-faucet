const mongoose = require("mongoose")

const withdrawSchema = new mongoose.Schema({
    withdrawWallet: String,
    amount: Number,
})

const userSchema = new mongoose.Schema({
    wallet: String,
    ip: String,
    balance: Number,
    lastButtonPress: Date,
    withdrawsHistory: [withdrawSchema],
})

const User = mongoose.model("User", userSchema)
module.exports = User
