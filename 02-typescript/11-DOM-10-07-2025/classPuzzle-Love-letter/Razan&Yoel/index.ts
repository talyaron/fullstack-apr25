function updateTitle(newTitle: string) {
    try {
        const title = document.getElementById("title");
        if(!title) throw new Error("Title element not found");
      // This line is incorrect and will cause an error

        console.dir(title);

        title.innerText = newTitle;

    } catch (error) {
        console.error("Error updating title:", error);

    }
}

updateTitle("I");



function updateH1Color(newColor:string) {
   try {
        const color = document.getElementById("title");
        if(!color) throw new Error("Title element not found");
      // This line is incorrect and will cause an error

        console.dir(color);

        color.style.color = newColor;

    } catch (error) {
        console.error("Error updating title:", error);

    }
    
}
updateH1Color("red");


function showCounter() {
   try {
        const counter = document.getElementById("counter");
        if(!counter) throw new Error("Counter element not found");

        let count = 0;
        setInterval(() => {
            count++;
            counter.innerText = "Counter: " + count.toString();
                                if (count >= 1)
            updateTitle("I L");
                                        if (count >= 2)
            updateTitle("I Lo");
                                        if (count >= 3)
            updateTitle("I Lov");
                                        if (count >= 4)
            updateTitle("I Love");
                                        if (count >= 5)
            updateTitle("I Love Y");
                                                if (count >= 6)
            updateTitle("I Love Yo");
                                                if (count >= 7)
            updateTitle("I Love You");
            if (count >= 8) updateTitle("أ");
            if (count >= 9) updateTitle("أنـ");
            if (count >= 10) updateTitle("أنـا");
            if (count >= 11) updateTitle("أنـا أ");
            if (count >= 12) updateTitle("أنـا أحـ");
            if (count >= 13) updateTitle("أنـا أحـبـ");
            if (count >= 14) updateTitle("أنـا أحـبـك");


        }, 1000);
        

        if (count > 5)
            updateH1Color("blue");


    } catch (error) {
        console.error("Error showing counter:", error);
    }

    
}
showCounter();