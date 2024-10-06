import { createContext, useState, useEffect, useContext } from "react"
import { fetchRecentWithdraws, fetchUserDataByWallet, fetchUserDataByIp, fetchUserIP, addUser } from "../api"
// import { percentDifference } from "../utils"

const UserDataContext = createContext({
    recentWithdraws: [],
    userWithdraws: [],
    balance: 0,
    dogeWallet: "",
    isLogined: false,
    // crypto: [],
    // loading: false,
})

export function UserDataContextProvider({ children }) {
    // const [loading, setLoading] = useState(false)
    // const [crypto, setCrypto] = useState([])
    // const [assets, setAssets] = useState([])
    const [recentWithdraws, setRecentWithdraws] = useState([])
    const [userWithdraws, setUserWithdraws] = useState([])
    const [balance, setBalance] = useState(0)
    const [dogeWallet, setDogeWallet] = useState("")
    const [isLogined, setIsLogined] = useState(false)
    const [ip, setIp] = useState("")
    const [lastButtonPress, setLastButtonPress] = useState(null)

    function getWalletFromLocalStorage() {
        // Отримуємо значення з localStorage
        const wallet = localStorage.getItem("wallet")

        // Перевіряємо, чи змінна існує
        if (wallet) {
            // Якщо є, повертаємо її значення
            return wallet
        } else {
            // Якщо змінної немає, повертаємо null або інше значення
            return null
        }
    }

    // function mapAssets(assets, result) {
    //     return assets.map((asset) => {
    //         const coin = result.find((c) => c.id === asset.id)
    //         return {
    //             grow: asset.price < coin.price,
    //             growPercent: percentDifference(asset.price, coin.price),
    //             totalAmount: asset.amount * coin.price,
    //             totalProfit: asset.amount * coin.price - asset.amount * asset.price,
    //             name: coin.name,
    //             ...asset,
    //         }
    //     })
    // }

    // useEffect(() => {
    //     // async function preload() {
    //     //     setLoading(true)
    //     //     const { result } = await fakeFetchCrypto()
    //     //     const assets = await fakeFetchAssets()
    //     //     setAssets(mapAssets(assets, result))
    //     //     setCrypto(result)
    //     //     setLoading(false)
    //     // }
    //     //preload()
    // }, [])
    function walletAccepted(wallet) {
        setDogeWallet(wallet)
        setIsLogined(true)
        localStorage.setItem("wallet", wallet)
        console.log("here: ", wallet, ip)
        addUser(wallet, ip, 0)
    }

    useEffect(() => {
        const wallet = getWalletFromLocalStorage()
        let userData
        async function preload() {
            try {
                const recentWithdrawsData = await fetchRecentWithdraws()
                setRecentWithdraws(recentWithdrawsData)
                // console.log("wallet: ", wallet)
                if (wallet) {
                    // console.log("first if")
                    userData = await fetchUserDataByWallet(wallet)
                    if (userData) {
                        setIsLogined(true)
                        setDogeWallet(wallet)
                        setBalance(userData.balance)
                        setLastButtonPress(userData.lastButtonPress)
                        // console.log(userData)
                        //доповнити баланс, історію виводів
                    }
                } else {
                    // console.log("second if")
                    const tempIp = await fetchUserIP()
                    setIp(tempIp)
                }
            } catch (error) {
                console.error("Error fetching recent withdraws:", error)
            }
        }
        preload()
    }, [])

    useEffect(() => {
        let userData
        async function preload() {
            userData = await fetchUserDataByIp(ip)
            if (userData) {
                setIsLogined(true)
                //setDogeWallet(wallet)
                // console.log(userData)
                setDogeWallet(userData.wallet)
                localStorage.setItem("wallet", userData.wallet)
                setBalance(userData.balance)
                setLastButtonPress(userData.lastButtonPress)
                //доповнити баланс, історію виводів
            }
        }
        preload()
    }, [ip])

    // useEffect(() => {
    //     // Отримуємо дані про користувачів з серверу
    //     console.log("виконуємо запит!")
    //     axios
    //         .get("http://localhost:5001/api/recentWithdraws")
    //         .then((response) => {
    //             console.log(response)
    //             setWithdraws(response.data)
    //         })
    //         .catch((error) => {
    //             console.error("There was an error fetching the withdraws!", error)
    //         })
    // }, [])

    // function addAsset(newAsset) {
    //     setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    // }

    return (
        <UserDataContext.Provider
            value={{
                recentWithdraws,
                balance,
                dogeWallet,
                setDogeWallet,
                setBalance,
                isLogined,
                setIsLogined,
                walletAccepted,
                userWithdraws,
                setUserWithdraws,
                lastButtonPress,
                setLastButtonPress,
            }}
        >
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContext

export function useUserData() {
    return useContext(UserDataContext)
}
