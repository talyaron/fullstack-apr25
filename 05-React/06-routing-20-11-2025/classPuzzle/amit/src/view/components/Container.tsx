import { Link } from "react-router"
import styles from "./Container.module.scss"

const Container = () => {
    return (
        <div className={styles.container}>
            <ul>
                <Link to={"marshmallow"}><li>Marshmallow</li></Link>
                <Link to={"chocolate"}><li>Chocolate</li></Link>
                <Link to={"gummybears"}><li>Gummy-Bears</li></Link>
            </ul>
        </div >
    )
}

export default Container
