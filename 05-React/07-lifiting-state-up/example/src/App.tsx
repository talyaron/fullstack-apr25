import './App.css'
import LoginBox from './view/component/loginBox/LoginBox';
import ToggleButton from './view/component/toggleButton/ToggleButton'
import { useState } from 'react'

function App() {

  const [buttonText, setButtonText] = useState('Click you');
  const [theme, setTheme] = useState<"light" | "dark">('light');
  const [loginData, setLoginData] = useState<{email: string, password: string}>({email:'', password:''});

  return (
    <div className={`page ${theme}`}>
      <h2>{theme}</h2>
      <input type="text" onChange={(e) => setButtonText(e.target.value)} />
      <ToggleButton text={buttonText} theme={theme}  setTheme={setTheme} />
      <LoginBox loginData={loginData} setLoginData={setLoginData} />
      <p>Email: {loginData.email}</p>
      <p>Password: {loginData.password}</p>
    </div>
  )
}

export default App
