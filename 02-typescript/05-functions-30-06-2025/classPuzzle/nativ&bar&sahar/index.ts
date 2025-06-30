function isPrime(a: number) {
  let i = 2;
  let prime = true;
  try {
    if (a<2){
      throw new Error("number can't be less than 2")
    }
    else if (a % i === 0) {
      prime = false; 
      return "not prime" 
    }
  } catch (e) {
    console.error("error", e);
  }
  if(prime) return "is prime"

}

console.log("number:", isPrime(1))
