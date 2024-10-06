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

// МОї апдейти
// app.use(cors({
//     origin: "http://localhost:5173"
// }))
const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://dogecoin-faucet-2.onrender.com/" // Ваш реальний URL бекенду на хостингу
    : "http://localhost:5001";

axios.get(`${API_BASE_URL}/api/recentWithdraws`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("There was an error fetching recent withdraws!", error);
    });


// Маршрути
app.use("/api", userRoutes)
app.use("/api", recentWithdrawRoutes)

// app.get("/get-ip", (req, res) => {
//     const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress
//     res.send({ ip: userIp })
// })

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
