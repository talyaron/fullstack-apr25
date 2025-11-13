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

let razan: Person = {
    gender: "female",
    brothers: 3,
    address:{
        city:"Jerusalem",
        street: "Shu'fat",
        number: 1,
    },
    hobbies: ["traveling", "swimming", "cooking"],
    isMarried: true,
}