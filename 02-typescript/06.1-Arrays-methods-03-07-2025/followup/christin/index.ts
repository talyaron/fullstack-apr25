let people:Array<string> = ["christin", "caroline", "Rima"];

let namePeople:string = people.join("-");
console.log(namePeople);

let nameCategories : Array<string> = namePeople.split("-");
console.log(nameCategories);

let people2: Array<string> = people.splice(2,0,"nadin"); 
console.log(people2);
console.log(people);
