import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "./LoginContext"

export function LoginProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        console.log("Login status changed:", isLoggedIn);
        if(!isLoggedIn) navigate('/login');

    }, [isLoggedIn, navigate]);

    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </LoginContext.Provider>
    );
}