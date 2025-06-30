

function convert(temprature: number): number {

    return ((temprature * 1.8) + 32);

}

let tzelsius: number = 30;
let ferenhight:number = convert(tzelsius);
console.log(tzelsius + " in ferenhight is " + ferenhight);
console.log(15 + " in ferenhight is " + convert(15));
console.log("0 in ferenhight is " + convert(0));
