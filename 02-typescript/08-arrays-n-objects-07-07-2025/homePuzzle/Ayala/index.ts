console.log("🟢 LEVEL 1: Super Easy Functions");

console.log("Exercise 1.1: Simple array function");

function getArrayLength(arr: any[]): number {
    // Return the length of the array
    return arr.length;
}

// Test it:
console.log("Length of [1,2,3]:", getArrayLength([1, 2, 3])); // Should be 3

console.log("Exercise 1.2: Simple object function");


function getPersonName(person: { name: string, age: number }): string {
    return person["name"];
}

// Test it:
let testPerson = { name: "Alice", age: 25 };
console.log("Person's name:", getPersonName(testPerson)); // Should be "Alice"

console.log("Exercise 1.3: Simple loop function");
function printNumbers(n: number): void {
    let result: Array<number> = [];
    for (let i: number = 1; i <= n; i++) {
        result.push(i)
    }
    console.log(result.join(","));
}

// Test it:
console.log("Numbers 1 to 5:");
printNumbers(5); // Should print 1, 2, 3, 4, 5

console.log("🟡 LEVEL 2: Easy Functions");
console.log("Exercise 2.1: Sum array elements");

function sumArray(numbers: number[]): number {
    let sum = 0;
    numbers.forEach(x => sum += x)
    return sum;
}

// Test it:
console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4])); // Should be 10
console.log("Exercise 2.2: Count objects in array");

function countPeople(people: { name: string, age: number }[]): number {

    return people.length;
}

// Test it:
let people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 85 },
    { name: "Eli", age: 8 }

];
console.log("Number of people:", countPeople(people)); // Should be 3

console.log('Exercise 2.3: Find largest number');

function findLargest(numbers: number[]): number {
    let biggest = 0
    for (let x of numbers) {
        if (x > biggest) biggest = x
    }
    return biggest;
}
//test it
console.log("Largest in [5,2,9,1]:", findLargest([5, 2, 9, 1])); // Should be 9

console.log("🟠 LEVEL 3: Medium Functions");
console.log("Exercise 3.1: Filter array by condition");

function getEvenNumbers(numbers: number[]): number[] {
    // Use a loop to collect only even numbers
    let evens: number[] = []//numbers.filter(x=>x%2===0);
    for (let x of numbers)
        if (x % 2 === 0) {
            evens.push(x)
        }
    return evens;
}

// Test it:
console.log("Even numbers from [1,2,3,4,5,6]:", getEvenNumbers([1, 2, 3, 4, 5, 6]));
// Should be [2, 4, 6]

console.log('Exercise 3.2: Find person by name');

function findPersonByName(people: { name: string, age: number }[], searchName: string): { name: string, age: number } | null {
    for (let person of people) {
        if (person.name === searchName) return person;
    }
    return null;
}

// Test it:
console.log("Find Bob:", findPersonByName(people, "Bob")); // Should return Bob's object


console.log("Exercise 3.3: Create array of squares");
function getSquares(numbers: number[]): number[] {
    // Return a new array where each number is squared
    let squares: number[] = numbers.map(x => x ** 2)
    // Your code here
    return squares;
}

// Test it:
console.log("Squares of [1,2,3,4]:", getSquares([1, 2, 3, 4])); // Should be [1, 4, 9, 16]

console.log("🔴 LEVEL 4: Challenging Functions");
console.log("Exercise 4.1: Group people by age range");

function groupByAge(people: { name: string, age: number }[]): {
    young: { name: string, age: number }[],
    older: { name: string, age: number }[]
} {
    let result = {
        young: [] as { name: string, age: number }[],
        older: [] as { name: string, age: number }[]
    };
    for (let person of people) {
        if (person.age < 30) {
            result.young.push(person)
        }
        else {
            result.older.push(person)
        }
    }
    // Use a loop to categorize each person
    // Add to "young" if age < 30, "older" if age >= 30

    return result;
}

// Test it:
console.log("Grouped by age:", groupByAge(people));

console.log("Exercise 4.2: Calculate object properties");
function calculateAverageAge(people: { name: string, age: number }[]): number {
    if (people.length === 0) {
        return 0;
    }
    let sum = people.reduce((sum, person) => { return sum + person.age }, 0)
    console.log(people);
    return sum / people.length;

}

// Test it:
console.log("Average age:", calculateAverageAge(people));
console.log("Exercise 4.3: Transform objects");

function addAgeCategory(people: { name: string, age: number }[]): {
    name: string,
    age: number,
    category: string
}[] {
    let result: { name: string, age: number, category: string }[] = people.map(person => {
        let category: string;
        if (person.age < 18) {
            category = "child"

        }
        else if (person.age < 65) {
            category = "adult"

        }
        else {
            category = "senior"

        }
        return {
            ...person,
            category: category
        };
    });




    // For each person, add a "category" property:
    // "child" if age < 18
    // "adult" if age 18-64
    // "senior" if age 65+

    return result;
}

// Test it:

console.log("People with categories:", addAgeCategory(people));

console.log("🔥 LEVEL 5: Advanced Functions");
console.log("Exercise 5.1: Complex object manipulation");

