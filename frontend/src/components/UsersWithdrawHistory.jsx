import { Table } from "antd"
import { useEffect, useState } from "react"
import { withdrawData, generateDogecoinAddress } from "../api"

const columns = [
    { title: "Coin", dataIndex: "coin" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Time", dataIndex: "time" },
    { title: "Wallet address", dataIndex: "wallet" },
]

export default function UsersWithdrawHistory() {
    const [data, setData] = useState([])

    useEffect(() => {
        const updateData = () => {
            const now = new Date()
            const time = new Date(now.getTime())
            const hours = String(time.getHours()).padStart(2, "0")
            const minutes = String(time.getMinutes()).padStart(2, "0")
            const seconds = String(time.getSeconds()).padStart(2, "0")
            const currentTime = `${hours}:${minutes}:${seconds}`

            const dogeAddress = generateDogecoinAddress()
            const newAddedElement = {
                key: dogeAddress,
                coin: "Dogecoin",
                amount: (Math.random() * 20 + 10).toFixed(0),
                time: currentTime,
                wallet: dogeAddress,
            }

            setData((prevData) => {
                // Додаємо новий елемент і видаляємо перший
                const updatedData = [newAddedElement, ...prevData.slice(0, -1)]
                return updatedData
            })
        }

        const interval = setInterval(() => updateData(), 2000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        setData(withdrawData)
    }, [])

    return <Table style={{ width: "100%", marginTop: "15px" }} pagination={false} columns={columns} dataSource={data} />
}
