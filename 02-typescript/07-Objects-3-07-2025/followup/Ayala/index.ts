
interface Person {
    gender: string;
    brothers: number;
    address: {
        city: string;
        street: string;
        number: number;
    };
    hobbies: string[];
    isMarried: boolean;
}

//Object
let ayala: Person = {
    gender: "female", //key: value (of any type),
    brothers: 1,
    address:{
        city:"Jerusalem",
        street: "Haklai",
        number: 10,
    },
    hobbies: ["eating", "sleeping", "camping"],
    isMarried: false,
}
console.log(ayala);
