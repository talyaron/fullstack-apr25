import image from "../../assets/gummyBears.png"
import styles from "./GummyBears.module.scss"
const GummyBears = () => {
  return (
    <div className={styles.container}>
      <img src={image} alt="Gummy-Bears" />
      <h1>GummyBears</h1>
      <div>
        <p>
          Chewy fruit-flavored candies shaped like tiny bears.
          Gummy bears come in multiple colors and tastes, such as strawberry, lemon, raspberry, and apple.
        </p>
      </div>
    </div>
  )
}

export default GummyBears
