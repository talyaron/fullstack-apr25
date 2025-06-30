function isPrime(a: number) {
  let prime = true;
  try {
    if (a % 1) {
      throw new Error("not a int");
    }
    if (a < 2) {
      throw new Error("number can't be less than 2");
    }
    if (typeof a != "number") {
      throw new Error("incorrect type");
    }
    
    for (let i = 2; i < a; i++) {
      if (a % i === 0) {
        prime = false;
        return prime;
      }
    }
    return true;
  } catch (e) {
    console.error("error", e);
  }
}

console.log("number:", isPrime(15));
