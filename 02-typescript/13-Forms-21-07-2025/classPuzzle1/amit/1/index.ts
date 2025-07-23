
function showEnterdName(event) {
    const target = event.target;
    const name = target.value;

    const outPut = document.getElementById("outPut");
    if(!outPut) throw new Error("Can't find this id");

    outPut.innerText = name ? `Hello ${name}!` : "";
}

