const { gql } = require('@apollo/server');

//creating typeDefs
const typeDefs = `#graphql
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
        postTitle: String
        postText: String
        username: String
        createdAt: String
        likes: Int
        dislikes: Int
        comments: [Comment]!
        commentCount: Int
    }

    type Comment {
        _id: ID
        commentText: String
        username: String
        createdAt: String
        likes: Int
        dislikes: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(postId: ID!): Post
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(postTitle: String!, postText: String!): Post
        addComment(postId: ID!, commentText: String!): Post
        addFriend(friendId: ID!): User
        updatePost(postId: ID!, postTitle: String!, postText: String!): Post
        updateComment(postId: ID!, commentId: ID!, commentText: String!): Post
        likePost(postId: ID!): Post
        dislikePost(postId: ID!): Post
        likeComment(postId: ID!, commentId: ID!): Post
        dislikeComment(postId: ID!, commentId: ID!): Post
        deletePost(postId: ID!): Post
        deleteComment(postId: ID!, commentId: ID!): Post
        deleteFriend(friendId: ID!): User
    }
`;

//exporting typeDefs
module.exports = typeDefs;