import React from 'react'

interface Props{
    loginData: {email: string, password: string}
    setLoginData: React.Dispatch<React.SetStateAction<{email: string, password: string}>>
}

const LoginBox = ({loginData, setLoginData}: Props) => {

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        console.log(name, value)

        setLoginData({
            ...loginData,
            [name]: value
        });

       
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log('Login submitted:', loginData);

         //fetch to database / API

         //wait to receive response
         //if register successfully - > navigate to login page / home page
         //navigate ('/login')
    }

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginBox