// Data
interface Data {
  color: string;
  text: string;
  img: string;
}

const data = {
  color: "white",
  text: "",
  img: "",
};

//controllers

function handleTextEnter(ev) {
  try {
    const text = ev.target.value;
    console.log(text);
    data.text = text;

    const textOutput = document.getElementById("text-output");
    if (!textOutput) {
      throw new Error("Text output element not found");
    }
    textOutput.innerText = data.text;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function handleImgEnter(ev) {
  try {
    const imgUrl = ev.target.value;
    console.log(imgUrl);
    data.img = imgUrl;

    const imgOutput = document.getElementById("imgOutput") as HTMLImageElement;
    if (!imgOutput) {
      throw new Error("Img output element not found");
    }
    imgOutput.src = data.img;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
