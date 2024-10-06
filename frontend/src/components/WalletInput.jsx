import { Button, Input, Tooltip, Flex } from "antd"
import { useState } from "react"
import { useUserData } from "../context/user-data-context"

export default function WalletInput() {
    const [inputWallet, setInputWallet] = useState("")
    const { setDogeWallet, setIsLogined, walletAccepted } = useUserData()

    return (
        <div style={{ marginTop: "15px" }}>
            <Flex vertical justify='center' align='center' style={{ width: "100%" }}>
                <Input
                    style={{ width: "500px" }}
                    value={inputWallet}
                    onChange={(event) => {
                        setInputWallet(event.currentTarget.value)
                    }}
                    placeholder='Enter your dogecoin wallet address'
                />
                <Tooltip style={{ width: "100%" }} title={inputWallet.length != 33 ? "Dogecoin addres has 33 symbols" : "Click to accept the wallet address"}>
                    <Flex justify='center' align='center' style={{ width: "100%" }}>
                        <Button
                            style={{
                                width: "200px",
                                height: "50px",
                                backgroundColor: inputWallet.length != 33 ? "grey" : "orange",
                                border: "2px solid black",
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "bolder",
                                marginTop: "15px",
                                marginBottom: "15px",
                            }}
                            disabled={inputWallet.length != 33}
                            onClick={() => {
                                walletAccepted(inputWallet)
                                setInputWallet("")
                            }}
                        >
                            Add Wallet
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>
        </div>
    )
}
