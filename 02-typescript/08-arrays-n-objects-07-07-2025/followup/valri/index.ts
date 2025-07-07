interface People{
    name: string;
    lastName: string;
    age: number;

};

let peopleArrey[] : People = [
   {name : "Jo",lastName: "Jim", age: 85 } 
    { name: "Jane", lastName: "Smith", age: 30 },
    { name: "Alice", lastName: "Johnson", age: 25 },
    { name: "Bob", lastName: "Brown", age: 40 },
    { name: "Charlie", lastName: "Davis", age: 770 },
    { name: "Eve", lastName: "White", age: 35 },
    { name: "Frank", lastName: "Green", age: 8 }
];

let peopleUnder50: People[] = peopleArrey.filter()