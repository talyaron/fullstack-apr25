function updateMainTitle(newTitle: string): void {
    
    try { 
        const title = document.getElementById("main-title");
        if (!title) throw new Error;    

        title.innerText = newTitle;
        console.dir(title);
        console.log("The title have changed with getElementById!");

    } catch (Error) {
        console.error("Opps, Something went wrong!")
    }

}

function NewSubTitle(newTitle: string): void {

    try {
        const SubTitle = document.querySelector("h2");
        if (!SubTitle) throw new Error;

        SubTitle.innerText = newTitle;
        console.log("The title have changed with querySelector!")
    } catch (error){
        console.error("Opps, Something went wrong!");
    }
}

updateMainTitle("New title with getElementById!!");
NewSubTitle("New title with querySelector");


