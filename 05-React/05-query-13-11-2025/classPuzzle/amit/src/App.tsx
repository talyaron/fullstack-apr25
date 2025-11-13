import { useEffect, useState } from "react";
function App() {
  const [image, setImage] = useState<string[]>([])

  const handleSetImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random/3");
      if (!response.ok) throw new Error("Failed to fetch random image in rsponse");

      const data = await response.json()
      if (data.status !== "success") {
        throw new Error("failed to fetch image")
      }
      setImage(data.message);

    } catch (error) {
      console.error(`${error}, Error, Can't find any image`)
    }
  }

  useEffect(() => {
    handleSetImage()
  }, []);

  return (
    <>
      <div>
        {image && image.map((src) => (
          <img key={src} src={src} alt="dog images" />
        ))}
        <button onClick={handleSetImage}>Click here for some dog images</button>
      </div>
    </>
  )
}

export default App
