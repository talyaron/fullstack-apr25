import { Link } from "react-router"

const About = () => {
    return (
        <div>About
            <Link to="/"><button>Home</button></Link>
            <Link to="/profile"><button>Profile</button></Link>
        </div>

    )
}

export default About
