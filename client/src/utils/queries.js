const { gql } = require('@apollo/client');
export const ALL_USERS = gql`
query allUsers {
  users {
    _id
    username
    email
    password
    friends {
      username
    }
    posts {
      _id
      postTitle
      postText
      username
      createdAt
      likes
      dislikes
      comments {
        _id
        commentText
        username
        createdAt
        likes
        dislikes
      }
      commentCount
    }
    friendCount
  }
}`;

export const GET_USER = `#graphql
  query Query($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        postText
        postTitle
        createdAt
      }
    }
  }`;

  export const ALL_POSTS = `#graphql
  query Query {
    posts {
      _id
      postText
      postTitle
      likes
      dislikes
    }
  }`;
  
  