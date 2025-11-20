import { Link, Outlet } from "react-router"

const About = () => {
    return (
        <div>
            <h1>About page</h1>
            <Link to="/">
                <button>Go To Home</button>
            </Link>
            <Outlet />

        </div>
    )
}

export default About