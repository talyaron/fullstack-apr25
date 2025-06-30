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