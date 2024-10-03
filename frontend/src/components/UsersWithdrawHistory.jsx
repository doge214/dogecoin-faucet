import { Table } from "antd"
import { useEffect, useState } from "react"
import { useUserData } from "../context/user-data-context"

const columns = [
    { title: "Coin", dataIndex: "coin" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Time", dataIndex: "time" },
    { title: "Wallet address", dataIndex: "wallet" },
]

export default function UsersWithdrawHistory() {
    const { recentWithdraws } = useUserData()
    const [newRecentWithdraws, setNewRecentWithdraws] = useState([])
    useEffect(() => {
        const tempRecentWithdraws = recentWithdraws.map((withdrawElement) => ({
            key: withdrawElement._id,
            coin: withdrawElement.coin,
            amount: withdrawElement.amount,
            time: new Date(withdrawElement.time).toLocaleString(),
            wallet: withdrawElement.wallet,
        }))

        setNewRecentWithdraws(tempRecentWithdraws)
    }, [recentWithdraws])

    return newRecentWithdraws.length != 0 ? (
        <Table style={{ width: "100%", marginTop: "15px" }} pagination={false} columns={columns} dataSource={newRecentWithdraws} />
    ) : (
        <h3>No records about recent withdraws</h3>
    )
}
