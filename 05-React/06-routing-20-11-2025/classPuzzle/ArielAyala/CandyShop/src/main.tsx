import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
// import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./view/pages/login/Login.tsx";
import Candies from "./view/pages/candies/Candies.tsx";

import Chocolate from "./view/components/Chocolate.tsx";
import Marshmello from "./view/components/Marshmello.tsx";
import GummyBears from "./view/components/GummyBears.tsx";
import CandiesList from "./view/components/CandiesList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/candies" element={<Candies />}>
          <Route index element={<CandiesList />} />
          <Route path="marshmello" element={<Marshmello />} />
          <Route path="gummybears" element={<GummyBears />} />
          <Route path="chocolate" element={<Chocolate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
