// Step 1: Arrays (Quick Practice)
let foods: string [] = ["Pizza", "Sushi", "Tacos", "Pasta"];
console.log(foods);
console.log(foods[0]);
console.log(foods[foods.length - 1]);

//Step 2: Useful Array Methods
//push() - add item to the end
let fruits = ["Apple", "Banana"];
fruits.push ("Mango");
console.log(fruits);

//pop() - remove last item
fruits.pop();
console.log(fruits);

//shift() - remove first item
fruits.shift();
console.log(fruits);

//unshift() - add item to the start
fruits.unshift("Orange");
console.log(fruits);

//includes() - check if an item exists
console.log(fruits.includes("Banana"));
console.log(fruits.includes("Pineapple"));

//indexOf() - get the position of an item
let index = fruits.indexOf("Banana");
console.log(index);

let animals = ["Lion", "Tiger", "Wolf", "Fox", "Eagle"];
console.log(animals);

// Step 3: Looping Through Arrays
let colors = ["Red", "Green", "Blue"];

for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

//related exrecise:
let songs = ["non serviam", "nemesis", "isa"];
for (let i = 0; i < songs.length; i++) {
    console.log(songs[i]);
}

//Step 4: Using .forEach() with Arrays
let movies = ["Barbie", "Inception", "Kill Bill", "Middsomar"];

movies.forEach(function(movie) {
    console.log(movie);
});

//Step 5: .map() — Transforming Arrays
let movies = ["Barbie", "Inception", "Kill Bill"];
let uppercasedMovies = movies.map((movie) => {
    return movie.toUpperCase();
});

console.log(uppercasedMovies);

//related exrecise:
let scores = [85, 92, 78, 100];
let formattedScores = scores.map((score) => {
    return "Score: " + score;
});
console.log(formattedScores);

//Challenge: Step 6 – Real-World Data Validation
function validateUser(name: any, age: any): string {
    try {
        if (typeof name !== "string" || name.trim () === "") {
            throw new Error("Name must be a non-empty string.");
        }

        if (typeof age !== "string" || age.trim === "") {
            throw new Error("Age must be a number between 0 and 150");
        }
        return `Welcome, ${name}! Your age is ${age}.`;
    } catch (error) {
        return (error as Error).message;
    }
}

console.log(validateUser("Bar", 26));         // ✅ valid
console.log(validateUser("   ", 30));         // ❌ Name error
console.log(validateUser("Bar", "twenty"));   // ❌ Age error
console.log(validateUser("John", 300));       // ❌ Age error