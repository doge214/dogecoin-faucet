import axios from "axios"
import { useEffect, useState } from "react"

export default function HistoryCard() {
    const [withdraws, setWithdraws] = useState([])
    useEffect(() => {
        // Отримуємо дані про користувачів з серверу
        console.log("виконуємо запит!")
        axios
            .get("http://localhost:5001/api/recentWithdraws")
            .then((response) => {
                console.log(response)
                setWithdraws(response.data)
            })
            .catch((error) => {
                console.error("There was an error fetching the withdraws!", error)
            })
    }, [])
    return (
        <div>
            <h1>Withdraws</h1>
            {withdraws.length != 0 ? (
                <ul>
                    {withdraws.map((withdraw) => (
                        <li key={withdraw._id}>
                            {withdraw.ip} | {withdraw.wallet} | {withdraw.amount}
                        </li>
                    ))}
                </ul>
            ) : (
                "Loading...."
            )}
        </div>
    )
}
