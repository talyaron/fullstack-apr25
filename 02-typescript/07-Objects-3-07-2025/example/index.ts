//Model = data

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
let christine: Person = {
    gender: "female", //key: value (of any type),
    brothers: 4,
    address:{
        city:"Jeish",
        street: "Main St",
        number: 123,
    },
    hobbies: ["hiking", "reading", "cooking"],
    isMarried: false,
}

let Yatir: Person = {
    gender: "male",
    brothers: 2,
    address: {
        city: "Yeruham",
        street: "Herzel",
        number: 45,
    },
    hobbies: ["surfing", "photography"],
    isMarried: true,
}