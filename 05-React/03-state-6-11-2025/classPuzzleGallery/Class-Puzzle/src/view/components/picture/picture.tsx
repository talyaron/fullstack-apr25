import { useState } from 'react'
import logo from './../../../assets/react.svg'
import style from './picture.module.scss'
const Picture = () => {
    const [pictureUrl, setPictureUrl] = useState(logo)
    return (

        <div className={style.pictureBox}>
            <img src={pictureUrl} alt="picture" className='image' />
            <input type="url" name="inputUrl" id="inputUrl" className={style.inputUrl} onChange={(e) => {
                ((e.target.value).trim()) ? setPictureUrl((e.target.value)) : setPictureUrl(logo)}} />
        </div>
    )
}

export default Picture
