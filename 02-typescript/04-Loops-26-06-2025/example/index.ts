//Loops
for (let i = 0; i < 5; i++) { //code block
    // This loop will run 5 times, with i taking values from 0 to 4
    console.log(i);
}
// for --> the word for loop
// i --> the variable that will be used to count
// 0 --> the initial value of the variable i
// i < 5 --> the condition that will be checked before each iteration
// i++ --> the increment operator that will increase the value of i by 1 after each iteration
// i < 5 --> the condition that will be checked before each iteration

// use a loop from 1 to 10 and tell if the number is even or odd
for (let i = 1; i <= 10; i++) {
    if(i%2 === 0) {
        console.log(i + " is even");
    } else {
        console.log(i + " is odd");
    }
}