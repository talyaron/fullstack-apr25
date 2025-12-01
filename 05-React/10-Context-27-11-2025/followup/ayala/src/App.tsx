import { useContext, useState } from 'react'

import './App.scss'
import { NameContext } from './model/NameProvider'
import { ThemeContext } from './model/ThemeProvider'
import ToggleTheme from './view/components/ToggleTheme'

function App() {
  const { name } = useContext(NameContext)
  const { theme } = useContext(ThemeContext)
  const [open, setOpen] = useState<boolean>(false)
  const { handleChangeName } = useContext(NameContext)

  const handleOpenDiv = () => {
    setOpen(!open)
  }
  const sendChaneName
    = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeName(e.target.value)
    }
  return (
    <div className={` App ${theme}`}>
      <h1>hello {name}</h1>
      <button onClick={handleOpenDiv}>{open ? 'close div' : 'open div'}</button>
      <input type="text" placeholder='enter your name' onChange={sendChaneName} />
      {open && <div>This is a toggled div</div>}
      <ToggleTheme />

    </div>
  )
}

export default App
