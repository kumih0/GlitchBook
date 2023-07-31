// Importing the 'useState', 'Link', and 'useNavigate' hooks from React.
import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

// The 'LoginInputForm' component that receives props 'Login', 'Register', and 'error'.
const LoginInputForm = ({ Login, Register, error }) => {
    // Setting up state variables using the 'useState' hook.
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle the login form submission.
    const submitLoginHandler = ev => {
        ev.preventDefault();
        Login({ login: login, password: password });
    }

    // Function to handle the registration form submission.
    const submitRegisterHandler = ev => {
        ev.preventDefault();
        Register({ login: login, password: password, id: Math.round(new Date().getTime() / 1000) });
    }

    // JSX code for rendering the login and registration form.
    return (
        <form onSubmit={submitLoginHandler}>
            <div className="inner-form">
                <h2>Login</h2>

                {/* Displaying an error message if 'error' is not an empty string. */}
                {(error !== "") ? (<div className="error">{error}</div>) : ""}

                {/* Input field for user to enter login. */}
                <div className="form-input">
                    <label htmlFor="login">Login:</label>
                    <input type="text" name="login" id="login" onChange={ev => setLogin(ev.target.value)} value={login}
                        maxLength="30" />
                </div>

                {/* Input field for user to enter password. */}
                <div className="form-input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={ev => setPassword(ev.target.value)}
                        value={password} maxLength="30" />
                </div>

                {/* Button to submit the login form. */}
                <input type="submit" name="login" value="Log In"></input>

                {/* Button to register a new user. */}
                <button onClick={submitRegisterHandler} name="register">Register</button>
            </div>
        </form>
    )
}

// Exporting the 'LoginInputForm' component as the default export for this module.
export default LoginInputForm;
