//1.1 Simple array function//
function getArrayLength(arr: any[]): number {
    let z:number;
    z = arr.length;
    return z;
}
console.log("Length of [1,2,3,4]:", getArrayLength([1, 2, 3, 4])); // Should be 3

//1.2 Simple object funcyion//
function getPersonName(person: {name: string, age: number}): string {
    let z:string;
    z = person.name;
    return z;
}
let testPerson = {name: "Alice", age: 25};
console.log("Person's name:", getPersonName(testPerson));

//1.3 Simple loop function//
function printNumbers(n: number): void {
    let ascNumbers: number[] =[];
    for (let i=1; i <= n; i++){
        ascNumbers.push(i);
        }
    console.log(ascNumbers);
}
console.log("Numbers 1 to 5:");
printNumbers(5);

//2.1 Sum Array Elements//
function sumArray(numbers: number[]): number {
    let sum = 0;
    for (let i = 0 ; numbers[i]; i++){
        sum = sum + numbers[i];
    }
    return sum;
}
console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4]));

//2.2 Count objects in array//
function countPeople(people: {name: string, age: number}[]): number {
    return people.length;
}

let people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 35}
];
console.log("Number of people:", countPeople(people));

//2.3 Find largest number//
function findLargest(numbers: number[]): number {
    numbers.sort(function(a, b){return b-a});
    return numbers[0];
}
console.log("Largest in [5,2,9,1]:", findLargest([5, 2, 9, 1]));

//3.1 Filter array by condition//
function getEvenNumbers(numbers: number[]): number[] {
    let evens: number[] = [];
    for (let i = 0; i < numbers.length; i++){
        if (numbers[i] % 2 ===0 ) {
        evens.push(numbers[i]);
        }
    }
    return evens;
}
console.log("Even numbers from [1,2,3,4,5,6]:", getEvenNumbers([1, 2, 3, 4, 5, 6])); 

//3.2 Find person by name//
function findPersonByName(
    people: {name: string, age: number}[], 
    searchName: string
): {name: string, age: number} | null {
    for (let i = 0; people.length; i++){
        if (people[i].name === searchName){
            return people[i];
        }
    }
    return null;
}
console.log("Find Bob:", findPersonByName(people, "Bob"));

//3.3 Create array of squares//
function getSquares(numbers: number[]): number[] {
    let squares: number[] = [];
    for (let i = 0; i < numbers.length; i++){
        squares[i] = numbers[i] * numbers[i];
    }
    return squares;
}
console.log("Squares of [1,2,3,4]:", getSquares([1, 2, 3, 4]));

//4.1 Group people by age range//
function groupByAge(people: {name: string, age: number}[]): {
    young: {name: string, age: number}[], 
    older: {name: string, age: number}[]
} {
    let result = {
        young: [] as {name: string, age: number}[],
        older: [] as {name: string, age: number}[]
    };
    for (let i = 0 ; i < people.length; i++){
        if (people[i].age <30){
            result.young.push(people[i]);
        }
        else {
            result.older.push(people[i]);
        }
    }
    return result;
}
let people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 35}
];
console.log("Grouped by age:", groupByAge(people));

//4.2 Calculate object properties//
function calculateAverageAge(people: {name: string, age: number}[]): number {
    let sum: number = 0;
    if (people.length===0){
        return 0;
    }
    for (let i=0; i < people.length; i++) {
        sum += people[i].age;
    }
    return sum/people.length;
}
let people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 20}
];
console.log("Average age:", calculateAverageAge(people));

//4.3 Transform objects//
function addAgeCategory(people: {name: string, age: number}[]): {
    name: string, 
    age: number, 
    category: string
}[] {
    let result: {name: string, age: number, category: string}[] = [];
    for (let i = 0 ; i < people.length; i++){
        let category= "";
        if (people[i].age <18){
            category = "child";
        }
        else if (people[i].age >65){
            category = "senior";
        }
        else {
            category = "adult";
        }
        result.push({
            name: people[i].name,
            age: people[i].age,
            category: category
        });
    }
    return result;
}
let people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 20}
    {name: "Mira", age: 8}
    {name: "Nuha", age: 67}
];
console.log("People with categories:",addAgeCategory(people));

//5.1 Complex object manipulation//
function getSortedNames(people: {name: string, age: number}[]): string[] {
    people.sort(function(a, b){return a.age-b.age});
    let names = people.map(person => person.name);
    return names;
}
let people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 20}
    {name: "Mira", age: 8}
    {name: "Nuha", age: 67}
];
console.log("Names sorted by age:", getSortedNames(people));

//5.2: Multi-condition filtering//
function findPeopleByMultipleCriteria(
    people: {name: string, age: number, city?: string}[], 
    minAge: number, 
    maxAge: number, 
    city?: string
): {name: string, age: number, city?: string}[] {
    let matches: {name: string, age: number, city?: string}[] = [];
    for (let i = 0; i < people.length; i++) {
        let person = people[i];
        let isInAgeRange = person.age => minAge && person.age =< maxAge;
        let isInCity = city ? person.city === city : true;

        if (isInAgeRange && isInCity) {
            matches.push(person);
        }
    }
    return matches;
}
let peopleWithCities = [
    {name: "Alice", age: 25, city: "New York"},
    {name: "Bob", age: 30, city: "London"},
    {name: "Charlie", age: 35, city: "New York"},
    {name: "Diana", age: 28, city: "Paris"}
];
console.log("People 25-32 in New York:", 
    findPeopleByMultipleCriteria(peopleWithCities, 25, 32, "New York"));

//5.3 data aggregation//
function createPeopleReport(people: {name: string, age: number, city?: string}[]): {
    totalPeople: number,
    averageAge: number,
    ageRanges: {
        children: number,
        adults: number,
        seniors: number
    },
    cities: {[cityName: string]: number}
} {
    let report = {
        totalPeople: 0,
        averageAge: 0,
        ageRanges: {
            children: 0,  // under 18
            adults: 0,    // 18-64
            seniors: 0    // 65+
        },
        cities: {} as {[cityName: string]: number}
    };
    for (let i = 0; i < )
    // Calculate all the statistics using loops
    // Count people in each age range
    // Count people in each city
    // Calculate average age
    
    return report;
}

// Test it:
console.log("People report:", createPeopleReport(peopleWithCities));
