
type Product = {
  name: string;
  price: number;
};

const store: Product[] = [];

const userCart: Product[] = [];


function addProductByAdmin(name: string, price: number): void {
  store.push({ name, price });
  console.log(`✅ המוצר "${name}" נוסף לחנות במחיר ₪${price}`);
}


function addToCart(productName: string): void {
  const product = store.find(p => p.name === productName);
  if (product) {
    userCart.push(product);
    console.log(`🛒 המוצר "${productName}" נוסף לעגלה.`);
  } else {
    console.log(`⚠️ המוצר "${productName}" לא נמצא בחנות.`);
  }
}

function viewCart(): void {
  console.log("📦 עגלת הקניות שלך:");
  if (userCart.length === 0) {
    console.log("העגלה ריקה.");
    return;
  }

  let total = 0;
  userCart.forEach(item => {
    console.log(`- ${item.name}: ₪${item.price}`);
    total += item.price;
  });

  console.log(`💰 סה"כ לתשלום: ₪${total}`);
}

viewCart();