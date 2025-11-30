import { useEffect, useState } from "react";

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
      console.log(image);
      setImgae(data.message);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  useEffect(()=>{
    handleGetPhotos();
  },[])
  return (
    <>
      <div style={{flexDirection:"row",position:"relative",display:"flex",top:"0",gap:"10px",margin:"auto",justifyContent:"space-evenly",width:"100vw"}}>
        {image.map((img,indx)=>(<img src={img} key={indx} style={{height:"400px",width:"400px"}}/>))}
      </div>
      <div style={{position:"absolute",display:"flex",bottom:"10%",right:"50%"}}>
        
        <button onClick={handleGetPhotos}>Get Random Dog Image</button>
      </div>
    </>
  );
}

export default App;
