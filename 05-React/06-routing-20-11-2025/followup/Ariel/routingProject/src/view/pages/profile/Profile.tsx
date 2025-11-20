import { Link } from "react-router"

const Profile = () => {
  return (
    <div>
      <h1>Profile page</h1>
      <Link to="/">
        <button>Go To Home</button>
      </Link>
    </div>
  )
}

export default Profile