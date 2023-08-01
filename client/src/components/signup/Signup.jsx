// Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../login/LoginForm';
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
                <label htmlFor="email">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremailhere@yeshere.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username" />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={handleLoginFormClick}>Already have an account? Log in here.</button>
        </>
    )
}

export default Signup;
