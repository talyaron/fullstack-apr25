import { useState } from "react";
import balonPic from "./pics/image.png";
import explode from "./pics/image copy.png";
import "./App.module.scss";
import { IconButton } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
function App() {
  const [timer, setTimer] = useState(0);
  const [exploded, setExploded] = useState(false);





  return (
    <>
      <div>
        <IconButton>
          <img src={balonPic} alt="" />{" "}
        </IconButton>
      </div>
    </>
  );
}

export default App;
