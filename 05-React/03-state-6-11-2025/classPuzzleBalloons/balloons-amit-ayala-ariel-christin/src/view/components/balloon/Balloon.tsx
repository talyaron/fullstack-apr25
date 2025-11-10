import { useState } from "react"
import balloonImage from "../../../assets/balloonImage.png"
import explosion from "../../../assets/explosion.png"
import styles from "./Balloon.module.scss"
interface Props{
    x:number;
    y:number;
}

const Balloon = ({x,y}: Props) => {

    const [balloon, setBalloon] = useState(balloonImage)
    const positionX = x
    const positionY = y

    return (
            <div className={styles.balloon}>
                <img className={styles.image} style={{ left: `${positionX}%`, top: `${positionY}%` }} src={balloon} alt="balloon" onClick={() => setBalloon(explosion)} />
            </div>
    )
}

export default Balloon
