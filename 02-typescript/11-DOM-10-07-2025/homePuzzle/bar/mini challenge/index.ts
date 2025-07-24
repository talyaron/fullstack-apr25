function addMessage(Message: string, color: string = "black"): void {
 const p = document.createElement("p");
 p.textContent = Message;
 p.style.color = color;
 const container = document.getElementById("messages");
 (container ?? document.body).appendChild(p);  
}
document.addEventListener("DOMContentLoaded", () => {
    addMessage("This paragrph was created by TypeScript! 🎉", "green");
    addMessage("Another message, default color.");
    addMessage("Test 1", "red");
    addMessage("Test 2", "blue");
});