import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './view/pages/Login.tsx'
import Candies from './view/pages/Candies.tsx'
import Marshmallow from './view/components/Marshmallow.tsx'
import Container from './view/components/Container.tsx'
import Chocolate from './view/components/Chocolate.tsx'
import GummyBears from './view/components/GummyBears.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='candies' element={<Candies />}>
          <Route index element={<Container />}/>
          <Route path='marshmallow' element={<Marshmallow />}/>
          <Route path='chocolate' element={<Chocolate />} />
          <Route path='gummybears' element={<GummyBears />}/>
        </Route>

        <Route path='login' element={<Login />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
