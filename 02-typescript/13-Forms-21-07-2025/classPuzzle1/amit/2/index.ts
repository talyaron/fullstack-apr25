
function showEnteredAge (event) {
    const target = event.target;
    const age = target.value;

    const outPut = document.getElementById("outPut");
    if(!outPut) throw new Error("Can't find any value");

    outPut.innerHTML = age ? `Your age is ${age}` : "";
}