interface Car {
    model: string;
    color: string;
    year: number;
    
}
let cars: Car[]=[
    { model: "toyota", color:"blue",year:2022  },
    { model: "honda", color:"black",year:2010  },
    { model: "chevrolt", color:"white",year:1995  },
    { model: "ferrai", color:"red",year:2002  },
    { model: "toyota", color:"white",year:2015  }
]

console.log(cars.sort((a,b)=>a.year-b.year));
let newCars = cars.filter(car=>car.year>2010)
console.log(newCars);

//selling the first car
let sold = cars.shift();
console.log(cars);
console.log(sold);



