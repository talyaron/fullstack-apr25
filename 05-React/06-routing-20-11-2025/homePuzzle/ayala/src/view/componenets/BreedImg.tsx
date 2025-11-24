import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import style from '../pages/breeds/Breeds.module.scss'


const BreedImg = () => {
    const { breedId } = useParams();
    const [imgUrl, setImgUrl] = useState<string>("");
    async function fetchBreedImage(breedId: string | undefined) {
        const response = await fetch(`https://dog.ceo/api/breed/${breedId}/images/random`);
        const data = await response.json();
        if (!data.message) return ""; // URL of the breed image
        setImgUrl(data.message);
    }
    useEffect(() => {
        fetchBreedImage(breedId);
    }, []);
    return (
        <div className={style.breedImgContainer}>
            <img src={imgUrl} alt="dog image" />

            <div className={style.buttonsRow}>
                <Link to="/Breed">
                    <button className={style.backButton}>Back to Breeds List</button>
                </Link>

                <button
                    className={style.backButton}
                    onClick={() => fetchBreedImage(breedId)}
                >
                    Change image
                </button>
            </div>
        </div>

    )
}

export default BreedImg
