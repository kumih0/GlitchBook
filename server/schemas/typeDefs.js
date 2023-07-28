import { gql } from '@apollo/server';

//creating typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        friends: [User]!
        posts: [Post]!
        friendCount: Int
    }

    type Post {
        _id: ID
        postBody: String
        username: String
        createdAt: String
        likes: Int
        dislikes: Int
        comments: [Comment]!
        commentCount: Int
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
        likes: Int
        dislikes: Int
    }

    
