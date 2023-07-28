//importing express, apollo server, authmiddleware, and connections
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connections');
//importing typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();
//creating apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});
 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//creating apollo server with graphql schema
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

//calling startApolloServer
startApolloServer();