import './App.css';
import './styles/styles.css'
import './components/LoginForm/style/LoginForm.css'
import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Signup from './components/Signup';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
                        <Route path="/Profile/:username" element={<ProfilePage />} />
                        <Route path="/PostFeed" element={<HomePage />} />
                        <Route path="/Signup" element={<Signup />} />
                    </Routes>
                </div>
            
        </ApolloProvider>
    );
}

export default App;
