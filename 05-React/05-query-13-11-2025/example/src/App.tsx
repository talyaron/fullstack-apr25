import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState<string | null>(null)

  //functions
  const handleGetImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();

      if (data.status !== 'success') {
        throw new Error('Failed to fetch image')
      }
      setImage(data.message)
    } catch (error) {
      console.error('Error fetching image:', error)
    }
  }

  // handleGetImage();
  useEffect(() => {
    handleGetImage();
  }, []); // fetch image on component mount; [] ensures it runs only once; if it had dependencies, it would run when they change


  //render
  return (
    <>
      <div>
        {image && <img src={image} alt="Random Dog" />}
        <button onClick={handleGetImage}>Get Random Dog Image</button>
      </div>
    </>
  )
}

export default App
