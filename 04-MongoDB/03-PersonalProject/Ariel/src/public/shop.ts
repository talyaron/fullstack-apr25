// Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  addedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  cart: CartItem[];
  createdAt: string;
  lastLogin?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  cart?: CartItem[];
}

class ShopManager {
  private products: Product[] = [];
  private currentUser: User | null = null;
  private isLoggedIn: boolean = false;

  private elements = {
    productsGrid: document.getElementById('productsGrid') as HTMLElement | null,
    productsLoading: document.getElementById('productsLoading') as HTMLElement | null,
    cartBtn: document.getElementById('cartBtn') as HTMLButtonElement | null,
    cartCount: document.getElementById('cartCount') as HTMLElement | null,
    cartSidebar: document.getElementById('cartSidebar') as HTMLElement | null,
    cartOverlay: document.getElementById('cartOverlay') as HTMLElement | null,
    cartClose: document.getElementById('cartClose') as HTMLButtonElement | null,
    cartItems: document.getElementById('cartItems') as HTMLElement | null,
    cartEmpty: document.getElementById('cartEmpty') as HTMLElement | null,
    cartFooter: document.getElementById('cartFooter') as HTMLElement | null,
    cartTotal: document.getElementById('cartTotal') as HTMLElement | null,
    checkoutBtn: document.getElementById('checkoutBtn') as HTMLButtonElement | null,
    productModal: document.getElementById('productModal') as HTMLElement | null,
    modalOverlay: document.getElementById('modalOverlay') as HTMLElement | null,
    modalClose: document.getElementById('modalClose') as HTMLButtonElement | null,
    modalBody: document.getElementById('modalBody') as HTMLElement | null,
    toastContainer: document.getElementById('toastContainer') as HTMLElement | null,
    loginBtn: document.getElementById('loginBtn') as HTMLButtonElement | null,
    userMenu: document.getElementById('userMenu') as HTMLElement | null,
    userName: document.getElementById('userName') as HTMLElement | null,
    logoutBtn: document.getElementById('logoutBtn') as HTMLButtonElement | null,
    shopNowBtn: document.getElementById('shopNowBtn') as HTMLButtonElement | null,
    filterBtns: document.querySelectorAll('.filter-btn') as NodeListOf<HTMLButtonElement>
  };

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.setupEvents();
    await this.checkAuth();
    await this.loadProducts();
  }

  private setupEvents(): void {
    this.elements.cartBtn?.addEventListener('click', () => this.toggleCart());
    this.elements.cartOverlay?.addEventListener('click', () => this.closeCart());
    this.elements.cartClose?.addEventListener('click', () => this.closeCart());
    this.elements.checkoutBtn?.addEventListener('click', () => this.checkout());
    this.elements.modalOverlay?.addEventListener('click', () => this.closeModal());
    this.elements.modalClose?.addEventListener('click', () => this.closeModal());
    this.elements.loginBtn?.addEventListener('click', () => this.goToLogin());
    this.elements.logoutBtn?.addEventListener('click', () => this.logout());
    this.elements.shopNowBtn?.addEventListener('click', () => this.scrollToProducts());
    
    this.elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const category = target.dataset.category;
        if (category) {
          this.filterProducts(category);
          this.updateActiveFilter(target);
        }
      });
    });
  }

  private async checkAuth(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success && data.user) {
          this.currentUser = data.user;
          this.isLoggedIn = true;
          this.updateAuthUI(true);
          this.updateCartUI(data.user.cart);
        } else {
          localStorage.removeItem('token');
          this.updateAuthUI(false);
          this.loadLocalCart();
        }
      } catch (error) {
        localStorage.removeItem('token');
        this.updateAuthUI(false);
        this.loadLocalCart();
      }
    } else {
      this.updateAuthUI(false);
      this.loadLocalCart();
    }
  }

  private updateAuthUI(isLoggedIn: boolean): void {
    if (isLoggedIn && this.currentUser) {
      if (this.elements.loginBtn) this.elements.loginBtn.style.display = 'none';
      if (this.elements.userMenu) this.elements.userMenu.classList.remove('hidden');
      if (this.elements.userName) this.elements.userName.textContent = this.currentUser.name;
    } else {
      if (this.elements.loginBtn) this.elements.loginBtn.style.display = 'block';
      if (this.elements.userMenu) this.elements.userMenu.classList.add('hidden');
    }
  }

  private loadLocalCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        this.updateCartUI(cart);
      } catch (error) {
        this.updateCartUI([]);
      }
    }
  }

  private async loadProducts(): Promise<void> {
    this.showLoading(true);
    
    await this.delay(1000);
    this.products = [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        description: 'The latest iPhone with titanium design and Action Button',
        price: 999,
        category: 'iphone',
        image: '📱',
        inStock: true
      },
      {
        id: '2',
        name: 'iPhone 15',
        description: 'Powerful iPhone with USB-C and 48MP camera',
        price: 799,
        category: 'iphone',
        image: '📱',
        inStock: true
      },
      {
        id: '3',
        name: 'iPad Pro 12.9"',
        description: 'Ultimate iPad experience with M2 chip',
        price: 1099,
        category: 'ipad',
        image: '📱',
        inStock: true
      },
      {
        id: '4',
        name: 'iPad Air',
        description: 'Versatile iPad with M1 chip and stunning display',
        price: 599,
        category: 'ipad',
        image: '📱',
        inStock: true
      },
      {
        id: '5',
        name: 'AirPods Pro',
        description: 'Active noise cancellation with spatial audio',
        price: 249,
        category: 'accessories',
        image: '🎧',
        inStock: true
      },
      {
        id: '6',
        name: 'Apple Watch Series 9',
        description: 'Advanced health features and always-on display',
        price: 399,
        category: 'accessories',
        image: '⌚',
        inStock: true
      }
    ];
    
    this.renderProducts(this.products);
    this.showLoading(false);
  }

  private renderProducts(products: Product[]): void {
    if (!this.elements.productsGrid) return;

    this.elements.productsGrid.innerHTML = products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card__image">${product.image}</div>
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__description">${product.description}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${product.price}</span>
          <button class="product-card__button" onclick="shop.addToCart('${product.id}')">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');
  }

  private filterProducts(category: string): void {
    if (category === 'all') {
      this.renderProducts(this.products);
    } else {
      const filtered = this.products.filter(product => product.category === category);
      this.renderProducts(filtered);
    }
  }

  private updateActiveFilter(activeBtn: HTMLButtonElement): void {
    this.elements.filterBtns.forEach(btn => btn.classList.remove('filter-btn--active'));
    activeBtn.classList.add('filter-btn--active');
  }

  public async addToCart(productId: string): Promise<void> {
    const product = this.products.find(p => p.id === productId);
    if (!product || !product.inStock) {
      this.showToast('Product not available', 'error');
      return;
    }

    if (this.isLoggedIn) {
      await this.addToCartServer(product);
    } else {
      this.addToCartLocal(product);
    }

    this.showToast(`${product.name} added to cart`, 'success');
  }

  private async addToCartServer(product: Product): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        })
      });

      const data = await response.json();
      if (data.success && data.cart) {
        this.updateCartUI(data.cart);
        if (this.currentUser) {
          this.currentUser.cart = data.cart;
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      this.showToast('Failed to add to cart', 'error');
    }
  }

  private addToCartLocal(product: Product): void {
    let cart = this.getLocalCart();
    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        addedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartUI(cart);
  }

  private getLocalCart(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private updateCartUI(cart: CartItem[]): void {
    if (!this.elements.cartCount || !this.elements.cartItems || 
        !this.elements.cartEmpty || !this.elements.cartFooter || 
        !this.elements.cartTotal) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    this.elements.cartCount.textContent = totalItems.toString();

    if (cart.length === 0) {
      this.elements.cartEmpty.style.display = 'block';
      this.elements.cartFooter.classList.add('hidden');
    } else {
      this.elements.cartEmpty.style.display = 'none';
      this.elements.cartFooter.classList.remove('hidden');
      
      this.elements.cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item__image">${item.image || '📦'}</div>
          <div class="cart-item__details">
            <h4 class="cart-item__name">${item.name}</h4>
            <p class="cart-item__price">$${item.price}</p>
            <div class="cart-item__quantity">
              <button class="quantity-btn" onclick="shop.updateQuantity('${item.productId}', ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" onclick="shop.updateQuantity('${item.productId}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <button class="cart-item__remove" onclick="shop.removeItem('${item.productId}')">×</button>
        </div>
      `).join('');
    }

    this.elements.cartTotal.textContent = totalPrice.toFixed(2);
  }

  public updateQuantity(productId: string, quantity: number): void {
    if (quantity < 0) return;
    
    if (this.isLoggedIn) {
      this.updateQuantityServer(productId, quantity);
    } else {
      this.updateQuantityLocal(productId, quantity);
    }
  }

  private async updateQuantityServer(productId: string, quantity: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      });

      const data = await response.json();
      if (data.success && data.cart) {
        this.updateCartUI(data.cart);
        if (this.currentUser) {
          this.currentUser.cart = data.cart;
        }
      }
    } catch (error) {
      this.showToast('Failed to update cart', 'error');
    }
  }

  private updateQuantityLocal(productId: string, quantity: number): void {
    let cart = this.getLocalCart();
    
    if (quantity === 0) {
      cart = cart.filter(item => item.productId !== productId);
    } else {
      const item = cart.find(item => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartUI(cart);
  }

  public removeItem(productId: string): void {
    this.updateQuantity(productId, 0);
  }

  public forceUpdateCart(cart: CartItem[]): void {
    this.updateCartUI(cart);
    if (this.currentUser) {
      this.currentUser.cart = cart;
    }
  }

  private toggleCart(): void {
    this.elements.cartSidebar?.classList.toggle('hidden');
  }

  private closeCart(): void {
    this.elements.cartSidebar?.classList.add('hidden');
  }

  private closeModal(): void {
    this.elements.productModal?.classList.add('hidden');
  }

  private async checkout(): Promise<void> {
    if (!this.isLoggedIn) {
      this.showToast('Please login to checkout', 'error');
      this.goToLogin();
      return;
    }

    const cart = this.isLoggedIn ? this.currentUser?.cart || [] : this.getLocalCart();
    if (cart.length === 0) {
      this.showToast('Your cart is empty', 'error');
      return;
    }

    this.showToast('Processing checkout...', 'success');
    
    setTimeout(async () => {
      if (this.isLoggedIn) {
        await this.clearCartServer();
      } else {
        localStorage.removeItem('cart');
        this.updateCartUI([]);
      }
      this.closeCart();
      this.showToast('Order placed successfully!', 'success');
    }, 1500);
  }

  private async clearCartServer(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/cart/clear', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        this.updateCartUI([]);
        if (this.currentUser) {
          this.currentUser.cart = [];
        }
      }
    } catch (error) {
      // Silent fail
    }
  }

  private goToLogin(): void {
    const currentCart = this.getLocalCart();
    if (currentCart.length > 0) {
      localStorage.setItem('pendingCart', JSON.stringify(currentCart));
    }
    window.location.href = '/auth/login.html';
  }

  private logout(): void {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.isLoggedIn = false;
    this.updateAuthUI(false);
    this.updateCartUI([]);
    this.showToast('Logged out successfully', 'success');
  }

  private scrollToProducts(): void {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private showLoading(show: boolean): void {
    if (!this.elements.productsLoading || !this.elements.productsGrid) return;

    if (show) {
      this.elements.productsLoading.classList.remove('hidden');
      this.elements.productsGrid.style.display = 'none';
    } else {
      this.elements.productsLoading.classList.add('hidden');
      this.elements.productsGrid.style.display = 'grid';
    }
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    if (!this.elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    this.elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

let shop: ShopManager;

document.addEventListener('DOMContentLoaded', () => {
  shop = new ShopManager();
});

(window as any).shop = {
  addToCart: (productId: string) => shop.addToCart(productId),
  removeItem: (productId: string) => shop.removeItem(productId),
  updateQuantity: (productId: string, quantity: number) => shop.updateQuantity(productId, quantity),
  forceUpdateCart: (cart: any[]) => shop.forceUpdateCart(cart)
};