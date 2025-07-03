interface Person {
    gender: string;
    brothers: number;
    sisters: number;
    address: {
        city: string;
        street: string;
        number: number;
    };
    hobbies: string[];
    isMarried: boolean;
}

let Ariel: Person = {
    gender: "male",
    brothers: 0,
    sisters: 3,
    address: {
        city: "Be'er Sheva",
        street: "Johana Jabotinsky",
        number: 23,
    },
    hobbies: ["Cooking", "Sports, thecnolegy"],
    isMarried: false
}
