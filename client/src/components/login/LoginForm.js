// Importing the 'useEffect' and 'useState' hooks from React, and 'LoginInput' component.
import { useEffect, useState } from "react"
import LoginInput from "./LoginInput"
import { useNavigate } from "react-router";

// The 'LoginForm' component that receives the 'updateCurrentUserData' prop.
const LoginForm = ({ updateCurrentUserData }) => {
    // Importing the SHA256 hashing algorithm.
    let SHA256 = require("crypto-js/sha256");

    // Setting up state variables using the 'useState' hook.
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Minimum login and password length requirements.
    const MIN_LOGIN_LENGTH = 3;
    const MIN_PASSWORD_LENGTH = 6;

    // Effect hook to fetch user data from the server.
    useEffect(() => {
        console.log("made request..");
        fetch("http://localhost:3001/users").then(userData => userData.json()).then(userData => {
            setUserData(userData);
        });
    }, []);

    // Function to check the correctness of credentials and update user data.
    const checkAndSetCredentials = data => {
        for (const entry of userData) {
            if (entry.login === data.login) {
                if (JSON.stringify(SHA256(data.password).words) === entry.password) {
                    updateCurrentUserData({ login: entry.login, id: entry.id });
                    return true;
                }
            }
        }
        return false;
    }

    // Function to check if registration is allowed for the given data.
    const canRegister = data => {
        if (!areInputsValid(data)) {
            return false;
        }

        for (const entry of userData) {
            if (entry.login === data.login) {
                setError("Login already taken!");
                return false;
            }
        }
        return true;
    }

    // Function to check if the input data is valid.
    const areInputsValid = data => {
        if (data.login.length < MIN_LOGIN_LENGTH) {
            setError("Login too short - needs more than " + MIN_LOGIN_LENGTH + " characters.");
            return false;
        } else {
            if (data.password.length < MIN_PASSWORD_LENGTH) {
                setError("Password too short - needs more than " + MIN_PASSWORD_LENGTH + " characters.");
                return false;
            }
        }
        return true;
    }

    // Function to handle login attempts.
    const onLoginHandler = data => {
        if (checkAndSetCredentials(data)) {
            setError("");
            navigate("/");
        } else {
            setError("Wrong Credentials!");
        }
    }

    // Function to handle registration attempts.
    const onRegisterHandler = data => {
        if (canRegister(data)) {
            setError("");
            const singleEntry = { "login": data.login, "password": JSON.stringify(SHA256(data.password).words), id: data.id};
            setUserData(userData => ([...userData, singleEntry]));
            // Fetch data
            fetch("http://localhost:3001/users", { method: "POST", body: JSON.stringify(singleEntry), headers: { "content-type": "application/json" } });
        }
    }

    // JSX code for rendering the 'LoginForm' component.
    return (
        <div className="login-form">
            {/* Rendering the 'LoginInput' component and passing appropriate props. */}
            <LoginInput Login={onLoginHandler} Register={onRegisterHandler} error={error} />
        </div>
    );
}

// Exporting the 'LoginForm' component as the default export for this module.
export default LoginForm;
