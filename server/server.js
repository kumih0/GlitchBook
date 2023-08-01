// npm install @apollo/server express graphql cors body-parser
//copied from apollo server v4 documentation
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');
//importing mongoose connection
const db = require('./config/connections');
//importing auth middleware
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
      }

    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: authMiddleware,
        }),
    );

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
      });
    
    db.once('open', () => {
        httpServer.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
}

startApolloServer();