import styles from "./card.module.scss";

interface Props {
    text?: string;
    title?: string;
}



const Card = ({ title, text }: Props) => {
    return (
        <div className={styles.card}>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    )
}

export default Card;