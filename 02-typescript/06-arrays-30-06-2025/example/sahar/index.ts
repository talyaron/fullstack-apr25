// let myDataArry: any[] = [11, 11, 11, 11, 11, 11];
// console.log(myDataArry);
function primeAry(arryX: any = []) {
  for (let i = 0; i < arryX.length; i++) {
    let prime = false;
    try {
      if (arryX[i] % 2 === 0) {
        prime = false;
        throw new Error("there is a non prime number in this arry");
      }
    } catch (e) {
      console.error("Error", e);
      return false;
    }
    // return true;
  }
  return true;
}

console.log("test", primeAry([11, 11, 121, 15]));
