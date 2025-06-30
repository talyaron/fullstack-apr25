function fullname(firstname: string, middlename: string, lastname: string): string{
    return "Full name is "+ firstname + middlename + lastname;
}

function age(a: number): number{
    return "She is "+ age + "years old";
}

let name = fullname("Razan " ,"Hazem " ,"Mani");
let herage = age(28);

console.log(name);
console.log(herage);