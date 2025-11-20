import { Link } from 'react-router'
import styles from './Profile.module.scss'
const Profile = () => {
  return (
    <div className={styles.profile}>
        <h1 className={styles.name}>User Profile</h1>
        <p className={styles.bio}>Welcome to your profile page!</p>
        <button className={styles.editButton}>Edit Profile</button>
        <button className={styles.logoutButton}>Logout</button>
        <Link to="/about"><button>About</button></Link>
        <Link to="/"><button>Home</button></Link>

    </div>
  )
}

export default Profile
