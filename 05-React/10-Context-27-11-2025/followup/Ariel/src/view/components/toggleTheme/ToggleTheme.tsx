import { useContext } from 'react'
import styles from './ToggleTheme.module.scss'
import { ThemeContext } from '../../../model/theme/ThemeProvider';

const ToggleTheme = () => {

    const { handleToggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={handleToggleTheme} className={styles.button}>ToggleTheme</button>
    )
}

export default ToggleTheme