import { useState } from "react";
import balonPic from "./pics/image.png";
import explode from "./pics/image copy.png";
import "./App.module.scss";
import { IconButton } from "@mui/material";

function App() {
  const [exploded, setExploded] = useState(false);

  const handleClick = () => {
    setExploded((prev) => !prev);
    if (!exploded) {
      console.log("boom");
    }
  };

  return (
    <div>
      <IconButton
        style={{ height: "50px", width: "50px" }}
        onClick={handleClick}
        aria-label="Balloon"
      >
        <img
          src={exploded ? explode : balonPic}
          alt={exploded ? "Exploded balloon" : "Balloon"}
          style={{ height: "50px", width: "50px" }}
        />
      </IconButton>
    </div>
  );
}

export default App;
