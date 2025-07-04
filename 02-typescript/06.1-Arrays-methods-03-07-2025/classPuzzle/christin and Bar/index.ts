let numbers:Array<number> = [30, 50, 60 , 80];

let indexNumber:number = numbers.indexOf(60);//returns its index (position in the array).
console.log(indexNumber);

let indexNumber:number = numbers.fill(0,1,3);//replaces all elements in an array with a static value.
console.log(indexNumber);

let indexNumber:number = numbers.push(100,55);//adds one or more elements to the end of an array and returns the new length.
console.log(indexNumber);

let indexNumber:number = numbers.length;// tells you how many elements are in an array.
console.log(indexNumber);

let indexNumber:number = numbers.pop();//removes the last element from an array and returns that element.
console.log(indexNumber);

console.log(numbers);