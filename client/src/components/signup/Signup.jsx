import React, { useState } from 'react';
import LoginForm from '../login/LoginForm';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
// import './styles/LoginForm.css';

const Signup = (props) => {
    const [currentForm, setCurrentForm] = useState('login');
    const [addUser, { error }] = useMutation(ADD_USER);

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    {
        currentForm === 'login' ? <LoginForm onFormSwitch={toggleForm}/> : <Signup onFormSwitch={toggleForm}/>
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="email">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremailhere@yeshere.com" id="email" name="email" />
                <label for="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <label for="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username" />
                <button type="submit">Sign Up</button>
            </form>
           <button onClick={() => props.onFormSwitch('LoginForm')}>Already have a account? Log in here.</button>
        </>
    )
}

export default Signup;