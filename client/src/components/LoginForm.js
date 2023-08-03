import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { data, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email: email, password: password }
      });
      Auth.login(data.login.token);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginFormClick = () => {
    navigate('/profile');
}

  return (
    <form onSubmit={handleLogin}>
      {error && showAlert &&  
        <div className="alert alert-danger" role="alert">
          {error.message} u heckin bwoken it :3
        </div>
      }
      <div className="inner-form">
        <h2>Login</h2>

        <div className="form-input">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-input">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      { data ? (
        <input type="submit" name="login" value="Log In" onClick={handleLoginFormClick}/>
      ) : (
        <input type="submit" name="login" value="Log In" />
      )}
        <Link to="/signup"><input type='submit' name='signup' value='Register' /></Link>
      </div>
    </form>
  );
};

export default LoginForm;
