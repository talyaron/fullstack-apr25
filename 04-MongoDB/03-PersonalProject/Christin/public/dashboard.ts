document.addEventListener('DOMContentLoaded', () => {
    // בדיקת התחברות
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    // ממשקים
    interface Product {
        _id: string;
        name: string;
        description: string;
        price: number;
        quantity: number;
        category: string;
    }

    // אלמנטים
    const usernameSpan = document.getElementById('username') as HTMLSpanElement;
    const productsGrid = document.getElementById('productsGrid') as HTMLDivElement;
    const emptyState = document.getElementById('emptyState') as HTMLDivElement;
    const productModal = document.getElementById('productModal') as HTMLDivElement;
    const productForm = document.getElementById('productForm') as HTMLFormElement;
    const modalTitle = document.getElementById('modalTitle') as HTMLHeadingElement;

    // סטטיסטיקות
    const totalProductsSpan = document.getElementById('totalProducts') as HTMLHeadingElement;
    const totalValueSpan = document.getElementById('totalValue') as HTMLHeadingElement;
    const lowStockSpan = document.getElementById('lowStock') as HTMLHeadingElement;

    // הגדרת שם משתמש
    usernameSpan.textContent = localStorage.getItem('username') || 'משתמש';

    // פונקציות עזר
    async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
        const token = localStorage.getItem('token');
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    // פונקציות ניהול מוצרים
    async function loadProducts(): Promise<void> {
        try {
            const response = await fetchWithAuth('/api/products');
            const data = await response.json();

            if (data.success) {
                const products: Product[] = data.data;
                
                if (products.length === 0) {
                    productsGrid.style.display = 'none';
                    emptyState.style.display = 'block';
                } else {
                    productsGrid.style.display = 'grid';
                    emptyState.style.display = 'none';
                    renderProducts(products);
                }
                
                updateStatistics(products);
            } else {
                showMessage(data.message || 'שגיאה בטעינת מוצרים', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('שגיאה בטעינת מוצרים', 'error');
        }
    }

    function renderProducts(products: Product[]): void {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>${product.description || 'אין תיאור'}</p>
                <p><strong>קטגוריה:</strong> ${product.category}</p>
                <div class="price">₪${product.price.toFixed(2)}</div>
                <p class="quantity">במלאי: ${product.quantity}</p>
                <div class="product-actions">
                    <button class="btn btn-warning btn-small" onclick="window.editProduct('${product._id}')">✏️ ערוך</button>
                    <button class="btn btn-danger btn-small" onclick="window.deleteProduct('${product._id}')">🗑️ מחק</button>
                </div>
            </div>
        `).join('');
    }

    function updateStatistics(products: Product[]): void {
        const total = products.length;
        const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
        const lowStock = products.filter(p => p.quantity < 10).length;
        
        totalProductsSpan.textContent = total.toString();
        totalValueSpan.textContent = `₪${totalValue.toFixed(2)}`;
        lowStockSpan.textContent = lowStock.toString();
    }

    // פתיחת מודל
    function openModal(): void {
        modalTitle.textContent = 'הוסף מוצר חדש';
        productForm.reset();
        (document.getElementById('productId') as HTMLInputElement).value = '';
        productModal.style.display = 'block';
    }

    // סגירת מודל
    function closeModal(): void {
        productModal.style.display = 'none';
    }

    // עריכת מוצר
    async function editProduct(id: string): Promise<void> {
        try {
            const response = await fetchWithAuth(`/api/products/${id}`);
            const data = await response.json();

            if (data.success) {
                const product: Product = data.data;
                modalTitle.textContent = 'ערוך מוצר';
                (document.getElementById('productId') as HTMLInputElement).value = product._id;
                (document.getElementById('productName') as HTMLInputElement).value = product.name;
                (document.getElementById('productDescription') as HTMLTextAreaElement).value = product.description || '';
                (document.getElementById('productPrice') as HTMLInputElement).value = product.price.toString();
                (document.getElementById('productQuantity') as HTMLInputElement).value = product.quantity.toString();
                (document.getElementById('productCategory') as HTMLInputElement).value = product.category;
                productModal.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('שגיאה בטעינת מוצר', 'error');
        }
    }

    // מחיקת מוצר
    async function deleteProduct(id: string): Promise<void> {
        if (!confirm('האם אתה בטוח שברצונך למחוק מוצר זה?')) {
            return;
        }

        try {
            const response = await fetchWithAuth(`/api/products/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                showMessage('המוצר נמחק בהצלחה', 'success');
                loadProducts();
            } else {
                showMessage(data.message || 'שגיאה במחיקת מוצר', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('שגיאה במחיקת מוצר', 'error');
        }
    }

    // שמירת מוצר
    productForm.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        
        const id = (document.getElementById('productId') as HTMLInputElement).value;
        const name = (document.getElementById('productName') as HTMLInputElement).value;
        const description = (document.getElementById('productDescription') as HTMLTextAreaElement).value;
        const price = parseFloat((document.getElementById('productPrice') as HTMLInputElement).value);
        const quantity = parseInt((document.getElementById('productQuantity') as HTMLInputElement).value);
        const category = (document.getElementById('productCategory') as HTMLInputElement).value;

        const productData = { name, description, price, quantity, category };

        try {
            const url = id ? `/api/products/${id}` : '/api/products';
            const method = id ? 'PUT' : 'POST';

            const response = await fetchWithAuth(url, {
                method,
                body: JSON.stringify(productData)
            });

            const data = await response.json();

            if (data.success) {
                showMessage(data.message, 'success');
                closeModal();
                loadProducts();
            } else {
                showMessage(data.message || 'שגיאה בשמירת מוצר', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('שגיאה בשמירת מוצר', 'error');
        }
    });

    // יציאה
    function logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    }

    // סגירת מודל בלחיצה מחוץ לו
    window.onclick = (event: MouseEvent) => {
        if (event.target === productModal) {
            closeModal();
        }
    };

    // טעינה ראשונית
    loadProducts();

    // הפיכת פונקציות לגלובליות
    (window as any).openModal = openModal;
    (window as any).closeModal = closeModal;
    (window as any).editProduct = editProduct;
    (window as any).deleteProduct = deleteProduct;
    (window as any).logout = logout;
});