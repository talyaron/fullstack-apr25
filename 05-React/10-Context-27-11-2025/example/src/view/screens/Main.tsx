import { useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../model/loginProvider/LoginContext";
import { ThemeContext } from "../../model/theme/ThemeProvider";
import ToggleTheme from "../components/toggleTheme/ToggleTheme";

export default function Main() {
  const { handleLogout } = useContext(LoginContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };


  return (
    <div className={`screen ${theme}`}>
      <h1>Welcome to Main</h1>
      <p>You are logged in!</p>
      <ToggleTheme />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