function getSortedNames(people: { name: string, age: number }[]): string[] {
    people.sort((a, b) => a.age - b.age)


    let names: Array<string> = []
    for (let person of people) {
        names.push(person.name)
    }
    return names;
}

// Test it:
console.log("Names sorted by age:", getSortedNames(people));

console.log("Exercise 5.2: Multi-condition filtering");
function findPeopleByMultipleCriteria(
    people: { name: string, age: number, city?: string }[],
    minAge: number,
    maxAge: number,
    city?: string
): { name: string, age: number, city?: string }[] {
    let matches: { name: string, age: number, city?: string }[] = [];
    for (let person of people) {
        if (person.age >= minAge && person.age <= maxAge) {
            if (!city) matches.push(person)
            else if (person.city === city) matches.push(person)
        }

    }
    // Find people who:
    // - Are between minAge and maxAge (inclusive)
    // - Live in the specified city (if city is provided)

    return matches;
}

// Test data with cities:
let peopleWithCities = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Noam", age: 8, city: "New York" },
    { name: "Bob", age: 30, city: "London" },
    { name: "Charlie", age: 35, city: "New York" },
    { name: "Diana", age: 70, city: "Paris" }
];

// Test it:
console.log("People 25-32 in New York:",
    findPeopleByMultipleCriteria(peopleWithCities, 25, 32, "New York"));
// function ageRange(age: number): string | undefined {
//     if (age < 18) return "young"
//     if (age >= 18 && age < 65) return "adult"
//     if (age >= 65) return "senior"
//     return undefined
// }

console.log("Exercise 5.3: Data aggregation");
function createPeopleReport(people: { name: string, age: number, city?: string }[]): {
    totalPeople: number,
    averageAge: number,
    ageRanges: {
        children: number,
        adults: number,
        seniors: number
    },
    cities: { [cityName: string]: number }
} {
    let report = {
        totalPeople: people.length,
        averageAge: calculateAverageAge(people),// (people.reduce(((sum,person)=>sum+person.age),0))/people.length,
        ageRanges: {
            children: 0,  // under 18
            adults: 0,    // 18-64
            seniors: 0    // 65+
        },
        cities: {} as { [cityName: string]: number }
    };
    for (let person of people) {
        if (person.age < 18) report.ageRanges.children++
        if (person.age >= 18 && person.age < 65) report.ageRanges.adults++
        if (person.age >= 65) report.ageRanges.seniors++

    }
    for (let person of people) {
        if (person.city) {
            if (person.city in report.cities) report.cities[person.city]++
            else report.cities[person.city] = 1;
        }
    }
    return report;
}

// Test it:
console.log("People report:", createPeopleReport(peopleWithCities));

console.log("💀 LEVEL 6: Expert Functions");
console.log("Exercise 6.1: Advanced sorting with multiple criteria");
function advancedSort(people: { name: string, age: number, salary?: number }[]): {
    name: string,
    age: number,
    salary?: number
}[] {
    // Sort people by:
    // 1. First by salary (highest first)
    // 2. If salaries are equal, then by age (youngest first)
    // 3. If both salary and age are equal, then by name (alphabetically)

    let sorted = [...people]; // Create a copy
    // for (const person of sorted) {
    //     if (typeof person.salary != "number") person.salary = 0
    // }
    sorted.sort((a, b) => ((b.salary ?? 0) - (a.salary ?? 0)) || (a.age - b.age) || a.name.localeCompare(b.name))
    //sorting the array by prioreties (by order),
    //  first by sal , because its optionaly-??-checks if the value is undefined or null-compare to 0
    //  second by age- compare the two val 
    //  lastly by name- compare the tow val and sort by the Abc 
    return sorted;
}

// Test data:
let employeesData = [
    { name: "Gil", age: 20, salary: 50000 },
    { name: "Alice", age: 20, salary: 50000 },
    { name: "Bob", age: 30, salary: 60000 },
    { name: "Charlie", age: 25, salary: 50000 },
    { name: "Diana", age: 21, salary: 70000 }
];
// Test it:
console.log("Advanced sorted:", advancedSort(employeesData));

////////////////////////////////////////////////
console.log("Exercise 6.2: Complex data transformation");

function analyzeTeamPerformance(teams: {
    name: string,
    members: {name: string, score: number}[]
}[]): {
    teamName: string,
    averageScore: number,
    topMember: {name: string, score: number},
    memberCount: number
}[] {
    let analysis: {
        teamName: string,
        averageScore: number,
        topMember: {name: string, score: number},
        memberCount: number
    }[] = [];
    for (const team of analysis) {
        
    }
    // For each team:
    // 1. Calculate average score of all members
    // 2. Find the member with highest score
    // 3. Count total members
    // 4. Return analysis for all teams
    
    return analysis;
}

// Test data:
let teamsData = [
    {
        name: "Alpha Team",
        members: [
            {name: "John", score: 85},
            {name: "Sarah", score: 92},
            {name: "Mike", score: 78}
        ]
    },
    {
        name: "Beta Team",
        members: [
            {name: "Lisa", score: 88},
            {name: "Tom", score: 95},
            {name: "Emma", score: 82}
        ]
    }
];

// Test it:
console.log("Team analysis:", analyzeTeamPerformance(teamsData));





