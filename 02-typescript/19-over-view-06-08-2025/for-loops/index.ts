//(initialize variable; condition (stop if false); increment)
for (let i = 0; i < 5; i++) {
    console.log(i);
}

let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// Using a for loop to iterate through an array
const array: Array<number | string> = [1, 2, "Boo", 4, 5];
for (let j = 0; j < array.length; j++) {
    console.log(array[j]);
}
//of loop
// Using a for...of loop to iterate through an array
//value is the value of the array
for (const value of array) {
    console.log(value);
}

array.forEach((value) => {
    if (typeof value === 'number') {
        console.log(value + 1);
    }
});

const object = {
    a: "foo",
    b: "fizz",
    c: "buzz"
};

for (const key in object) {
    console.log(key);
    console.log(object[key]);
}

Object.entries(object).forEach(([key, value]) => {
    console.log(key, value);
});

