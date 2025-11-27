import { useContext } from "react"
import { ThemeContext } from "../../modal/theme/ThemeProvider"
import styles from "./ToggleTheme.module.scss";

const ToggleTheme = () => {

    const {handleToggleTheme} = useContext(ThemeContext);

  return (
    <div>
        <button onClick={handleToggleTheme} className={styles.button}>ToggleTheme</button>
    </div>
  )
}

export default ToggleTheme