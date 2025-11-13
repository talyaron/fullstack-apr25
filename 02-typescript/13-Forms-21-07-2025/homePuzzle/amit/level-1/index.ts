type YourDataType = {
    text: string,
    color: string,
}

const yourData: YourDataType[] = [];

// Controllers (Event Handlers)
function handleInputChange(event: Event): void {
  try {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    yourData[0] = {
        text: value,
        color: yourData[0]?.color || "#ffffff",
    };

    renderYourItems(yourData);

  } catch (error) {
    console.error("Error:", error);
  }
}
function handleColorChange(event: Event): void {
    try{
        const input = event.target as HTMLInputElement;
        const value = input.value;

        document.body.style.backgroundColor = value;

        yourData[0] = {
            text: yourData[0]?.text || "",
            color: value,
        };
        
        renderYourItems(yourData);

    } catch (error) {
        console.error(error, "Something went wrong!");
    }
}

// View (HTML Generation & DOM Rendering)
function htmlYourItem(item: YourDataType): string {
  try {
    return `
    <div>
    <h2> Hello ${item.text}</h2>
    <p> The color is ${item.color}</p>
    </div>
    `
  } catch (error) {
    console.error("Error generating HTML:", error);
    return `<div class="error">Error rendering item</div>`;
  }
}

function renderYourItems(items: YourDataType[]): void {
  try {
    const root = document.getElementById("container");
    if (!root) throw new Error("container element not found");
    root.innerHTML = items.map((item) => htmlYourItem(item)).join("");
  } catch (error) {
    console.error("Error rendering items:", error);
  }
}