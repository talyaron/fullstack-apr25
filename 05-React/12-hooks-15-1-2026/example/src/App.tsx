import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './page/login/Login';
import MainPage from './page/main/MainPage';
import { NameProvider } from './hooks/useName';

function App() {
  return (
    <NameProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </NameProvider>
  );
}

export default App;
