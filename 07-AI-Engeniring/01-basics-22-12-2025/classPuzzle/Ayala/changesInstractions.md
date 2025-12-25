# Task: Rebranding, Advanced Category System, and UI Enhancements

Please implement the following changes across the codebase to transition the site and enhance recipe filtering and management.

### 1. Global Rebranding
* Replace all instances of "Rina's Recipes" with "**Grandma's Recipes**".
* This includes the `<title>` tag, Navbar, Footer, Metadata, and any "Welcome" or "About" text.

### 2. Database & Schema Updates
* **New Categories:** Add `Side Dishes`, `Baked goods`, and `Healthy & Tasty` to the database and ensure the API routes can fetch recipes specifically for these.
* **Recipe Attributes:** Add the following fields to the Recipe model:
    * `isYemeni`: A boolean attribute to mark recipes as Yemeny Food.
    * `kosherType`: A field with options: `Parve`, `Dairy`, `Meat`.
* Ensure these attributes are accessible via the API so they can be filtered just like categories.

### 3. Admin UI: Custom Selection (No <select>)
* In the "Add/Edit Recipe" admin page, create a custom UI for selecting categories and attributes (Yemeni Food, Kosher Type).
* **Constraint:** Do NOT use standard HTML `<select>` tags. Use styled buttons, chips, or custom toggles that can be styled to match the site's aesthetic.

### 4. Advanced Filtering Logic
* **Difficulty Filter:** Refactor the difficulty filter to support **multi-select**. Users should be able to select multiple levels (e.g., Easy and Medium) at once, and the view should display recipes matching any of the chosen levels.
* **Kosher Filter:** Add a UI filter for `Parve`, `Dairy`, and `Meat`.
* **Yemeny Access:** Ensure users can access "Yemeny Food" as if it were a category (e.g., via a dedicated link or filter).

### 5. Dynamic Backgrounds by Category
Apply the following background colors to the page/container when viewing specific categories:
* **Main Course:** `#F8BEF5`
* **Side Dishes:** `#FCFFCD`
* **Appetizers:** `#D0FAFD`
* **Healthy Food:** `#AAF968`
* **Desserts:** `#7DF98E`
* **Baked goods:** `#E3CEB2`
* **Yemeni Food:** `#FFCF90`
* **Salads:** `#D4C7E0`
* **Soups:** `#FFAAAA`

### 6. Language & Localization Prep
* Add the following **Language SVG** to the Navbar:
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
* Implement a basic `language` state (e.g., `const [lang, setLang] = useState('he')`) to prepare for future translations.
