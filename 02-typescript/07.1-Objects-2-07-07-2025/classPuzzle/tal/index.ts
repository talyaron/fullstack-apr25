interface Person {
    name: string;
    lastName: string;
    age?: number;
    address?: {
        city: string;
        street: string;
        number: number;
    };
}

type Person2 = {
    name: string;
    lastName: string;
    age?: number;
    address?: {
        city: string;
        street: string;
        number: number;
    };
}

let nativ: Person = {
    name: "Nativ",
    lastName: "Kalo",
    address: {
        city: "Tel Aviv",
        street: "Allenby",
        number: 12
    }
}

// retrieving the value of a property
console.log(nativ.name); // Nativ
console.log(nativ.lastName); // Kalo

console.log(nativ["name"]); // Nativ
console.log(nativ["lastName"]); // Kalo

console.log(nativ.address?.city); // Tel Aviv
console.log(nativ.address?.["city"]); // Tel Aviv
console.log(nativ["address"]?.city); // Tel Aviv
console.log(nativ["address"]?.["city"]); // Tel Aviv

for (let key in nativ.address) {

    console.log(key, nativ.address[key]); // city Tel Aviv, street Allenby, number 12
}

for (let key in nativ) {
    console.log(key, nativ[key]); // name Nativ, lastName Kalo, address { city: 'Tel Aviv', street: 'Allenby', number: 12 }
}