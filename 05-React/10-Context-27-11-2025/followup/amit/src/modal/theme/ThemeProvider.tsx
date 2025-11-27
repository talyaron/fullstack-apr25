import { createContext, useState } from "react";


const ThemeContext = createContext({
    theme: "light" as "light" | "dark",
    handleToggleTheme: () => { },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const handleToggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}


export { ThemeProvider, ThemeContext }