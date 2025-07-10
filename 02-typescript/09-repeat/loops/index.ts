let test1 = 0;
let test2 = -8;
let test3 = 15;
let test4 = 24;
let test5 = -7;
let numbers = [test1, test2, test3, test4, test5];

// - If it's positive, negative, or zero
function getSign(num: number): -1 | 0 | 1 {
    if (num > 0) {
        return 1;
    } else if (num < 0) {
        return -1;
    } else {
        return 0;
    }
}

numbers.forEach((num) => {
    switch (getSign(num)) {
        case 1:
            console.log(num + " is positive");
            break;
        case -1:
            console.log(num + " is negative");
            break;
        case 0:
            console.log(num + " is zero");
            break;
    }
});

// - If it's even or odd (only for non-zero numbers)

if (test2 % 2 === 0) {
    console.log(test2 + " is even");
} else {
    console.log(test2 + " is odd");
}

// - If it's divisible by 5
if (test2 % 5 === 0) {
    console.log(test2 + " is divisible by 5");
} else {
    console.log(test2 + " is not divisible by 5");
}

// - Its square and cube
if (test4 * test4 === 576) {
    console.log(test4 + " squared is " + (test4 * test4));
}

if (test4 * test4 * test4 === 13824) {
    console.log(test4 + " cubed is " + (test4 * test4 * test4));
}

for (let i = 0; i < 5; i++) {
    debugger;
    let string = "";
    for (let j = 1; j <= i + 1; j++) {
        string += j + " ";
    }
    console.log(string.trim());
}
