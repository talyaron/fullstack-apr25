let RandomData: any[] = [42, true, "hello!", 12, true, "true"];
let MyNumbers: number[] = [42, 15, 16, 99, 11, 41];
let MyString: string[] = ["hi", "bye", "hello!"];

console.log(RandomData);
console.log(MyNumbers);
console.log(MyString);

RandomData.push("hi");
console.log(RandomData, "Updated!");

MyNumbers.push(16);
console.log(MyNumbers, "Updated!");

MyString.push("This has been pushed");
console.log(MyString, "Updated!");
