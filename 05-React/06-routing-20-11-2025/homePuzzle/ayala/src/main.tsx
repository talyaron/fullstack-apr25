import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import BreedImg from './view/componenets/BreedImg.tsx';
import Breeds from './view/pages/breeds/Breeds.tsx';
import BreedsList from './view/componenets/BreedsList.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Breed' element={<Breeds/>}>
          <Route index element={<BreedsList />} />
          <Route path=':breedId' element={<BreedImg />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
