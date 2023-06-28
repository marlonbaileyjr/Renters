import React, { useState } from 'react';
import '../style/signin.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic for signing in here
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form inputs
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <div className="signin-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
