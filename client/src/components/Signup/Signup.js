// Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Signup = (props) => {
    const [currentForm, setCurrentForm] = useState('login');
    const [addUser, { error }] = useMutation(ADD_USER);

    const navigate = useNavigate();

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("working");
        const { data } = await addUser({
            variables: { email, password, username }
        });
        Auth.login(data.addUser.token);
        console.log(data);
    }

    const handleLoginFormClick = () => {
        navigate('/');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="inner-form">
                    <h2>Sign Up</h2>

                    {/* Input field for user to enter login. */}
                    <div className="form-input">
                        <label>Username:</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" />
                    </div>

                    {/* Input field for user to enter login. */}
                    <div className="form-input">
                        <label>Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"  id="email" name="email" />
                    </div>

                    {/* Input field for user to enter password. */}
                    <div className="form-input">
                        <label>Password:</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"  id="password" name="password" />
                    </div>

                    {/* Button to register a new user. */}
                    <button name="register" type="submit">Sign Up</button>
                    <input onClick={handleLoginFormClick} type='submit' value='Got an account?' />
                </div>
            </form>
        </>
    )
};

export default Signup;
