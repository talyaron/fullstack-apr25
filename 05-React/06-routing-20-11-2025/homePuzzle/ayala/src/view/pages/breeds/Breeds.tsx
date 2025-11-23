import { Outlet } from "react-router"
import style from './Breeds.module.scss'
const Breeds = () => {
  return (
    <div className={style.breedsWrapper}>
        <h2>choose your favorite breed</h2>
        <Outlet />
    </div>

  )
}

export default Breeds
