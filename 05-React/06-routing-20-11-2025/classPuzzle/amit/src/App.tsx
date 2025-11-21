import { Link } from "react-router"
import "./app.css"

function App() {

  return (
    <>
      <button>
        <Link to={"candies"}>
          Go to Candies
        </Link>
      </button>
    </>
  )
}

export default App
