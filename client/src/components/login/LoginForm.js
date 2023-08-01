// Importing the 'useState', 'Link', and 'useNavigate' hooks from React.
import React from "react";
import './style/LoginForm.css'

    // JSX code for rendering the login and registration form.
const LoginForm = () => {
    return (
        <form>
            <div className="inner-form">
                <h2>Login</h2>

                {/* Input field for user to enter login. */}
                <div className="form-input">
                    <label>Login:</label>
                    <input type="text" name="login" id="login"/>
                </div>

                {/* Input field for user to enter password. */}
                <div className="form-input">
                    <label>Password:</label>
                    <input type="password" name="password" id="password"/>
                </div>

                {/* Button to submit the login form. */}
                <input type="submit" name="login" value="Log In"></input>

                {/* Button to register a new user. */}
                <button name="register">Register</button>
            </div>
        </form>
    )
}

// Exporting the 'LoginInputForm' component as the default export for this module.
export default LoginForm;
