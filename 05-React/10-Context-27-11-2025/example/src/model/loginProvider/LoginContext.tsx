import { createContext } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
  user: null as null | { email: string },
});