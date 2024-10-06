const User = require("../models/User")

// Додавання нового користувача
const addUser = async (req, res) => {
    try {
        const { wallet, ip, balance } = req.body
        // console.log(wallet, ip, balance)
        // Перевіряємо, чи передані всі необхідні дані
        if (!wallet || !ip || balance === undefined) {
            return res.status(400).send("Missing required fields")
        }

        const newUser = new User({
            wallet, // Зберігаємо гаманець
            ip, // Зберігаємо IP-адресу
            balance, // Зберігаємо баланс
            lastButtonPress: null, // Ініціалізуємо lastButtonPress як null
            withdrawsHistory: [], // Ініціалізуємо історію зняття
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

// Функція для отримання користувача за гаманцем
const getUserByWallet = async (req, res) => {
    const wallet = req.params.wallet // Отримуємо значення гаманця з параметрів URL

    try {
        const user = await User.findOne({ wallet }) // Пошук користувача за гаманцем
        if (!user) {
            return res.status(404).json({ message: "User not found" }) // Якщо користувача не знайдено
        }
        res.json(user) // Повертаємо знайденого користувача
    } catch (error) {
        res.status(500).json({ message: "Server error", error }) // Помилка сервера
    }
}

const getUserByIp = async (req, res) => {
    const ip = req.params.ip // Отримуємо значення гаманця з параметрів URL

    try {
        const user = await User.findOne({ ip }) // Пошук користувача за гаманцем
        if (!user) {
            return res.status(404).json({ message: "User not found" }) // Якщо користувача не знайдено
        }
        res.json(user) // Повертаємо знайденого користувача
    } catch (error) {
        res.status(500).json({ message: "Server error", error }) // Помилка сервера
    }
}

const updateUserBalanceByWallet = async (req, res) => {
    const { wallet } = req.params // Отримуємо гаманець із URL
    const { balance, lastButtonPress } = req.body // Отримуємо нові значення з тіла запиту

    try {
        // Знаходимо користувача за гаманцем і оновлюємо баланс та lastButtonPress
        const updatedUser = await User.findOneAndUpdate(
            { wallet }, // Умови пошуку
            { balance, lastButtonPress }, // Поля для оновлення
            { new: true } // Повертає оновленого користувача
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" }) // Якщо користувача не знайдено
        }

        res.json(updatedUser) // Повертаємо оновленого користувача
    } catch (error) {
        console.error("Error updating user:", error)
        res.status(500).json({ message: "Server error", error }) // Помилка сервера
    }
}

module.exports = { addUser, getUsers, getUserByWallet, getUserByIp, updateUserBalanceByWallet }
