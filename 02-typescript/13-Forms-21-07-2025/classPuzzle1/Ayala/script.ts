//Challenge 1.1.1
function nameHtml(name): string {
    return `
<div>
Hello ${name}</div>
`
}

function handleName(event) {
    try {
        const output = document.getElementById("nameRoot")
        if (!output) throw new Error("nameRoot element not found");
        const input = event.target.value
        if (!input) throw new Error("no value");
        output.innerHTML = nameHtml(input)


    } catch (error) {
        console.error(error);

    }
}
//Challenge 1.1.2
function ageHtml(age: number): string {
    return `
<div>
You are ${age} years old</div>
`
}

function handleAge(event) {
    try {
        const output = document.getElementById("ageRoot")
        if (!output) throw new Error("ageRoot element not found");
        const input = event.target.value
        if (!input) throw new Error("no value");
        output.innerHTML = ageHtml(input)
    } catch (error) {
        console.error(error);

    }
}

//Challenge 1.1.3
function togglePassword() {
    try {
        const password = document.getElementById("password") as HTMLInputElement
        const checkbox = document.getElementById("showPassword") as HTMLInputElement
        if (!password) throw new Error("password element not found");
        if (!checkbox) throw new Error("checkbox element not found");
        if (!password.value) throw new Error("no value");
        password.type = checkbox.checked ? "text" : "password"

    } catch (error) {
        console.error(error);
    }
}

//challenge 1.1.4


function emailHtml(email): string {
    return `
<div>
Your email is ${email} </div>
`
}
function emailErrorHtml(): string {
    return `
 <div class="error">
❌ email format is invalid 
 </div>
`
}
function handleEmail(event) {
    try {
        const output = document.getElementById("emailRoot")
        if (!output) throw new Error("emailRoot element not found");
        const input = event.target.value
        if (!input) throw new Error("no value");
        output.innerHTML = input.includes("@") ? emailHtml(input) : emailErrorHtml()
    } catch (error) {
        console.error(error);

    }
}

//chalenge 1.2
function handleColorChange(event) {
    try {
  const color = event.target.value ;
  if(!color)throw new Error("no value");
  const cahngeDivColor = document.getElementById("ChangingBackgroundColor") ;
  if(!cahngeDivColor)throw new Error("ChangingBackgroundColor element not found");
  cahngeDivColor.style.background = color;
  
    } catch (error) {
        console.error(error);

    }
}