function showCounter() {
    try {
        const counter = document.getElementById("counter");
        if (!counter) throw new Error("Counter element not found");

        const words = ["i", " ", "l", "o", "v", "e", " ", "y", "o", "u"];
        let index = 0;

        const setCounter = setInterval(() => {
            const message = words.slice(0, index + 1).join("");
            counter.innerHTML = message;
            index++;
            
            if (index >= words.length) {
                clearInterval(setCounter);
            }
        }, 700);   

    } catch (error) {
        console.error("Error showing counter:", error);
    }
}
showCounter();