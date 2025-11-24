import { Link } from 'react-router'
import style from '../pages/breeds/Breeds.module.scss'
const BreedsList = () => {
    return (
        <div className={style.breedsWrapper}>
            <ul className={style.breedsList}>
                <Link to="/Breed/akita"><li>Akita</li></Link>
                <Link to="/Breed/chow"><li>Chow</li></Link>
                <Link to="/Breed/doberman"><li>Doberman</li></Link>
                <Link to="/Breed/eskimo"><li>Eskimo</li></Link>
                <Link to="/Breed/boxer"><li>Boxer</li></Link>
                <Link to="/Breed/beagle"><li>Beagle</li></Link>

            </ul>
        </div>
    )
}

export default BreedsList
