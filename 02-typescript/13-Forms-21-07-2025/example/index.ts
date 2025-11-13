// Data
interface Data {
  color: string;
  text: string;
}

const data = {
  color: "white",
  text: "",
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
