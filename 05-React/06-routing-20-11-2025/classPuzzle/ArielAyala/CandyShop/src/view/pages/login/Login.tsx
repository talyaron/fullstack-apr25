import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setTimeout(() => {
      navigate("/candies");
    }, 2000);
  };

  return(
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
};

export default Login;
