import { Layout } from "antd"
import AppContent from "./AppContent"
import AppHeader from "./AppHeader"

export default function AppLayout() {
    return (
        <Layout>
            <AppHeader />
            <AppContent />
        </Layout>
    )
}
