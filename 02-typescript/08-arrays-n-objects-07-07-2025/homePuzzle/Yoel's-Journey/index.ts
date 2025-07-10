console.log("~~~~~~~~~~~~~Exercise 1.1 ~~~~~~~~~~~~~");

function getArrayLengthany(): number {
  let randomArray: string[] = ["hi", "bi,", "random"];

  return randomArray.length;
}
console.log(getArrayLengthany());

console.log("~~~~~~~~~~Exercise 1.2~~~~~~~~~~");

function getPersonName(person: { name: string; age: number }): string {
  // Return the person's name
  return person.name;
}
let PersonName = { name: "Yoel", age: 25 };
console.log(getPersonName(PersonName));

console.log("~~~~~~~~~~~~~Exercise 1.3 ~~~~~~~~~~~~~");

function printNumbers(n: number): number {
  // Use a for loop to print 1, 2, 3, ... up to n
  for (let index = 0; index < n; index++) {
    console.log(index);
  }
  return n;
}

let printALot: number = 15;
console.log(printNumbers(printALot));

console.log("~~~~~~~~~~~~~Exercise 2.1 ~~~~~~~~~~~~~");

function sumArray(numbers: number[]): number {
  // Use a loop to add all numbers together
  let sum: number = 0;
  for (let index = 0; index <= numbers.length; index++) {
    sum += index;
  }
  return sum;
}
let combine: number[] = [1, 2, 3, 4, 5];

console.log(sumArray(combine));

console.log("~~~~~~~~~~~~~Exercise 2.2 ~~~~~~~~~~~~~");

function countPeople(people: { name: string; age: number }[]): number {
  // Return the number of people in the array
  // - option to count by names:  let countNames = people.filter( i => i.name).length
  return people.length;
}
let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
    { name: "Derek", age: 17 },
  { name: "Erin", age: 68 },
  { name: "Freak", age: 65 },
];
console.log("Number of people:", countPeople(people)); 


console.log("~~~~~~~~~~~~~Exercise 2.3 ~~~~~~~~~~~~~");

function findLargest(numbers: number[]): number {

  let bigNumber = numbers[0];
  for (let index = 0; index <= numbers.length; index++) {
    if (bigNumber < numbers[index]) bigNumber = numbers[index];
  }
  return bigNumber;
}


console.log("Largest in [5,2,9,1]:", findLargest([5, 2, 9, 1, 15, 92, 51]));

console.log("~~~~~~~~~~~~~Exercise 3.1 ~~~~~~~~~~~~~");

function getEvenNumbers(numbers: number[]): number[] {

  let evenNumbers: number[] = [];
  for (let index = 0; index < numbers.length; index++) {
    if (numbers[index] % 2 === 0) evenNumbers.push(numbers[index]);
  }
  return evenNumbers;
}
console.log(
  "Even numbers from [1,2,3,4,5,6]:",
  getEvenNumbers([1, 2, 3, 4, 5, 6])
);

console.log("~~~~~~~~~~~~~Exercise 3.2 ~~~~~~~~~~~~~");

function findPersonByName(
  people: { name: string; age: number }[],
  searchName: string
): { name: string; age: number } | null {
  for (let index = 0; index < people.length; index++) {
    if (searchName === people[index].name) return people[index];
  }

  return null;
}
console.log("Find Bob:", findPersonByName(people, "Bob")); 
console.log("~~~~~~~~~~~~~Exercise 3.3 ~~~~~~~~~~~~~");

function getSquares(numbers: number[]): number[] {
 
  let squares: number[] = [];

  for (let i = 0; i < numbers.length; i++) {
    squares[i] = numbers[i] ** 2;
  }
  return squares;
}



console.log("~~~~~~~~~~~~~Exercise 4.1 ~~~~~~~~~~~~~");

