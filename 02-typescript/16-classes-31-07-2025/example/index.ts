// interface Person {
//     name: string;
//     age: number;
// }

// const yossi: Person = {
//     name: "Yossi",
//     age: 30
// };

class Person {
    private fullName: string;
    public age: number;
    public gender: "male" | "female" | "other" = "other"; // default value
    // constructor(name: string, age: number)  the is how we build a instance of a class
    constructor(fullName: string, age: number) {
        this.fullName = fullName;
        this.age = age;
    }

    //methods (functions inside a class))
    greet() {
        console.log(`Hello, my name is ${this.fullName} and I am ${this.age} years old.`);
    }
}

const yossi = new Person("Yossi", 30);

console.log(yossi); // Yossi
yossi.greet(); // Hello, my name is Yossi and I am 30 years old.

const dana = new Person("Dana", 25);
dana.greet(); // Hello, my name is Dana and I am 25 years old.

interface PersonInterface {
    fullName: string;
    age: number;
    gender: "male" | "female" | "other";
}

const yossi2: PersonInterface = {
    fullName: "Yossi",
    age: 30,
    gender: "male"
};

console.log(yossi.age); 



console.log(yossi2); // Yossi