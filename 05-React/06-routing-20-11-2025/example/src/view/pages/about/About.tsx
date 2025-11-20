import { Link } from "react-router"

const About = () => {
    return (
        <div>
            <h1>About page</h1>
            <Link to="/">
                <button>Go To Home</button>
            </Link>
        </div>
    )
}

export default About