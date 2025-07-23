//DATA

type Data = {
    color: string,
    text: string,
    date: string,
};

const data: Data = {
    color: "white",
    text: "",
    date: "",
};


//Controllers

function handleColor(ev) {
    try {
        data.color = ev.target.value;
        console.log(data);

        document.body.style.backgroundColor = data.color;

    } catch (error) {
        console.error(error);

    }
}


function changeText(ev) {
    try {
        const text = ev.target.value;
        data.text = text;

        const outPut = document.getElementById("text");
        if(!outPut) throw new Error("error");

        outPut.innerText = data.text;

    } catch (error) {
        console.error(error);
    }
}

function changeDate (ev) {
    try {
        const onDate = ev.target.value;
        if(!onDate) throw new Error("Error");
        
        onDate.innerText = data.date;
        console.log(onDate);

    } catch (error) {
        console.error(error);
    }
}