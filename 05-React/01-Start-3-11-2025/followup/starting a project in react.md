# Starting a React Project with Vite

## Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

## Steps to Create a React Project with Vite

1. **Create a new Vite project**
    ```bash
    npm create vite@latest my-react-app --template react
    ```

    choose `react` when prompted for a template.

    choose TypeScript + Compiler

    choose No (without rollback)

2. **Navigate to the project directory**
    ```bash
    cd my-react-app
    ```

3. **Install dependencies**
    ```bash
    npm install
    ```

4. **Start the development server**
    ```bash
    npm run dev
    ```

5. **Open your browser**
    - Navigate to `http://localhost:5173`
    - Your React app should be running

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure
```
my-react-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
└── package.json
```


To work with scss files, you can install sass:

```bash
npm install sass
```