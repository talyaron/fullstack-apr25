import { Outlet } from "react-router"

const Candies = () => {
  return (
    <div>
      <h1>Candies Page</h1>
      <Outlet />
    </div>
  )
}

export default Candies