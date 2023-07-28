//these are the default imports from create-react-app
import logo from './assets/logo.svg';
import './assets/App.css';
//import react and apollo dependencies
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//import react router dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import pages here
import Home from './pages/Home';
import Login from './pages/Login';
//import components here
import Header from './components/Header';
import Footer from './components/Footer';

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


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
