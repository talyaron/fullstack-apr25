import { useEffect, useState } from 'react'
import './App.module.scss'

function App() {
    const [images, setImages] = useState<string[]>([])

    //functions
    const handleGetImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random/3');
        const data = await response.json();
        
        if (data.status !== 'success') {
          throw new Error('Failed to fetch image')
        }
        setImages(data.message) 
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }
  
    console.log(images)

    useEffect(() => {
      handleGetImage();
    }, []); 

    //render
    return (
      <>
        <div>
          {images.length > 0 && images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Random Dog ${index + 1}`} />
          ))}
          <button onClick={handleGetImage}>Get 3 Random Dog Images</button>
        </div>
      </>
    )
}

export default App