interface user {
    name: string;
    age: number;
    email: string;  
    isActive: boolean;
    hobbies: string[];
    address: {
        city: string;
        street: string;
        number: number;
    };
}


let yatirye: user = {
    name: "Yatir",
    age: 35,
    email: "yatirye@gmail.com",
    isActive: true,
    hobbies: ["reading", "traveling", "coding"],
    address: {
        city: "Yeruham",
        street: "rihal",
        number: 8,
    },
};

let reut: user = {
    name: "Reut",
    age: 32,
    email: "reut@gmail.com",
    isActive: false,
    hobbies: ["painting", "hiking"],
    address: {
        city: "Yeruham",
        street: "herzel",
        number: 45,
    },
};

let shani: user = {
    name: "Shani",
    age: 30,
    email: "shani@gmail.com",
    isActive: true, 
    hobbies: ["cooking", "yoga"],
    address: {
        city: "Yeruham",
        street: "main",
        number: 12,
    },
};

let yoav: user = {
    name: "Yoav",       
    age: 28,
    email: "yoav@gmail.com",
    isActive: false,
    hobbies: ["gaming", "music"],
    address: {
        city: "tel aviv",
        street: "ben yehuda",   
        number: 20,
    },
};