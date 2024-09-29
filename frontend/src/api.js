export function fakeFetchCrypto() {
    return undefined
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(cryptoData)
    //     }, 1)
    // })
}

export function fakeFetchAssets() {
    return undefined
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(cryptoAssets)
    //     }, 1)
    // })
}

export function generateRandomTimeStrings() {
    const timeStrings = []
    const now = new Date()

    for (let i = 0; i < 10; i++) {
        // Випадковий інтервал від 0 до 180 секунд (3 хвилини)
        const randomSeconds = Math.floor(Math.random() * 1000) // 0 до 180
        const time = new Date(now.getTime() - randomSeconds * 1000)

        const hours = String(time.getHours()).padStart(2, "0")
        const minutes = String(time.getMinutes()).padStart(2, "0")
        const seconds = String(time.getSeconds()).padStart(2, "0")

        timeStrings.push(`${hours}:${minutes}:${seconds}`)
    }

    // Сортуємо рядки часу у зростаючому порядку
    return timeStrings.sort((a, b) => {
        const timeA = a.split(":").map(Number)
        const timeB = b.split(":").map(Number)

        return new Date(0, 0, 0, timeA[0], timeA[1], timeA[2]) - new Date(0, 0, 0, timeB[0], timeB[1], timeB[2])
    })
}

export function generateDogecoinAddress() {
    const characters = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    let address = "D"

    for (let i = 0; i < 33; i++) {
        // 33 символи після 'D'
        const randomIndex = Math.floor(Math.random() * characters.length)
        address += characters[randomIndex]
    }

    return address
}

const times = generateRandomTimeStrings()
export const withdrawData = []
for (let i = 9; i > 0; i--) {
    const dogeAddress = generateDogecoinAddress()
    withdrawData.push({
        key: dogeAddress,
        coin: "Dogecoin",
        amount: (Math.random() * 20 + 10).toFixed(0),
        time: times[i],
        wallet: dogeAddress,
    })
}
