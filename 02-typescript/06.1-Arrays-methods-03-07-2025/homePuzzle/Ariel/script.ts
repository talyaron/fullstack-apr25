// // 1
// let basicCart: Array<string> = ["bread", "eggs", "cheese"]

// function manageShoppingList(a: Array<string>) {
//   a.push(`milk`)
//   a.pop()
//   return a.length
// }

// console.log(manageShoppingList(basicCart));

// //2 
// const fruitsCart: Array<string> = ["apple", "banana", "orange"];
// const fruitExistTest: string = `banana`;
// const fruitNotExitTest: string = `water melon`;

// function checkInventory(array: Array<string>, checkExisting: string) {
//   try {
//     if (!array || !checkExisting || typeof checkExisting !== `string`) throw new Error("Invalid input!");

//     if (array.includes(checkExisting)){
//       return console.log(`${checkExisting} is exist! On ${array.indexOf(checkExisting)} position!`);
//     }
//     else return console.log(`Not found!`);
    
    
//   } catch (error) {
//      console.error("Error:", error.message);
    
//     return undefined
//   }
// }

// checkInventory(fruitsCart, fruitExistTest)
// checkInventory(fruitsCart, fruitNotExitTest)
// checkInventory(fruitsCart, `grape`)
// checkInventory(fruitsCart, 23)

// 3 
// const numberStorage: Array<number> = [5, 12, 8, 16, 3, 20, 11]

// function filterNumbers(listNumbers: Array<number>) {
//   try {
//     if (!listNumbers || !Array.isArray(listNumbers)) throw new Error(`Not input or invalid type!`);
    
//   //  let filteredArray: Array<number> = []
//   //  for (let number = 1; number < listNumbers.length; number++) {
//   //   if (listNumbers[number] >= 10 && listNumbers[number] % 2 === 0) {
//   //     filteredArray = listNumbers.filter(num => filteredArray.push)
//   //   }
//     const bigThanTenAndEven: Array<number> = listNumbers.filter(num => num >= 10 && num % 2 === 0)
//     return console.log(bigThanTenAndEven);
//   }
  
//   catch (error) {
//     console.error(`Erorr: ${error.message}`);
    
//   }
// }

// filterNumbers(numberStorage)

// 4
// const listNamesStorage: Array<string> = [`John`, `Mary`, `Alex`]
// const testError = 2

// function createEmailList(listNames: Array<string>) {
//   try {
  //     let emailWorkersList: Array<string> = listNames.map(email => email.toLowerCase() + `@school.edu`)
//     // test if is'nt array with strings!
//     if (!listNames || !Array.isArray(listNames)) throw new Error("Missing or not TYPE OF STRING!");
    
//     // lowerCasing and plus ending mail property every name(string)

//     // seeparate to one string
//     return emailWorkersList.join(`; `)
//   }

//   catch (error) {
//     console.error(error);
//   }
// }

// console.log(createEmailList(listNamesStorage));
// // createEmailList(testError)

// 5 
let scoresStorage: Array<number> = [85, 92, 45, 67, 105, -5, 78, 55, 90]

function analyzeTestScores(scoresList: Array<number>) {
  try {
    if (!scoresList || !Array.isArray(scoresList)) throw new Error("Missing input or not valid!");
    
      let validScores: Array<number> = scoresList.filter(score => score >= 0 && score < 100) 

      let passedScores: Array<number>  = scoresList.filter(score => score >= 60 && score <= 100)
      
      let highestPassing: number = passedScores.length > 0 ? Math.max(...passedScores) : 0
      
      // average of passedScores:
      let sumOfPassedScores: number = passedScores.reduce((total, score) => total + score, 0)
  
      let averageOfPassedScore: number = passedScores.length > 0 ? sumOfPassedScores / passedScores.length : 0
    
      let roundedAverage:number = Math.round(averageOfPassedScore * 10) / 10
      //////////////////////////

    return [`A: ${validScores.length}, B: ${passedScores.length}, C: ${highestPassing}. And average of passed score is: ${roundedAverage}`]

  }
  catch (Error) {
    console.error(Error);
  }
}

console.log(analyzeTestScores(scoresStorage));
