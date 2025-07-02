function isPrime(a : number):boolean|undefined{
    try{
        if(a <= 1) throw new Error(a + " can't be a prime number, prime number has to be bigger than 1");

        for (let i = 2; i < a; i++) {
            if (a % i === 0) {
                return false; 
            }
        }
        return true; 
        
    } catch (error) {
        console.error("Error:", error);
        return undefined; 
    }
}

console.log("isPrime:", isPrime(7));
console.time("isPrime");
console.log("isPrime (1971):", isPrime(197119711971));
console.timeEnd("isPrime");
console.log("isPrime (0):", isPrime(0));
