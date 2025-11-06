import Picture from "../picture/picture"
import style from './Grid.module.scss'
const Grid = () => {
  return (
    <div className={style.gridPicture}>
        <Picture/>
        <Picture/>
        <Picture/>
        <Picture/>
        <Picture/>
        <Picture/>
        <Picture/>
        <Picture/>
        <Picture/>
    </div>
  )
}

export default Grid
