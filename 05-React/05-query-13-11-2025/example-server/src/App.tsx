import { useState } from 'react';
import './App.css'

function App() {

  const [serverMessage, setServerMessage] = useState<string>("");

  //functions

  const onLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const loginData = {
          email: formData.get('email') as string,
          password: formData.get('password') as string
        };

        try {
          if (!loginData.email || !loginData.password) {
            throw new Error('Email and password are required');
          }

          const response = await fetch('http://localhost:5010/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Login successful', result);
            setServerMessage(`Welcome back, ${result.user.name}!`);
          } else {
            console.error('Login failed');
            setServerMessage('Login failed. Please check your credentials.');
          }
        } catch (error) {
          console.error('Error:', error);
          setServerMessage(`An error occurred during login. ${(error as Error).message}`);
        }
      }

  const onSubmit = async (e: any) => {



    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string
    };


    try {
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('All fields are required');

      }

      const response = await fetch('http://localhost:5010/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setServerMessage(`An error occurred during registration. ${(error as Error).message}`);
    }

  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Register</button>
        </form>
        {serverMessage && <div>{serverMessage}</div>}
      </div>

      <form onSubmit={onLogin}>
        <h2>Login</h2>
        <div>
          <label htmlFor="login-email">Email:</label>
          <input type="email" id="login-email" name="email" required />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input type="password" id="login-password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default App
