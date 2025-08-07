function add(a:number, b:number): number {
  return a + b;
}

//varible that stores the function
const addArrow = (a: number, b: number): number => {
    return a + b;
}
const addArrowShort = (a: number, b: number) => a + b;

console.log(add(1, 2));
console.log(addArrow(1, 2));
console.log(addArrowShort(1, 2));

function double(x: number): number {
    return x * 2;
}
const doubleArrow = (x: number): number => x * 2;

const arr = [1, 2, 3, 4, 5];

const doubledArr = arr.map(double);
const doubledArrArrow = arr.map(doubleArrow);
const doubledArrShort = arr.map(x => x * 2);
console.log(doubledArr);
console.log(doubledArrArrow);
console.log(doubledArrShort);