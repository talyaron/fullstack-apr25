class Car {
    public company:string;
    public model: string;
    public year: number;
    public maxTank: number;
    protected fuelLevel: number;


constructor(company: string, model: string, year: number, maxTank:number,fuelLevel: number) {
    this.company = company;
    this.model = model;
    this.year = year;
    this.maxTank = maxTank;
    this.fuelLevel = 0;
}

greet() {
    console.log(`This is the company ${this.company} and the model ${this.model} year ${this.year} that has fuel level ${this.fuelLevel}`);
}
}

const lexi = new Car("Audi", "A1",2010,500,50);
console.log(lexi);