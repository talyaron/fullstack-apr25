function isPrime(a: number): boolean | undefined
{
  try {
    if (typeof a !== "number") throw new Error("Input must be a number");
    let prime:boolean = true; //assume its a prime now

    for (let i = 2; i < a; i++) {
      if (a % i === 0) {
        prime = false; // found a number that divides it -> not prime
      }
    }

    return prime;
  } catch (e) {
    console.error("Error:", e);

    return undefined;
  }
}

console.log("is prime:", isPrime(7)); // Output: is prime: true
console.log("is prime:", isPrime(10)); // Output: is prime: false
console.log("is prime:", isPrime(25)); // Output: is prime: false
