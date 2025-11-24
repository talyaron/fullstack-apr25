
interface Props{
    text:string
    theme:"light" | "dark"
    setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>
}

const ToggleButton = ({text, theme, setTheme }: Props) => {

    function handleToggleTheme(){
        if(theme === 'light'){
            setTheme('dark')
            
        }   else{
            setTheme('light')
        }
    }

  return (
    <button onClick={handleToggleTheme}>{text}</button>
  )
}

export default ToggleButton