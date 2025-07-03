function madeArry() {
  let first_number = 5;
  let secont_number = 8;
  let third_number = 14;
  let threeArry: any = [first_number, secont_number, third_number];
  return threeArry;
}
console.log(madeArry());

function animalArry() {
  let first_animal = "moneky";
  let secont_animal = "dog";
  let third_animal = "car";
  let fourst_animal = "lizard";

  let threeArry: any = [
    first_animal,
    secont_animal,
    third_animal,
    fourst_animal,
  ];
  return threeArry[1];
}
console.log(animalArry());

function pushArry() {
  let emptyArry: any = [];
  emptyArry.push(0);
  emptyArry.push(1);
  emptyArry.push(2);
  emptyArry.push(3);

  return emptyArry;
}
console.log(pushArry());

function colorArry() {
  let colors: any = [];
  colors.push("blue");
  colors.push("red");
  colors.push("green");
  colors.push("white");
  colors.push("black");

  return colors.length;
}
console.log(colorArry());

function forArry() {
  let randomNumber: any = [2, 54, 32, 8];
  for (let i = 0; i < randomNumber.length; i++) {
    randomNumber[i] = randomNumber[i] + 5;
  }
  return randomNumber;
}
console.log(forArry());

function findName(name) {
  let namesArry: any = ["dan", "adam", "shon", "dina"];
  for (let i = 0; i < namesArry.length; i++) {
    if (namesArry[i] == name) return true;
  }
  return false;
}
console.log(findName("shon"));

function addNumbers() {
  let numbersArry: any = [];
  let number = 1;
  for (let i = 0; i < 5; i++) {
    let x = numbersArry.push(number);
    number++;
  }
  return numbersArry;
}
console.log(addNumbers());

function finalEx(finalnumber) {
  let count = 0;
  let number = 2;
  let finalArry: any = [];
  for (let i = 0; i < 10; i++) {
    finalArry.push(number);
    count ++;
    console.log(`position number ${i} value -->`+finalArry[i])
    number=number ** 2;
  }
  console.log(" arry position 2-->"+finalArry[2])
  console.log(" arry length is-->"+count)
  for (let i = 0; i < finalArry.length; i++) {
    if (finalnumber == finalArry[i]) return true;
  }
  return false;
}

console.log(finalEx(5));
