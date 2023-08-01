import React, { useState } from 'react';
// import './styles/LoginForm.css';

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="email">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremailhere@yeshere.com" id="email" name="email" />
                <label for="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <button type="submit">Sign Up</button>
            </form>
           {/* <button onClick={() => props.onFormSwitch('LoginForm')}>Already have a account? Log in here.</button> */}
        </>
    )
}

export default Signup;