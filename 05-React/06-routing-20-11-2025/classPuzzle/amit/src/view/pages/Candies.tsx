import { Link, Outlet } from "react-router"

const Candies = () => {
    return (
        <div>
            <h1>Candies</h1>
            <p>
                A collection of sweet treats in different shapes, flavors, and textures.
                Click each candy to learn more about its unique taste and ingredients.
            </p>
            <Link to="/">
                <button>Go Home</button>
            </Link>
            <Outlet />
        </div>
    )
}

export default Candies
