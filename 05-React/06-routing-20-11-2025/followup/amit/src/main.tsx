import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router"; 
import About from './view/pages/about/About.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/about' element={<About />} /> 
    </Routes>
  </StrictMode>,
  </BrowserRouter>
)
