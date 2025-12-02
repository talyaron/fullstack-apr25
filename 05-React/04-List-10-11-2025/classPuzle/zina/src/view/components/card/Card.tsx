
import styles from './Card.module.scss'

const Card = ({ text, imgUrl }: { text: string, imgUrl: string }) => {
    return (
        <div className={styles.card}>
            {imgUrl && <div className={styles.img} style={{ backgroundImage: `url(${imgUrl})` }}> </div>}
            {text}
        </div>
    )
}

export default Card