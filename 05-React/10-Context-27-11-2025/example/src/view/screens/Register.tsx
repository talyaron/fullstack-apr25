import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { LoginContext } from "../../model/loginProvider/LoginContext";

export default function Register() {
  const { handleLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
    navigate("/");
  };

  return (
    <div className="screen">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
