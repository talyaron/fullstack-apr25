let x: number = 2;
let isPrimary=false

for (let i=2; i<x; i++) {
    if (x%i === 0) {
        isPrimary=true
    }
}
if (isPrimary===false) {
    console.log(x + " is a primary number")
}
else {
    console.log(x + " is not a primary number")
}