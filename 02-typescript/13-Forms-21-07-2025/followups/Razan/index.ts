//data
interface Passwords {
    text: string;
}

const password = {
    text: ""
}

//controller
function handlePassEnter(ev){
    try{
        password.text = ev.target.value;
        console.log(password);
    }
    catch(error){
        console.error(error)
    }
}