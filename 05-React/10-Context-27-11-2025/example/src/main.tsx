import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import { ThemeProvider } from './model/theme/ThemeProvider.tsx'
import { LoginProvider } from './model/loginProvider/LoginProvider.tsx'
import Login from './view/screens/Login.tsx'
import Register from './view/screens/Register.tsx'
import Main from './view/screens/Main.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LoginProvider>
          <Routes>           
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Main />} />
          </Routes>
        </LoginProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
