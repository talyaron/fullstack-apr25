class Person{
    public fullName : string;
    public age : number;
    public gender : "male" | "female" | "other" = "other";
    
    constructor(fullName : string, age: number, gender:"male" | "female" | "other"){
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
    }

    hello(){
    console.log (`Say hi to ${this.fullName}, his age is ${this.age}, and he is ${this.gender}.`)
}
}

const yoel = new Person("Yoel", 25, "male");

yoel.hello()