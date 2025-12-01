import { createContext, useState } from "react"

const NameContext = createContext({
    name: "",
    handleChangeName: (_newName:string) => { }
})
const NameProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState<string>("user");
    const handleChangeName = (newName:string) => {
        setName(newName)
    }
    return (
        <NameContext.Provider value={{ name, handleChangeName }}>
            {children}
        </NameContext.Provider>
    )
}

export  {NameContext, NameProvider}
