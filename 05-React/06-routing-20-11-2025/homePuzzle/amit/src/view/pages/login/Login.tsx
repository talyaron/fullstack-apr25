import { useNavigate } from "react-router"

const Login = () => {

    const navigate = useNavigate();

    function handleLogin () {
        
            setTimeout (() => {
                navigate("/");
            }, 2000)
    }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
