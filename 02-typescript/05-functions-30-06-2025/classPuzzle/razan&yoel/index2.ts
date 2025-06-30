//Take this code and transform it to a function. Use try-catch to handle errors. think of the edge cases.


let num = 17; //number to check for primality

let isPrime = true; //assume its a prime now




function isPrimary(a:number):number|string{

    for (let i = 2; i < a; i++) {
    if (a % i === 0) {
        isPrime = false; // found a number that divides it -> not prime
    }
}
if (isPrime) {
    console.log(a + " is a prime number");
    return a
}
 return "The requested number is not a prime number."
}

console.log(isPrimary(4));