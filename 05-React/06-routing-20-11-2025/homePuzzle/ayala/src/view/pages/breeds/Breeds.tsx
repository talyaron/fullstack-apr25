import { Link, Outlet } from "react-router"
import style from './Breeds.module.scss'
const Breeds = () => {
  return (
    <div className={style.breedsWrapper}>
        <h2>choose your favorite breed</h2>
        <Outlet />
        <Link to="/">
            <button className={style.backButton}>Back to Home</button>
        </Link>
    </div>

  )
}

export default Breeds
