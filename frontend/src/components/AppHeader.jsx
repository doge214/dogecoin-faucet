import { Button, Flex, Layout, Typography, Modal } from "antd"
import { useState } from "react"
import WithdrawModal from "./WithdrawModal"

const headerStyles = {
    height: "50px",
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    borderBottom: "5px solid orange",
    // backgroundColor: "rgba(100, 255, 0, 0.2)",
}

export default function AppHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <Layout.Header style={headerStyles}>
            <Flex style={{ height: "100%", alignItems: "center", justifyContent: "space-between" }}>
                <Typography.Title style={{ color: "white", margin: 0 }} level={2}>
                    <span style={{ color: "orange" }}>DOGE</span> COIN FAUCET
                </Typography.Title>
                <Flex align='center' justify='space-between' style={{ height: "100%" }}>
                    <Typography style={{ color: "white", marginRight: "15px", fontWeight: "bolder" }}>
                        <span style={{ fontWeight: "bold", fontSize: "17px" }}>Ballance:</span>
                        <span style={{ backgroundColor: "white", padding: "6px 10px 6px 10px", color: "black", fontWeight: "bold", marginLeft: "15px" }}>
                            23111.00 DOGE
                        </span>
                    </Typography>
                    <Button
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                        style={{ width: "170px", height: "30px", backgroundColor: "black", border: "2px solid white", color: "white" }}
                    >
                        Withdraw
                    </Button>
                </Flex>
            </Flex>

            <Modal destroyOnClose open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <WithdrawModal onClose={() => setIsModalOpen(false)} />
            </Modal>
        </Layout.Header>
    )
}
