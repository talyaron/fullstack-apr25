import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("נא למלא את כל השדות");
      return;
    }
    setError("");
    // Simulate login success
    onLogin(email);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>התחברות</h2>
      <div className="form-group">
        <label htmlFor="email">אימייל</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">סיסמה</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">התחבר</button>
    </form>
  );
}

export default LoginForm;
