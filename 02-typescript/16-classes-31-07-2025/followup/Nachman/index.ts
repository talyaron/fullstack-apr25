 interface Person2 {
     name: string;
     age: number;
 }

 const nachman2: Person2 = {
     name: "Nachman",
     age: 21
 };



class Person {
    private fullName: string;
    public age: number;
    public gender: "male" | "female" | "other" = "other";

     //instance of a class
    constructor(fullName: string, age: number) {
        this.fullName = fullName;
        this.age = age;
    }

    // methods
    greet() {
        console.log(`Hello, my name is ${this.fullName} and I am ${this.age} years old.`);
    }
}

const dvir = new Person("dvir", 30);
const nachman = new Person("Nachman", 21);

console.log(nachman); // Nachman
nachman.greet(); // Hello, my name is Nachman and I am 21 years old.

console.log(dvir); // dvir
dvir.greet(); // Hello, my name is dvir and I am 30 years old.

interface PersonInterface {
    fullName: string;
    age: number;  
    gender: "male" | "female" | "other";
};
