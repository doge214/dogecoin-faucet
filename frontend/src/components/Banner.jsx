export default function Banner({ bWidth, bHeight, bImg, left, right }) {
    return (
        <>
            {left && (
                <div style={{ width: "14%", height: "70%", position: "fixed", left: "3%", top: "15%" }}>
                    <img src={bImg} alt='banner' style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            )}
            {right && (
                <div style={{ width: "14%", height: "70%", position: "fixed", right: "3%", top: "15%" }}>
                    <img src={bImg} alt='banner' style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            )}
            {!right && !left && (
                <div style={{ width: bWidth, height: bHeight }}>
                    <img src={bImg} alt='banner' style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            )}
        </>
    )
}
