// App.js

import './App.css';
import './styles/styles.css'
import './styles/LoginForm.css'
import React from 'react';
import LoginForm from './components/login/LoginForm';
import ProfileData from './components/ProfileData/ProfileData';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Profile } from './pages/profile/Profile';
import Signup from './components/signup/Signup';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            
                <div className="App">
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/Profile" element={<ProfilePage />} />
                        <Route path="/PostFeed" element={<LoginForm />} />
                        <Route path="/Signup" element={<Signup />} />
                    </Routes>
                </div>
            
        </ApolloProvider>
    );
}

export default App;
