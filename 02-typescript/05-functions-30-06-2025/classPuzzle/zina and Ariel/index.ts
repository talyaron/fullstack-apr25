function sss(sd) {
  for (let i = 2; i < sd; i++) {

    let isPrime:Boolean
    
    if (num % i === 0) {
      isPrime = false; 
    }

    if (isPrime) {
    console.log(num + " is a prime number");
}

}
}

function isPrimeTest(num): number|undefined {
  for (let i = 2; i < num; i++){ 

    try {
        if (num % i === 0) throw new Error("Division by zero is not allowed"); 
        }

     catch (fals) {
        console.error("Error:", fals);

        return undefined; // Return undefined if division by zero occurs
    }
}}

console.log(isPrimeTest(15));

