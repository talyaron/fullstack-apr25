import style from './Crard.module.scss'
interface Prop{
    name:String;
    age:Number;
}
const Card = ({name, age}:Prop) => {
  return (
    <div className={style.card}>
        <div className={style.name}>
            name: {name}
        </div>
        <div className={style.age}>
            age: {age.toString()}
        </div>
    </div>
  )
}

export default Card
