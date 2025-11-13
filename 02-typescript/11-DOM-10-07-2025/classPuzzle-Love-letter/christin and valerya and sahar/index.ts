function showCounter() {
   try {
        const counter = document.getElementById("counter");
        const counter2 = document.getElementById("counter2");
        if(!counter) throw new Error("Counter element not found");
        if(!counter2) throw new Error("Counter element not found");
        const loveArr1 = ["I"," ","L","o","v","e"," ","y","o","u"];
        const loveArr2: string[] = [];
        const loveArr3 = ["ا","ن","ا"," ","ب","ح","ب","ك"];
        const loveArr4: string[] = [];


        let count = 0;
        let count2 = 0;
        setInterval(() => {
            loveArr2.push(loveArr1[count]);
            loveArr4.push(loveArr3[count2]);
            count++;
            count2++;
            counter.innerText = "Massage: " + loveArr2.join("");
            counter2.innerText = "Massage: " + loveArr4.join("");
        }, 1000);

    } catch (error) {
        console.error("Error showing counter:", error);
    }
}
showCounter();
