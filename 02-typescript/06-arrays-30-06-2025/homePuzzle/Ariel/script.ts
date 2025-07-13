// 1
function createArrayNumbers() {
  const numbersCollenctions: Array <number> = [10, 20, 30]
  
  return numbersCollenctions
}

console.log(createArrayNumbers());

// 2
function animalsArray() {
  const animalsStorage: Array<string> = [`cat`, `dog`, `bird`, `fish`]

  return animalsStorage[1]
}

console.log(animalsArray());

// 3
function favoriteFoods() {
  const foodsCollection: Array<string> = []

  foodsCollection.push(`salad`)
  foodsCollection.push(`chiken`)
  foodsCollection.push(`rice`)

  return foodsCollection
}

console.log(favoriteFoods());

// 4
function colorsStorage() {
  const colorCollection: Array<string> = ["red", "blue", "green", "yellow", "orange"]

  colorCollection.push(`purple`)

  return colorCollection.length
}

console.log(colorsStorage());

// 5
function numbersCheck() {
  const numberCollection: Array<number> = [1, 4, 24, 75]
  const numberResults: Array<number> = []
  for (let i = 0; i < numberCollection.length; i++){
    const sum = numberCollection[i] + 5
    numberResults.push(sum)
  }
  return numberResults
}

console.log(numbersCheck());

// 6
let searchFor: string = prompt(`Look for anybody? search any name...`) || ``; 
let tester = false

function NamesStorage() {
  const namesCollection: Array<string> = [`Ariel`, `Ofir`, `Shimshon`, `Youvi`, `Peretz`, `Sasson`]


  try{
    if (searchFor === ``) throw new Error("Hi! Give me any name, don't be ashmed :)");
    
    for (let i = 0; i < namesCollection.length; i++) {
    if(namesCollection[i] === searchFor) {
      tester = true; 
       alert(`Gotcha! ${searchFor} is here!`);
      break;
    }
  } 

  if (!tester) alert(`not found!`)
  }
  catch (error) {
    alert(error)
  }
}

NamesStorage()

// Was an attempt, work but not as i wish it wroked:

// let searchFor: string = prompt(`Look for anybody? search any name...`) || ``; 
// let tester = false

// function NamesStorage() {
//   const namesCollection: Array<string> = [`Ariel`, `Ofir`, `Shimshon`, `Youvi`, `Peretz`, `Sasson`]


//   for (let i = 0; i < namesCollection.length; i++) {
//     if(namesCollection[i] === searchFor) tester = true
//     else tester = false
//   } 

//   if (tester) alert(`Gotcha! ${searchFor} is here!`);
//   else alert(`not found!`);  
// }

// NamesStorage()

// 7
function arrayBuilder() {
  let arrayBuilding: Array<number> = []
  
  for (let i = 1; i < 6; i++) {
    arrayBuilding.push(i)

    console.log(arrayBuilding);
  }
}

arrayBuilder()

// All together
let allItemesArray: Array<any> = [`Ariel`, 24, `chiken`]

let moreUserItems: any = prompt(`Give me any hobby or food, any number to push to our array...`)
let moreUserItems2: any = prompt(`1 more pls`)

function allItems() {
  allItemesArray.push(moreUserItems)
  allItemesArray.push(moreUserItems2)
  console.log(`Item #2 is ${allItemesArray[2]}. Length now is ${allItemesArray.length}.`);
    
  for (let i = 0; i < allItemesArray.length; i++) {
    console.log(`Position ${i} containes: ${allItemesArray[i]}.`);   
  }
}

allItems()