import image from "../../assets/chocolate.png"
import styles from "./Chocolate.module.scss"
const Chocolate = () => {
  return (
    <div className={styles.container}>
      <img src={image} alt="chocolate" />
      <h1>Chocolate</h1>
      <div>
        <p>
          Rich and creamy candy made from cocoa beans.
          Chocolate comes in many forms — dark, milk, or white — and is known for its smooth texture and deep flavor.
        </p>
      </div>
    </div>
  )
}

export default Chocolate
