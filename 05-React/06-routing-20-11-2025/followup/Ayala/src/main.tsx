import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import About from './view/pages/about/About.tsx'
import Profile from './view/pages/profile/Profile.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<App/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/profile' element= {<Profile/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,

)
