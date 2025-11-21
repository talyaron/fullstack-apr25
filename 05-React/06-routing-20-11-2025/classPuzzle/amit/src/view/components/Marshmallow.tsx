import image from "../../assets/marshmallow.png"
import styles from "./Marshmallow.module.scss"

const Marshmallow = () => {
  return (
    <div className={styles.container}>
      <img src={image} alt="marshmallow" />
      <h1>Marshmallow</h1>
      <div>
        <p>
          Soft, fluffy, and sweet candy made from whipped sugar and gelatin.
          Marshmallows melt easily and are perfect for hot chocolate, s’mores, or eating as-is.
        </p>
      </div>
    </div>
  )
}

export default Marshmallow
