import { useEffect, useState, useRef } from "react"
import { Button, Flex, Typography } from "antd"
import TimerItem from "./TimerItem"
import Banner from "./Banner"
import { useUserData } from "../context/user-data-context"
import { updateUserBalanceByWallet } from "../api"

export default function Timer() {
    const duration = 60 * 1000
    const { setBalance, dogeWallet, lastButtonPress, setLastButtonPress } = useUserData()
    const [remainingTime, setRemainingTime] = useState(() => {
        let startTime = new Date(lastButtonPress)
        startTime.setTime(startTime.getTime() + duration)

        if (startTime) {
            const endTime = new Date(startTime)
            if (endTime > new Date()) {
                return Math.max(0, endTime - new Date())
            }
        }
        return 0 // Таймер не запущений, 0 мілісекунд
    })
    const remainingTimeRef = useRef(remainingTime)
    useEffect(() => {
        remainingTimeRef.current = remainingTime
    }, [remainingTime])

    useEffect(() => {
        let interval
        // if(remainingTime == )
        console.log("repaint")
        if (remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(new Date(lastButtonPress).getTime() + duration - new Date() + 1000)
                setRemainingTime((prev) => Math.max(0, prev - 1000))
                // console.log("reaming time ", remainingTime)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [remainingTime])

    const handleStartTimer = () => {
        setBalance((prev) => {
            const newBalance = prev + 1
            const endTime = new Date(Date.now() + duration)
            const startTime = new Date(Date.now()).toISOString()
            setRemainingTime(duration)
            setLastButtonPress(startTime)
            updateUserBalanceByWallet(dogeWallet, newBalance, startTime)
            return newBalance // Повертаємо новий баланс
        })
    }

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000)
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0")
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")
        const seconds = String(totalSeconds % 60).padStart(2, "0")
        return { hours, minutes, seconds }
    }

    const { hours, minutes, seconds } = formatTime(remainingTime)

    return (
        <>
            {remainingTime == 0 && (
                <Typography.Title
                    level={3}
                    style={{ backgroundColor: "orange", padding: "10px", textAlign: "center", color: "white", width: "100%", marginTop: "15px" }}
                >
                    Get your <span style={{ color: "black" }}>$DOGE</span> right now
                </Typography.Title>
            )}
            {remainingTime > 0 && (
                <Typography.Title
                    level={3}
                    style={{ backgroundColor: "orange", padding: "10px", textAlign: "center", color: "white", width: "100%", marginTop: "15px" }}
                >
                    Wait until the timer reaches zero to collect your <span style={{ color: "black" }}>$DOGE</span>
                </Typography.Title>
            )}
            <Flex style={{ marginBottom: "15px" }}>
                <TimerItem value={hours.toString().slice(0, -1)} />
                <TimerItem value={hours.toString().slice(1)} marLeft />
                <TimerItem value={":"} marLeft />
                <TimerItem value={minutes.toString().slice(0, -1)} marLeft />
                <TimerItem value={minutes.toString().slice(1)} marLeft />
                <TimerItem value={":"} marLeft />
                <TimerItem value={seconds.toString().slice(0, -1)} marLeft />
                <TimerItem value={seconds.toString().slice(1)} marLeft />
            </Flex>
            {/* <Banner bWidth={"100%"} bHeight={"130px"} bImg={"https://via.placeholder.com/600x300"} /> */}
            <Button
                disabled={remainingTime > 0}
                style={{
                    width: "200px",
                    height: "50px",
                    backgroundColor: "orange",
                    border: "2px solid black",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bolder",
                    marginTop: "15px",
                    marginBottom: "15px",
                }}
                onClick={handleStartTimer}
            >
                GET DOGE
            </Button>
        </>
    )
}
