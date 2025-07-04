function processNames(input: string): void {
  // 1. Split the string into an array
  const namesArray = input.split(',').map(name => name.trim());

  // 2. Sort the array alphabetically
  const sortedNames = namesArray.sort();

  // 3. Filter names with more than 3 characters and log them
  sortedNames.forEach(name => {
    if (name.length > 3) {
      console.log(name);
    }
  });
}

// Example usage:
const userInput = "Nativ, Razan, Bar, Eli, Noa, Amit, Jonathan";
processNames(userInput);