let isPrimary=true

function itsPrime(a: number): string|undefined{
    try {
    if( a <= 1) throw new Error(a+" is not a primary number");
    for (let i=2; i<a; i++) {
        if (a%i === 0) {
            isPrimary=false
        }
    }
    if (isPrimary===true) {
    return (a + " is a primary number");
    }
    else {
    return (a + " is not a primary number");
    }
    }
    catch (e) {
        console.error("Error:", e);
        return undefined;
    }
    }

console.log(itsPrime(5));
console.log(itsPrime(10));
console.log(itsPrime(-1));