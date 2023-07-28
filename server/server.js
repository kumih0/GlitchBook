//importing express, apollo server, authmiddleware, and connections
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { authMiddleware } from './utils/auth';
import db from './config/connection';
//importing typeDefs and resolvers
import { typeDefs, resolvers } from './schemas';

const PORT = process.env.PORT || 3001;
const app = express();
//creating apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

