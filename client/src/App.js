import React from 'react';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
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
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/me" element={<ProfilePage />} />
                        <Route path="/Profile" element={<ProfilePage />} />
                        <Route path="/Profile/:username" element={<ProfilePage />} />
                        <Route path="/Feed" element={<HomePage />} />
                        <Route path='/Posts/:postId' element={<PostPage />} />
                    </Routes>
                </div>
            
        </ApolloProvider>
    );
}

export default App;
