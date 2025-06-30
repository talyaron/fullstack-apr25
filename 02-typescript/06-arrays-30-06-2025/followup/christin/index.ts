let a:number = 60;
let b:boolean = false;
let d:string = "hello";
let n:null = null;
let y: undefined = undefined;

let myData:any[] = [2,"yes",false,null,undefined,60,true];
console.log(myData);
console.log(myData[5]);
console.log(myData[0]);

let myNumbers: number[] = [1,5,7,9,0,3];
let myStrings: string[] = ["yes","no", "maybe"];
let myBooleans: boolean[] = [false,true,true,false];

myNumbers.push(8);
console.log(myNumbers);