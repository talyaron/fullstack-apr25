let stopKey: boolean = false;
let people: any = [];
interface Person {
  name: string;
  lastName: string;
  age?: number;
}
while (!stopKey) {
  let name = prompt("Enter your name");
  let lastName = prompt("Enter your last name");
  let age = prompt("Enter your age");
  let place=0;

  for(let key in people){
    
  }

  let shouldStop = confirm(
    "Do you want to stop? (OK to stop, Cancel to continue)"
  );
  if (shouldStop) {
    stopKey = true;
  }
  place++;
  {
    // print in th console a list of persons in the array in the following format:
    // "Name: {name}, Last Name: {lastName}, Age: {age
  }
}
