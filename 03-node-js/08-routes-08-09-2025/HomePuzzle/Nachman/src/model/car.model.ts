export interface Vehicle {
    carId: number;
    make: string;
    modelName: string;
    manufacturingYear: number;
    currentPrice: number;
    paintColor: string;
    totalMiles: number;
    inStock: boolean;
}

export enum CarCondition {
    EXCELLENT = "Excellent",
    GOOD = "Good", 
    FAIR = "Fair",
    POOR = "Poor"
}

export const vehicleInventory: Vehicle[] = [
    { 
        carId: 101, 
        make: "Nissan", 
        modelName: "Altima", 
        manufacturingYear: 2022, 
        currentPrice: 28500, 
        paintColor: "Silver", 
        totalMiles: 8500, 
        inStock: true 
    },
    { 
        carId: 102, 
        make: "Chevrolet", 
        modelName: "Malibu", 
        manufacturingYear: 2021, 
        currentPrice: 25900, 
        paintColor: "White", 
        totalMiles: 12000, 
        inStock: true 
    },
    { 
        carId: 103, 
        make: "Hyundai", 
        modelName: "Sonata", 
        manufacturingYear: 2020, 
        currentPrice: 23400, 
        paintColor: "Gray", 
        totalMiles: 18500, 
        inStock: false 
    }
];