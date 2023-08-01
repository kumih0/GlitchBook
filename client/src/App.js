import './App.css';
import './styles/styles.css'
import React, { useState } from 'react';
import LoginForm from './components/login/LoginForm';
import Signup from './components/signup/Signup';
import ProfilePage from './pages/ProfilePage/ProfilePage';
//import react and apollo dependencies
// import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//import react router dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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

    return (
        <ApolloProvider client={client}>
                <div className="App">
                        <Routes>
                            <Route path={"/"} element={<LoginForm />}></Route>
                            <Route path={"/Profile"} element={<ProfilePage />}></Route>
                            <Route path={"/PostFeed"} element={<LoginForm />}></Route>
                            <Route path={"/Signup"} element={<Signup />}></Route>
                        </Routes>
                </div>
        </ApolloProvider>
    );
}

export default App;
