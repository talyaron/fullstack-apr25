import { useState } from "react";

import "./App.css";

function App() {
  const [image, setImgae] = useState([]);

  const handleGetPhotos = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random/3");
      const data = await response.json();
      if (data.status !== "success") {
        throw Error("Faild to fetch image");
      }
      console.log(image)
      setImgae(data.message);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  return (
    <>
      <div>
        {image[0] && <img src={image[0]} alt="Random Dog" />}
        {image[1] && <img src={image[1]} alt="Random Dog" />}
        {image[2] && <img src={image[2]} alt="Random Dog" />}
        <button onClick={handleGetPhotos}>Get Random Dog Image</button>
      </div>
    </>
  );
}

export default App;
