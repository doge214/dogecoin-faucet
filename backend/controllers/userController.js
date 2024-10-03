const User = require("../models/User")

// Додавання нового користувача
const addUser = async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            balance: req.body.balance,
        })
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        console.error("Error adding user:", error)
        res.status(500).send("Error adding user")
    }
}

// Отримання всіх користувачів
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        console.error("Error retrieving users:", error)
        res.status(500).send("Error retrieving users")
    }
}

module.exports = { addUser, getUsers }
