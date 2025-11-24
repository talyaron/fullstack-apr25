
import { Link } from 'react-router'
import './App.scss'

function App() {

  return (
    <div className='app'>
      <h1>Welcome to the Dog Breeds App!</h1>
      <Link to='/Breed'>
      <button className='goToBtn'>go to get your lucky dog img</button>
      </Link>
    </div>
  )
}

export default App
