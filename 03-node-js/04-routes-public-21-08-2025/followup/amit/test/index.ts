const test = [
  {
    "lastName": "Bar",
    "firstName": "Refaeli"
  },
  {
    "lastName": "Bar",
    "firstName": "Refaeli"
  },
  {
    "firstName": "Walter",
    "lastName": "White"
  },
  {
    "firstName": "Professor Albus",
    "lastName": "Dumbledore"
  },
  {
    "lastName": "Jon",
    "firstName": "Snow"
  },
  {
    "firstName": "Jon",
    "lastName": "Snow"
  },
  {
    "firstName": "Jon",
    "lastName": "Sun"
  },
  {
    "firstName": "Arnold",
    "lastName": "Schwarzenegger"
  }
]

const uniqueTest = test.filter((u, index, self) => {
    const key = [u.firstName, u.lastName].sort().join('-');
    
    return index === self.findIndex(t => [t.firstName, t.lastName].sort().join('-') === key);
});

console.log(uniqueTest);
