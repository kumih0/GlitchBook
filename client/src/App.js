import './App.css';
import './styles/styles.css'
import './styles/LoginForm.css'
import { useState } from 'react';
import LoginForm from './components/login/LoginForm';
import LoginInput from './components/login/LoginInput';
import TweetManager from './components/tweets/TweetManager';
import SearchManager from './components/search/SearchManager';
import TweetField from "./components/tweets/TweetField";
import TweetPage from "./components/tweets/TweetPage";
//these are the default imports from create-react-app
import logo from './assets/logo.svg';
import './assets/App.css';
//import react and apollo dependencies
import React from 'react';
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
function App() {
    const [currentUserData, setCurrentUserData] = useState({ login: "", id: -1 });

    const updateUserData = data => {
        setCurrentUserData(data);
    }

    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    {(currentUserData.id === -1) ? (
                        <LoginForm updateCurrentUserData={updateUserData} />
                    ) :
                        <Routes>
                            <Route path={"/"} element={<TweetManager userData={currentUserData} />}></Route>
                            <Route path={"/tweet/:id"} element={<TweetPage userData={currentUserData} />}></Route>
                            <Route path={"/search"} element={<SearchManager userData={currentUserData} />}></Route>
                            <Route path={"/search/:id"} element={<SearchManager userData={currentUserData} />}></Route>
                        </Routes>

                    }
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
