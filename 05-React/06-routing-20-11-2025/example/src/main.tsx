import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import About from './view/pages/about/About.tsx';
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './view/pages/login/Login.tsx';
import Team from './view/components/Team.tsx';
import Tal from './view/components/Tal.tsx';
import Chrisitin from './view/components/Chrisitin.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />}>
          <Route index element={<Team />} />
          <Route path="tal" element={<Tal />} />
          <Route path="chrisitin" element={<Chrisitin />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
