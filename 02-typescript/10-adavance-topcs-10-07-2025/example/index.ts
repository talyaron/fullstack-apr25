// let /const

let x: number = 10;

x= 50;

const y = 10;
y = 20; // Error: Cannot assign to 'y' because it is a constant.
y++;

const arr = [1, 2, 3, 4, 5];
arr.push(6); 

arr = [1, 2, 3]; // not allowed, arr is a constant reference

const obj = { name: "Alice", age: 25 };
obj.age = 26; // Allowed, we can modify properties of a constant object
obj = { name: "Bob", age: 30 }; // Error: Cannot assign to


// scope