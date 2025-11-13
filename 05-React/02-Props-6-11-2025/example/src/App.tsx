import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './view/components/card/Card'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card text="Ayala" imgUrl="https://jooinn.com/images/lotus-flowers-15.jpg"/>
      <Card text="Christen" imgUrl='https://www.pixelstalk.net/wp-content/uploads/2014/12/Beautiful-Tulip-flowers-hd-wallpapers.jpg' />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
