import { useNavigate } from "react-router";

const Login = () => {

    const navigate = useNavigate(); //react-router hook for programmatic navigation

    function handleLogin() {
        // Implement login logic here

        setTimeout(() => {
            navigate("/"); //programmatic navigation to home page after login
        }, 1000);

        //fetch('/api/login', {
        //    method: 'POST',
        //    body: JSON.stringify({ username, password }),
        //}).then(response => {
        //    if (response.ok) {
        //        navigate("/"); //programmatic navigation to home page after login
        //    }
        //});
    }

  return (
    <div>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login