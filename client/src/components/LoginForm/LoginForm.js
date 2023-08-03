import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { error }] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email, password }
      });
      Auth.login(data.login.token);
      navigate('/me');
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="inner-form">
        <h2>Login</h2>

        {/* Input field for user to enter login. */}
        <div className="form-input">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Input field for user to enter password. */}
        <div className="form-input">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button to submit the login form. */}
        <input type="submit" name="login" value="Log In"/>

        {/* Button to register a new user. */}
        <Link to="/signup"><input type='submit' name='signup' value='Register' /></Link>
      </div>
    </form>
  );
};

export default LoginForm;
