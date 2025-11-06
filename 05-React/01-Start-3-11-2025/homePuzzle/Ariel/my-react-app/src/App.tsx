import PersonDetails from './view/components/personDetails/PersonDetails'
import BusinessCard from './view/components/card/BusinessCard'
import HobbyList from './view/components/hobbyList/HobbyList'
import FavoriteMovies from './view/components/favoriteMovies/FavoriteMovies'
import './App.scss'

function App() {
  return (
    <div className="app">
      <div className="app__container">
        
        <h1 className="app__title">Wellcome to my portfilio! ✌️😊🍪</h1>
        
        <div className="app__grid">
          {/* First line */}
          <PersonDetails />
          <BusinessCard />
          
          {/* Middle line */}
          <div className="app__profile">
            <img src="./../src/assets/Screenshot_20180504-202410_Gallery.jpg" alt="Ariel" className="app__profile-img" />
          </div>
          
          {/* Seconed line */}
          <HobbyList />
          <FavoriteMovies />
        </div>
      </div>
    </div>
  )
}

export default App