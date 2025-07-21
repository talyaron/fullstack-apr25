interface Dta {
    name: string;
    date: string;

}
const person: Dta = {
    name: "",
    date: "",
};

function outputHtml(person: Dta): string {
    return `
    <div>Hello ${person.name}</div>
    <div>You birth year is ${person.date}</div>
    `
}
function renderOutput(): void {
    try {
        const text = document.getElementById("output")
        if (!text) throw new Error("output not fount");
        text.innerHTML = outputHtml(person)
    } catch (error) {
        console.error(error);

    }
}


function handleText(event) {
    person.name = event.target.value;

}
function handleDate(event) {
    person.date = event.target.value;
    renderOutput()
}


function handleColor(event) {
    document.body.style.color = event.target.value

}

