import { useEffect, useState } from 'react'
import style from './App.module.scss'

function App() {
  const [dogs, setDogs] = useState<string[]>([])
  const handleGetDogs = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/2')
      const data = await response.json()
      if(data.status !== "success"){
        throw new Error("failed to fetch dogs")
      }
      setDogs(data.message)
    } catch (error) {
      console.error('Error fetching dog breeds:', error)
    }
  }
  useEffect(()=>{
    handleGetDogs()
  },[])
  return (
    <div className={style.app}>
      <h1>Dog Images</h1>
      <button onClick={handleGetDogs}>Click To Get New Dogs</button>
      <div className={style.dogList}>
        {dogs.map((img, i)=> <img key={i} src={img} alt="dogIMG" />)}
      </div>
    </div>
  )
}

export default App
