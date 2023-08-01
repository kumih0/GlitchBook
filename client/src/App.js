import './App.css';
import './styles/styles.css'
import './styles/LoginForm.css'
import React, { useState } from 'react';
import LoginForm from './components/login/LoginForm';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//import react router dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Profile } from './pages/profile/Profile';
import Signup from './components/signup/Signup';

//making GraphQL endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

//request middleware to attach jwt token to every request as authorization header
const authLink = setContext((_, { headers }) => {
    //get token from local storage
    const token = localStorage.getItem('id_token');
    //return headers to context
    return {

        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

//instantiate apollo client
const client = new ApolloClient({
    //linking to http server
    link: authLink.concat(httpLink),
    //instantiate cache object
    cache: new InMemoryCache(),
});


// Glitchbook app init
const App = () => {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <ApolloProvider client={client}>
                <div className="App">
                    {
                        currentForm === 'login' ? <LoginForm onFormSwitch={toggleForm}/> : <Signup onFormSwitch={toggleForm}/>
                    }
                        <Routes>
                            <Route path={"/"} element={<LoginForm/>}></Route>
                            <Route path={"/signup"} element={<Signup/>}></Route>
                            <Route path={"/profile"} element={<Profile/>}></Route>
                        </Routes>
                </div>
        </ApolloProvider>
    );
}

export default App;
