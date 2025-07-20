//🟢 Exercise 1.1:
function getArrayLength(arr: any[]): number {
    return arr.length;
}

console.log("Length of [1, 2, 3]:", getArrayLength([1,2,3]));

//🟢 Exercise 1.2: Simple Object Function
function getPersonName(person: { name: string; age: number}): string {
  return person.name;  
}

let testPerson = {name: "Alice", age: 25};
console.log("Person's name:", getPersonName(testPerson));

//🟢 Exercise 1.3: Simple Loop Function
function printNumbers(n: number): void {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

console.log("Numbers 1 to 5:");
printNumbers(5);

//🟡 LEVEL 2: Easy Functions

//Exercise 2.1: Sum Array Elements:
function sumArray(numbers: number[]): number {
    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}
console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4]));

//🟡 Exercise 2.2: Count Objects in an Array:
function countPeople(people: { name: string, age: number}[]): number {
 return people.length;   
}

let people = [
    { name: "Alice", age: 25},
    { name: "Bob", age: 30},
    { name: "Charlie", age: 35}
];

console.log("Number of people:", countPeople(people));
people.push({name: "Diana", age: 40});
console.log("After adding Diana", countPeople(people));

people.pop();
console.log("After removing the last person:", countPeople(people));

people.shift();
console.log("After removing the first person:", countPeople(people));

//🟡 Exercise 2.3: Find the Largest Number:
function findLargest(numbers: number[]): number {
    let largest = numbers [0]; 

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers [i];
        }
    }
    return largest;
}

console.log("Largest in [5, 2, 9, 1]:", findLargest([5, 2, 9, 1]));

//🟠 LEVEL 3: Medium Functions
//Exercise 3.1: Filter Even Numbers

function getEvenNumbers(numbers: number[]): number[] {
    let evens:number[] = [];

    for(let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            evens.push(numbers[i]);
        }
    }
    return evens;
}

console.log("Even numbers from [1,2,3,4,5,6]:", getEvenNumbers([1,2,3,4,5,6]));

//Mini Challenge: Filter Positive Even Numbers
function getPositiveEvens (numbers: number[]): number[] {
    let result: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] % 2 === 0) {
            result.push(numbers[i]);
        }
    }
    return result;
}

console.log(getPositiveEvens([-2, -1, 0, 1, 2, 3, 4, 5, 6]));

//Exercise 3.2: Find Person by Name
function findPersonByName(
    people: {name: string, age: number}[],
    searchName: string
): {name: string, age: number } | null {
    for (let i = 0; i <people.length; i++) {
        if (people[i].name === searchName) {
            return people[i];
        }
    }
    return null;
}

let peopleList = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

console.log("Find Bob:", findPersonByName(peopleList, "Bob"));

//3.3 – Create Array of Squares
function getSquares(numbers: number[]): number[] {
    let squares: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
    squares.push(numbers[i] * numbers[i]);
}

return squares; 
}

console.log("Current array:", getSquares([1, 2, 3, 4]));

//LEVEL 4: Challenging Functions
//Exercise 4.1: Group People by Age Range
function groupByAge(people: {name: string, age: number}[]): {
    young: {name: string, age: number}[],
    older: {name: string, age: number}[]
} {
let result = {
    young: [],
    older: []
};
return result;
}

let peopleList = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 19},
    {name: "Diana", age: 33}
];
console.log("Grouped by age:", groupByAge(peopleList));

//4.2: Calculate Object Properties – Average Age
function calculateAverageAge(people: { name: string, age: number}[]): number {
    let totalAge = 0;
    for (let i = 0; i < people.length; i++) {
        totalAge += people[i].age;
    }
    let average = totalAge / people.length;
    return average;
}

let peopleList2 = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

console.log("Average age:", calculateAverageAge(peopleList));

// Exercise 4.3: Transform Objects
function addAgeCategory(people: { name: string, age: number }[]): {
    name: string;
    age: number;
    category: string;
}[] {
    let result: {name: string; age: number; category: string }[] = [];
for (let i =0; i < people.length; i++) {
    let person = people[i];
    let category = "";

    if (person. age < 18) {
        category = "child";
    } else if (person.age >= 18 && person.age < 65) {
        category = "adult";
    } else {
        category = "senior";
    }

    result.push({
        name: person.name,
        age: person.age,
        category: category
    });
}

   return result;
}
let peopleWithAges = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];
console.log("Age Category:", addAgeCategory(peopleWithAges));


//Muay Thai challenge:

