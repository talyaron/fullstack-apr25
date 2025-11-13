import styles from './Card.module.scss';

interface Props{
  text?: string;
  imgUrl?: string;
  alt?: string;
  theme?: 'light' | 'dark';
}

const Card = ({text, imgUrl, alt, theme}: Props) => {
  if(!alt && imgUrl){
    alt = text ? `Image of ${text}` : 'Card image';
  }
  return (
    <div className={styles.card} style={{
      backgroundColor: theme === 'dark' ? '#492c2cff' : '#cb7474ff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      border: theme === 'dark' ? '2px solid #ffffff' : '2px solid #000000',
    }}> 
       {imgUrl && <img src={imgUrl} alt={alt} />}
        <h1>{text}</h1>       
    </div>
  )
}

export default Card
