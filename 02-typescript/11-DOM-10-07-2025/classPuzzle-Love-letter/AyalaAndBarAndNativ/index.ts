function printing() {
  const text = [
    "i",
    " ",
    "l",
    "o",
    "v",
    "e",
    " ",
    "f",
    "u",
    "l",
    "l",
    "s",
    "t",
    "a",
    "c",
    "k",
    " ",
    "w",
    "e",
    "b",
  ];

  let i = 0;
  try {
    const title = document.getElementById("title");
    if (!title) throw new Error("Title element not found");
    // This line is incorrect and will cause an error
    const intervalId = setInterval(() => {
      if (i < text.length) {
        title.innerHTML += text[i];
        i++;
      } else {
        console.log("no more text");
        clearInterval(intervalId);
      }
    }, 500);
  } catch (error) {
    console.error("Error updating title:", error);
  }
}

printing();
