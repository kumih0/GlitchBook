const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connections');

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // Assuming `authMiddleware` returns the context object
  });

  await server.start();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// calling startApolloServer
startApolloServer();
