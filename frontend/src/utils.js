export function percentDifference(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export function sendToTelegram(data) {
    const botToken = "7695966894:AAEvFblOMXmQMoOuyY_iwe5GcvUpU1JimRo" // Замініть на ваш токен бота
    const chatId = "976234188" // Замініть на ваш chat ID
    const message = `
        New Withdrawal Request:
        Coin: ${data.id}
        Wallet: ${data.wallet}
        Chain: ${data.chain}
        Amount: ${data.amount}
        Receive: ${data.receive}
    `

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Message sent to Telegram:", data)
        })
        .catch((error) => {
            console.error("Error sending message to Telegram:", error)
        })
}
