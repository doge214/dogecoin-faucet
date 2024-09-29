import { Divider, Flex, Typography, Tabs } from "antd"
import "../css/modal.css"
import WithdrawForm from "./WithdrawForm"
import HistoryCard from "./HistoryCard"

export default function WithdrawModal({ onClose }) {
    const tabs = [
        {
            label: `Withdraw `,
            key: "1",
            children: <WithdrawForm onClose={onClose} />,
        },
        {
            label: `History`,
            key: "2",
            children: <HistoryCard />,
        },
    ]
    return (
        <Flex vertical justify='center' align='center'>
            <Typography.Title level={4}></Typography.Title>
            <Tabs defaultActiveKey='1' type='card' size='large' items={tabs} />
        </Flex>
    )
}
