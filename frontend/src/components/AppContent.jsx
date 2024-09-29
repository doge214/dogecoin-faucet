import { Layout, Typography } from "antd"
import Timer from "./Timer"
import Banner from "./Banner"
import UsersWithdrawHistory from "./UsersWithdrawHistory"

const contentStyles = {
    margin: "50px auto 0 auto",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    minHeight: "calc(100vh - 50px)",
    width: "60%",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
        "rgba(0, 0, 0, 0.2) -10px 0px 10px, rgba(0, 0, 0, 0.2) 10px 0px 10px, rgba(0, 0, 0, 0.15) -20px 0px 20px, rgba(0, 0, 0, 0.15) 20px 0px 20px, rgba(0, 0, 0, 0.1) -30px 0px 30px, rgba(0, 0, 0, 0.1) 30px 0px 30px, rgba(0, 0, 0, 0.05) -40px 0px 40px, rgba(0, 0, 0, 0.05) 40px 0px 40px, rgba(0, 0, 0, 0.025) -50px 0px 50px, rgba(0, 0, 0, 0.025) 50px 0px 50px",
}

export default function AppContent() {
    return (
        <Layout.Content style={contentStyles}>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
                Honest free and reliable faucet. Come every half hour to collect your <span style={{ color: "orange" }}>$DOGE COINS$</span>
            </Typography.Title>
            <Banner bWidth={"100%"} bHeight={"130px"} bImg={"https://via.placeholder.com/600x300"} />
            <Timer />
            <Banner bWidth={"100%"} bHeight={"130px"} bImg={"https://via.placeholder.com/600x300"} />
            <Banner left bImg={"https://via.placeholder.com/600x300"} />
            <Banner right bImg={"https://via.placeholder.com/600x300"} />
            <Typography.Title level={2} style={{ textAlign: "center", marginBottom: "0", marginTop: "15px", color: "orange" }}>
                Recent withdrawals
            </Typography.Title>
            <UsersWithdrawHistory />
        </Layout.Content>
    )
}