function groupByAge(people: { name: string; age: number }[]): {
  young: { name: string; age: number }[];
  older: { name: string; age: number }[];
} {
  let result = {
    young: [] as { name: string; age: number }[],
    older: [] as { name: string; age: number }[],
  };


  for (let index = 0; index < people.length; index++) {
    if (people[index].age >= 30) result.older.push(people[index]);
    else {
      result.young.push(people[index]);
    }
  }

  return result;
}

console.log("Grouped by age:", groupByAge(people));

console.log("~~~~~~~~~~~~~Exercise 4.2 ~~~~~~~~~~~~~");

function calculateAverageAge(people: { name: string; age: number }[]): number {

  let sum: number = 0;
  for (let index = 0; index < people.length; index++) {
    sum += people[index].age;
  }
  sum = sum / people.length;
  if (sum >= 0) return sum;
  else {
    return 0;
  }
}

// Test it:
console.log("Average age:", calculateAverageAge(people));



console.log("~~~~~~~~~~~~~Exercise 4.3 ~~~~~~~~~~~~~");

function addAgeCategory(people: {name: string, age: number}[]): {
    name: string, 
    age: number, 
    category: string
}[] {
    
    let result: {name: string, age: number, category: string}[] = [];
    for (let index = 0; index < people.length; index++) {
        let person = people[index]
        let category = "";

        if (person.age < 18){
            category = "child"
        }
        else if (person.age >= 65){
            category = "senior"
        }
        else
            category = "adult"
        
        result.push({
            name : person.name,
            age : person.age,
            category: category,
        })
    }

    
    return result;
    }

// Test it:
console.log("People with categories:", addAgeCategory(people));



console.log("~~~~~~~~~~~~~Exercise Level 5.1 🔥  ~~~~~~~~~~~~~");

function getSortedNames(people: {name: string, age: number}[]): string[] {
    let ageSorted = people.sort((a, b) => a.age - b.age);
    let Names : string[]= ageSorted.map(person => person.name)
        
    return Names;
}

// Test it:
console.log("Names sorted by age:", getSortedNames(people));



console.log("~~~~~~~~~~~~~Exercise 5.2 ~~~~~~~~~~~~~");

function findPeopleByMultipleCriteria(
    people: {name: string, age: number, city?: string}[], 
    minAge: number, 
    maxAge: number, 
    city?: string
): {name: string, age: number, city?: string}[] {
    let betweenAge = people.filter(person =>
         person.age >= minAge &&
          person.age <= maxAge && 
          city ? person.city === city:true )


    // Find people who:
    // - Are between minAge and maxAge (inclusive)
    // - Live in the specified city (if city is provided)
    
    return betweenAge;
}

// Test data with cities:
let peopleWithCities = [
    {name: "Alice", age: 25, city: "New York"},
    {name: "Bob", age: 30, city: "London"},
    {name: "Charlie", age: 35, city: "New York"},
    {name: "Diana", age: 28, city: "Paris"}
];

console.log("People 25-32 in New York:", 
    findPeopleByMultipleCriteria(peopleWithCities, 25, 32, "New York"));


console.log("~~~~~~~~~~~~~Exercise 5.3 ~~~~~~~~~~~~~");

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
    report.totalPeople = people.length

     let sumAge : number = 0;
     
     
    for (let i = 0; i < people.length; i++) {    
      const person = people[i]   
      sumAge += (person.age)
        
       if (person.city) {
            if (report.cities[person.city]) {
                report.cities[person.city]++;
            } else {
                report.cities[person.city] = 1;
            }
      }

      if (person.age < 18)
        report.ageRanges.children++;

      else if (person.age >= 65)
        report.ageRanges.seniors++
      
      else
      report.ageRanges.adults++


    }
    
    report.averageAge = sumAge/people.length
    

    
    

    // Calculate all the statistics using loops
    // Count people in each age range
    // Count people in each city
    // Calculate average age
    
    return report;
}

// Test it:
console.log("People report:", createPeopleReport(peopleWithCities));

console.log("~~~~~~~~~~~~~Exercise ~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~Exercise ~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~Exercise ~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~Exercise ~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~Exercise ~~~~~~~~~~~~~");