function categorizeFighters(fighters: {name: string, style: string}[]): {
name: string;
style: string;
category: string;  
}[] {
    let result: { name: string; style: string; category: string}[] = [];

    for (let i = 0; i < fighters.length; i++) {
        let fighter = fighters[i];
        let category= "";

        if (fighter.style === "Muay Khao") {
            category = "Pressure Fighter";
        } else if (fighter.style === "Muay Femur") {
            category = "Technical Genius";
        } else {
            category = "Unknown";
        }

        result.push({
            name: fighter.name,
            style: fighter.style,
            category: category
        });
    }
    return result;
}

let fighters = [
  { name: "Rodtang", style: "Muay Khao" },
  { name: "Saenchai", style: "Muay Femur" },
  { name: "Dieselnoi", style: "Muay Khao" },
  { name: "Samart", style: "Muay Femur" }
];

console.log("Fighter categories:", categorizeFighters(fighters));

//5.1: Sort People by Age, Return Their Names
function getSortedNames(people: {name: string, age: number}[]): string[]{

let sorted = [...people]
 sorted.sort((a, b) => a.age - b.age);
  let namesOnly = sorted.map(person => person.name);
  return namesOnly;
}

let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 19 },
  { name: "Charlie", age: 32 }
];

console.log("Names sorted by age:", getSortedNames(people));

//Exercise 5.2: Multi-condition Filtering
function findPeopleByMultipleCriteria(
  people: { name: string; age: number; city: string }[],
  minAge: number,
  maxAge: number,
  city: string
): { name: string; age: number; city: string }[] {
  let matches: { name: string; age: number; city: string }[] = [];

  for (let i = 0; i < people.length; i++) {
    let person = people[i];

    if (
      person.age >= minAge &&
      person.age <= maxAge &&
      (city === undefined || person.city === city)
    ) {
      matches.push(person);
    }
  }

  return matches;
}
let peopleWithCities = [
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "London" },
  { name: "Charlie", age: 35, city: "New York" },
  { name: "Diana", age: 28, city: "Paris" }
];

console.log(
  "People 25-32 in New York:",
  findPeopleByMultipleCriteria(peopleWithCities, 25, 32, "New York")
);

// Exercise 5.3: Data Aggregation – createPeopleReport
function createPeopleReport(
    people: { name: string; age: number; city: string }[]
): {
 totalPeople: number;
 averageAge: number;
 ageRanges: {
    children: number;
    adults: number;
    seniors: number;
 };
 cities: { [cityName: string]: number };
} {
    let report = {
        totalPeople: 0,
        averageAge: 0,
        ageRanges: {
          children: 0,
      adults: 0,
      seniors: 0
    },
    cities: {}
  };
  let totalAge = 0;

  for (let i = 0; i < people.length; i ++) {
    let person = people[i];

    report.totalPeople++;

    totalAge += person.age;

    if (person.age < 18) {
        report.ageRanges.children++;
    } else if (person.age < 65) {
        report.ageRanges.adults++;
    } else {
        report.ageRanges.seniors++;
    }

    if (person.city) {
        if (report.cities[person.city]) {
            report.cities[person.city]++;
        } else {
            report.cities[person.city] = 1;
        }
    }
  }
  if (report.totalPeople > 0) {
  report.averageAge = totalAge / report.totalPeople;
}
  return report;
    }
  let peopleWithCities = [
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "London" },
  { name: "Charlie", age: 35, city: "New York" },
  { name: "Diana", age: 28, city: "Paris" }
];

console.log("People report:", createPeopleReport(peopleWithCities));  

//mini challenge
function fighterStatsSummary(fighters: { name: string; style: string; wins: number }[]): {
  totalFighters: number;
  averageWins: number;
  styles: {
  "MuayKaho": number;
  "MuayFemur": number;
  };  
} {
    let report = {
        totalFighters: 0,
        averageWins: 0,
        styles: {
            MuayKaho: 0,
            MuayFemur: 0
        }
    };

    let totalWins = 0;

     for (let i = 0; i < fighters.length; i++) {
    let fighter = fighters[i];

    report.totalFighters++;

    totalWins += fighter.wins;

    if (fighter.style === "Muay Khao") {
      report.styles.MuayKhao++;
    } else if (fighter.style === "Muay Femur") {
      report.styles.MuayFemur++;
    }
  }

  if (report.totalFighters > 0) {
    report.averageWins = totalWins / report.totalFighters;
  }
  
  return report;
}

  let fighters = [
  { name: "Rodtang", style: "Muay Khao", wins: 270 },
  { name: "Saenchai", style: "Muay Femur", wins: 300 },
  { name: "Dieselnoi", style: "Muay Khao", wins: 180 },
  { name: "Samart", style: "Muay Femur", wins: 200 }
];

console.log("Fighter Summary Report:", fighterStatsSummary(fighters));
