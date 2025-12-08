import { useContext } from "react"
import { ThemeContext } from "../../model/ThemeProvider"

const ToggleTheme = () => {
    const {handleToggleTheme} = useContext(ThemeContext)
  return (
    <button onClick={handleToggleTheme}> change theme</button>
  )
}

export default ToggleTheme
