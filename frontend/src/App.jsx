import { UserDataContextProvider } from "./context/user-data-context"
import AppLayout from "./components/AppLayout"

export default function App() {
    return (
        <UserDataContextProvider>
            <AppLayout />
        </UserDataContextProvider>
    )
}
