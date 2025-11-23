import { Link } from 'react-router'
import style from '../pages/breeds/Breeds.module.scss'
const BreedsList = () => {
    return (
        <div className={style.breedsWrapper}>
            <ul className={style.breedsList}>
                <Link to="/Breed/hound"><li>Hound</li></Link>
                <Link to="/Breed/retriever"><li>Retriever</li></Link>
                <Link to="/Breed/terrier"><li>Terrier</li></Link>
                <Link to="/Breed/poodle"><li>Poodle</li></Link>
            </ul>
        </div>
    )
}

export default BreedsList
