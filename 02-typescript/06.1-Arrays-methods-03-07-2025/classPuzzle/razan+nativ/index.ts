let names : string[] = ["Razan", "Nativ", "Ariel", "Zeina","Valerya"];
//added course mate
names.splice(2,0,"Yoel");
console.log(names);
//added fake course mate
names.splice(0,0,"Hanit");
console.log(names);
//removed fake course mate, and added teacher
names.splice(0,1,"Tal");
console.log(names);
//splitted teacher from students
let teacher = names.shift();
console.log(teacher);
console.log(names);