// interface Product {
//     price: number;
//     name: string;
// }

// const book: Product = {
//     price: 35,
//     name: "book1"
// }

class Product {
    public name:string;
    public price:number;
    private inStock:boolean;
    constructor(price: number, name: string, inStock:boolean) {
this.name = name;
this.price = price;
this.inStock = inStock;
    }
}