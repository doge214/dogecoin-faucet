import { createContext, useState, useEffect, useContext } from "react"
import { fetchRecentWithdraws } from "../api"
// import { percentDifference } from "../utils"

const UserDataContext = createContext({
    recentWithdraws: [],
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
    const [balance, setBalance] = useState(0)
    const [dogeWallet, setDogeWallet] = useState("")
    const [isLogined, setIsLogined] = useState(false)

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

    useEffect(() => {
        async function preload() {
            try {
                const recentWithdrawsData = await fetchRecentWithdraws()
                setRecentWithdraws(recentWithdrawsData)
            } catch (error) {
                console.error("Error fetching recent withdraws:", error)
            }
        }
        preload()
    }, [])

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
        <UserDataContext.Provider value={{ recentWithdraws, balance, dogeWallet, setDogeWallet, setBalance, isLogined, setIsLogined }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContext

export function useUserData() {
    return useContext(UserDataContext)
}
