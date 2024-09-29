export default function TimerItem({ value, marLeft }) {
    const point = value === ":"
    return (
        <div
            style={{
                width: "50px",
                height: "70px",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
                fontWeight: "600",
                border: "3px solid orange",
                marginLeft: marLeft ? "-3px" : "0px",
                paddingBottom: point ? "5px" : 0,
            }}
        >
            {value}
        </div>
    )
}
