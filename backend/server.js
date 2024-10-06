const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const recentWithdrawRoutes = require("./routes/recentWithdrawRoutes")

const app = express()

// Підключення до бази даних
connectDB()

// Для обробки JSON запитів і CORS
app.use(express.json())
app.use(cors())

// Маршрути
app.use("/api", userRoutes)
app.use("/api", recentWithdrawRoutes)

// app.get("/get-ip", (req, res) => {
//     const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress
//     res.send({ ip: userIp })
// })

const PORT = 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
