import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import useRandom from '../../hooks/useRandom'
import useName from '../../hooks/useName'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function MainPage() {
  const x = useRandom();
  const { name } = useName();
  const navigate = useNavigate();

  useEffect(() => {
    if(!name.trim()) {
      alert('Name is missing! Redirecting to login page.');
      navigate('/');
    }

  }, [name, navigate]);

  return (
    <>
      <h2>Welcome, {name}!</h2>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>
          count is {x}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default MainPage
