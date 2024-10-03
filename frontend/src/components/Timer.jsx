import { useEffect, useState } from "react"
import { Button, Flex, Typography } from "antd"
import TimerItem from "./TimerItem"
import Banner from "./Banner"
import { useUserData } from "../context/user-data-context"

export default function Timer() {
    const { setBalance } = useUserData()
    const [remainingTime, setRemainingTime] = useState(() => {
        const storedEndTime = localStorage.getItem("endTime")
        if (storedEndTime) {
            const endTime = new Date(storedEndTime)
            if (endTime > new Date()) {
                return Math.max(0, endTime - new Date())
            }
        }
        return 0 // Таймер не запущений, 0 мілісекунд
    })

    useEffect(() => {
        let interval
        if (remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime((prev) => Math.max(0, prev - 1000))
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [remainingTime])

    useEffect(() => {
        if (remainingTime > 0) {
            const endTime = new Date(Date.now() + remainingTime)
            localStorage.setItem("endTime", endTime)
        } else {
            localStorage.removeItem("endTime")
        }
    }, [remainingTime])

    const handleStartTimer = () => {
        setBalance((prev) => prev + 1)
        const duration = 11 * 1000 // 30 хвилин в мілісекундах
        const endTime = new Date(Date.now() + duration)
        setRemainingTime(duration)
        localStorage.setItem("endTime", endTime)
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
