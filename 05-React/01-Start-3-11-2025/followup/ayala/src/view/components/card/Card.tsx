import style from './Card.module.scss'
const Card = () => {
    return (
        <div className={style.card}>
            <div>Card</div>
            <div className="content" >to add another card press the butotn</div>
        </div>
    )
}

export default Card
