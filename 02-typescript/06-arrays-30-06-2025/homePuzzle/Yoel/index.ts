console.log("Exercise 1");

function NumbersArray(): number[] {
  const numbers: number[] = [10, 20, 30];
  return numbers;
}
console.log(NumbersArray());

console.log("Exercise 2");

function animals(): string {
  const pets: string[] = ["Yoel", "Tomer", "Pita"];
  return pets[1];
}
console.log(animals());

console.log("Exercise 3");

function empty(): string[] {
  const basket: string[] = [];
  basket.push("pizza");
  basket.push("hamburger");
  basket.push("goat-ribs");
  return basket;
}
console.log(empty());
console.log("Exercise 4");

function colors(): number {
  const colorss: string[] = ["red", "blue", "green", "black", "white"];
  return colorss.length;
}
console.log(colors())

console.log("Exercise 5");

function summ():number{
    let multiply:number[] = [5,8,12,15,19]
    let summup:number = 0
    for (let i = 0; i < multiply.length; i++)
        summup = summup+((multiply[i])*2)
    return summup
    
}
console.log(summ())
console.log("Exercise 6");

function whatsapp():any{
    let names:string[] = ["Tomer", "Yoel", "Nadav", "Ori", "Itamar"]
    let search : string = "Ori"
    for (let i = 0; i < names.length; i++)
        if (names[i]===search)
            return i
    return false
       
}

console.log(whatsapp())



console.log("Exercise 6.5(made up question");

function findnumber():number{
    const random_numbers:number[] = [-15,5,7,13,25,2,19,99,51,100]
    let big_number:number = random_numbers[0]
    for (let i=0; i < random_numbers.length; i++)
        if (big_number < random_numbers[i]) {
            big_number = random_numbers[i]}
    return big_number
    
}
console.log (findnumber())

console.log("Exercise 7");

function exercise7():number[]{
    let mpty:number[]=[]
    let random:number = 0
    for (let i = 0; i < 5; i++){
        (random = random+1)
        mpty.push (random)
    }
    return mpty
}
console.log (exercise7())

console.log ("Final Exercise!")

function final():any{
    let random:string[]=["hi", "bye", "cry"]
    random.push ("hello")
    let greet:string = random[0]
    let amount : number = random.length
    for (let i = 0; i < random.length; i++){
        if (random[i] === "byee")
        return i+1}
    return false

    
}

console.log (final())
        



