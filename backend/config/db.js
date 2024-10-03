const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const uri = "mongodb+srv://dogecoin-faucet:whs0Yco7BYpl0afX@dogecoin-cluster.28yxo.mongodb.net/?retryWrites=true&w=majority&appName=dogecoin-cluster"
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to database")
    } catch (error) {
        console.error("Database connection error:", error)
        process.exit(1) // Вихід з процесу при помилці
    }
}

module.exports = connectDB
