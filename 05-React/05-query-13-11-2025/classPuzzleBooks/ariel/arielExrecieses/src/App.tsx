// import React, { useState } from 'react';
// import UserCard from "./view/components/userCard/UserCard";
// import ProductCard from "./view/components/productsCard/ProductsCard";
// import Calculetor from "./view/components/calculator/Calculetor";
// import ProductList from "./view/components/contactList/ContactList";
// import FilteredList from "./view/components/fruitListFilter/FriutListFilter";
import StudentList from "./view/components/sortingLists/SortingLists";

import "./App.scss";

function App() {
  return (
    <>
      <div className="app">
        <StudentList />
      </div>
    </>
  );
}

export default App;