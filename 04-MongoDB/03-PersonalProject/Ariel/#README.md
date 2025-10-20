# 🛒 IDigitaly - חנות דיגיטלית נגישה

> חנות אונליין מודרנית למוצרי Apple עם נגישות מלאה ומערכת ניהול משתמשים

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1-green)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.18-brightgreen)](https://www.mongodb.com/)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-success)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## ✨ תכונות

- 🛍️ **חנות מלאה** - מוצרים, עגלת קניות, תשלום
- 🔐 **מערכת התחברות** - הרשמה, כניסה, ניהול משתמשים
- ♿ **נגישות מלאה** - תואם WCAG 2.1 Level AA
- 📱 **Responsive** - עובד על כל המכשירים
- 🎨 **עיצוב מודרני** - בהשראת Apple/Stripe
- ⚡ **מהיר ויעיל** - TypeScript + Express + MongoDB

---

## 🚀 התחלה מהירה

### דרישות מקדימות

- **Node.js** 18+ ([הורדה](https://nodejs.org/))
- **MongoDB** ([הורדה](https://www.mongodb.com/try/download/community))
- **Git** ([הורדה](https://git-scm.com/))

### התקנה

```bash
# 1. שכפל את הפרויקט
git clone https://github.com/yourusername/idigitaly.git
cd idigitaly

# 2. התקן תלויות
npm install

# 3. קומפל TypeScript
npm run build

# 4. הרץ את השרת
npm run dev
```

### גישה לאתר

פתח דפדפן וגש ל:
```
http://localhost:3000
```

---

## 📁 מבנה הפרויקט

```
idigitaly/
├── src/
│   ├── index.ts              # Express Server
│   ├── routes/               # API Routes
│   ├── controllers/          # Business Logic
│   ├── model/                # MongoDB Models
│   ├── styles/               # SCSS Styles
│   ├── public/               # דפים ציבוריים (חנות)
│   └── auth/                 # דפי התחברות
├── dist/                     # קבצים מקומפלים
├── package.json
└── README.md                 # מסמך זה
```

📖 **לפרטים מלאים:** ראה [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## 🛠️ Scripts

```bash
# Development - עם hot reload
npm run dev

# Build - קומפילציה
npm run build

# Start - production
npm start

# SASS - קומפל CSS
npm run sass
```

---

## 📚 תיעוד

| מסמך | תיאור |
|------|-------|
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | מבנה התיקיות והקבצים |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | מדריך נגישות |
| [TEMPLATES_GUIDE.md](TEMPLATES_GUIDE.md) | שימוש בתבניות HTML |
| [API_DOCS.md](API_DOCS.md) | תיעוד API |

---

## 🎯 תכונות עיקריות

### 🛍️ מערכת חנות

- ✅ רשימת מוצרים עם סינון
- ✅ עגלת קניות מתקדמת
- ✅ ניהול כמויות
- ✅ חישוב מחיר
- ✅ תהליך checkout

### 🔐 מערכת משתמשים

- ✅ הרשמה והתחברות
- ✅ הצפנת סיסמאות (bcrypt)
- ✅ JWT Authentication
- ✅ ניהול פרופיל
- ✅ שמירת עגלה למשתמשים

### ♿ נגישות

- ✅ תגי ARIA מלאים
- ✅ ניווט במקלדת
- ✅ תמיכה בקוראי מסך
- ✅ Skip Links
- ✅ ניגודיות גבוהה
- ✅ טקסט גדול
- ✅ WCAG 2.1 Level AA

### 🎨 עיצוב

- ✅ עיצוב מינימליסטי
- ✅ Responsive Design
- ✅ Dark Mode Ready
- ✅ אנימציות חלקות
- ✅ Loading States

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/register       # הרשמה
POST /api/auth/login          # התחברות
GET  /api/auth/me             # פרטי משתמש
```

### Cart

```http
POST   /api/auth/cart/add         # הוספה לעגלה
PUT    /api/auth/cart/update      # עדכון כמות
DELETE /api/auth/cart/remove/:id  # הסרה מעגלה
DELETE /api/auth/cart/clear       # ניקוי עגלה
```

📖 **לפרטים מלאים:** ראה [API_DOCS.md](API_DOCS.md)

---

## 🗄️ MongoDB Schema

### User Model

```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cart: [CartItem],
  createdAt: Date,
  lastLogin: Date
}
```

### CartItem

```typescript
{
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
  addedAt: Date
}
```

---

## 🔧 הגדרות

### MongoDB Connection

ערוך את `src/index.ts`:

```typescript
await mongoose.connect('YOUR_MONGODB_URI');
```

### JWT Secret

ערוך את `src/controllers/auth.controller.ts`:

```typescript
const JWT_SECRET = 'your-secret-key';
```

### Port

ב-`src/index.ts`:

```typescript
const port = 3000; // שנה לפי הצורך
```

---

## 🎨 התאמה אישית

### צבעים

ערוך `src/styles/_variables.scss`:

```scss
$primary-color: #000000;
$accent-color: #0066CC;
```

### פונטים

```scss
$font-family-base: -apple-system, ...;
```

### מוצרים

ערוך `src/public/shop.ts`:

```typescript
this.products = [
  { id: '1', name: 'iPhone 15', ... }
];
```

---

## 📱 דפים

| דף | URL | תיאור |
|----|-----|-------|
| דף הבית | `/` | חנות ראשית |
| אודות | `/about.html` | אודות החנות |
| התחברות | `/auth/login.html` | כניסה למערכת |
| הרשמה | `/auth/register.html` | הרשמה חדשה |

---

## 🧪 בדיקות

```bash
# הרץ בדיקות (אם מוגדר)
npm test

# בדיקת נגישות
# השתמש ב-axe DevTools בדפדפן
```

---

## 🚀 Deploy

### Vercel / Netlify

```bash
npm run build
# העלה את תיקיית dist/
```

### Heroku

```bash
heroku create idigitaly
git push heroku main
```

### Docker

```bash
docker build -t idigitaly .
docker run -p 3000:3000 idigitaly
```

---

## 🤝 תרומה

רוצה לתרום לפרויקט? מעולה!

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing`)
3. Commit השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing`)
5. פתח Pull Request

---

## 📝 רישיון

MIT License - חופשי לשימוש מסחרי ופרטי

---

## 👨‍💻 מפתח

**Ari** - Full Stack Developer

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 תודות

- **Express.js** - Framework מעולה
- **MongoDB** - מסד נתונים גמיש
- **TypeScript** - Type Safety
- **SCSS** - עיצוב מודרני

---

## 📊 סטטיסטיקות

- 🎯 **WCAG 2.1 Level AA** - נגישות מלאה
- ⚡ **< 1s** זמן טעינה
- 📱 **100%** תמיכה במובייל
- 🔒 **Secure** - JWT + bcrypt

---

## 🔮 תכונות עתידיות

- [ ] תשלומים אמיתיים (Stripe)
- [ ] פאנל ניהול מלא
- [ ] ניהול מלאי
- [ ] מערכת ביקורות
- [ ] חיפוש מתקדם
- [ ] Wishlist
- [ ] Multi-language

---

## 📞 תמיכה

נתקלת בבעיה? 

1. בדוק את [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
2. קרא את [ACCESSIBILITY.md](ACCESSIBILITY.md)
3. פתח Issue ב-GitHub
4. שלח מייל

---

**⭐ אם אהבת את הפרויקט, תן לנו כוכב ב-GitHub!**

---

## 📅 Changelog

### v1.0.0 (2025-01-20)
- ✨ גרסה ראשונה
- 🛍️ מערכת חנות מלאה
- 🔐 מערכת משתמשים
- ♿ נגישות WCAG 2.1 AA
- 🎨 עיצוב מודרני
- 📱 Responsive Design

---

**Built with ❤️ for everyone**