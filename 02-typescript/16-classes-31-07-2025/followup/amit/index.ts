class Person {
    constructor(public name:string, public age: number) {
        this.name = name;
        this.age = age;
    }

    person() {
        console.log(`Hey my name is ${this.name} and my age is ${this.age}`);
    }

}

const amit = new Person("amit", 24);

amit.person();


class Car {
    constructor(public brand: string, public year: number) {
        this.brand = brand;
        this.year = year;
    }

    drive() {
        console.log(`My ${this.brand} is driving!`);
    }
}

const car = new Car("Honda", 2014);

car.drive();