//Take this code and transform it to a function. Use try-catch to handle errors. think of the edge cases.

for (let num = 2; num <= 20; num++) {
    let isPrime = true; //assume its a prime now

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            isPrime = false; // found a number that divides it -> not prime
        }
    }
    if (isPrime) {
        console.log(num + " is a prime number");
    }
}