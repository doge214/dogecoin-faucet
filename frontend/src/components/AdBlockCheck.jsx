import React, { useEffect, useState } from "react"
import { Button, Flex, Typography } from "antd"

const AdBlockCheck = () => {
    const [adBlockEnabled, setAdBlockEnabled] = useState(false)

    useEffect(() => {
        // Створюємо елемент для перевірки
        const adDetectDiv = document.createElement("div")
        adDetectDiv.className = "ad-banner" // Клас для імітації банера
        adDetectDiv.style.width = "300px" // Ширина банера
        adDetectDiv.style.height = "250px" // Висота банера
        adDetectDiv.style.position = "absolute" // Позиція
        adDetectDiv.style.top = "-1000px" // Сховати банер вище екрану
        adDetectDiv.style.visibility = "hidden" // Сховати елемент
        document.body.appendChild(adDetectDiv)

        const adDetectImg = document.createElement("img")
        adDetectImg.src = "/banners/ad_banner.gif" // Ваше зображення для перевірки
        adDetectImg.className = "ad-image" // Клас для імітації рекламного зображення
        adDetectImg.style.width = "100%" // Розтягуємо зображення на всю ширину банера
        adDetectImg.style.height = "100%" // Розтягуємо зображення на всю висоту банера
        adDetectImg.alt = "Advertisement" // Атрибут alt для зображення
        adDetectImg.title = "Ad Banner" // Атрибут title для зображення
        adDetectImg.role = "img" // Додатковий атрибут ролі
        adDetectDiv.appendChild(adDetectImg) // Додаємо зображення до банера

        // adDetectImg.onload = () => {
        //     console.log("Image loaded successfully.")
        //     setTimeout(() => {
        //         checkAdBlock() // Викликаємо перевірку тут
        //     }, 100) // Затримка 100 мс
        // }

        adDetectImg.onerror = () => {
            setAdBlockEnabled(true) // Якщо зображення не завантажується, AdBlock увімкнений
            document.body.removeChild(adDetectDiv)
        }

        // const checkAdBlock = () => {
        //     // Перевіряємо, чи висота зображення не 0
        //     if (adDetectImg.offsetHeight === 0) {
        //         console.log("AdBlock is enabled")
        //         setAdBlockEnabled(true) // AdBlock увімкнений
        //         document.body.removeChild(adDetectDiv)
        //     } else {
        //         console.log("AdBlock is not enabled")
        //         setAdBlockEnabled(false) // AdBlock вимкнений
        //         document.body.removeChild(adDetectDiv)
        //     }
        // }
    }, [])

    return adBlockEnabled ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.5)", zIndex: "1000" }}>
            <Flex style={{ width: "100%", height: "100%" }} justify='center' align='center'>
                <Flex style={{ width: "700px", height: "400px", backgroundColor: "white", border: "5px solid red" }} justify='center' align='center' vertical>
                    <div style={{ width: "130px", marginBottom: "20px" }}>
                        <img style={{ width: "100%", height: "100%" }} src='/images/logo.png' alt='' />
                    </div>
                    <Typography.Title style={{ width: "600px", textAlign: "center" }} level={3}>
                        It looks like you have adblock enabled. Please disable it for correct interaction with the website. After turning off, refresh the page.
                    </Typography.Title>
                    <Button
                        onClick={() => {
                            window.location.reload()
                        }}
                        style={{
                            width: "200px",
                            height: "50px",
                            backgroundColor: "white",
                            border: "2px solid red",
                            color: "black",
                            fontSize: "20px",
                            fontWeight: "bolder",
                            marginTop: "15px",
                            marginBottom: "15px",
                        }}
                    >
                        Refresh
                    </Button>
                </Flex>
            </Flex>
        </div>
    ) : (
        <></>
    )
}

export default AdBlockCheck
