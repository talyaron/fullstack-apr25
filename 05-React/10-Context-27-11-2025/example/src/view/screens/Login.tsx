import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { LoginContext } from "../../model/loginProvider/LoginContext";

export default function Login() {
  const { handleLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
    navigate("/");
  };

  return (
    <div className="screen">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
